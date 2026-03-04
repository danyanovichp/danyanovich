import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Check, ShoppingCart, Sparkles, ExternalLink, ImageIcon, Play, Star, Quote, Home, ChevronRight, HelpCircle, AlertCircle, Zap, Users, ChevronLeft, ChevronRightIcon, Film } from "lucide-react";
import { premiumTemplates } from "@/data/premiumTemplates";
import { secondBrainFeatureSections, secondBrainReviews } from "@/data/secondBrainData";
import { templateLandingContent } from "@/data/templateLandingContent";
import { templateLandingContentEn } from "@/data/templateLandingContentEn";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { useToast } from "@/hooks/use-toast";



const TemplateLanding = () => {
  const { templateId } = useParams();
  const { i18n } = useTranslation();
  const { toast } = useToast();
  const [selectedScreenshot, setSelectedScreenshot] = useState<number | null>(null);

  const template = premiumTemplates.find(t => t.id === templateId);
  const isSecondBrain = templateId === "second-brain-os";
  const isRu = i18n.language === 'ru';
  const contentMap = isRu ? templateLandingContent : templateLandingContentEn;
  const staticLandingContent = templateId ? (contentMap[templateId] || templateLandingContent[templateId]) : null;

  // Content from static data
  const hasDbContent = false;
  const displayHeadline = staticLandingContent?.headline || "";
  const displaySubheadline = staticLandingContent?.subheadline || "";
  const displayPainPoints = staticLandingContent?.painPoints || [];
  const displaySolution = staticLandingContent?.solution ? { intro: "", description: staticLandingContent.solution } : null;
  const displayFeatures = staticLandingContent?.features || [];
  const displayViews = staticLandingContent?.views || [];
  const displayAudience = staticLandingContent?.targetAudience || [];
  const displayScreenshots: { url: string; caption?: string; type?: string }[] = [];
  const displayMainImage = template?.image;

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

  const isAvailable = template.status === 'available';
  const title = i18n.language === 'ru' ? template.titleRu : template.titleEn;
  const description = i18n.language === 'ru' ? template.descriptionRu : template.descriptionEn;
  const fullDescription = i18n.language === 'ru' ? template.fullDescriptionRu : template.fullDescriptionEn;
  const features = i18n.language === 'ru' ? template.featuresRu : template.featuresEn;

  const featureSections = isSecondBrain ? secondBrainFeatureSections : null;
  const reviews = isSecondBrain ? secondBrainReviews : null;

  const faqItems = i18n.language === 'ru' ? [
    { question: `Как получить доступ к шаблону ${title}?`, answer: isAvailable ? 'После оплаты вы получите ссылку на дублирование шаблона в ваш Notion аккаунт. Процесс занимает несколько секунд.' : 'Шаблон находится в разработке. Подпишитесь на обновления, чтобы узнать о релизе первыми.' },
    { question: 'Нужен ли платный аккаунт Notion?', answer: 'Нет, шаблон работает на бесплатном аккаунте Notion. Все основные функции доступны без подписки.' },
    { question: 'Получу ли я обновления шаблона?', answer: 'Да, все значительные обновления бесплатны. Вы получите уведомление на email о новых версиях.' },
    { question: 'Могу ли я изменять шаблон под себя?', answer: 'Абсолютно! Шаблон полностью редактируемый. Вы можете настроить его под свои нужды.' },
    { question: 'Есть ли поддержка после покупки?', answer: 'Да, я предоставляю поддержку через Telegram. Отвечаю на вопросы и помогаю с настройкой.' },
  ] : [
    { question: `How do I get access to ${title}?`, answer: isAvailable ? 'After payment, you will receive a link to duplicate the template to your Notion account. The process takes a few seconds.' : 'The template is in development. Subscribe to updates to be the first to know about the release.' },
    { question: 'Do I need a paid Notion account?', answer: 'No, the template works on a free Notion account. All core features are available without a subscription.' },
    { question: 'Will I get template updates?', answer: 'Yes, all major updates are free. You will receive an email notification about new versions.' },
    { question: 'Can I customize the template?', answer: 'Absolutely! The template is fully editable. You can customize it to fit your needs.' },
    { question: 'Is there support after purchase?', answer: 'Yes, I provide support via Telegram. I answer questions and help with setup.' },
  ];

  // isRu is defined above near the top of the component
  const seoTitleRu = `${template.titleRu || title} | Notion шаблон | Дэн Янович`;
  const seoTitleEn = `${template.titleEn || title} | Notion Template | Dan Yanovich`;
  const seoDescriptionRu = `${template.fullDescriptionRu || fullDescription} Купить Notion шаблон ${template.titleRu || title}.`;
  const seoDescriptionEn = `${template.fullDescriptionEn || fullDescription} Buy ${template.titleEn || title} Notion template.`;
  const seoKeywords = isRu
    ? `${template.titleRu || title}, Notion шаблон, ${features.join(', ')}, купить шаблон`
    : `${template.titleEn || title}, Notion template, ${features.join(', ')}, buy template`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    description: fullDescription,
    image: template.image || 'https://danyanovich.com/placeholder.svg',
    brand: { '@type': 'Brand', name: isRu ? 'Дэн Янович' : 'Dan Yanovich' },
    offers: {
      '@type': 'Offer',
      price: template.priceValue,
      priceCurrency: 'RUB',
      availability: isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
      url: `https://danyanovich.com/templates/${template.id}`,
    },
    aggregateRating: isSecondBrain && reviews ? { '@type': 'AggregateRating', ratingValue: '5', reviewCount: reviews.length.toString() } : undefined,
    inLanguage: isRu ? 'ru' : 'en',
  };

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
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

      {/* Hero Section */}
      <section className="bg-background py-16 md:py-24 border-b-2 border-foreground">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="flex items-center gap-1">
                      <Home className="h-4 w-4" />
                      {isRu ? 'Главная' : 'Home'}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator><ChevronRight className="h-4 w-4" /></BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/templates">{isRu ? 'Шаблоны' : 'Templates'}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator><ChevronRight className="h-4 w-4" /></BreadcrumbSeparator>
                <BreadcrumbItem><BreadcrumbPage>{title}</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge className="px-4 py-2 bg-blue-600 text-white text-sm font-bold uppercase rounded-none border-2 border-transparent">📝 Notion</Badge>
                  <Badge className="px-4 py-2 bg-green-500 text-white text-sm font-bold uppercase rounded-none border-2 border-transparent">
                    ✓ {isRu ? 'Доступен' : 'Available'}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                    {displayHeadline || title}
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                    {displaySubheadline || description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {features.slice(0, 4).map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="px-3 py-1.5 text-sm font-bold rounded-full border-2 border-foreground">{feature}</Badge>
                  ))}
                </div>

                <div className="flex items-center gap-6 flex-wrap pt-4">
                  <div className="text-4xl md:text-5xl font-bold text-primary">{template.price}</div>
                  <div className="flex flex-wrap gap-3">
                    <a href={template.link} target="_blank" rel="noopener noreferrer">
                      <Button size="lg" className="gap-2 text-lg px-6 py-6 rounded-none border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_currentColor] transition-all bg-yellow-400 text-black hover:bg-yellow-500 font-bold">
                        <ShoppingCart className="h-5 w-5" />
                        {isRu ? 'Купить' : 'Buy'}
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-96 shrink-0">
                <div className="relative">
                  <div className="relative p-8 bg-card border-4 border-foreground shadow-[8px_8px_0px_0px_currentColor]">
                    <template.icon className="h-32 w-32 text-blue-600 mx-auto" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Pain Points Section */}
      {displayPainPoints.length > 0 && (
        <AnimatedSection animation="fade-up">
          <section className="py-16 md:py-24 bg-background border-b-2 border-foreground">
            <div className="container">
              <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-none border-2 border-foreground shadow-[2px_2px_0px_0px_currentColor] font-bold uppercase tracking-wider">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm font-bold">{isRu ? 'Знакомо?' : 'Sound familiar?'}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">{isRu ? 'Узнаёшь себя?' : 'Do you recognize yourself?'}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {displayPainPoints.filter(Boolean).map((point, index) => (
                    <Card key={index} className="border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_currentColor] rounded-none">
                      <CardContent className="p-6 flex items-start gap-4">
                        <div className="shrink-0 w-8 h-8 flex items-center justify-center mt-0.5 bg-red-500 text-white border-2 border-foreground">
                          <span className="font-bold text-lg">!</span>
                        </div>
                        <p className="text-foreground font-medium leading-relaxed">{point}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* Solution Section */}
      {displaySolution && (
        <AnimatedSection animation="fade-up" delay={100}>
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-none border-2 border-foreground shadow-[2px_2px_0px_0px_currentColor] font-bold uppercase tracking-wider">
                    <Zap className="h-5 w-5" />
                    <span className="text-sm font-bold">{isRu ? 'Решение' : 'Solution'}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">{isRu ? 'Представь другую реальность' : 'Imagine a different reality'}</h2>
                </div>
                <Card className="border-4 border-foreground bg-card shadow-[8px_8px_0px_0px_currentColor] rounded-none">
                  <CardContent className="p-8 md:p-12">
                    <p className="text-lg md:text-xl text-foreground font-medium leading-relaxed">
                      {displaySolution.description || displaySolution.intro || ""}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      {displayFeatures.length > 0 && (
        <AnimatedSection animation="fade-up" delay={200}>
          <section className="py-16 md:py-24 bg-background border-y-2 border-foreground">
            <div className="container">
              <div className="max-w-5xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-none border-2 border-foreground shadow-[2px_2px_0px_0px_currentColor] font-bold uppercase tracking-wider">
                    <Check className="h-5 w-5" strokeWidth={3} />
                    <span className="text-sm font-bold">{isRu ? 'Возможности' : 'Features'}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">{isRu ? 'Что ты получаешь' : 'What you get'}</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayFeatures.filter(f => f.title).map((feature, index) => (
                    <Card key={index} className="h-full border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_currentColor] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_currentColor] transition-all rounded-none">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl grayscale">{feature.icon}</span>
                          <h3 className="font-bold text-lg">{feature.title}</h3>
                        </div>
                        <p className="text-foreground font-medium leading-relaxed">{feature.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* Views Section */}
      {displayViews.length > 0 && (
        <AnimatedSection animation="fade-up" delay={250}>
          <section className="py-16 md:py-20">
            <div className="container">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold">{isRu ? 'Готовые представления' : 'Ready-made views'}</h2>
                  <p className="text-muted-foreground">{isRu ? 'На главной странице уже настроены ключевые виды:' : 'Key views are already set up on the main page:'}</p>
                </div>
                <div className="space-y-3">
                  {displayViews.filter(Boolean).map((view, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_currentColor] rounded-none">
                      <div className="shrink-0 w-6 h-6 flex items-center justify-center mt-0.5 bg-foreground text-background">
                        <Check className="h-4 w-4" strokeWidth={3} />
                      </div>
                      <span className="text-foreground font-bold">{view}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* Target Audience Section */}
      {displayAudience.length > 0 && (
        <AnimatedSection animation="fade-up" delay={300}>
          <section className="py-16 md:py-24 bg-background border-t-2 border-foreground">
            <div className="container">
              <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-none border-2 border-foreground shadow-[2px_2px_0px_0px_currentColor] font-bold uppercase tracking-wider">
                    <Users className="h-5 w-5" />
                    <span className="text-sm font-bold">{isRu ? 'Аудитория' : 'Audience'}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">{isRu ? 'Для кого этот шаблон' : 'Who is this template for'}</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {displayAudience.filter(a => a.title).map((audience, index) => (
                    <Card key={index} className="h-full border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_currentColor] rounded-none">
                      <CardContent className="p-6 space-y-3">
                        {audience.icon && <span className="text-3xl grayscale">{audience.icon}</span>}
                        <h3 className="font-bold text-lg">{audience.title}</h3>
                        <p className="text-foreground font-medium leading-relaxed">{audience.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
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
                <h2 className="text-3xl md:text-4xl font-bold">{isRu ? 'Возможности шаблона' : 'Template Features'}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{isRu ? 'Детальный обзор каждого раздела системы' : 'Detailed overview of each system section'}</p>
              </div>
              {featureSections.map((section, sectionIdx) => (
                <div key={section.id} className={`flex flex-col ${sectionIdx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{section.emoji}</span>
                      <h3 className="text-2xl md:text-3xl font-bold">{isRu ? section.titleRu : section.titleEn}</h3>
                    </div>
                    <p className="text-lg text-muted-foreground">{isRu ? section.descriptionRu : section.descriptionEn}</p>
                    <div className="space-y-4">
                      {section.features.map((feature, idx) => (
                        <div key={idx} className="flex gap-4 items-start">
                          <div className="shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                            <Check className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <div>
                            <span className="font-semibold">{isRu ? feature.nameRu : feature.nameEn}</span>
                            <span className="text-muted-foreground"> — </span>
                            <span className="text-muted-foreground">{isRu ? feature.descriptionRu : feature.descriptionEn}</span>
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
                            <p className="text-sm text-muted-foreground">{isRu ? `Скриншот: ${section.titleRu}` : `Screenshot: ${section.titleEn}`}</p>
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
                <h2 className="text-3xl md:text-4xl font-bold">{isRu ? 'Возможности' : 'Features'}</h2>
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
              <h2 className="text-3xl md:text-4xl font-bold">{isRu ? 'Видеообзор' : 'Video Review'}</h2>
              <p className="text-lg text-muted-foreground">{isRu ? 'Посмотрите, как работает шаблон' : 'See how the template works'}</p>
            </div>
            <Card className="overflow-hidden border-2 border-border/40">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-muted/80 to-muted/40 flex items-center justify-center relative group cursor-pointer hover:bg-muted/60 transition-colors">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 text-primary-foreground ml-1" />
                    </div>
                  </div>
                  <p className="absolute bottom-6 text-muted-foreground">{isRu ? 'Видео скоро будет добавлено' : 'Video coming soon'}</p>
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
                <h2 className="text-3xl md:text-4xl font-bold">{isRu ? 'Отзывы' : 'Reviews'}</h2>
                <p className="text-lg text-muted-foreground">{isRu ? 'Что говорят пользователи шаблона' : 'What template users say'}</p>
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
                      <p className="text-muted-foreground leading-relaxed">{isRu ? review.textRu : review.textEn}</p>
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

      {/* Media Gallery */}
      {displayScreenshots.length > 0 && (
        <AnimatedSection animation="fade-up" delay={400}>
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="max-w-5xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold">{isRu ? 'Галерея' : 'Gallery'}</h2>
                </div>
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
                            <video src={screenshot.url} className="w-full h-full object-cover" muted playsInline />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
                                <Play className="h-6 w-6 text-primary-foreground ml-1" />
                              </div>
                            </div>
                            <Badge className="absolute top-3 left-3 bg-primary/80 gap-1">
                              <Film className="h-3 w-3" />
                              {isRu ? 'Видео' : 'Video'}
                            </Badge>
                          </div>
                        ) : (
                          <img
                            src={screenshot.url}
                            alt={screenshot.caption || `${title} - ${isRu ? 'Скриншот' : 'Screenshot'} ${index + 1}`}
                            className="w-full aspect-video object-cover border-b-2 border-foreground"
                          />
                        )}
                        {screenshot.caption && (
                          <div className="p-4 bg-card">
                            <p className="text-sm font-bold text-foreground text-center uppercase tracking-wider">{screenshot.caption}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
      )}

      {/* Screenshot Modal */}
      {selectedScreenshot !== null && displayScreenshots.length > 0 && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedScreenshot(null)}>
          <button className="absolute top-4 right-4 p-2 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors" onClick={() => setSelectedScreenshot(null)}>
            <span className="text-2xl">✕</span>
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors disabled:opacity-30"
            onClick={(e) => { e.stopPropagation(); setSelectedScreenshot(prev => prev !== null && prev > 0 ? prev - 1 : prev); }}
            disabled={selectedScreenshot === 0}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          {displayScreenshots[selectedScreenshot].type === 'video' ? (
            <video src={displayScreenshots[selectedScreenshot].url} controls autoPlay className="max-w-full max-h-[85vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
          ) : (
            <img src={displayScreenshots[selectedScreenshot].url} alt={displayScreenshots[selectedScreenshot].caption || `${title} - ${isRu ? 'Скриншот' : 'Screenshot'} ${selectedScreenshot + 1}`} className="max-w-full max-h-[85vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
          )}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-muted hover:bg-muted-foreground/20 transition-colors disabled:opacity-30"
            onClick={(e) => { e.stopPropagation(); setSelectedScreenshot(prev => prev !== null && prev < displayScreenshots.length - 1 ? prev + 1 : prev); }}
            disabled={selectedScreenshot === displayScreenshots.length - 1}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
          <div className="absolute bottom-4 text-center space-y-1">
            <span className="text-muted-foreground text-sm">{selectedScreenshot + 1} / {displayScreenshots.length}</span>
            {displayScreenshots[selectedScreenshot].caption && (
              <p className="text-sm max-w-2xl text-foreground bg-muted/80 px-4 py-2 rounded-lg">{displayScreenshots[selectedScreenshot].caption}</p>
            )}
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-background border-y-2 border-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-none border-2 border-foreground shadow-[2px_2px_0px_0px_currentColor] font-bold uppercase tracking-wider">
                <HelpCircle className="h-5 w-5 text-black" />
                <span className="text-sm font-bold text-black">FAQ</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">{isRu ? 'Часто задаваемые вопросы' : 'Frequently Asked Questions'}</h2>
              <p className="text-lg text-muted-foreground">{isRu ? 'Ответы на популярные вопросы о шаблоне' : 'Answers to popular questions about the template'}</p>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-2 border-foreground bg-card rounded-none shadow-[4px_4px_0px_0px_currentColor] px-6 data-[state=open]:shadow-[2px_2px_0px_0px_currentColor] data-[state=open]:translate-y-[2px] data-[state=open]:translate-x-[2px] transition-all">
                  <AccordionTrigger className="text-left text-lg font-bold hover:no-underline py-5">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-foreground font-medium text-base pb-5">{item.answer}</AccordionContent>
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
            <h2 className="text-3xl md:text-5xl font-bold">{isRu ? 'Готовы начать?' : 'Ready to start?'}</h2>
            <p className="text-xl text-muted-foreground">{isRu ? 'Получите этот шаблон и начните работать эффективнее уже сегодня.' : 'Get this template and start working more efficiently today.'}</p>
            <div className="flex items-center justify-center gap-6 flex-wrap pt-4">
              <div className="text-4xl md:text-5xl font-bold text-primary">{template.price}</div>
              <div className="flex flex-wrap gap-3">
                <a href={template.link} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gap-2 text-lg px-8 py-6 rounded-none border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_currentColor] transition-all bg-yellow-400 text-black hover:bg-yellow-500 font-bold uppercase tracking-wider">
                    <ShoppingCart className="h-5 w-5" />
                    {isRu ? 'Купить шаблон' : 'Buy Template'}
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TemplateLanding;
