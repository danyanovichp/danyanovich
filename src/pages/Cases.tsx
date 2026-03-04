import { useState, useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import WorkflowDiagram from "@/components/WorkflowDiagram";
import { portfolioProjects } from "@/data/portfolioProjects";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const pastelBgClasses = [
  'bg-pastel-yellow/20',
  'bg-pastel-pink/20',
  'bg-pastel-lavender/20',
  'bg-pastel-mint/20',
  'bg-pastel-coral/20',
];

// Shared project card content
const ProjectContent = ({ project, index, total, isRu }: { project: typeof portfolioProjects[0]; index: number; total: number; isRu: boolean }) => (
  <div className="container max-w-5xl mx-auto py-12 md:py-20 px-4 space-y-10">
    {/* Header */}
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
        <span>{index + 1} / {total}</span>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="lime">
          {isRu ? project.category_ru : project.category_en}
        </Badge>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight font-display">
          {isRu ? project.title_ru : project.title_en}
        </h1>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs font-normal">
            {tag}
          </Badge>
        ))}
      </div>

      <p className="text-muted-foreground leading-relaxed max-w-3xl text-base md:text-lg">
        {isRu ? project.summary_ru : project.summary_en}
      </p>
    </div>

    {/* Workflow Diagram */}
    <div className="space-y-3">
      <h3 className="text-sm md:text-base font-semibold uppercase tracking-widest text-muted-foreground font-display">
        {isRu ? "Архитектура" : "Architecture"}
      </h3>
      <WorkflowDiagram
        nodes={project.workflow.nodes}
        connections={project.workflow.connections}
      />
    </div>

    {/* Features Grid */}
    <div className="grid md:grid-cols-2 gap-4">
      {project.features.map((feature, fi) => (
        <div
          key={fi}
          className="rounded-none bg-card border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] p-5 space-y-3"
        >
          <h4 className="text-sm font-semibold font-display">
            {isRu ? feature.title_ru : feature.title_en}
          </h4>
          <ul className="space-y-2">
            {(isRu ? feature.items_ru : feature.items_en).map(
              (item, ii) => (
                <li
                  key={ii}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground/40 shrink-0" />
                  {item}
                </li>
              )
            )}
          </ul>
        </div>
      ))}
    </div>

    {/* Results */}
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-display">
        {isRu ? "Результаты" : "Results"}
      </p>
      <ul className="grid md:grid-cols-2 gap-2">
        {(isRu ? project.results_ru : project.results_en).map(
          (r, ri) => (
            <li
              key={ri}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <Check className="h-4 w-4 mt-0.5 text-accent-lime shrink-0" />
              {r}
            </li>
          )
        )}
      </ul>
    </div>
  </div>
);

const Cases = () => {
  const { i18n } = useTranslation();
  const isRu = i18n.language === "ru";
  const [currentSlide, setCurrentSlide] = useState(0);
  const total = portfolioProjects.length;
  const isMobile = useIsMobile();

  // Touch swipe support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const next = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev, isMobile]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        titleRu="Кейсы | Дэн Янович"
        titleEn="Cases | Dan Yanovich"
        descriptionRu="Реализованные проекты: AI-автоматизации, агенты, интеграции."
        descriptionEn="Completed projects: AI automations, agents, integrations."
        url="https://danyanovich.com/cases"
      />

      {isMobile ? (
        /* Mobile: vertical scroll layout */
        <div className="flex-1 space-y-6 py-6 px-2">
          {portfolioProjects.map((project, index) => (
            <div
              key={project.id}
              className={`border-b-2 border-foreground ${pastelBgClasses[index % pastelBgClasses.length]} rounded-none`}
            >
              <ProjectContent project={project} index={index} total={total} isRu={isRu} />
            </div>
          ))}
        </div>
      ) : (
        /* Desktop/Tablet: horizontal slider with touch swipe */
        <div className="flex-1 relative overflow-hidden">
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {portfolioProjects.map((project, index) => (
              <div
                key={project.id}
                className={`w-full flex-shrink-0 h-full overflow-y-auto ${pastelBgClasses[index % pastelBgClasses.length]}`}
              >
                <ProjectContent project={project} index={index} total={total} isRu={isRu} />
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 rounded-none border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] bg-card h-10 w-10 md:h-12 md:w-12 hover:-translate-y-[calc(50%+2px)] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_0px_currentColor] transition-all"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-foreground" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={next}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 rounded-none border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] bg-card h-10 w-10 md:h-12 md:w-12 hover:-translate-y-[calc(50%+2px)] hover:translate-x-[2px] hover:shadow-[6px_6px_0px_0px_currentColor] transition-all"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-foreground" />
          </Button>

          {/* Dot indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {portfolioProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${index === currentSlide
                    ? 'bg-foreground w-8 rounded-none border-2 border-foreground'
                    : 'bg-card w-2.5 hover:bg-muted border-2 border-foreground rounded-none'
                  }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cases;
