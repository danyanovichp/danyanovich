import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Check, ShoppingCart, Sparkles, ExternalLink, ImageIcon, Play, Star, Quote, Home, ChevronRight, HelpCircle, AlertCircle, Zap, Users, ChevronLeft, ChevronRightIcon, Plus, Trash2, Upload, GripVertical, RefreshCw, Film, Pause } from "lucide-react";
import { premiumTemplates } from "@/data/premiumTemplates";
import { secondBrainFeatureSections, secondBrainReviews } from "@/data/secondBrainData";
import { templateLandingContent } from "@/data/templateLandingContent";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useLandingEditor, LandingFeature, LandingAudience, LandingScreenshot } from "@/hooks/useLandingEditor";
import { useProductEditor } from "@/hooks/useProductEditor";
import { InlineEditPanel } from "@/components/InlineEditPanel";
import { ProductEditPanel } from "@/components/ProductEditPanel";
import { useToast } from "@/hooks/use-toast";

const TemplateLanding = () => {
  const { templateId } = useParams();
  const { i18n } = useTranslation();
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [selectedScreenshot, setSelectedScreenshot] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
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

  const {
    product: productData,
    isSaving: isProductSaving,
    exists: productExists,
    saveProduct,
    updateField: updateProductField,
  } = useProductEditor(templateId);

  const template = premiumTemplates.find(t => t.id === templateId);
  const isSecondBrain = templateId === "second-brain-os";
  const staticLandingContent = templateId ? templateLandingContent[templateId] : null;
  
  // Determine which content to display - DB data takes priority
  const hasDbContent = landing.headline && landing.headline.trim() !== "";
  const displayHeadline = hasDbContent ? landing.headline : (staticLandingContent?.headline || "");
  const displaySubheadline = hasDbContent ? landing.subheadline : (staticLandingContent?.subheadline || "");
  const displayPainPoints = landing.pain_points.filter(p => p.trim()).length > 0 
    ? landing.pain_points 
    : (staticLandingContent?.painPoints || []);
  const displaySolution = hasDbContent 
    ? { intro: landing.solution_intro, description: landing.solution_description }
    : (staticLandingContent?.solution ? { intro: "", description: staticLandingContent.solution } : null);
  const displayFeatures = landing.features.filter(f => f.title.trim()).length > 0
    ? landing.features
    : (staticLandingContent?.features || []);
  const displayViews = landing.views.filter(v => v.trim()).length > 0
    ? landing.views
    : (staticLandingContent?.views || []);
  const displayAudience = landing.target_audience.filter(a => a.title.trim()).length > 0
    ? landing.target_audience
    : (staticLandingContent?.targetAudience || []);
  const displayScreenshots = landing.screenshots;
  
  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">
            {i18n.language === 'ru' ? 'Шаблон не найден' : 'Template not found'}
          </h1>
          <Link to="/templates">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {i18n.language === 'ru' ? 'Вернуться к шаблонам' : 'Back to templates'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    const success = await saveLanding();
    if (success) {
      setHasUnsavedChanges(false);
    }
  };

  const handleFieldChange = <K extends keyof typeof landing>(field: K, value: (typeof landing)[K]) => {
    updateField(field, value);
    setHasUnsavedChanges(true);
  };

  // File upload validation constants
  const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !templateId) return;

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      toast({
        title: "Неподдерживаемый формат",
        description: "Разрешены только JPEG, PNG, GIF и WebP",
        variant: "destructive",
      });
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "Файл слишком большой",
        description: "Максимальный размер файла 5MB",
        variant: "destructive",
      });
      return;
    }

    try {
      // Use safe file extension based on MIME type
      const mimeToExt: Record<string, string> = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'image/webp': 'webp'
      };
      const fileExt = mimeToExt[file.type] || 'jpg';
      const fileName = `${templateId}/${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('landing-screenshots')
        .upload(fileName, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('landing-screenshots')
        .getPublicUrl(data.path);

      addScreenshot(urlData.publicUrl);
      setHasUnsavedChanges(true);
      toast({
        title: "Скриншот загружен",
        description: "Не забудьте сохранить изменения",
      });
    } catch (error: any) {
      toast({
        title: "Ошибка загрузки",
        description: error.message,
        variant: "destructive",
      });
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReplaceScreenshot = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !templateId || replacingScreenshotIndex === null) return;

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      toast({
        title: "Неподдерживаемый формат",
        description: "Разрешены только JPEG, PNG, GIF и WebP",
        variant: "destructive",
      });
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "Файл слишком большой",
        description: "Максимальный размер файла 5MB",
        variant: "destructive",
      });
      return;
    }

    try {
      // Delete old file from storage
      const oldUrl = landing.screenshots[replacingScreenshotIndex]?.url;
      if (oldUrl) {
        const oldFileName = oldUrl.split('/').pop();
        if (oldFileName) {
          await supabase.storage.from('landing-screenshots').remove([`${templateId}/${oldFileName}`]);
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
      const fileName = `${templateId}/${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('landing-screenshots')
        .upload(fileName, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('landing-screenshots')
        .getPublicUrl(data.path);

      // Update the screenshot URL in the landing data
      const newScreenshots = [...landing.screenshots];
      newScreenshots[replacingScreenshotIndex] = {
        ...newScreenshots[replacingScreenshotIndex],
        url: urlData.publicUrl
      };
      updateField('screenshots', newScreenshots);
      setHasUnsavedChanges(true);
      toast({
        title: "Скриншот заменён",
        description: "Не забудьте сохранить изменения",
      });
    } catch (error: any) {
      toast({
        title: "Ошибка загрузки",
        description: error.message,
        variant: "destructive",
      });
    }

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
      reorderScreenshots(draggedIndex, index);
      setDraggedIndex(index);
      setHasUnsavedChanges(true);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleMainImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !templateId) return;

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      toast({
        title: "Неподдерживаемый формат",
        description: "Разрешены только JPEG, PNG, GIF и WebP",
        variant: "destructive",
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "Файл слишком большой",
        description: "Максимальный размер файла 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploadingMainImage(true);
    try {
      // Delete old main image if exists
      if (landing.main_image) {
        const oldFileName = landing.main_image.split('/').pop();
        if (oldFileName) {
          await supabase.storage.from('landing-screenshots').remove([`${templateId}/${oldFileName}`]);
        }
      }

      const mimeToExt: Record<string, string> = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'image/webp': 'webp'
      };
      const fileExt = mimeToExt[file.type] || 'jpg';
      const fileName = `${templateId}/main-${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('landing-screenshots')
        .upload(fileName, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('landing-screenshots')
        .getPublicUrl(data.path);

      updateField('main_image', urlData.publicUrl);
      setHasUnsavedChanges(true);
      toast({
        title: "Изображение загружено",
        description: "Не забудьте сохранить изменения",
      });
    } catch (error: any) {
      toast({
        title: "Ошибка загрузки",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploadingMainImage(false);
    }

    if (mainImageInputRef.current) {
      mainImageInputRef.current.value = '';
    }
  };

  // Determine main image to display
  const displayMainImage = landing.main_image || template.image;

  // Use DB data if available, otherwise fall back to static data
  const displayPrice = productExists ? productData.price : template.price;
  const displayLink = productExists ? productData.link : template.link;
  const displayBuildinLink = productExists ? productData.buildin_link : template.buildinLink;
  const displayStatus = productExists ? productData.status : template.status;
  const isAvailable = displayStatus === 'available';

  const title = i18n.language === 'ru' ? template.titleRu : template.titleEn;
  const description = i18n.language === 'ru' ? template.descriptionRu : template.descriptionEn;
  const fullDescription = i18n.language === 'ru' ? template.fullDescriptionRu : template.fullDescriptionEn;
  const features = i18n.language === 'ru' ? template.featuresRu : template.featuresEn;

  const featureSections = isSecondBrain ? secondBrainFeatureSections : null;
  const reviews = isSecondBrain ? secondBrainReviews : null;

  const faqItems = i18n.language === 'ru' ? [
    {
      question: `Как получить доступ к шаблону ${title}?`,
      answer: isAvailable 
        ? 'После оплаты вы получите ссылку на дублирование шаблона в ваш Notion аккаунт. Процесс занимает несколько секунд.'
        : 'Шаблон находится в разработке. Подпишитесь на обновления, чтобы узнать о релизе первыми.',
    },
    {
      question: 'Нужен ли платный аккаунт Notion?',
      answer: 'Нет, шаблон работает на бесплатном аккаунте Notion. Все основные функции доступны без подписки.',
    },
    {
      question: 'Получу ли я обновления шаблона?',
      answer: 'Да, все значительные обновления бесплатны. Вы получите уведомление на email о новых версиях.',
    },
    {
      question: 'Могу ли я изменять шаблон под себя?',
      answer: 'Абсолютно! Шаблон полностью редактируемый. Вы можете настроить его под свои нужды.',
    },
    {
      question: 'Есть ли поддержка после покупки?',
      answer: 'Да, я предоставляю поддержку через Telegram. Отвечаю на вопросы и помогаю с настройкой.',
    },
  ] : [
    {
      question: `How do I get access to ${title}?`,
      answer: isAvailable 
        ? 'After payment, you will receive a link to duplicate the template to your Notion account. The process takes a few seconds.'
        : 'The template is in development. Subscribe to updates to be the first to know about the release.',
    },
    {
      question: 'Do I need a paid Notion account?',
      answer: 'No, the template works on a free Notion account. All core features are available without a subscription.',
    },
    {
      question: 'Will I get template updates?',
      answer: 'Yes, all major updates are free. You will receive an email notification about new versions.',
    },
    {
      question: 'Can I customize the template?',
      answer: 'Absolutely! The template is fully editable. You can customize it to fit your needs.',
    },
    {
      question: 'Is there support after purchase?',
      answer: 'Yes, I provide support via Telegram. I answer questions and help with setup.',
    },
  ];

  const isRu = i18n.language === 'ru';
  
  const seoTitleRu = `${template.titleRu || title} | Notion шаблон | Дэн Янович`;
  const seoTitleEn = `${template.titleEn || title} | Notion Template | Dan Yanovich`;
  
  const seoDescriptionRu = `${template.fullDescriptionRu || fullDescription} Купить Notion шаблон ${template.titleRu || title} для ${template.category === 'business' ? 'бизнеса' : template.category === 'personal' ? 'личного использования' : template.category === 'productivity' ? 'продуктивности' : 'финансов'}.`;
  const seoDescriptionEn = `${template.fullDescriptionEn || fullDescription} Buy ${template.titleEn || title} Notion template for ${template.category}.`;
  
  const seoKeywords = isRu
    ? `${template.titleRu || title}, Notion шаблон, ${template.category === 'business' ? 'бизнес' : template.category === 'personal' ? 'личное' : template.category === 'productivity' ? 'продуктивность' : 'финансы'}, шаблон Notion, ${features.join(', ')}, купить шаблон`
    : `${template.titleEn || title}, Notion template, ${template.category}, productivity, ${features.join(', ')}, buy template`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    description: fullDescription,
    image: template.image || 'https://danyanovich.com/placeholder.svg',
    brand: {
      '@type': 'Brand',
      name: isRu ? 'Дэн Янович' : 'Dan Yanovich',
    },
    offers: {
      '@type': 'Offer',
      price: template.priceValue,
      priceCurrency: 'RUB',
      availability: isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
      url: `https://danyanovich.com/templates/${template.id}`,
    },
    aggregateRating: isSecondBrain && reviews ? {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: reviews.length.toString(),
    } : undefined,
    inLanguage: isRu ? 'ru' : 'en',
  };

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen">
      <SEO
        titleRu={seoTitleRu}
        titleEn={seoTitleEn}
        descriptionRu={seoDescriptionRu}
        descriptionEn={seoDescriptionEn}
        keywords={seoKeywords}
        url={`https://danyanovich.com/templates/${template.id}`}
        type="product"
        structuredData={[structuredData, faqStructuredData]}
      />

      {/* Admin Edit Panel */}
      {isAdmin && templateId && (
        <InlineEditPanel
          isEditing={isEditing}
          isSaving={isSaving || isProductSaving}
          templateId={templateId}
          onToggleEdit={() => setIsEditing(!isEditing)}
          onSave={handleSave}
          hasUnsavedChanges={hasUnsavedChanges}
        />
      )}
      
      {/* Product Edit Panel - shown in editing mode */}
      {isAdmin && isEditing && templateId && (
        <section className="container py-6">
          <div className="max-w-4xl mx-auto">
            <ProductEditPanel
              product={productData}
              isSaving={isProductSaving}
              onUpdate={updateProductField}
              onSave={saveProduct}
            />
          </div>
        </section>
      )}
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-16 md:py-24 border-b border-border/20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            {/* Breadcrumbs */}
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="flex items-center gap-1">
                      <Home className="h-4 w-4" />
                      {i18n.language === 'ru' ? 'Главная' : 'Home'}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/templates">
                      {i18n.language === 'ru' ? 'Шаблоны' : 'Templates'}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>{title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge className="px-4 py-2 bg-foreground/90 text-background text-sm font-medium rounded-full">
                    📝 Notion
                  </Badge>
                  {isAvailable ? (
                    <Badge className="px-4 py-2 bg-green-500/90 text-white text-sm font-medium rounded-full">
                      ✓ {i18n.language === 'ru' ? 'Доступен' : 'Available'}
                    </Badge>
                  ) : (
                    <Badge className="px-4 py-2 bg-amber-500/90 text-white text-sm font-medium rounded-full">
                      🚧 {i18n.language === 'ru' ? 'В разработке' : 'In Development'}
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-4">
                  {isEditing ? (
                    <>
                      <Input
                        value={landing.headline}
                        onChange={(e) => handleFieldChange('headline', e.target.value)}
                        placeholder="Заголовок лендинга"
                        className="text-3xl font-bold h-auto py-3"
                      />
                      <Textarea
                        value={landing.subheadline}
                        onChange={(e) => handleFieldChange('subheadline', e.target.value)}
                        placeholder="Подзаголовок"
                        className="text-lg resize-none"
                        rows={2}
                      />
                    </>
                  ) : (
                    <>
                      <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                        {displayHeadline || title}
                      </h1>
                      <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                        {displaySubheadline || description}
                      </p>
                    </>
                  )}
                </div>

                {/* Quick Features List */}
                <div className="flex flex-wrap gap-2">
                  {features.slice(0, 4).map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="px-3 py-1.5 text-sm">
                      {feature}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center gap-6 flex-wrap pt-4">
                  <div className="text-4xl md:text-5xl font-bold text-primary">{displayPrice}</div>
                  {isAvailable ? (
                    <div className="flex flex-wrap gap-3">
                      {displayLink && displayLink !== '#' && (
                        <a href={displayLink} target="_blank" rel="noopener noreferrer">
                          <Button size="lg" className="gap-2 text-lg px-6 py-6">
                            <ShoppingCart className="h-5 w-5" />
                            Notion
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                      {displayBuildinLink && (
                        <a href={displayBuildinLink} target="_blank" rel="noopener noreferrer">
                          <Button size="lg" variant="secondary" className="gap-2 text-lg px-6 py-6">
                            <ShoppingCart className="h-5 w-5" />
                            Buildin.AI
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                  ) : (
                    <Button size="lg" disabled className="gap-2 text-lg px-8 py-6">
                      <Sparkles className="h-5 w-5" />
                      {i18n.language === 'ru' ? 'Скоро в продаже' : 'Coming Soon'}
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="w-full lg:w-96 shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-3xl" />
                  <div className="relative p-8 bg-gradient-to-br from-muted/80 to-muted/40 backdrop-blur-sm rounded-3xl border border-border/50">
                    <template.icon className="h-32 w-32 text-primary mx-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Screenshot Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <Card className="overflow-hidden border-2 border-border/40 shadow-2xl relative group">
              <CardContent className="p-0">
                {displayMainImage ? (
                  <img 
                    src={displayMainImage} 
                    alt={title}
                    className="w-full aspect-video object-cover"
                  />
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-muted/80 to-muted/40 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <ImageIcon className="h-20 w-20 text-muted-foreground/30 mx-auto" />
                      <p className="text-muted-foreground text-lg">
                        {i18n.language === 'ru' ? 'Главный скриншот шаблона' : 'Main template screenshot'}
                      </p>
                    </div>
                  </div>
                )}
                {isEditing && (
                  <>
                    <input
                      type="file"
                      ref={mainImageInputRef}
                      onChange={handleMainImageUpload}
                      accept="image/jpeg,image/png,image/gif,image/webp"
                      className="hidden"
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity gap-2"
                      onClick={() => mainImageInputRef.current?.click()}
                      disabled={isUploadingMainImage}
                    >
                      {isUploadingMainImage ? (
                        <span className="animate-spin">⏳</span>
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                      {i18n.language === 'ru' ? 'Заменить' : 'Replace'}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      {(displayPainPoints.length > 0 || isEditing) && (
        <AnimatedSection animation="fade-up">
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container">
              <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive/10 rounded-full">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    <span className="text-sm font-medium text-destructive">
                      {i18n.language === 'ru' ? 'Знакомо?' : 'Sound familiar?'}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    {i18n.language === 'ru' ? 'Узнаёшь себя?' : 'Do you recognize yourself?'}
                  </h2>
                </div>
                
                {isEditing ? (
                  <div className="space-y-3">
                    {landing.pain_points.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Textarea
                          value={point}
                          onChange={(e) => {
                            updatePainPoint(index, e.target.value);
                            setHasUnsavedChanges(true);
                          }}
                          placeholder="Опишите боль клиента..."
                          className="flex-1"
                          rows={2}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            removePainPoint(index);
                            setHasUnsavedChanges(true);
                          }}
                          className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        addPainPoint();
                        setHasUnsavedChanges(true);
                      }}
                      className="gap-2 w-full"
                    >
                      <Plus className="h-4 w-4" />
                      Добавить боль
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {displayPainPoints.filter(Boolean).map((point, index) => (
                      <Card key={index} className="border-destructive/20 bg-destructive/5">
                        <CardContent className="p-6 flex items-start gap-4">
                          <div className="shrink-0 w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center mt-0.5">
                            <span className="text-destructive font-bold">×</span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{point}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* Solution Section */}
      {(displaySolution || isEditing) && (
        <AnimatedSection animation="fade-up" delay={100}>
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                    <Zap className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      {i18n.language === 'ru' ? 'Решение' : 'Solution'}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    {i18n.language === 'ru' ? 'Представь другую реальность' : 'Imagine a different reality'}
                  </h2>
                </div>
                
                {isEditing ? (
                  <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                    <CardContent className="p-8 md:p-12 space-y-4">
                      <Input
                        value={landing.solution_intro}
                        onChange={(e) => handleFieldChange('solution_intro', e.target.value)}
                        placeholder="Краткое вступление (опционально)"
                        className="font-medium"
                      />
                      <Textarea
                        value={landing.solution_description}
                        onChange={(e) => handleFieldChange('solution_description', e.target.value)}
                        placeholder="Описание решения..."
                        className="min-h-[120px]"
                        rows={4}
                      />
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                    <CardContent className="p-8 md:p-12">
                      <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        {displaySolution?.description || displaySolution?.intro || ""}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* Features Section */}
      {(displayFeatures.length > 0 || isEditing) && (
        <AnimatedSection animation="fade-up" delay={200}>
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container">
              <div className="max-w-5xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      {i18n.language === 'ru' ? 'Возможности' : 'Features'}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    {i18n.language === 'ru' ? 'Что ты получаешь' : 'What you get'}
                  </h2>
                </div>
                
                {isEditing ? (
                  <div className="space-y-4">
                    {landing.features.map((feature, index) => (
                      <div key={index} className="p-4 border border-border rounded-xl space-y-3 bg-background">
                        <div className="flex items-center gap-2">
                          <Input
                            value={feature.icon}
                            onChange={(e) => {
                              updateFeature(index, "icon", e.target.value);
                              setHasUnsavedChanges(true);
                            }}
                            placeholder="Emoji"
                            className="w-20"
                          />
                          <Input
                            value={feature.title}
                            onChange={(e) => {
                              updateFeature(index, "title", e.target.value);
                              setHasUnsavedChanges(true);
                            }}
                            placeholder="Заголовок"
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              removeFeature(index);
                              setHasUnsavedChanges(true);
                            }}
                            className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Textarea
                          value={feature.description}
                          onChange={(e) => {
                            updateFeature(index, "description", e.target.value);
                            setHasUnsavedChanges(true);
                          }}
                          placeholder="Описание"
                          rows={2}
                        />
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        addFeature();
                        setHasUnsavedChanges(true);
                      }}
                      className="gap-2 w-full"
                    >
                      <Plus className="h-4 w-4" />
                      Добавить возможность
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayFeatures.filter(f => f.title).map((feature, index) => (
                      <Card key={index} className="h-full border-border/50 hover:border-primary/30 transition-colors">
                        <CardContent className="p-6 space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{feature.icon}</span>
                            <h3 className="font-semibold text-lg">{feature.title}</h3>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* Views Section */}
      {(displayViews.length > 0 || isEditing) && (
        <AnimatedSection animation="fade-up" delay={250}>
          <section className="py-16 md:py-20">
            <div className="container">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {i18n.language === 'ru' ? 'Готовые представления' : 'Ready-made views'}
                  </h2>
                  <p className="text-muted-foreground">
                    {i18n.language === 'ru' 
                      ? 'На главной странице уже настроены ключевые виды:' 
                      : 'Key views are already set up on the main page:'}
                  </p>
                </div>
                
                {isEditing ? (
                  <div className="space-y-3">
                    {landing.views.map((view, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={view}
                          onChange={(e) => {
                            updateView(index, e.target.value);
                            setHasUnsavedChanges(true);
                          }}
                          placeholder="Название представления"
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            removeView(index);
                            setHasUnsavedChanges(true);
                          }}
                          className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        addView();
                        setHasUnsavedChanges(true);
                      }}
                      className="gap-2 w-full"
                    >
                      <Plus className="h-4 w-4" />
                      Добавить представление
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {displayViews.filter(Boolean).map((view, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                        <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                          <Check className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="text-muted-foreground">{view}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* Target Audience Section */}
      {(displayAudience.length > 0 || isEditing) && (
        <AnimatedSection animation="fade-up" delay={300}>
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container">
              <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full">
                    <Users className="h-5 w-5 text-foreground" />
                    <span className="text-sm font-medium">
                      {i18n.language === 'ru' ? 'Аудитория' : 'Audience'}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    {i18n.language === 'ru' ? 'Для кого этот шаблон' : 'Who is this template for'}
                  </h2>
                </div>
                
                {isEditing ? (
                  <div className="space-y-4">
                    {landing.target_audience.map((item, index) => (
                      <div key={index} className="p-4 border border-border rounded-xl space-y-3 bg-background">
                        <div className="flex items-center gap-2">
                          <Input
                            value={item.icon || ""}
                            onChange={(e) => {
                              updateAudience(index, "icon", e.target.value);
                              setHasUnsavedChanges(true);
                            }}
                            placeholder="Emoji"
                            className="w-20"
                          />
                          <Input
                            value={item.title}
                            onChange={(e) => {
                              updateAudience(index, "title", e.target.value);
                              setHasUnsavedChanges(true);
                            }}
                            placeholder="Название"
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              removeAudience(index);
                              setHasUnsavedChanges(true);
                            }}
                            className="shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Textarea
                          value={item.description}
                          onChange={(e) => {
                            updateAudience(index, "description", e.target.value);
                            setHasUnsavedChanges(true);
                          }}
                          placeholder="Описание"
                          rows={2}
                        />
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        addAudience();
                        setHasUnsavedChanges(true);
                      }}
                      className="gap-2 w-full"
                    >
                      <Plus className="h-4 w-4" />
                      Добавить аудиторию
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-3 gap-6">
                    {displayAudience.filter(a => a.title).map((audience, index) => (
                      <Card key={index} className="h-full border-border/50">
                        <CardContent className="p-6 space-y-3">
                          {audience.icon && (
                            <span className="text-3xl">{audience.icon}</span>
                          )}
                          <h3 className="font-semibold text-lg">{audience.title}</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {audience.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* Fallback: Detailed Feature Sections for Second Brain */}
      {!hasDbContent && !staticLandingContent && featureSections && (
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="max-w-5xl mx-auto space-y-20">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  {i18n.language === 'ru' ? 'Возможности шаблона' : 'Template Features'}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {i18n.language === 'ru' 
                    ? 'Детальный обзор каждого раздела системы' 
                    : 'Detailed overview of each system section'}
                </p>
              </div>

              {featureSections.map((section, sectionIdx) => (
                <div key={section.id} className={`flex flex-col ${sectionIdx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{section.emoji}</span>
                      <h3 className="text-2xl md:text-3xl font-bold">
                        {i18n.language === 'ru' ? section.titleRu : section.titleEn}
                      </h3>
                    </div>
                    <p className="text-lg text-muted-foreground">
                      {i18n.language === 'ru' ? section.descriptionRu : section.descriptionEn}
                    </p>
                    
                    <div className="space-y-4">
                      {section.features.map((feature, idx) => (
                        <div key={idx} className="flex gap-4 items-start">
                          <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                            <Check className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <div>
                            <span className="font-semibold">
                              {i18n.language === 'ru' ? feature.nameRu : feature.nameEn}
                            </span>
                            <span className="text-muted-foreground"> — </span>
                            <span className="text-muted-foreground">
                              {i18n.language === 'ru' ? feature.descriptionRu : feature.descriptionEn}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="w-full lg:w-[480px] shrink-0">
                    <Card className="overflow-hidden border-2 border-border/40">
                      <CardContent className="p-0">
                        <div className="aspect-[4/3] bg-gradient-to-br from-muted/80 to-muted/40 flex items-center justify-center">
                          <div className="text-center space-y-3">
                            <ImageIcon className="h-12 w-12 text-muted-foreground/30 mx-auto" />
                            <p className="text-sm text-muted-foreground">
                              {i18n.language === 'ru' ? `Скриншот: ${section.titleRu}` : `Screenshot: ${section.titleEn}`}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fallback: Basic Features Section */}
      {!hasDbContent && !staticLandingContent && !featureSections && (
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold">
                  {i18n.language === 'ru' ? 'Возможности' : 'Features'}
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <Card key={index} className="h-full border-border/50">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium text-lg">{feature}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Video Review Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                {i18n.language === 'ru' ? 'Видеообзор' : 'Video Review'}
              </h2>
              <p className="text-lg text-muted-foreground">
                {i18n.language === 'ru' ? 'Посмотрите, как работает шаблон' : 'See how the template works'}
              </p>
            </div>
            
            <Card className="overflow-hidden border-2 border-border/40">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-muted/80 to-muted/40 flex items-center justify-center relative group cursor-pointer hover:bg-muted/60 transition-colors">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 text-primary-foreground ml-1" />
                    </div>
                  </div>
                  <p className="absolute bottom-6 text-muted-foreground">
                    {i18n.language === 'ru' ? 'Видео скоро будет добавлено' : 'Video coming soon'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      {reviews && reviews.length > 0 && (
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  {i18n.language === 'ru' ? 'Отзывы' : 'Reviews'}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {i18n.language === 'ru' ? 'Что говорят пользователи шаблона' : 'What template users say'}
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {reviews.map((review) => (
                  <Card key={review.id} className="h-full border-border/50">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <Quote className="h-8 w-8 text-muted-foreground/20" />
                      <p className="text-muted-foreground leading-relaxed">
                        {i18n.language === 'ru' ? review.textRu : review.textEn}
                      </p>
                      <div className="pt-4 border-t border-border/50">
                        <p className="font-semibold">{review.author}</p>
                        <p className="text-sm text-muted-foreground">{review.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Media Gallery (Screenshots + Videos) */}
      {(displayScreenshots.length > 0 || isEditing) && (
        <AnimatedSection animation="fade-up" delay={400}>
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="max-w-5xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    {i18n.language === 'ru' ? 'Галерея' : 'Gallery'}
                  </h2>
                </div>
                
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      {displayScreenshots.map((screenshot, index) => (
                        <div
                          key={index}
                          draggable
                          onDragStart={() => handleDragStart(index)}
                          onDragOver={(e) => handleDragOver(e, index)}
                          onDragEnd={handleDragEnd}
                          className={`relative border-2 rounded-xl overflow-hidden transition-all ${
                            draggedIndex === index ? 'opacity-50 border-primary' : 'border-border'
                          }`}
                        >
                          <div className="absolute top-2 left-2 cursor-move p-1 bg-background/80 rounded">
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="absolute top-2 right-2 flex gap-1">
                            {screenshot.type !== 'video' && (
                              <Button
                                variant="secondary"
                                size="icon"
                                className="h-8 w-8 bg-background/80 hover:bg-background"
                                onClick={() => {
                                  setReplacingScreenshotIndex(index);
                                  replaceFileInputRef.current?.click();
                                }}
                                title="Заменить скриншот"
                              >
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="destructive"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => {
                                removeScreenshot(index);
                                setHasUnsavedChanges(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          {screenshot.type === 'video' ? (
                            <div className="relative aspect-video bg-muted">
                              <video 
                                src={screenshot.url}
                                className="w-full h-full object-cover"
                                muted
                              />
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                                <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center">
                                  <Play className="h-5 w-5 text-primary-foreground ml-0.5" />
                                </div>
                              </div>
                              <Badge className="absolute bottom-2 left-2 bg-primary/80 gap-1">
                                <Film className="h-3 w-3" />
                                Видео
                              </Badge>
                            </div>
                          ) : (
                            <img 
                              src={screenshot.url} 
                              alt={`Screenshot ${index + 1}`}
                              className="w-full aspect-video object-cover"
                            />
                          )}
                          <div className="p-3 bg-muted/30">
                            <Input
                              value={screenshot.caption || ""}
                              onChange={(e) => {
                                updateScreenshotCaption(index, e.target.value);
                                setHasUnsavedChanges(true);
                              }}
                              placeholder={screenshot.type === 'video' ? 'Подпись к видео...' : 'Подпись к скриншоту...'}
                              className="bg-background"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <input
                      type="file"
                      ref={replaceFileInputRef}
                      onChange={handleReplaceScreenshot}
                      accept="image/*"
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="gap-2 w-full"
                    >
                      <Upload className="h-4 w-4" />
                      Загрузить скриншот
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {displayScreenshots.map((screenshot, index) => (
                      <Card 
                        key={index} 
                        className="overflow-hidden border-2 border-border/40 cursor-pointer hover:border-primary/50 transition-colors"
                        onClick={() => setSelectedScreenshot(index)}
                      >
                        <CardContent className="p-0">
                          {screenshot.type === 'video' ? (
                            <div className="relative aspect-video bg-muted">
                              <video 
                                src={screenshot.url} 
                                className="w-full h-full object-cover"
                                muted
                                playsInline
                              />
                              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
                                  <Play className="h-6 w-6 text-primary-foreground ml-1" />
                                </div>
                              </div>
                              <Badge className="absolute top-3 left-3 bg-primary/80 gap-1">
                                <Film className="h-3 w-3" />
                                Видео
                              </Badge>
                            </div>
                          ) : (
                            <img 
                              src={screenshot.url} 
                              alt={screenshot.caption || `${title} - ${i18n.language === 'ru' ? 'Скриншот' : 'Screenshot'} ${index + 1}`}
                              className="w-full aspect-video object-cover"
                            />
                          )}
                          {screenshot.caption && (
                            <div className="p-4 bg-muted/30 border-t">
                              <p className="text-sm text-muted-foreground text-center">{screenshot.caption}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* Screenshot Modal */}
      {selectedScreenshot !== null && displayScreenshots.length > 0 && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedScreenshot(null)}
        >
          <button 
            className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors"
            onClick={() => setSelectedScreenshot(null)}
          >
            <span className="text-2xl">✕</span>
          </button>
          
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors disabled:opacity-30"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedScreenshot(prev => prev !== null && prev > 0 ? prev - 1 : prev);
            }}
            disabled={selectedScreenshot === 0}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          {displayScreenshots[selectedScreenshot].type === 'video' ? (
            <video 
              src={displayScreenshots[selectedScreenshot].url}
              controls
              autoPlay
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img 
              src={displayScreenshots[selectedScreenshot].url} 
              alt={displayScreenshots[selectedScreenshot].caption || `${title} - ${i18n.language === 'ru' ? 'Скриншот' : 'Screenshot'} ${selectedScreenshot + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          )}
          
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors disabled:opacity-30"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedScreenshot(prev => prev !== null && prev < displayScreenshots.length - 1 ? prev + 1 : prev);
            }}
            disabled={selectedScreenshot === displayScreenshots.length - 1}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
          
          <div className="absolute bottom-4 text-center space-y-1">
            <span className="text-muted-foreground text-sm">
              {selectedScreenshot + 1} / {displayScreenshots.length}
            </span>
            {displayScreenshots[selectedScreenshot].caption && (
              <p className="text-sm max-w-2xl text-foreground bg-muted/80 px-4 py-2 rounded-lg">
                {displayScreenshots[selectedScreenshot].caption}
              </p>
            )}
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <HelpCircle className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">FAQ</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                {i18n.language === 'ru' ? 'Часто задаваемые вопросы' : 'Frequently Asked Questions'}
              </h2>
              <p className="text-lg text-muted-foreground">
                {i18n.language === 'ru' ? 'Ответы на популярные вопросы о шаблоне' : 'Answers to popular questions about the template'}
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-border/50 rounded-xl px-6 data-[state=open]:bg-muted/30"
                >
                  <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              {i18n.language === 'ru' ? 'Готовы начать?' : 'Ready to start?'}
            </h2>
            <p className="text-xl text-muted-foreground">
              {i18n.language === 'ru' 
                ? 'Получите этот шаблон и начните работать эффективнее уже сегодня.'
                : 'Get this template and start working more efficiently today.'}
            </p>
            
            <div className="flex items-center justify-center gap-6 flex-wrap pt-4">
              <div className="text-4xl md:text-5xl font-bold text-primary">{template.price}</div>
              {isAvailable ? (
                <div className="flex flex-wrap gap-3">
                  <a href={template.link} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="gap-2 text-lg px-8 py-6">
                      <ShoppingCart className="h-5 w-5" />
                      {i18n.language === 'ru' ? 'Купить шаблон' : 'Buy Template'}
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                  {template.buildinLink && (
                    <a href={template.buildinLink} target="_blank" rel="noopener noreferrer">
                      <Button size="lg" variant="secondary" className="gap-2 text-lg px-8 py-6">
                        <ShoppingCart className="h-5 w-5" />
                        Buildin.AI
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                </div>
              ) : (
                <Button size="lg" disabled className="gap-2 text-lg px-8 py-6">
                  <Sparkles className="h-5 w-5" />
                  {i18n.language === 'ru' ? 'Скоро в продаже' : 'Coming Soon'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TemplateLanding;
