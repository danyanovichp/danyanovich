import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, Briefcase, Sparkles, Eye, GraduationCap, BookOpen, Video, FileText, Layout, Database, ExternalLink, Calendar, ShoppingCart, Star, Quote, Workflow, Bot } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { premiumTemplates } from "@/data/premiumTemplates";
import { useProducts } from "@/hooks/useProducts";
import TemplateFilters, { TemplateCategory, TemplateStatus, SortOption } from "@/components/TemplateFilters";
import SEO, { getTemplatesSchema, getBreadcrumbSchema } from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TechStackCarousel from "@/components/TechStackCarousel";

const Templates = () => {
  const { t, i18n } = useTranslation();
  const { products, isLoading: productsLoading } = useProducts();
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('all');
  const [selectedStatus, setSelectedStatus] = useState<TemplateStatus>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');

  const mergedTemplates = useMemo(() => {
    const productMap = new Map(products.map(p => [p.id, p]));
    
    return premiumTemplates.map(template => {
      const dbProduct = productMap.get(template.id);
      if (dbProduct) {
        return {
          ...template,
          titleRu: dbProduct.title_ru || template.titleRu,
          titleEn: dbProduct.title_en || template.titleEn,
          descriptionRu: dbProduct.description_ru || template.descriptionRu,
          descriptionEn: dbProduct.description_en || template.descriptionEn,
          price: dbProduct.price || template.price,
          priceValue: dbProduct.price_value ?? template.priceValue,
          status: (dbProduct.status as 'available' | 'development') || template.status,
          category: (dbProduct.category as TemplateCategory) || template.category,
          popularity: dbProduct.popularity ?? template.popularity,
          image: dbProduct.image || template.image,
          link: dbProduct.link || template.link,
        };
      }
      return template;
    });
  }, [products]);

  const filteredTemplates = useMemo(() => {
    let filtered = mergedTemplates.filter(template => {
      const title = i18n.language === 'ru' ? template.titleRu : template.titleEn;
      const description = i18n.language === 'ru' ? template.descriptionRu : template.descriptionEn;
      const matchesSearch = searchQuery === '' || 
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || 
        (selectedStatus === 'available' && template.status === 'available') ||
        (selectedStatus === 'development' && template.status === 'development');
      return matchesSearch && matchesCategory && matchesStatus;
    });

    switch (sortBy) {
      case 'popularity':
        filtered = [...filtered].sort((a, b) => b.popularity - a.popularity);
        break;
      case 'price-asc':
        filtered = [...filtered].sort((a, b) => a.priceValue - b.priceValue);
        break;
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => b.priceValue - a.priceValue);
        break;
      case 'date-newest':
        filtered = [...filtered].sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
        break;
      case 'date-oldest':
        filtered = [...filtered].sort((a, b) => new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime());
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedStatus, sortBy, i18n.language, mergedTemplates]);

  const educationItems = [
    {
      icon: Video,
      title: i18n.language === 'ru' ? "Видео-курсы" : "Video Courses",
      description: i18n.language === 'ru' 
        ? "Полные курсы по работе с Notion и автоматизации"
        : "Complete courses on Notion and automation",
      link: "/courses",
    },
    {
      icon: BookOpen,
      title: i18n.language === 'ru' ? "Гайды" : "Guides",
      description: i18n.language === 'ru' 
        ? "Пошаговые инструкции по настройке систем"
        : "Step-by-step setup instructions",
      link: "/courses",
    },
    {
      icon: FileText,
      title: i18n.language === 'ru' ? "AI Промпты" : "AI Prompts",
      description: i18n.language === 'ru' 
        ? "Готовые промпты для работы с ИИ"
        : "Ready-made prompts for AI",
      link: "/ai-prompts",
    },
  ];

  const notionFreeTemplates = [
    {
      icon: Sparkles,
      title: i18n.language === 'ru' ? "Карта Достижений" : "Achievement Map",
      description: i18n.language === 'ru' 
        ? "Визуализируйте свои достижения и прогресс"
        : "Visualize your achievements and progress",
      link: "https://danyanovich.notion.site/2811cf04d99880ec9f77f10682451e6f?source=copy_link",
    },
    {
      icon: FileText,
      title: i18n.language === 'ru' ? "Простые Задачи" : "Simple Tasks",
      description: i18n.language === 'ru' 
        ? "Минималистичный трекер задач"
        : "Minimalist task tracker",
      link: "https://danyanovich.notion.site/2901cf04d99881be8320e6d6894a3a12?source=copy_link",
    },
    {
      icon: FileText,
      title: i18n.language === 'ru' ? "Еженедельные отчеты" : "Weekly Reports",
      description: i18n.language === 'ru' 
        ? "Шаблон для еженедельной отчетности"
        : "Template for weekly reporting",
      link: "https://danyanovich.notion.site/2ac1cf04d99881889b66ffdd7f7d23a5?source=copy_link",
    },
    {
      icon: Briefcase,
      title: i18n.language === 'ru' ? "M&A (Слияния и поглощения)" : "M&A (Mergers & Acquisitions)",
      description: i18n.language === 'ru' 
        ? "Управление процессами слияний и поглощений"
        : "Manage merger and acquisition processes",
      link: "https://danyanovich.notion.site/M-A-2ac1cf04d998813393decb71e55f935c?source=copy_link",
    },
    {
      icon: User,
      title: i18n.language === 'ru' ? "Развитие клиентов" : "Customer Development",
      description: i18n.language === 'ru' 
        ? "Отслеживайте развитие клиентских отношений"
        : "Track customer relationship development",
      link: "https://danyanovich.notion.site/2ac1cf04d998816f9612ff78d3f2c758?source=copy_link",
    },
    {
      icon: BookOpen,
      title: i18n.language === 'ru' ? "Список желаний" : "Wishlist",
      description: i18n.language === 'ru' 
        ? "Организуйте свои желания и мечты"
        : "Organize your wishes and dreams",
      link: "https://danyanovich.notion.site/2ac1cf04d998819087d2e57f08798030?source=copy_link",
    },
    {
      icon: Eye,
      title: i18n.language === 'ru' ? "Анализ конкурентов" : "Competitor Analysis",
      description: i18n.language === 'ru' 
        ? "Следите за конкурентами и их стратегиями"
        : "Track competitors and their strategies",
      link: "https://danyanovich.notion.site/2ac1cf04d998817f800bc1b9dc259742?source=copy_link",
    },
  ];

  const faqItems = [
    {
      id: "notion-safety",
      questionRu: "Безопасно ли использовать Notion в РФ?",
      questionEn: "Is Notion safe to use in Russia?",
      answerRu: "Я строю системы с возможностью резервного копирования — все данные можно экспортировать в CSV, Markdown или JSON в любой момент. Для критичных процессов использую n8n, который можно развернуть на вашем собственном сервере.",
      answerEn: "I build systems with backup capabilities — all data can be exported to CSV, Markdown, or JSON at any time. For critical processes, I use n8n which can be deployed on your own server.",
    },
    {
      id: "payment",
      questionRu: "Как происходит оплата?",
      questionEn: "How do I pay?",
      answerRu: "Принимаю переводы на карты российских банков (Сбербанк, Тинькофф), криптовалюту (USDT, BTC), а также международные переводы. Возможна оплата частями для крупных проектов.",
      answerEn: "I accept transfers to Russian bank cards (Sberbank, Tinkoff), cryptocurrency (USDT, BTC), and international transfers. Payment in installments is possible for large projects.",
    },
    {
      id: "custom-system",
      questionRu: "Можно ли заказать индивидуальную систему?",
      questionEn: "Can I order a custom system?",
      answerRu: "Да! Большинство моих проектов — это кастомные решения под конкретные задачи бизнеса. Начинаем с бесплатного экспресс-аудита на 15 минут.",
      answerEn: "Yes! Most of my projects are custom solutions for specific business needs. We start with a free 15-minute express audit.",
    },
    {
      id: "timeline",
      questionRu: "Сколько времени занимает внедрение?",
      questionEn: "How long does implementation take?",
      answerRu: "Зависит от сложности: простой шаблон настраивается за 1-2 дня, комплексная система автоматизации — 2-4 недели. После внедрения провожу обучение и даю 2 недели поддержки бесплатно.",
      answerEn: "It depends on complexity: a simple template takes 1-2 days, a comprehensive automation system takes 2-4 weeks. After implementation, I train your team and provide 2 weeks of free support.",
    },
  ];

  const isRu = i18n.language === 'ru';
  const templatesSchema = getTemplatesSchema(isRu);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isRu ? 'Главная' : 'Home', url: 'https://danyanovich.com' },
    { name: isRu ? 'Продукты' : 'Products', url: 'https://danyanovich.com/products' },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <SEO 
          titleRu="Продукты | Дэн Янович"
          titleEn="Products | Dan Yanovich"
          descriptionRu="Шаблоны Notion, AI промпты, курсы. Всё для продуктивности и бизнеса."
          descriptionEn="Notion templates, AI prompts, courses. Everything for productivity and business."
          url="https://danyanovich.com/products"
          structuredData={[templatesSchema, breadcrumbSchema]}
        />
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-10">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              {isRu ? 'Продукты' : 'Products'}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isRu ? 'Шаблоны Notion, курсы и AI инструменты' : 'Notion templates, courses and AI tools'}
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <TemplateFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
        </div>
      </section>

      {/* Tech Stack Carousel */}
      <TechStackCarousel />

      {/* AI Training Card */}
      <section className="pb-12">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Badge variant="coral" className="px-4 py-1.5 text-sm">
                <GraduationCap className="mr-1.5 h-3.5 w-3.5 inline" />
                {isRu ? 'ИИ Обучение' : 'AI Training'}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {isRu ? 'В разработке' : 'In Development'}
              </Badge>
              <div className="flex-1 h-px bg-border/10" />
            </div>
            <Card className="border-dashed border-2 border-border/20 opacity-70">
              <CardContent className="py-12 text-center">
                <GraduationCap className="h-12 w-12 mx-auto text-accent-coral/50 mb-4" />
                <h3 className="text-lg font-bold mb-2">
                  {isRu ? 'ИИ Обучение — скоро' : 'AI Training — coming soon'}
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  {isRu 
                    ? 'Курсы и обучающие материалы по работе с искусственным интеллектом'
                    : 'Courses and training materials on working with artificial intelligence'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Notion Templates — Available */}
      {filteredTemplates.filter(t => t.status === 'available').length > 0 && (
        <section className="relative py-12 md:py-16 overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="flex items-center gap-4">
                <Badge variant="lime" className="px-4 py-1.5 text-sm">
                  Notion
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {isRu ? 'В продаже' : 'Available'}
                </Badge>
                <div className="flex-1 h-px bg-border/10" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.filter(t => t.status === 'available').map((template, index) => {
                const title = isRu ? template.titleRu : template.titleEn;
                const description = isRu ? template.descriptionRu : template.descriptionEn;
                return (
                  <Link to={`/templates/${template.id}`} key={index}>
                    <Card className="cursor-pointer group h-full">
                      <div className="relative">
                        <div className="aspect-video bg-muted/30 flex items-center justify-center group-hover:bg-muted/50 transition-colors rounded-t-3xl">
                          <template.icon className="h-12 w-12 text-muted-foreground/50" />
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-primary text-primary-foreground text-sm rounded-full px-3 py-1">
                            {template.price}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="space-y-2 pb-2">
                        <h3 className="text-base font-bold">{title}</h3>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* In Development Templates */}
      {filteredTemplates.filter(t => t.status === 'development').length > 0 && (
        <section className="relative py-12 md:py-16 overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="flex items-center gap-4">
                <Badge variant="lime" className="px-4 py-1.5 text-sm">
                  Notion
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {isRu ? 'В разработке' : 'In Development'}
                </Badge>
                <div className="flex-1 h-px bg-border/10" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.filter(t => t.status === 'development').map((template, index) => {
                const title = isRu ? template.titleRu : template.titleEn;
                const description = isRu ? template.descriptionRu : template.descriptionEn;
                return (
                  <Link to={`/templates/${template.id}`} key={index}>
                    <Card className="cursor-pointer group h-full opacity-60">
                      <div className="relative overflow-hidden rounded-t-3xl">
                        <div className="aspect-video bg-muted/30 flex items-center justify-center group-hover:bg-muted/50 transition-colors">
                          <template.icon className="h-12 w-12 text-muted-foreground/40" />
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge variant="outline" className="text-xs">
                            {template.price}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="space-y-2 pb-2">
                        <h3 className="text-base font-bold">{title}</h3>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* No Results */}
      {filteredTemplates.length === 0 && (
        <section className="py-16">
          <div className="container">
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                {isRu ? 'Продукты не найдены. Попробуйте изменить фильтры.' : 'No products found. Try changing filters.'}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="px-4 py-1.5 text-sm">
                <GraduationCap className="mr-1.5 h-3.5 w-3.5 inline" />
                {isRu ? 'Обучение' : 'Education'}
              </Badge>
              <div className="flex-1 h-px bg-border/10" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {educationItems.map((item, index) => (
                <Link to={item.link} key={index}>
                  <Card className="cursor-pointer group h-full">
                    <CardHeader className="space-y-3">
                      <div className="inline-flex p-3 bg-muted/50 rounded-2xl w-fit">
                        <item.icon className="h-5 w-5 text-foreground" />
                      </div>
                      <h3 className="text-base font-bold">{item.title}</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Notion Free Templates */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
              <Badge variant="lime" className="px-4 py-1.5 text-sm">
                Notion
              </Badge>
              <Badge variant="outline" className="text-xs">
                {isRu ? 'Бесплатно' : 'Free'}
              </Badge>
              <div className="flex-1 h-px bg-border/10" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notionFreeTemplates.map((template, index) => (
                <a 
                  key={index}
                  href={template.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="cursor-pointer group h-full">
                    <CardHeader className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex p-3 bg-muted/50 rounded-2xl">
                          <template.icon className="h-5 w-5 text-foreground" />
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h3 className="text-base font-bold">{template.title}</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* n8n Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
              <Badge variant="coral" className="px-4 py-1.5 text-sm">
                <Workflow className="mr-1.5 h-3.5 w-3.5 inline" />
                n8n
              </Badge>
              <Badge variant="outline" className="text-xs">
                {isRu ? 'В разработке' : 'In Development'}
              </Badge>
              <div className="flex-1 h-px bg-border/10" />
            </div>

            <Card className="border-dashed border-2 border-border/20">
              <CardContent className="py-12 text-center">
                <Workflow className="h-12 w-12 mx-auto text-accent-coral/50 mb-4" />
                <h3 className="text-lg font-bold mb-2">
                  {isRu ? 'В разработке' : 'In Development'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isRu 
                    ? 'Шаблоны автоматизаций n8n скоро будут доступны'
                    : 'n8n automation templates coming soon'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section (Notion) */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                {isRu ? "Частые вопросы" : "FAQ"}
              </h2>
              <p className="text-muted-foreground">
                {isRu 
                  ? "Ответы на главные вопросы о Notion и шаблонах" 
                  : "Answers to main questions about Notion and templates"}
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item) => (
                <AccordionItem 
                  key={item.id} 
                  value={item.id}
                  className="bg-muted/20 border border-border/10 rounded-2xl px-6 data-[state=open]:shadow-sm transition-all"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline py-4 text-sm">
                    {isRu ? item.questionRu : item.questionEn}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 text-sm leading-relaxed">
                    {isRu ? item.answerRu : item.answerEn}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Template Reviews */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                {isRu ? 'Отзывы' : 'Reviews'}
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Dmitri_Str",
                  text: isRu 
                    ? "Очень редко сейчас встретишь профессионалов такого уровня. Быстро разобрался в задаче, предложил хорошие идеи."
                    : "Very rare to find professionals of this level. Quickly understood the task, suggested good ideas.",
                  rating: 5,
                },
                {
                  name: "edgadirov",
                  text: isRu 
                    ? "Отличная работа! Данил очень ответственный. Помог разобраться в notion и найти лучшее решение."
                    : "Excellent work! Danil is very responsible. Helped understand Notion and find the best solution.",
                  rating: 5,
                },
                {
                  name: "nesmeyanna",
                  text: isRu 
                    ? "Данила восхитителен! Дополнил задачу так, как я и не могла предположить. Рекомендую!"
                    : "Danila is amazing! Enhanced the task in ways I couldn't imagine. Recommend!",
                  rating: 5,
                },
              ].map((review, index) => (
                <Card key={index} className="h-full">
                  <CardHeader className="pb-2">
                    <Quote className="h-6 w-6 text-muted-foreground/30 mb-2" />
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-accent-lime text-accent-lime" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground italic">
                      "{review.text}"
                    </p>
                    <div className="pt-2 border-t border-border/10">
                      <p className="font-medium text-sm">{review.name}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Templates;
