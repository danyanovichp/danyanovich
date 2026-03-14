import { useState } from "react";
import { LocalLink as Link } from "@/components/LocalLink";

import { useTranslation } from "react-i18next";
import { ArrowRight, FileText, Bot, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { portfolioProjects } from "@/data/portfolioProjects";

const Home = () => {
  const { i18n } = useTranslation();
  const isRu = i18n.language === 'ru';
  const { settings } = useSiteSettings();
  const [projectFilter, setProjectFilter] = useState<"in-progress" | "archive">("in-progress");
  const currentProjects = [
    {
      title: "RoomForge",
      descriptionRu: "Быстрый планировщик интерьера: 2D и изометрический вид, перестановка мебели и экспорт комнаты за секунды.",
      descriptionEn: "A fast interior planner with 2D and isometric views, furniture variations, and instant room export.",
      metaRu: "Минималистичный браузерный planner",
      metaEn: "Minimal browser-based planner",
      preview: "/images/projects/roomforge-preview.svg",
      link: "https://roomforge.vercel.app",
      external: true,
    },
  ];

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

  const archiveProjects = portfolioProjects.slice(0, 4);
  const featuredProjects = [
    ...currentProjects.map((project) => ({
      kind: "current" as const,
      title: project.title,
      descriptionRu: project.descriptionRu,
      descriptionEn: project.descriptionEn,
      metaRu: project.metaRu,
      metaEn: project.metaEn,
      preview: project.preview,
      link: project.link,
      external: project.external,
    })),
    {
      kind: "archive" as const,
      title: "AgentsPan",
      descriptionRu: "Embedded control plane для локальных AI-агентов: быстрый онбординг в одну команду, мультиарендный runtime и React UI для управления агентами.",
      descriptionEn: "Embedded control plane for local AI agents with one-command onboarding, a multi-tenant runtime, and a React UI for agent operations.",
      metaRu: "Архивный open-source проект",
      metaEn: "Archived open-source project",
      preview: "/images/projects/agentspan-preview.svg",
      link: "https://github.com/danyanovich/agentspan",
      external: true,
    },
    ...archiveProjects.map((project) => ({
      kind: "archive" as const,
      title: isRu ? project.title_ru : project.title_en,
      descriptionRu: project.summary_ru,
      descriptionEn: project.summary_en,
      metaRu: project.category_ru,
      metaEn: project.category_en,
      link: "/cases",
      external: false,
    })),
  ];
  const visibleProjects = featuredProjects.filter((project) =>
    projectFilter === "archive" ? project.kind === "archive" : project.kind !== "archive"
  );

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
          </div>
        </section>

        {/* What I Do */}
        <section className="container mx-auto px-4 pb-8">
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

        {/* Projects */}
        <section className="container mx-auto px-4 pb-20">
          <div className="max-w-5xl mx-auto space-y-10">
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

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex border-2 border-foreground bg-card p-1 shadow-[4px_4px_0px_0px_currentColor]">
                  <button
                    onClick={() => setProjectFilter("in-progress")}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] transition-all ${projectFilter === "in-progress"
                      ? "bg-foreground text-background"
                      : "text-foreground hover:bg-muted"
                      }`}
                  >
                    {isRu ? "В процессе" : "In Progress"}
                  </button>
                  <button
                    onClick={() => setProjectFilter("archive")}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] transition-all ${projectFilter === "archive"
                      ? "bg-foreground text-background"
                      : "text-foreground hover:bg-muted"
                      }`}
                  >
                    {isRu ? "Архив" : "Archive"}
                  </button>
                </div>
                <Badge variant="outline" className="shrink-0">
                  {visibleProjects.length}
                </Badge>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visibleProjects.map((project) => {
                  const statusLabel =
                    project.kind === "archive"
                      ? (isRu ? "Архив" : "Archive")
                      : (isRu ? "В процессе" : "In Progress");

                  const cardContent = (
                    <div className="group flex aspect-square flex-col overflow-hidden border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_currentColor] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_currentColor]">
                      {"preview" in project && project.preview ? (
                        <div className="aspect-[16/10] overflow-hidden border-b-2 border-foreground bg-muted/40">
                          <img
                            src={project.preview}
                            alt={`${project.title} preview`}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="flex min-h-[7rem] items-center justify-between border-b-2 border-foreground bg-muted/30 px-4 py-3">
                          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                            {isRu ? project.metaRu : project.metaEn}
                          </p>
                          <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/0 transition-colors group-hover:text-muted-foreground" />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col justify-between gap-4 p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-base font-semibold">{project.title}</p>
                              {"preview" in project && project.preview ? (
                                <p className="mt-1 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                                  {isRu ? project.metaRu : project.metaEn}
                                </p>
                              ) : null}
                            </div>
                            <Badge variant="outline" className="shrink-0 text-[10px] uppercase tracking-[0.2em]">
                              {statusLabel}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-5">
                            {isRu ? project.descriptionRu : project.descriptionEn}
                          </p>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                            {project.kind === "archive"
                              ? (isRu ? "Смотреть кейсы" : "View cases")
                              : project.external
                                ? (isRu ? "Открыть проект" : "Open project")
                                : (isRu ? "В разработке" : "In progress")}
                          </span>
                          <ArrowRight className="h-4 w-4 shrink-0" />
                        </div>
                      </div>
                    </div>
                  );

                  if (project.kind === "archive") {
                    if (project.external && project.link) {
                      return (
                        <a
                          key={`${project.kind}-${project.title}`}
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          {cardContent}
                        </a>
                      );
                    }

                    return (
                      <Link key={`${project.kind}-${project.title}`} to={project.link} className="block">
                        {cardContent}
                      </Link>
                    );
                  }

                  if (project.external && project.link) {
                    return (
                      <a
                        key={`${project.kind}-${project.title}`}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        {cardContent}
                      </a>
                    );
                  }

                  return (
                    <div key={`${project.kind}-${project.title}`} className="block opacity-90">
                      {cardContent}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

      </div >
    </PageTransition >
  );
};

export default Home;
