import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";

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
    <div className="flex flex-col min-h-screen">
      <SEO 
        titleRu="Портфолио | Дэн Янович"
        titleEn="Portfolio | Dan Yanovich"
        descriptionRu="Реализованные проекты и кейсы: Notion шаблоны, рабочие пространства, автоматизация и персональные инструменты."
        descriptionEn="Completed projects and cases: Notion templates, workspaces, automation and personal tools."
        url="https://danyanovich.com/portfolio"
      />
      
      {/* Hero Section */}
      <section className="bg-muted/30 py-16 md:py-20 border-b">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold">{t('portfolio.title')}</h1>
            <p className="text-base md:text-lg text-muted-foreground">{t('portfolio.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="group">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-sm">
                      {project.category}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-bold leading-tight">
                    {project.title}
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                    asChild
                  >
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {i18n.language === 'ru' ? 'Открыть проект' : 'Open Project'}
                      <ExternalLink className="ml-2 h-4 w-4" />
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
