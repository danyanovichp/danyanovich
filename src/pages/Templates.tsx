import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, Briefcase, Sparkles, Eye, GraduationCap, BookOpen, Video, FileText, Layout, Database, Notebook, ExternalLink, Calendar, ShoppingCart, Star, Quote, Workflow } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Link } from "react-router-dom";
import { premiumTemplates } from "@/data/premiumTemplates";

const Templates = () => {
  const { t, i18n } = useTranslation();
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

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

  const buildinTemplates = [
    {
      icon: Layout,
      title: i18n.language === 'ru' ? "Лендинги" : "Landing Pages",
      description: i18n.language === 'ru' 
        ? "Готовые шаблоны лендингов для бизнеса"
        : "Ready-made landing page templates for business",
      count: i18n.language === 'ru' ? "Скоро" : "Coming Soon",
      details: i18n.language === 'ru' 
        ? "Профессиональные шаблоны лендингов для различных ниш. Готовые к использованию, адаптивные и оптимизированные для конверсий."
        : "Professional landing page templates for various niches. Ready to use, responsive and optimized for conversions.",
      features: i18n.language === 'ru' 
        ? ["Адаптивный дизайн", "Оптимизация конверсий", "SEO настройки", "Быстрая загрузка", "Интеграции"]
        : ["Responsive Design", "Conversion Optimization", "SEO Settings", "Fast Loading", "Integrations"],
      preview: "/placeholder.svg",
    },
    {
      icon: Database,
      title: i18n.language === 'ru' ? "Веб-приложения" : "Web Apps",
      description: i18n.language === 'ru' 
        ? "Шаблоны для создания веб-приложений"
        : "Templates for creating web applications",
      count: i18n.language === 'ru' ? "Скоро" : "Coming Soon",
      details: i18n.language === 'ru' 
        ? "Готовые основы для веб-приложений с базой данных, авторизацией и административной панелью."
        : "Ready-made foundations for web applications with database, authorization and admin panel.",
      features: i18n.language === 'ru' 
        ? ["База данных", "Авторизация", "Админ-панель", "API интеграции", "Аналитика"]
        : ["Database", "Authorization", "Admin Panel", "API Integrations", "Analytics"],
      preview: "/placeholder.svg",
    },
  ];

  const yonoteTemplates = [
    {
      icon: Notebook,
      title: i18n.language === 'ru' ? "База знаний" : "Knowledge Base",
      description: i18n.language === 'ru' 
        ? "Шаблоны для организации знаний в YoNote"
        : "Templates for organizing knowledge in YoNote",
      count: i18n.language === 'ru' ? "Скоро" : "Coming Soon",
      details: i18n.language === 'ru' 
        ? "Структурированные шаблоны для ведения базы знаний, документации и заметок в YoNote."
        : "Structured templates for maintaining knowledge base, documentation and notes in YoNote.",
      features: i18n.language === 'ru' 
        ? ["Структура знаний", "Теги и категории", "Быстрый поиск", "Связанные заметки", "Экспорт"]
        : ["Knowledge Structure", "Tags and Categories", "Quick Search", "Linked Notes", "Export"],
      preview: "/placeholder.svg",
    },
    {
      icon: Briefcase,
      title: i18n.language === 'ru' ? "Бизнес" : "Business",
      description: i18n.language === 'ru' 
        ? "Бизнес-шаблоны для команд в YoNote"
        : "Business templates for teams in YoNote",
      count: i18n.language === 'ru' ? "Скоро" : "Coming Soon",
      details: i18n.language === 'ru' 
        ? "Комплексные решения для бизнес-процессов и командной работы в YoNote."
        : "Comprehensive solutions for business processes and teamwork in YoNote.",
      features: i18n.language === 'ru' 
        ? ["CRM система", "Управление проектами", "Документация", "Командная работа", "Отчёты"]
        : ["CRM System", "Project Management", "Documentation", "Teamwork", "Reports"],
      preview: "/placeholder.svg",
    },
  ];

  const renderTemplateCard = (template: any, index: number, isPremium = false) => (
    <Dialog key={index}>
      <DialogTrigger asChild>
        <Card
          className="cursor-pointer group"
          onClick={() => setSelectedTemplate(template)}
        >
          <div className="relative overflow-hidden rounded-t-2xl">
            <div className="aspect-video bg-muted/50 backdrop-blur-xl flex items-center justify-center group-hover:bg-muted/70 transition-colors">
              <template.icon className="h-16 w-16 text-primary" />
            </div>
          </div>
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex p-3 bg-primary/90 backdrop-blur-sm text-primary-foreground rounded-xl">
                <template.icon className="h-6 w-6" />
              </div>
              <Eye className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="text-xl font-bold">{template.title}</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {template.description}
            </p>
            <p className="text-sm font-medium">{template.count}</p>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-2xl border-border/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="inline-flex p-3 bg-primary/90 backdrop-blur-sm text-primary-foreground rounded-xl">
              <template.icon className="h-6 w-6" />
            </div>
            {template.title}
            {isPremium && (
              <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground rounded-full">
                <Sparkles className="mr-1 h-3 w-3 inline" />
                {i18n.language === 'ru' ? 'ПРЕМИУМ' : 'PREMIUM'}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="aspect-video bg-muted/50 backdrop-blur-xl rounded-2xl flex items-center justify-center">
            <template.icon className="h-20 w-20 text-primary" />
          </div>
          <div className="space-y-4">
            <p className="text-base text-muted-foreground">{template.details}</p>
            <div className="space-y-3">
              <h4 className="text-base font-bold">{i18n.language === 'ru' ? 'Возможности:' : 'Features:'}</h4>
              <ul className="space-y-2">
                {template.features?.map((feature: string, i: number) => (
                  <li key={i} className="text-sm flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-muted/30 backdrop-blur-sm py-16 md:py-20 border-b border-border/20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold">{t('templates.title')}</h1>
            <p className="text-base md:text-lg text-muted-foreground">
              {t('templates.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Notion Paid Templates Section - Premium at top */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="glass-orb bottom-20 left-20 w-56 h-56 bg-muted/40 animate-float" style={{ animationDelay: '0.3s' }} />
        
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="flex items-center gap-4">
              <Badge className="px-6 py-3 bg-foreground/90 backdrop-blur-sm text-background text-base font-medium rounded-full">
                📝 Notion
              </Badge>
              <Badge className="px-4 py-2 bg-amber-500/90 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                <Sparkles className="mr-1 h-3 w-3 inline" />
                {i18n.language === 'ru' ? 'Премиум' : 'Premium'}
              </Badge>
              <div className="flex-1 h-px bg-border/20" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {premiumTemplates.map((template, index) => {
                const title = i18n.language === 'ru' ? template.titleRu : template.titleEn;
                const description = i18n.language === 'ru' ? template.descriptionRu : template.descriptionEn;
                const isAvailable = template.status === 'available';
                
                return (
                  <Link 
                    key={index}
                    to={`/templates/${template.id}`}
                    className="block"
                  >
                    <Card className={`cursor-pointer group h-full transition-colors ${isAvailable ? 'border-green-500/30 hover:border-green-500/50' : 'border-amber-500/30 hover:border-amber-500/50'}`}>
                      <div className="relative overflow-hidden rounded-t-2xl">
                        {template.image ? (
                          <img 
                            src={template.image} 
                            alt={title}
                            className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="aspect-video bg-muted/50 backdrop-blur-xl flex items-center justify-center group-hover:bg-muted/70 transition-colors">
                            <template.icon className="h-16 w-16 text-primary" />
                          </div>
                        )}
                        <div className="absolute top-3 right-3 flex flex-col gap-2">
                          <Badge className="bg-amber-500/90 backdrop-blur-sm text-white text-sm font-bold rounded-full px-3 py-1">
                            {template.price}
                          </Badge>
                          {!isAvailable && (
                            <Badge className="bg-muted/90 backdrop-blur-sm text-muted-foreground text-xs rounded-full px-2 py-1">
                              🚧 {i18n.language === 'ru' ? 'В разработке' : 'In Dev'}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <CardHeader className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className={`inline-flex p-3 backdrop-blur-sm text-white rounded-xl ${isAvailable ? 'bg-green-500/90' : 'bg-amber-500/90'}`}>
                            <template.icon className="h-6 w-6" />
                          </div>
                          <div className="flex items-center gap-2">
                            <ShoppingCart className={`h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity ${isAvailable ? 'text-green-500' : 'text-amber-500'}`} />
                            <ExternalLink className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                        <h3 className={`text-lg font-bold transition-colors ${isAvailable ? 'group-hover:text-green-500' : 'group-hover:text-amber-500'}`}>{title}</h3>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="glass-orb top-10 left-10 w-48 h-48 bg-muted/30 animate-float" />
        
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="flex items-center gap-4">
              <Badge className="px-6 py-3 bg-primary/90 backdrop-blur-sm text-primary-foreground text-base font-medium rounded-full">
                <GraduationCap className="mr-2 h-4 w-4 inline" />
                {i18n.language === 'ru' ? 'Обучение' : 'Education'}
              </Badge>
              <div className="flex-1 h-px bg-border/20" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {educationItems.map((item, index) => (
                <Link to={item.link} key={index}>
                  <Card className="cursor-pointer group h-full">
                    <CardHeader className="space-y-4">
                      <div className="inline-flex p-3 bg-primary/90 backdrop-blur-sm text-primary-foreground rounded-xl w-fit">
                        <item.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{item.title}</h3>
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

      {/* Notion Free Templates Section */}
      <section className="relative py-16 md:py-20 bg-muted/30 backdrop-blur-sm overflow-hidden">
        <div className="glass-orb top-10 right-10 w-64 h-64 bg-muted/30 animate-float" />
        
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="flex items-center gap-4">
              <Badge className="px-6 py-3 bg-foreground/90 backdrop-blur-sm text-background text-base font-medium rounded-full">
                📝 Notion
              </Badge>
              <Badge className="px-4 py-2 bg-primary/90 backdrop-blur-sm text-primary-foreground text-sm font-medium rounded-full">
                🎁 {i18n.language === 'ru' ? 'Бесплатно' : 'Free'}
              </Badge>
              <div className="flex-1 h-px bg-border/20" />
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
                    <CardHeader className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex p-3 bg-primary/90 backdrop-blur-sm text-primary-foreground rounded-xl">
                          <template.icon className="h-6 w-6" />
                        </div>
                        <ExternalLink className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{template.title}</h3>
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


      {/* Buildin.AI Templates Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="glass-orb bottom-10 left-10 w-80 h-80 bg-muted/40 animate-float" style={{ animationDelay: '1s' }} />
        
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="flex items-center gap-4">
              <Badge className="px-6 py-3 bg-primary/90 backdrop-blur-sm text-primary-foreground text-base font-medium rounded-full">
                <Sparkles className="mr-2 h-4 w-4 inline" />
                Buildin.AI
              </Badge>
              <div className="flex-1 h-px bg-border/20" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {buildinTemplates.map((template, index) => renderTemplateCard(template, index, true))}
            </div>
          </div>
        </div>
      </section>

      {/* YoNote Templates Section */}
      <section className="relative py-16 md:py-20 bg-muted/30 backdrop-blur-sm overflow-hidden">
        <div className="glass-orb top-20 right-20 w-56 h-56 bg-muted/30 animate-float" style={{ animationDelay: '0.5s' }} />
        
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="flex items-center gap-4">
              <Badge className="px-6 py-3 bg-accent/90 backdrop-blur-sm text-accent-foreground text-base font-medium rounded-full">
                📓 YoNote
              </Badge>
              <div className="flex-1 h-px bg-border/20" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {yonoteTemplates.map((template, index) => renderTemplateCard(template, index))}
            </div>
          </div>
        </div>
      </section>

      {/* n8n Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="glass-orb bottom-10 left-20 w-64 h-64 bg-muted/30 animate-float" style={{ animationDelay: '0.8s' }} />
        
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="flex items-center gap-4">
              <Badge className="px-6 py-3 bg-orange-500/90 backdrop-blur-sm text-white text-base font-medium rounded-full">
                <Workflow className="mr-2 h-4 w-4 inline" />
                n8n
              </Badge>
              <Badge className="px-4 py-2 bg-muted/90 backdrop-blur-sm text-muted-foreground text-sm font-medium rounded-full">
                🚧 {i18n.language === 'ru' ? 'В разработке' : 'In Development'}
              </Badge>
              <div className="flex-1 h-px bg-border/20" />
            </div>

            <Card className="border-dashed border-2 border-border/40">
              <CardContent className="py-16 text-center">
                <Workflow className="h-16 w-16 mx-auto text-orange-500/50 mb-6" />
                <h3 className="text-xl font-bold mb-2">
                  {i18n.language === 'ru' ? 'В разработке' : 'In Development'}
                </h3>
                <p className="text-muted-foreground">
                  {i18n.language === 'ru' 
                    ? 'Шаблоны автоматизаций n8n скоро будут доступны'
                    : 'n8n automation templates coming soon'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Template Reviews Section */}
      <section className="relative py-16 md:py-20 bg-muted/30 backdrop-blur-sm overflow-hidden">
        <div className="glass-orb top-10 right-10 w-72 h-72 bg-muted/40 animate-float" style={{ animationDelay: '1.2s' }} />
        
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-4xl font-bold">
                {i18n.language === 'ru' ? 'Отзывы о шаблонах' : 'Template Reviews'}
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                {i18n.language === 'ru' 
                  ? 'Что говорят пользователи о наших шаблонах'
                  : 'What users say about our templates'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Dmitri_Str",
                  text: i18n.language === 'ru' 
                    ? "Очень редко сейчас встретишь профессионалов такого уровня. Быстро разобрался в задаче, предложил хорошие идеи. Быстро и качественно!"
                    : "Very rare to find professionals of this level. Quickly understood the task, suggested good ideas. Fast and quality!",
                  rating: 5,
                },
                {
                  name: "edgadirov",
                  text: i18n.language === 'ru' 
                    ? "Отличная работа! Данил очень ответственный. Помог разобраться в notion и найти лучшее решение. Все сделано идеально!"
                    : "Excellent work! Danil is very responsible. Helped understand Notion and find the best solution. Perfect!",
                  rating: 5,
                },
                {
                  name: "nesmeyanna",
                  text: i18n.language === 'ru' 
                    ? "Данила восхитителен! Дополнил задачу так, как я и не могла предположить. Рекомендую как профессионала!"
                    : "Danila is amazing! Enhanced the task in ways I couldn't imagine. Recommend as a professional!",
                  rating: 5,
                },
              ].map((review, index) => (
                <Card key={index} className="h-full">
                  <CardHeader className="pb-2">
                    <Quote className="h-8 w-8 text-primary/40 mb-2" />
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground italic">
                      "{review.text}"
                    </p>
                    <div className="pt-2 border-t border-border/50">
                      <p className="font-semibold text-sm">{review.name}</p>
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
