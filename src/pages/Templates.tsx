import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, Briefcase, Sparkles, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
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
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-muted/30 py-16 md:py-20 border-b">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold">{t('templates.title')}</h1>
            <p className="text-base md:text-lg text-muted-foreground">
              {t('templates.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* FREE Templates Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* FREE Header */}
            <div className="flex items-center gap-4">
              <Badge className="px-6 py-3 bg-primary text-primary-foreground text-base font-medium">
                {i18n.language === 'ru' ? '🎁 Бесплатно' : '🎁 Free'}
              </Badge>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {freeTemplates.map((template, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Card
                      className="cursor-pointer group"
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <div className="relative overflow-hidden rounded-t-lg">
                        <div className="aspect-video bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                          <template.icon className="h-16 w-16 text-primary" />
                        </div>
                      </div>
                      <CardHeader className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="inline-flex p-3 bg-primary text-primary-foreground rounded-lg">
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
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3 text-2xl">
                        <div className="inline-flex p-3 bg-primary text-primary-foreground rounded-lg">
                          <template.icon className="h-6 w-6" />
                        </div>
                        {template.title}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
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
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM Templates Section */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* PREMIUM Header */}
            <div className="flex items-center gap-4">
              <Badge className="px-6 py-3 bg-primary text-primary-foreground text-base font-medium">
                <Sparkles className="mr-2 h-4 w-4 inline" />
                {i18n.language === 'ru' ? 'Премиум' : 'Premium'}
              </Badge>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {premiumTemplates.map((template, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Card
                      className="cursor-pointer group"
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <div className="relative overflow-hidden rounded-t-lg">
                        <div className="aspect-video bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                          <template.icon className="h-16 w-16 text-foreground" />
                        </div>
                      </div>
                      <CardHeader className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="inline-flex p-3 bg-primary text-primary-foreground rounded-lg">
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
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3 text-2xl">
                        <div className="inline-flex p-3 bg-primary text-primary-foreground rounded-lg">
                          <template.icon className="h-6 w-6" />
                        </div>
                        {template.title}
                        <Badge className="bg-primary text-primary-foreground">
                          <Sparkles className="mr-1 h-3 w-3 inline" />
                          PREMIUM
                        </Badge>
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <template.icon className="h-20 w-20 text-foreground" />
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
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Templates;
