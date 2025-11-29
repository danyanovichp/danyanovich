import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, Briefcase, Sparkles, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import PixelDecorations from "@/components/pixel-art/PixelDecorations";
import { useState } from "react";

const Templates = () => {
  const { t, i18n } = useTranslation();
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const freeTemplates = [
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

  const premiumTemplates = [
    {
      icon: Briefcase,
      title: i18n.language === 'ru' ? "Бизнес" : "Business",
      description: i18n.language === 'ru' 
        ? "Профессиональные решения для команд и бизнес-процессов"
        : "Professional solutions for teams and business processes",
      count: i18n.language === 'ru' ? "Скоро" : "Coming Soon",
      details: i18n.language === 'ru' 
        ? "Комплексное решение для управления бизнес-процессами, командной работой и проектами. Включает CRM систему, управление задачами, документацию и аналитику."
        : "Comprehensive solution for business process management, teamwork and projects. Includes CRM system, task management, documentation and analytics.",
      features: i18n.language === 'ru' 
        ? ["CRM система", "Управление проектами", "База знаний", "Аналитика", "Командный планировщик"]
        : ["CRM System", "Project Management", "Knowledge Base", "Analytics", "Team Planner"],
      preview: "/placeholder.svg",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen relative">
      <PixelDecorations />
      
      {/* Hero Section */}
      <section className="bg-secondary py-16 md:py-20 border-b-4 border-border relative">
        <div className="container">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-2xl md:text-3xl">{t('templates.title')}</h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              {t('templates.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* FREE Templates Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* FREE Header */}
            <div className="flex items-center gap-4">
              <Badge className="pixel-border px-4 py-2 bg-green-600 text-white font-bold uppercase text-sm">
                {i18n.language === 'ru' ? '🎁 Бесплатно' : '🎁 Free'}
              </Badge>
              <div className="flex-1 h-1 bg-border" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {freeTemplates.map((template, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Card
                      className="pixel-border pixel-border-hover cursor-pointer group transition-all hover:scale-105 hover:animate-pixel-pulse"
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <div className="relative overflow-hidden">
                        <div className="aspect-video bg-muted pixel-border-b flex items-center justify-center group-hover:animate-pixel-float">
                          <template.icon className="h-12 w-12 text-primary animate-pixel-bounce" />
                        </div>
                      </div>
                      <CardHeader className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="inline-flex p-3 pixel-border bg-primary w-fit">
                            <template.icon className="h-6 w-6 text-primary-foreground" />
                          </div>
                          <Eye className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <h3 className="text-base font-bold">{template.title}</h3>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-xs text-muted-foreground">
                          {template.description}
                        </p>
                        <p className="text-xs font-bold">{template.count}</p>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl pixel-border">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3">
                        <div className="inline-flex p-2 pixel-border bg-primary">
                          <template.icon className="h-5 w-5 text-primary-foreground" />
                        </div>
                        {template.title}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="aspect-video bg-muted pixel-border flex items-center justify-center">
                        <template.icon className="h-16 w-16 text-primary animate-pixel-pulse" />
                      </div>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">{template.details}</p>
                        <div className="space-y-2">
                          <h4 className="text-sm font-bold">{i18n.language === 'ru' ? 'Возможности:' : 'Features:'}</h4>
                          <ul className="space-y-1">
                            {template.features?.map((feature: string, i: number) => (
                              <li key={i} className="text-xs flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary pixel-border" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM Templates Section */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* PREMIUM Header */}
            <div className="flex items-center gap-4">
              <Badge className="pixel-border px-4 py-2 bg-brand-amber text-background font-bold uppercase text-sm animate-pixel-pulse">
                <Sparkles className="mr-1 h-3 w-3 inline" />
                {i18n.language === 'ru' ? 'Премиум' : 'Premium'}
              </Badge>
              <div className="flex-1 h-1 bg-border" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {premiumTemplates.map((template, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Card
                      className="pixel-border pixel-border-hover bg-background cursor-pointer group transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <div className="relative overflow-hidden">
                        <div className="aspect-video bg-brand-amber/10 pixel-border-b flex items-center justify-center group-hover:animate-pixel-pulse">
                          <template.icon className="h-12 w-12 text-brand-amber animate-pixel-float" />
                        </div>
                      </div>
                      <CardHeader className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="inline-flex p-3 pixel-border bg-brand-amber w-fit">
                            <template.icon className="h-6 w-6 text-background" />
                          </div>
                          <Eye className="h-4 w-4 text-brand-amber opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <h3 className="text-base font-bold">{template.title}</h3>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-xs text-muted-foreground">
                          {template.description}
                        </p>
                        <p className="text-xs font-bold text-brand-amber">{template.count}</p>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl pixel-border">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3">
                        <div className="inline-flex p-2 pixel-border bg-brand-amber">
                          <template.icon className="h-5 w-5 text-background" />
                        </div>
                        {template.title}
                        <Badge className="pixel-border bg-brand-amber text-background">
                          <Sparkles className="mr-1 h-3 w-3 inline" />
                          PREMIUM
                        </Badge>
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="aspect-video bg-brand-amber/10 pixel-border flex items-center justify-center">
                        <template.icon className="h-16 w-16 text-brand-amber animate-pixel-pulse" />
                      </div>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">{template.details}</p>
                        <div className="space-y-2">
                          <h4 className="text-sm font-bold">{i18n.language === 'ru' ? 'Возможности:' : 'Features:'}</h4>
                          <ul className="space-y-1">
                            {template.features?.map((feature: string, i: number) => (
                              <li key={i} className="text-xs flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-brand-amber pixel-border" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Templates;
