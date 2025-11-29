import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import PixelDecorations from "@/components/pixel-art/PixelDecorations";

const Portfolio = () => {
  const { t, i18n } = useTranslation();

  const projects = [
    {
      title: i18n.language === 'ru' ? "Медиа-команда шаблон" : "Media Team Template",
      description: i18n.language === 'ru' 
        ? "Комплексное решение для управления медиа-контентом и командной работы"
        : "Comprehensive solution for media content management and teamwork",
      category: i18n.language === 'ru' ? "Рабочие пространства" : "Workspaces",
      link: "https://www.notion.so/1fa1cf04d99880c7b4e5d43042488a19?pvs=21",
      tags: ["Notion", i18n.language === 'ru' ? "Команда" : "Team", i18n.language === 'ru' ? "Контент" : "Content"],
    },
    {
      title: i18n.language === 'ru' ? "Шаблон для небольшой компании" : "Small Business Template",
      description: i18n.language === 'ru' 
        ? "Полноценная система управления малым бизнесом в Notion"
        : "Complete small business management system in Notion",
      category: i18n.language === 'ru' ? "Рабочие пространства" : "Workspaces",
      link: "https://www.notion.so/7e43e4717b09471f8dc3fed5f8fd73e3?pvs=21",
      tags: ["Notion", i18n.language === 'ru' ? "Бизнес" : "Business", i18n.language === 'ru' ? "Управление" : "Management"],
    },
    {
      title: i18n.language === 'ru' ? "Ведение Телеграма" : "Telegram Management",
      description: i18n.language === 'ru' 
        ? "Система планирования и аналитики для Telegram-каналов"
        : "Planning and analytics system for Telegram channels",
      category: i18n.language === 'ru' ? "Автоматизация" : "Automation",
      link: "https://www.notion.so/8eb98b9e46a2439b931d6c2c0d968175?pvs=21",
      tags: ["Notion", "Telegram", i18n.language === 'ru' ? "Аналитика" : "Analytics"],
    },
    {
      title: i18n.language === 'ru' ? "Ведение заметок" : "Note Taking",
      description: i18n.language === 'ru' 
        ? "Персональная система управления знаниями и заметками"
        : "Personal knowledge and note management system",
      category: i18n.language === 'ru' ? "Персональные инструменты" : "Personal Tools",
      link: "https://www.notion.so/634ab2eb1de5410d9a3b74ed3318a635?pvs=21",
      tags: ["Notion", i18n.language === 'ru' ? "Заметки" : "Notes", i18n.language === 'ru' ? "Личное" : "Personal"],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen relative">
      <PixelDecorations />
      
      {/* Hero Section */}
      <section className="bg-secondary py-16 md:py-20 border-b-4 border-border relative">
        <div className="container">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-2xl md:text-3xl">{t('portfolio.title')}</h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              {t('portfolio.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="pixel-border pixel-border-hover group transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:animate-pixel-float"
              >
                <CardHeader className="space-y-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity group-hover:animate-pixel-pulse" />
                  <div className="flex items-center justify-between relative z-10">
                    <Badge variant="secondary" className="text-xs uppercase pixel-border group-hover:animate-pixel-bounce">
                      {project.category}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-bold leading-tight relative z-10 group-hover:translate-x-1 transition-transform">
                    {project.title}
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="text-xs group-hover:bg-primary/10 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full text-xs group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                    asChild
                  >
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {i18n.language === 'ru' ? 'Открыть проект' : 'Open Project'}
                      <ExternalLink className="ml-2 h-3 w-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
