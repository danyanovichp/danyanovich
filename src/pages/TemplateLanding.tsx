import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Check, ShoppingCart, Sparkles, ExternalLink, ImageIcon, Play, Star, Quote, Home, ChevronRight, HelpCircle } from "lucide-react";
import { premiumTemplates } from "@/data/premiumTemplates";
import { secondBrainFeatureSections, secondBrainReviews } from "@/data/secondBrainData";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import SEO from "@/components/SEO";

const TemplateLanding = () => {
  const { templateId } = useParams();
  const { i18n } = useTranslation();
  
  const template = premiumTemplates.find(t => t.id === templateId);
  const isSecondBrain = templateId === "second-brain-os";
  
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

  const title = i18n.language === 'ru' ? template.titleRu : template.titleEn;
  const description = i18n.language === 'ru' ? template.descriptionRu : template.descriptionEn;
  const fullDescription = i18n.language === 'ru' ? template.fullDescriptionRu : template.fullDescriptionEn;
  const features = i18n.language === 'ru' ? template.featuresRu : template.featuresEn;
  const isAvailable = template.status === 'available';

  // Use enhanced data for Second Brain, fallback to basic for others
  const featureSections = isSecondBrain ? secondBrainFeatureSections : null;
  const reviews = isSecondBrain ? secondBrainReviews : null;

  // Generate FAQ items for templates
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

  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    description: fullDescription,
    image: template.image || 'https://danyanovich.com/placeholder.svg',
    brand: {
      '@type': 'Brand',
      name: 'Дэн Янович',
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
  };

  return (
    <div className="min-h-screen">
      <SEO
        title={`${title} | Дэн Янович`}
        description={fullDescription}
        keywords={`${title}, Notion шаблон, ${template.category}, продуктивность, ${features.join(', ')}`}
        url={`https://danyanovich.com/templates/${template.id}`}
        type="product"
        structuredData={structuredData}
      />
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
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{title}</h1>
                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">{description}</p>
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
                  <div className="text-4xl md:text-5xl font-bold text-primary">{template.price}</div>
                  {isAvailable ? (
                    <a href={template.link} target="_blank" rel="noopener noreferrer">
                      <Button size="lg" className="gap-2 text-lg px-8 py-6">
                        <ShoppingCart className="h-5 w-5" />
                        {i18n.language === 'ru' ? 'Купить шаблон' : 'Buy Template'}
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
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
            <Card className="overflow-hidden border-2 border-border/40 shadow-2xl">
              <CardContent className="p-0">
                {template.image ? (
                  <img 
                    src={template.image} 
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
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Full Description Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              {i18n.language === 'ru' ? 'О шаблоне' : 'About Template'}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {fullDescription}
            </p>
            {isSecondBrain && (
              <p className="text-lg text-muted-foreground leading-relaxed">
                {i18n.language === 'ru' 
                  ? 'Второй Мозг OS — это комплексная система для организации всей вашей цифровой жизни. Объединяет управление проектами, базу знаний, планирование и привычки в единую связанную систему.'
                  : 'Second Brain OS is a comprehensive system for organizing your entire digital life. It combines project management, knowledge base, planning and habits into a single connected system.'}
              </p>
            )}
          </div>
        </div>
      </section>

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

      {/* Detailed Feature Sections */}
      {featureSections ? (
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
                  {/* Content */}
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
                  
                  {/* Screenshot placeholder */}
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
      ) : (
        /* Basic Features Section for other templates */
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

      {/* Reviews Section */}
      {reviews && reviews.length > 0 && (
        <section className="py-16 md:py-24">
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

      {/* Screenshot Gallery */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                {i18n.language === 'ru' ? 'Галерея скриншотов' : 'Screenshot Gallery'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((num) => (
                <Card key={num} className="overflow-hidden border-2 border-border/40">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-muted/80 to-muted/40 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <ImageIcon className="h-12 w-12 text-muted-foreground/30 mx-auto" />
                        <p className="text-sm text-muted-foreground">
                          {i18n.language === 'ru' ? `Скриншот ${num}` : `Screenshot ${num}`}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
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
              {i18n.language === 'ru' ? 'Готовы организовать свою жизнь?' : 'Ready to organize your life?'}
            </h2>
            <p className="text-xl text-muted-foreground">
              {i18n.language === 'ru' 
                ? 'Получите этот шаблон и начните работать эффективнее уже сегодня.'
                : 'Get this template and start working more efficiently today.'}
            </p>
            
            <div className="flex items-center justify-center gap-6 flex-wrap pt-4">
              <div className="text-4xl md:text-5xl font-bold text-primary">{template.price}</div>
              {isAvailable ? (
                <a href={template.link} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gap-2 text-lg px-8 py-6">
                    <ShoppingCart className="h-5 w-5" />
                    {i18n.language === 'ru' ? 'Купить шаблон' : 'Buy Template'}
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
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
