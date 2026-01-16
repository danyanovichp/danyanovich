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
import { useLandingEditor, LandingFeature, LandingAudience, LandingScreenshot } from "@/hooks/useLandingEditor";
import { premiumTemplates } from "@/data/premiumTemplates";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Loader2, Save, ArrowLeft, Plus, Trash2, Eye, Edit3, 
  AlertCircle, Zap, Users, Layout, ExternalLink, ImagePlus, X, GripVertical, RefreshCw
} from "lucide-react";

const LandingEditor = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const [viewMode, setViewMode] = useState<"form" | "preview">("form");
  const [isUploading, setIsUploading] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [replacingScreenshotIndex, setReplacingScreenshotIndex] = useState<number | null>(null);
  const [isUploadingMainImage, setIsUploadingMainImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);
  const mainImageInputRef = useRef<HTMLInputElement>(null);
  
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
    updateScreenshotCaption,
    reorderScreenshots,
  } = useLandingEditor(templateId);

  // File upload validation constants
  const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    for (const file of Array.from(files)) {
      // Validate MIME type
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        toast.error(`${file.name}: разрешены только JPEG, PNG, GIF и WebP`);
        continue;
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name}: максимальный размер файла 5MB`);
        continue;
      }

      // Use safe file extension based on MIME type
      const mimeToExt: Record<string, string> = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'image/webp': 'webp'
      };
      const fileExt = mimeToExt[file.type] || 'jpg';
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

  const handleReplaceScreenshot = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || replacingScreenshotIndex === null) return;

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      toast.error('Разрешены только JPEG, PNG, GIF и WebP');
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error('Максимальный размер файла 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Delete old file from storage
      const oldUrl = landing.screenshots[replacingScreenshotIndex]?.url;
      if (oldUrl) {
        const oldFileName = oldUrl.split('/').pop();
        if (oldFileName) {
          await supabase.storage.from('landing-screenshots').remove([oldFileName]);
        }
      }

      // Upload new file
      const mimeToExt: Record<string, string> = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'image/webp': 'webp'
      };
      const fileExt = mimeToExt[file.type] || 'jpg';
      const fileName = `${landing.template_id || 'new'}-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('landing-screenshots')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('landing-screenshots')
        .getPublicUrl(fileName);

      // Update the screenshot URL while preserving caption
      const newScreenshots = [...landing.screenshots];
      newScreenshots[replacingScreenshotIndex] = {
        ...newScreenshots[replacingScreenshotIndex],
        url: urlData.publicUrl
      };
      
      // Use setLanding from the hook
      updateField('screenshots', newScreenshots as any);
      toast.success('Скриншот заменён');
    } catch (error: any) {
      console.error('Replace error:', error);
      toast.error(`Ошибка замены: ${error.message}`);
    }

    setIsUploading(false);
    setReplacingScreenshotIndex(null);
    if (replaceFileInputRef.current) {
      replaceFileInputRef.current.value = '';
    }
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

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      toast.error('Разрешены только JPEG, PNG, GIF и WebP');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error('Максимальный размер файла 5MB');
      return;
    }

    setIsUploadingMainImage(true);
    try {
      // Delete old main image if exists
      if (landing.main_image) {
        const oldFileName = landing.main_image.split('/').pop();
        if (oldFileName) {
          await supabase.storage.from('landing-screenshots').remove([oldFileName]);
        }
      }

      const mimeToExt: Record<string, string> = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'image/webp': 'webp'
      };
      const fileExt = mimeToExt[file.type] || 'jpg';
      const fileName = `${landing.template_id || 'new'}-main-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('landing-screenshots')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('landing-screenshots')
        .getPublicUrl(fileName);

      updateField('main_image', urlData.publicUrl);
      toast.success('Главное изображение загружено');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(`Ошибка загрузки: ${error.message}`);
    }

    setIsUploadingMainImage(false);
    if (mainImageInputRef.current) {
      mainImageInputRef.current.value = '';
    }
  };

  const handleDeleteMainImage = async () => {
    if (landing.main_image) {
      const fileName = landing.main_image.split('/').pop();
      if (fileName) {
        try {
          await supabase.storage.from('landing-screenshots').remove([fileName]);
        } catch (error) {
          console.error('Error deleting file:', error);
        }
      }
    }
    updateField('main_image', '');
    toast.success('Главное изображение удалено');
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
                
                {/* Main Image */}
                <div className="space-y-2">
                  <Label>Главное изображение</Label>
                  <input
                    type="file"
                    ref={mainImageInputRef}
                    onChange={handleMainImageUpload}
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    className="hidden"
                  />
                  {landing.main_image ? (
                    <div className="relative group">
                      <img 
                        src={landing.main_image} 
                        alt="Главное изображение" 
                        className="w-full aspect-video object-cover rounded-lg border"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => mainImageInputRef.current?.click()}
                          disabled={isUploadingMainImage}
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Заменить
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={handleDeleteMainImage}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Удалить
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full h-32 border-dashed"
                      onClick={() => mainImageInputRef.current?.click()}
                      disabled={isUploadingMainImage}
                    >
                      {isUploadingMainImage ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <ImagePlus className="h-8 w-8 text-muted-foreground" />
                          <span className="text-muted-foreground">Загрузить главное изображение</span>
                        </div>
                      )}
                    </Button>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Рекомендуемое соотношение сторон 16:9. Максимум 5MB.
                  </p>
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
                <input
                  type="file"
                  ref={replaceFileInputRef}
                  onChange={handleReplaceScreenshot}
                  accept="image/*"
                  className="hidden"
                />
                
                {landing.screenshots.length > 0 && (
                  <div className="space-y-4">
                    {landing.screenshots.map((screenshot, index) => (
                      <div 
                        key={screenshot.url} 
                        className={`relative group p-4 border rounded-lg bg-muted/50 cursor-grab active:cursor-grabbing transition-all ${
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
                        <div className="flex gap-4">
                          <div className="relative w-40 h-24 rounded-lg overflow-hidden shrink-0 border bg-muted">
                            <img
                              src={screenshot.url}
                              alt={`Screenshot ${index + 1}`}
                              className="w-full h-full object-cover pointer-events-none"
                            />
                            <Badge className="absolute top-1 left-1 bg-black/50 text-xs">
                              {index + 1}
                            </Badge>
                          </div>
                          <div className="flex-1 space-y-2">
                            <Label htmlFor={`caption-${index}`}>Подпись к скриншоту</Label>
                            <Input
                              id={`caption-${index}`}
                              placeholder="Опишите что показано на скриншоте..."
                              value={screenshot.caption || ''}
                              onChange={(e) => updateScreenshotCaption(index, e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                            <Button
                              size="icon"
                              variant="ghost"
                              className="hover:bg-primary/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                setReplacingScreenshotIndex(index);
                                replaceFileInputRef.current?.click();
                              }}
                              disabled={isUploading}
                              title="Заменить скриншот"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteScreenshot(screenshot.url, index);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
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
                <div className="grid gap-6">
                  {landing.screenshots.map((screenshot, index) => (
                    <Card key={screenshot.url} className="overflow-hidden">
                      <img
                        src={screenshot.url}
                        alt={screenshot.caption || `Screenshot ${index + 1}`}
                        className="w-full"
                      />
                      {screenshot.caption && (
                        <CardContent className="p-4 bg-muted/50">
                          <p className="text-sm text-muted-foreground text-center">{screenshot.caption}</p>
                        </CardContent>
                      )}
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
