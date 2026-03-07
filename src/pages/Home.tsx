import { LocalLink as Link } from "@/components/LocalLink";

import { useTranslation } from "react-i18next";
import { ArrowRight, FileText, Bot, Code2, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { portfolioProjects } from "@/data/portfolioProjects";

const Home = () => {
  const { i18n } = useTranslation();
  const isRu = i18n.language === 'ru';
  const { settings } = useSiteSettings();

  const expertiseCards = [
    {
      icon: FileText,
      titleRu: "Рабочие пространства Notion",
      titleEn: "Notion Templates",
      descRu: "Рабочие пространства с базами данных и автоматизациями",
      descEn: "Workspaces with databases and automations",
      link: "/notion",
      external: false,
    },
    {
      icon: Bot,
      titleRu: "Автоматизации и AI",
      titleEn: "Automations & AI",
      descRu: "Промпты, агенты и интеграции с ИИ",
      descEn: "Prompts, agents and AI integrations",
      link: "/cases?type=automation",
    },
    {
      icon: Code2,
      titleRu: "Вайбкодинг",
      titleEn: "Vibecoding",
      descRu: "Веб-приложения с помощью AI-инструментов",
      descEn: "Web apps built with AI tools",
      link: "/cases?type=vibecoding",
    },
  ];

  const featuredProjects = portfolioProjects.slice(0, 3);

  return (
    <PageTransition>
      <SEO
        titleRu="Дэн Янович | Notion и AI Эксперт"
        titleEn="Dan Yanovich | Notion & AI Expert"
        descriptionRu="Создаю шаблоны Notion и консультирую по внедрению AI-инструментов. Более 50 проектов, 100+ часов обучения."
        descriptionEn="Creating Notion templates and consulting on AI tools implementation. 50+ projects, 100+ hours of training."
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 md:py-36">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight font-display">
              {isRu ? settings.hero.title_ru : settings.hero.title_en}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto font-light">
              {isRu ? settings.hero.subtitle_ru : settings.hero.subtitle_en}
            </p>
            <div className="flex justify-center gap-8 pt-4">
              <Link
                to="/notion"
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 group"
              >
                {isRu ? "Шаблоны Notion" : "Notion Templates"}
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/cases"
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 group"
              >
                {isRu ? "Кейсы" : "Cases"}
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* What I Do */}
        <section className="container mx-auto px-4 pb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-8 text-center">
              {isRu ? "Чем я занимаюсь" : "What I Do"}
            </h2>
            <div className="grid md:grid-cols-3 gap-2">
              {expertiseCards.map((card) => {
                const cardContent = (
                  <>
                    <card.icon className="h-5 w-5 text-muted-foreground" />
                    <h3 className="text-base font-semibold">
                      {isRu ? card.titleRu : card.titleEn}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {isRu ? card.descRu : card.descEn}
                    </p>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/0 group-hover:text-muted-foreground transition-colors" />
                  </>
                );
                const className = "flex flex-col gap-3 p-6 bg-card border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_currentColor] transition-all group rounded-none";
                return card.external ? (
                  <a key={card.link + card.titleEn} href={card.link} target="_blank" rel="noopener noreferrer" className={className}>
                    {cardContent}
                  </a>
                ) : (
                  <Link key={card.link + card.titleEn} to={card.link} className={className}>
                    {cardContent}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="container mx-auto px-4 pb-20">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                {isRu ? "Проекты" : "Projects"}
              </h2>
              <Link
                to="/cases"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 group"
              >
                {isRu ? "Все кейсы" : "All cases"}
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="space-y-3">
              {featuredProjects.map((project) => (
                <Link
                  key={project.id}
                  to="/cases"
                  className="flex items-center gap-4 p-5 bg-card border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_currentColor] transition-all group rounded-none"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5">
                      <h3 className="text-base font-semibold truncate">
                        {isRu ? project.title_ru : project.title_en}
                      </h3>
                      <Badge variant="outline" className="text-xs shrink-0">
                        {isRu ? project.category_ru : project.category_en}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {isRu ? project.summary_ru : project.summary_en}
                    </p>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/0 group-hover:text-muted-foreground transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Consulting CTA */}
        <section className="container mx-auto px-4 pb-24">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-5 p-6 bg-pastel-yellow border-2 border-foreground shadow-[6px_6px_0px_0px_currentColor] rounded-none">
              <MessageSquare className="h-5 w-5 text-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold">
                  {isRu ? settings.consulting.title_ru : settings.consulting.title_en}
                </p>
                <p className="text-sm font-medium mt-1 text-foreground/80">
                  {isRu ? settings.consulting.description_ru : settings.consulting.description_en}
                </p>
              </div>
              <Link
                to="/consulting"
                className="text-base font-bold shrink-0 inline-flex items-center gap-2 hover:translate-x-1 transition-transform uppercase tracking-wider bg-card border-2 border-foreground px-4 py-2 shadow-[2px_2px_0px_0px_currentColor] hover:shadow-none hover:translate-y-[2px]"
              >
                {settings.consulting.price}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </div >
    </PageTransition >
  );
};

export default Home;
