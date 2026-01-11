import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useLandingEditor, LandingFeature, LandingAudience } from "@/hooks/useLandingEditor";
import { premiumTemplates } from "@/data/premiumTemplates";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Loader2, Save, ArrowLeft, Plus, Trash2, Eye, Edit3, 
  AlertCircle, Zap, Users, Layout, ExternalLink, ImagePlus, X, GripVertical
} from "lucide-react";

const LandingEditor = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const [viewMode, setViewMode] = useState<"form" | "preview">("form");
  const [isUploading, setIsUploading] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const {
    landing,
    isLoading,
    isSaving,
    saveLanding,
    updateField,
    addPainPoint,
    removePainPoint,
    updatePainPoint,
    addFeature,
    removeFeature,
    updateFeature,
    addView,
    removeView,
    updateView,
    addAudience,
    removeAudience,
    updateAudience,
    addScreenshot,
    removeScreenshot,
    reorderScreenshots,
  } = useLandingEditor(templateId);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} не является изображением`);
        continue;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${landing.template_id || 'new'}-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      try {
        const { error: uploadError } = await supabase.storage
          .from('landing-screenshots')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('landing-screenshots')
          .getPublicUrl(fileName);

        addScreenshot(urlData.publicUrl);
        toast.success(`${file.name} загружен`);
      } catch (error: any) {
        console.error('Upload error:', error);
        toast.error(`Ошибка загрузки ${file.name}: ${error.message}`);
      }
    }

    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteScreenshot = async (url: string, index: number) => {
    // Extract filename from URL
    const fileName = url.split('/').pop();
    if (fileName) {
      try {
        await supabase.storage
          .from('landing-screenshots')
          .remove([fileName]);
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
    removeScreenshot(index);
    toast.success('Скриншот удалён');
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      reorderScreenshots(draggedIndex, index);
      toast.success('Порядок скриншотов изменён');
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!authLoading && user && !isAdmin) {
      navigate("/admin/landings");
    }
  }, [user, isAdmin, authLoading, navigate]);

  const template = templateId ? premiumTemplates.find(t => t.id === templateId) : null;

  const handleSave = async () => {
    const success = await saveLanding();
    if (success && !templateId) {
      navigate(`/admin/landings/${landing.template_id}`);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b">
        <div className="container py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/admin/landings")}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Назад
              </Button>
              <div className="hidden md:block">
                <h1 className="text-lg font-semibold">
                  {template ? template.titleRu : "Новый лендинг"}
                </h1>
                {templateId && (
                  <Badge variant="secondary" className="font-mono text-xs mt-1">
                    {templateId}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "form" | "preview")}>
                <TabsList>
                  <TabsTrigger value="form" className="gap-1">
                    <Edit3 className="h-4 w-4" />
                    <span className="hidden sm:inline">Форма</span>
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="gap-1">
                    <Eye className="h-4 w-4" />
                    <span className="hidden sm:inline">Превью</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              {templateId && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`/templates/${templateId}`, "_blank")}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
              <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6">
        {viewMode === "form" ? (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="h-5 w-5" />
                  Основная информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!templateId && (
                  <div className="space-y-2">
                    <Label htmlFor="template_id">ID шаблона *</Label>
                    <Input
                      id="template_id"
                      placeholder="para-os"
                      value={landing.template_id}
                      onChange={(e) => updateField("template_id", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Используйте ID из списка шаблонов (например: para-os, crm-os)
                    </p>
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="headline">Заголовок *</Label>
                  <Input
                    id="headline"
                    placeholder="PARA OS — четыре папки, которые изменят твою жизнь"
                    value={landing.headline}
                    onChange={(e) => updateField("headline", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subheadline">Подзаголовок</Label>
                  <Textarea
                    id="subheadline"
                    placeholder="Система организации, где каждая мысль мгновенно находит своё место..."
                    value={landing.subheadline}
                    onChange={(e) => updateField("subheadline", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pain Points */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  Боли клиента (Знакомо?)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {landing.pain_points.map((point, index) => (
                  <div key={index} className="flex gap-2">
                    <Textarea
                      placeholder="Ты создаёшь задачи в разных местах — и теряешь половину из них"
                      value={point}
                      onChange={(e) => updatePainPoint(index, e.target.value)}
                      rows={2}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removePainPoint(index)}
                      disabled={landing.pain_points.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addPainPoint} className="gap-1">
                  <Plus className="h-4 w-4" />
                  Добавить боль
                </Button>
              </CardContent>
            </Card>

            {/* Solution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Решение (Представь другую реальность)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="solution_intro">Вступление</Label>
                  <Input
                    id="solution_intro"
                    placeholder="Один экран вместо десятка вкладок"
                    value={landing.solution_intro}
                    onChange={(e) => updateField("solution_intro", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="solution_description">Описание решения</Label>
                  <Textarea
                    id="solution_description"
                    placeholder="Утро понедельника. Ты открываешь дэшборд и сразу видишь..."
                    value={landing.solution_description}
                    onChange={(e) => updateField("solution_description", e.target.value)}
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Возможности (Что ты получаешь)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {landing.features.map((feature, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="✅"
                        value={feature.icon}
                        onChange={(e) => updateFeature(index, "icon", e.target.value)}
                        className="w-16 text-center"
                      />
                      <Input
                        placeholder="Название функции"
                        value={feature.title}
                        onChange={(e) => updateFeature(index, "title", e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFeature(index)}
                        disabled={landing.features.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Описание функции..."
                      value={feature.description}
                      onChange={(e) => updateFeature(index, "description", e.target.value)}
                      rows={2}
                    />
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addFeature} className="gap-1">
                  <Plus className="h-4 w-4" />
                  Добавить функцию
                </Button>
              </CardContent>
            </Card>

            {/* Views */}
            <Card>
              <CardHeader>
                <CardTitle>Готовые представления</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {landing.views.map((view, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="Активные проекты — галерея текущих фокусов с прогресс-барами"
                      value={view}
                      onChange={(e) => updateView(index, e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeView(index)}
                      disabled={landing.views.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addView} className="gap-1">
                  <Plus className="h-4 w-4" />
                  Добавить представление
                </Button>
              </CardContent>
            </Card>

            {/* Target Audience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Целевая аудитория (Для кого)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {landing.target_audience.map((audience, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="🎒"
                        value={audience.icon || ""}
                        onChange={(e) => updateAudience(index, "icon", e.target.value)}
                        className="w-16 text-center"
                      />
                      <Input
                        placeholder="Название аудитории"
                        value={audience.title}
                        onChange={(e) => updateAudience(index, "title", e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAudience(index)}
                        disabled={landing.target_audience.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Описание аудитории..."
                      value={audience.description}
                      onChange={(e) => updateAudience(index, "description", e.target.value)}
                      rows={2}
                    />
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addAudience} className="gap-1">
                  <Plus className="h-4 w-4" />
                  Добавить аудиторию
                </Button>
              </CardContent>
            </Card>

            {/* Screenshots */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImagePlus className="h-5 w-5" />
                  Скриншоты шаблона
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                
                {landing.screenshots.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {landing.screenshots.map((url, index) => (
                      <div 
                        key={url} 
                        className={`relative group aspect-video rounded-lg overflow-hidden border bg-muted cursor-grab active:cursor-grabbing transition-all ${
                          draggedIndex === index ? 'opacity-50 scale-95' : ''
                        } ${
                          dragOverIndex === index ? 'ring-2 ring-primary ring-offset-2' : ''
                        }`}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragLeave={handleDragLeave}
                        onDrop={() => handleDrop(index)}
                        onDragEnd={handleDragEnd}
                      >
                        <img
                          src={url}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-full object-cover pointer-events-none"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <div className="absolute top-2 right-2">
                            <GripVertical className="h-5 w-5 text-white" />
                          </div>
                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteScreenshot(url, index);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <Badge className="absolute top-2 left-2 bg-black/50">
                          {index + 1}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Перетащите скриншоты для изменения порядка.
                </p>

                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="gap-2"
                >
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ImagePlus className="h-4 w-4" />
                  )}
                  Загрузить скриншоты
                </Button>
                <p className="text-xs text-muted-foreground">
                  Рекомендуемый размер: 1920×1080. Поддерживаются PNG, JPG, WebP.
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Preview Mode */
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Hero Preview */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold">{landing.headline || "Заголовок лендинга"}</h1>
              <p className="text-xl text-muted-foreground">{landing.subheadline || "Подзаголовок лендинга"}</p>
            </div>

            {/* Pain Points Preview */}
            {landing.pain_points.some(p => p.trim()) && (
              <div className="space-y-6">
                <div className="text-center">
                  <Badge variant="destructive" className="mb-4">Знакомо?</Badge>
                  <h2 className="text-2xl font-bold">Узнаёшь себя?</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {landing.pain_points.filter(p => p.trim()).map((point, index) => (
                    <Card key={index} className="border-destructive/20 bg-destructive/5">
                      <CardContent className="p-4 flex items-start gap-3">
                        <span className="text-destructive font-bold">×</span>
                        <p className="text-muted-foreground">{point}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Solution Preview */}
            {landing.solution_description && (
              <div className="space-y-6">
                <div className="text-center">
                  <Badge className="mb-4">Решение</Badge>
                  <h2 className="text-2xl font-bold">
                    {landing.solution_intro || "Представь другую реальность"}
                  </h2>
                </div>
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-8">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {landing.solution_description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Features Preview */}
            {landing.features.some(f => f.title.trim()) && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Что ты получаешь</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {landing.features.filter(f => f.title.trim()).map((feature, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <span className="text-2xl">{feature.icon}</span>
                          <div>
                            <h3 className="font-semibold">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Views Preview */}
            {landing.views.some(v => v.trim()) && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Готовые представления</h2>
                </div>
                <Card>
                  <CardContent className="p-6">
                    <ul className="space-y-2">
                      {landing.views.filter(v => v.trim()).map((view, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="text-primary">•</span>
                          {view}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Target Audience Preview */}
            {landing.target_audience.some(a => a.title.trim()) && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Для кого этот шаблон</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {landing.target_audience.filter(a => a.title.trim()).map((audience, index) => (
                    <Card key={index}>
                      <CardContent className="p-6 text-center">
                        {audience.icon && <span className="text-3xl mb-3 block">{audience.icon}</span>}
                        <h3 className="font-semibold">{audience.title}</h3>
                        <p className="text-sm text-muted-foreground mt-2">{audience.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Screenshots Preview */}
            {landing.screenshots.length > 0 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Скриншоты шаблона</h2>
                </div>
                <div className="grid gap-4">
                  {landing.screenshots.map((url, index) => (
                    <Card key={index} className="overflow-hidden">
                      <img
                        src={url}
                        alt={`Screenshot ${index + 1}`}
                        className="w-full"
                      />
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingEditor;
