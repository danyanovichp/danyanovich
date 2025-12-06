import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, Briefcase, Sparkles, Eye, GraduationCap, BookOpen, Video, FileText, Layout, Database, Notebook } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Link } from "react-router-dom";

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

  const notionTemplates = [
    {
      icon: User,
      title: i18n.language === 'ru' ? "Личное" : "Personal",
      description: i18n.language === 'ru' 
        ? "Шаблоны для личной продуктивности, целей и самоорганизации"
        : "Templates for personal productivity, goals and self-organization",
      count: i18n.language === 'ru' ? "1 шаблон" : "1 template",
      details: i18n.language === 'ru' 
        ? "Полноценная система для управления личными проектами, задачами и целями. Включает трекер привычек, планировщик целей, систему заметок и дневник достижений."
        : "Complete system for managing personal projects, tasks and goals. Includes habit tracker, goal planner, note system and achievement journal.",
      features: i18n.language === 'ru' 
        ? ["Трекер привычек", "Планировщик целей", "Система заметок", "Дневник достижений", "Календарь задач"]
        : ["Habit Tracker", "Goal Planner", "Note System", "Achievement Journal", "Task Calendar"],
      preview: "/placeholder.svg",
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
                PREMIUM
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

      {/* Notion Templates Section */}
      <section className="relative py-16 md:py-20 bg-muted/30 backdrop-blur-sm overflow-hidden">
        <div className="glass-orb top-10 right-10 w-64 h-64 bg-muted/30 animate-float" />
        
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="flex items-center gap-4">
              <Badge className="px-6 py-3 bg-foreground/90 backdrop-blur-sm text-background text-base font-medium rounded-full">
                📝 Notion
              </Badge>
              <div className="flex-1 h-px bg-border/20" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {notionTemplates.map((template, index) => renderTemplateCard(template, index))}
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
    </div>
  );
};

export default Templates;
