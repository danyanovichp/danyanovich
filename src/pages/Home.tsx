import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, User, Briefcase, Sparkles, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PageTransition from "@/components/PageTransition";
import { useState } from "react";

const Home = () => {
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
    <PageTransition>
      <div className="min-h-screen">
        
        {/* Hero Section */}
        <section className="relative container mx-auto px-4 py-16 md:py-24 overflow-hidden">
          {/* Decorative glass orbs */}
          <div className="glass-orb top-20 left-10 w-72 h-72 bg-muted/50" />
          <div className="glass-orb bottom-10 right-10 w-96 h-96 bg-muted/40 animate-float" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              {t('home.hero.subtitle')}
            </p>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.hero.description')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/templates">
                  {t('common.viewTemplates')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>


        {/* Templates Section */}
        <section className="relative bg-muted/30 backdrop-blur-sm py-16 md:py-24 overflow-hidden">
          {/* Decorative orb */}
          <div className="glass-orb top-1/2 right-0 w-64 h-64 bg-muted/30 animate-float" style={{ animationDelay: '2s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold">{t('templates.title')}</h2>
                <p className="text-base md:text-lg text-muted-foreground">
                  {t('templates.subtitle')}
                </p>
              </div>

              {/* FREE Templates */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <Badge className="px-6 py-3 bg-primary/90 backdrop-blur-sm text-primary-foreground text-base font-medium rounded-full">
                    {i18n.language === 'ru' ? '🎁 Бесплатно' : '🎁 Free'}
                  </Badge>
                  <div className="flex-1 h-px bg-border/20" />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {freeTemplates.map((template, index) => (
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
                  ))}
                </div>
              </div>

              {/* PREMIUM Templates */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <Badge className="px-6 py-3 bg-primary/90 backdrop-blur-sm text-primary-foreground text-base font-medium rounded-full">
                    <Sparkles className="mr-2 h-4 w-4 inline" />
                    {i18n.language === 'ru' ? 'Премиум' : 'Premium'}
                  </Badge>
                  <div className="flex-1 h-px bg-border/20" />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {premiumTemplates.map((template, index) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <Card
                          className="cursor-pointer group"
                          onClick={() => setSelectedTemplate(template)}
                        >
                          <div className="relative overflow-hidden rounded-t-2xl">
                            <div className="aspect-video bg-muted/50 backdrop-blur-xl flex items-center justify-center group-hover:bg-muted/70 transition-colors">
                              <template.icon className="h-16 w-16 text-foreground" />
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
                            <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground rounded-full">
                              <Sparkles className="mr-1 h-3 w-3 inline" />
                              {i18n.language === 'ru' ? 'ПРЕМИУМ' : 'PREMIUM'}
                            </Badge>
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                          <div className="aspect-video bg-muted/50 backdrop-blur-xl rounded-2xl flex items-center justify-center">
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

              {/* View All Button */}
              <div className="flex justify-center pt-8">
                <Button asChild size="lg">
                  <Link to="/templates">
                    {t('common.viewAll')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default Home;
