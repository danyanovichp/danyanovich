import { Link } from "react-router-dom";
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
      titleRu: "Notion-системы",
      titleEn: "Notion Systems",
      descRu: "Рабочие пространства с базами данных и автоматизациями",
      descEn: "Workspaces with databases and automations",
      link: "/templates",
    },
    {
      icon: Bot,
      titleRu: "AI и автоматизация",
      titleEn: "AI & Automation",
      descRu: "Промпты, агенты и интеграции с ИИ",
      descEn: "Prompts, agents and AI integrations",
      link: "/cases",
    },
    {
      icon: Code2,
      titleRu: "Vibe Coding",
      titleEn: "Vibe Coding",
      descRu: "Веб-приложения с помощью AI-инструментов",
      descEn: "Web apps built with AI tools",
      link: "/cases",
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
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight font-display">
              {isRu ? settings.hero.title_ru : settings.hero.title_en}
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto font-light">
              {isRu ? settings.hero.subtitle_ru : settings.hero.subtitle_en}
            </p>
            <div className="flex justify-center gap-6 pt-2">
              <Link 
                to="/templates" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 group"
              >
                {isRu ? "Шаблоны Notion" : "Notion Templates"}
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link 
                to="/cases" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5 group"
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
            <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-8 text-center">
              {isRu ? "Чем я занимаюсь" : "What I Do"}
            </h2>
            <div className="grid md:grid-cols-3 gap-2">
              {expertiseCards.map((card) => (
                <Link
                  key={card.link + card.titleEn}
                  to={card.link}
                  className="flex flex-col gap-3 p-5 rounded-2xl hover:bg-muted/50 transition-colors group"
                >
                  <card.icon className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold">
                    {isRu ? card.titleRu : card.titleEn}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {isRu ? card.descRu : card.descEn}
                  </p>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/0 group-hover:text-muted-foreground transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="container mx-auto px-4 pb-20">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {isRu ? "Проекты" : "Projects"}
              </h2>
              <Link 
                to="/cases" 
                className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
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
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold truncate">
                        {isRu ? project.title_ru : project.title_en}
                      </h3>
                      <Badge variant="outline" className="text-[10px] shrink-0">
                        {isRu ? project.category_ru : project.category_en}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
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
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-muted/30">
              <MessageSquare className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">
                  {isRu ? settings.consulting.title_ru : settings.consulting.title_en}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isRu ? settings.consulting.description_ru : settings.consulting.description_en}
                </p>
              </div>
              <Link 
                to="/consulting" 
                className="text-sm font-medium shrink-0 inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity"
              >
                {settings.consulting.price}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;
