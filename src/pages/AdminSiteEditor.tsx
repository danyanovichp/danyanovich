import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Save, RotateCcw, Loader2, Plus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useSiteSettings, defaultSettings, type SocialLink, type ExpertiseBlock, type Tool, type Website, type Program } from "@/hooks/useSiteSettings";

const AdminSiteEditor = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isRu = i18n.language === 'ru';
  const { isAdmin, isLoading: authLoading } = useAuth();
  const { settings, isLoading, isSaving, updateMultipleSettings, resetToDefaults } = useSiteSettings();

  // Local state for editing
  const [localSettings, setLocalSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);

  // Update local state when settings load
  useState(() => {
    if (!isLoading) {
      setLocalSettings(settings);
    }
  });

  // Check if user is admin
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Доступ запрещён. Только для администраторов.</p>
      </div>
    );
  }

  const handleChange = <K extends keyof typeof localSettings>(
    section: K,
    updates: Partial<typeof localSettings[K]>
  ) => {
    setLocalSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], ...updates }
    }));
    setHasChanges(true);
  };

  const handleArrayChange = <K extends keyof typeof localSettings>(
    section: K,
    newArray: typeof localSettings[K]
  ) => {
    setLocalSettings(prev => ({
      ...prev,
      [section]: newArray
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    const success = await updateMultipleSettings(localSettings);
    if (success) {
      setHasChanges(false);
    }
  };

  const handleReset = async () => {
    const confirmed = window.confirm(
      isRu 
        ? "Вы уверены? Все настройки будут сброшены к значениям по умолчанию."
        : "Are you sure? All settings will be reset to defaults."
    );
    if (confirmed) {
      await resetToDefaults();
      setLocalSettings(defaultSettings);
      setHasChanges(false);
    }
  };

  type ArraySections = 'social_links' | 'expertise_blocks' | 'tools' | 'websites' | 'programs';

  // Helper to add item to array
  const addArrayItem = (
    section: ArraySections,
    newItem: SocialLink | ExpertiseBlock | Tool | Website | Program
  ) => {
    const current = localSettings[section] as unknown[];
    handleArrayChange(section, [...current, newItem] as typeof localSettings[typeof section]);
  };

  // Helper to remove item from array
  const removeArrayItem = (section: ArraySections, id: string) => {
    const current = localSettings[section] as { id: string }[];
    handleArrayChange(section, current.filter(item => item.id !== id) as typeof localSettings[typeof section]);
  };

  // Helper to update item in array
  const updateArrayItem = (
    section: ArraySections,
    id: string,
    updates: Record<string, unknown>
  ) => {
    const current = localSettings[section] as { id: string }[];
    handleArrayChange(
      section,
      current.map(item => item.id === id ? { ...item, ...updates } : item) as typeof localSettings[typeof section]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">{isRu ? "Редактор сайта" : "Site Editor"}</h1>
              <p className="text-sm text-muted-foreground">
                {isRu ? "Редактирование контента Home и About Me" : "Edit Home and About Me content"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasChanges && (
              <span className="text-sm text-amber-500">
                {isRu ? "Есть несохранённые изменения" : "Unsaved changes"}
              </span>
            )}
            <Button variant="outline" onClick={handleReset} disabled={isSaving}>
              <RotateCcw className="h-4 w-4 mr-2" />
              {isRu ? "Сбросить" : "Reset"}
            </Button>
            <Button onClick={handleSave} disabled={isSaving || !hasChanges}>
              {isSaving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isRu ? "Сохранить" : "Save"}
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="home" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="home">{isRu ? "Главная" : "Home"}</TabsTrigger>
            <TabsTrigger value="about">{isRu ? "Обо мне" : "About Me"}</TabsTrigger>
            <TabsTrigger value="social">{isRu ? "Соц. сети" : "Social"}</TabsTrigger>
          </TabsList>

          {/* HOME PAGE TAB */}
          <TabsContent value="home" className="space-y-6">
            {/* Hero Section */}
            <Card>
              <CardHeader>
                <CardTitle>{isRu ? "Главный экран (Hero)" : "Hero Section"}</CardTitle>
                <CardDescription>
                  {isRu ? "Заголовок и описание на главной странице" : "Main title and description on homepage"}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground">🇷🇺 Русский</h4>
                  <div className="space-y-2">
                    <Label>Заголовок</Label>
                    <Input
                      value={localSettings.hero.title_ru}
                      onChange={(e) => handleChange('hero', { title_ru: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Подзаголовок</Label>
                    <Input
                      value={localSettings.hero.subtitle_ru}
                      onChange={(e) => handleChange('hero', { subtitle_ru: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Описание</Label>
                    <Textarea
                      value={localSettings.hero.description_ru}
                      onChange={(e) => handleChange('hero', { description_ru: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground">🇬🇧 English</h4>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={localSettings.hero.title_en}
                      onChange={(e) => handleChange('hero', { title_en: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Subtitle</Label>
                    <Input
                      value={localSettings.hero.subtitle_en}
                      onChange={(e) => handleChange('hero', { subtitle_en: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={localSettings.hero.description_en}
                      onChange={(e) => handleChange('hero', { description_en: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Consulting Section */}
            <Card>
              <CardHeader>
                <CardTitle>{isRu ? "Консалтинг" : "Consulting"}</CardTitle>
                <CardDescription>
                  {isRu ? "Блок консультаций на главной" : "Consulting block on homepage"}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground">🇷🇺 Русский</h4>
                  <div className="space-y-2">
                    <Label>Название</Label>
                    <Input
                      value={localSettings.consulting.title_ru}
                      onChange={(e) => handleChange('consulting', { title_ru: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Описание</Label>
                    <Textarea
                      value={localSettings.consulting.description_ru}
                      onChange={(e) => handleChange('consulting', { description_ru: e.target.value })}
                      rows={2}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground">🇬🇧 English</h4>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={localSettings.consulting.title_en}
                      onChange={(e) => handleChange('consulting', { title_en: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={localSettings.consulting.description_en}
                      onChange={(e) => handleChange('consulting', { description_en: e.target.value })}
                      rows={2}
                    />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>{isRu ? "Цена" : "Price"}</Label>
                  <Input
                    value={localSettings.consulting.price}
                    onChange={(e) => handleChange('consulting', { price: e.target.value })}
                    className="max-w-xs"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ABOUT ME TAB */}
          <TabsContent value="about" className="space-y-6">
            {/* Bio Section */}
            <Card>
              <CardHeader>
                <CardTitle>{isRu ? "Биография" : "Bio"}</CardTitle>
                <CardDescription>
                  {isRu ? "Три абзаца биографии" : "Three biography paragraphs"}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground">🇷🇺 Русский</h4>
                  {[1, 2, 3].map(num => (
                    <div key={num} className="space-y-2">
                      <Label>Абзац {num}</Label>
                      <Textarea
                        value={localSettings.bio[`paragraph${num}_ru` as keyof typeof localSettings.bio]}
                        onChange={(e) => handleChange('bio', { [`paragraph${num}_ru`]: e.target.value })}
                        rows={3}
                      />
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-muted-foreground">🇬🇧 English</h4>
                  {[1, 2, 3].map(num => (
                    <div key={num} className="space-y-2">
                      <Label>Paragraph {num}</Label>
                      <Textarea
                        value={localSettings.bio[`paragraph${num}_en` as keyof typeof localSettings.bio]}
                        onChange={(e) => handleChange('bio', { [`paragraph${num}_en`]: e.target.value })}
                        rows={3}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats Section */}
            <Card>
              <CardHeader>
                <CardTitle>{isRu ? "Статистика" : "Statistics"}</CardTitle>
                <CardDescription>
                  {isRu ? "Числа для блока статистики" : "Numbers for statistics block"}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>{isRu ? "Проектов" : "Projects"}</Label>
                  <Input
                    type="number"
                    value={localSettings.stats.projects}
                    onChange={(e) => handleChange('stats', { projects: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{isRu ? "Шаблонов" : "Templates"}</Label>
                  <Input
                    type="number"
                    value={localSettings.stats.templates}
                    onChange={(e) => handleChange('stats', { templates: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{isRu ? "Сайтов" : "Websites"}</Label>
                  <Input
                    type="number"
                    value={localSettings.stats.websites}
                    onChange={(e) => handleChange('stats', { websites: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{isRu ? "Часов" : "Hours"}</Label>
                  <Input
                    type="number"
                    value={localSettings.stats.hours}
                    onChange={(e) => handleChange('stats', { hours: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Expertise Blocks */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{isRu ? "Блоки экспертизы" : "Expertise Blocks"}</CardTitle>
                  <CardDescription>
                    {isRu ? "Notion, AI, n8n, Вайб-кодинг" : "Notion, AI, n8n, Vibe Coding"}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem('expertise_blocks', {
                    id: `expertise-${Date.now()}`,
                    icon: "Star",
                    title_ru: "Новый блок",
                    title_en: "New Block",
                    description_ru: "",
                    description_en: "",
                    highlights_ru: [],
                    highlights_en: [],
                    link: "/",
                  } as ExpertiseBlock)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {isRu ? "Добавить" : "Add"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {localSettings.expertise_blocks.map((block, index) => (
                  <div key={block.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{block.title_ru || block.title_en}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeArrayItem('expertise_blocks', block.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Icon (Lucide name)</Label>
                        <Input
                          value={block.icon}
                          onChange={(e) => updateArrayItem('expertise_blocks', block.id, { icon: e.target.value })}
                          placeholder="FileText, Bot, Workflow..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Link</Label>
                        <Input
                          value={block.link}
                          onChange={(e) => updateArrayItem('expertise_blocks', block.id, { link: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Название (RU)</Label>
                        <Input
                          value={block.title_ru}
                          onChange={(e) => updateArrayItem('expertise_blocks', block.id, { title_ru: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Title (EN)</Label>
                        <Input
                          value={block.title_en}
                          onChange={(e) => updateArrayItem('expertise_blocks', block.id, { title_en: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Описание (RU)</Label>
                        <Textarea
                          value={block.description_ru}
                          onChange={(e) => updateArrayItem('expertise_blocks', block.id, { description_ru: e.target.value })}
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description (EN)</Label>
                        <Textarea
                          value={block.description_en}
                          onChange={(e) => updateArrayItem('expertise_blocks', block.id, { description_en: e.target.value })}
                          rows={2}
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Теги (RU, через запятую)</Label>
                        <Input
                          value={block.highlights_ru.join(', ')}
                          onChange={(e) => updateArrayItem('expertise_blocks', block.id, { 
                            highlights_ru: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                          })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tags (EN, comma-separated)</Label>
                        <Input
                          value={block.highlights_en.join(', ')}
                          onChange={(e) => updateArrayItem('expertise_blocks', block.id, { 
                            highlights_en: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                          })}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tools */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{isRu ? "Инструменты" : "Tools"}</CardTitle>
                  <CardDescription>
                    {isRu ? "Список используемых инструментов" : "List of tools used"}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem('tools', {
                    id: `tool-${Date.now()}`,
                    name: "New Tool",
                    description_ru: "",
                    description_en: "",
                    icon: "Wrench",
                  } as Tool)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {isRu ? "Добавить" : "Add"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {localSettings.tools.map((tool) => (
                  <div key={tool.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Input
                      value={tool.icon}
                      onChange={(e) => updateArrayItem('tools', tool.id, { icon: e.target.value })}
                      className="w-24"
                      placeholder="Icon"
                    />
                    <Input
                      value={tool.name}
                      onChange={(e) => updateArrayItem('tools', tool.id, { name: e.target.value })}
                      className="w-32"
                      placeholder="Name"
                    />
                    <Input
                      value={tool.description_ru}
                      onChange={(e) => updateArrayItem('tools', tool.id, { description_ru: e.target.value })}
                      placeholder="Описание (RU)"
                      className="flex-1"
                    />
                    <Input
                      value={tool.description_en}
                      onChange={(e) => updateArrayItem('tools', tool.id, { description_en: e.target.value })}
                      placeholder="Description (EN)"
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem('tools', tool.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Websites */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{isRu ? "Сайты" : "Websites"}</CardTitle>
                  <CardDescription>
                    {isRu ? "Портфолио сайтов" : "Website portfolio"}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem('websites', {
                    id: `website-${Date.now()}`,
                    title: "New Website",
                    url: "https://",
                    description_ru: "",
                    description_en: "",
                  } as Website)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {isRu ? "Добавить" : "Add"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {localSettings.websites.map((website) => (
                  <div key={website.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Input
                      value={website.title}
                      onChange={(e) => updateArrayItem('websites', website.id, { title: e.target.value })}
                      className="w-40"
                      placeholder="Title"
                    />
                    <Input
                      value={website.url}
                      onChange={(e) => updateArrayItem('websites', website.id, { url: e.target.value })}
                      className="flex-1"
                      placeholder="URL"
                    />
                    <Input
                      value={website.description_ru}
                      onChange={(e) => updateArrayItem('websites', website.id, { description_ru: e.target.value })}
                      placeholder="Описание (RU)"
                      className="w-40"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeArrayItem('websites', website.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Programs */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{isRu ? "Программы и игры" : "Programs & Games"}</CardTitle>
                  <CardDescription>
                    {isRu ? "Созданные приложения" : "Created applications"}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem('programs', {
                    id: `program-${Date.now()}`,
                    title_ru: "Новая программа",
                    title_en: "New Program",
                    description_ru: "",
                    description_en: "",
                    url: "",
                    type: "program",
                  } as Program)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {isRu ? "Добавить" : "Add"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {localSettings.programs.map((program) => (
                  <div key={program.id} className="p-3 border rounded-lg space-y-3">
                    <div className="flex items-center gap-3">
                      <select
                        value={program.type}
                        onChange={(e) => updateArrayItem('programs', program.id, { type: e.target.value })}
                        className="px-3 py-2 border rounded-md bg-background"
                      >
                        <option value="program">{isRu ? "Программа" : "Program"}</option>
                        <option value="game">{isRu ? "Игра" : "Game"}</option>
                      </select>
                      <Input
                        value={program.url || ''}
                        onChange={(e) => updateArrayItem('programs', program.id, { url: e.target.value })}
                        placeholder="URL (optional)"
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeArrayItem('programs', program.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <Input
                        value={program.title_ru}
                        onChange={(e) => updateArrayItem('programs', program.id, { title_ru: e.target.value })}
                        placeholder="Название (RU)"
                      />
                      <Input
                        value={program.title_en}
                        onChange={(e) => updateArrayItem('programs', program.id, { title_en: e.target.value })}
                        placeholder="Title (EN)"
                      />
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <Input
                        value={program.description_ru}
                        onChange={(e) => updateArrayItem('programs', program.id, { description_ru: e.target.value })}
                        placeholder="Описание (RU)"
                      />
                      <Input
                        value={program.description_en}
                        onChange={(e) => updateArrayItem('programs', program.id, { description_en: e.target.value })}
                        placeholder="Description (EN)"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* SOCIAL TAB */}
          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{isRu ? "Социальные сети" : "Social Networks"}</CardTitle>
                  <CardDescription>
                    {isRu ? "YouTube, Telegram, LinkedIn и другие" : "YouTube, Telegram, LinkedIn and others"}
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem('social_links', {
                    id: `social-${Date.now()}`,
                    icon: "Link",
                    title_ru: "Новая ссылка",
                    title_en: "New Link",
                    description_ru: "",
                    description_en: "",
                    handle: "@username",
                    link: "https://",
                  } as SocialLink)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  {isRu ? "Добавить" : "Add"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {localSettings.social_links.map((social) => (
                  <div key={social.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{social.title_ru || social.title_en}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeArrayItem('social_links', social.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label>Icon (Lucide)</Label>
                        <Input
                          value={social.icon}
                          onChange={(e) => updateArrayItem('social_links', social.id, { icon: e.target.value })}
                          placeholder="Youtube, MessageCircle..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Handle</Label>
                        <Input
                          value={social.handle}
                          onChange={(e) => updateArrayItem('social_links', social.id, { handle: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Link</Label>
                        <Input
                          value={social.link}
                          onChange={(e) => updateArrayItem('social_links', social.id, { link: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Название (RU)</Label>
                        <Input
                          value={social.title_ru}
                          onChange={(e) => updateArrayItem('social_links', social.id, { title_ru: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Title (EN)</Label>
                        <Input
                          value={social.title_en}
                          onChange={(e) => updateArrayItem('social_links', social.id, { title_en: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Описание (RU)</Label>
                        <Input
                          value={social.description_ru}
                          onChange={(e) => updateArrayItem('social_links', social.id, { description_ru: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description (EN)</Label>
                        <Input
                          value={social.description_en}
                          onChange={(e) => updateArrayItem('social_links', social.id, { description_en: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminSiteEditor;
