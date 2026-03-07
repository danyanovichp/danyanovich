import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LocalLink as Link } from "@/components/LocalLink";
import { useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import { portfolioProjects } from "@/data/portfolioProjects";
import { ArrowRight } from "lucide-react";

const pastelBgClasses = [
  'bg-pastel-yellow/20',
  'bg-pastel-pink/20',
  'bg-pastel-lavender/20',
  'bg-pastel-mint/20',
  'bg-pastel-coral/20',
];

const Cases = () => {
  const { i18n } = useTranslation();
  const isRu = i18n.language === "ru";
  const [searchParams, setSearchParams] = useSearchParams();
  const initialType = searchParams.get('type') === 'vibecoding' ? 'vibecoding' : 'automation';
  const [filter, setFilter] = useState<'automation' | 'vibecoding'>(initialType);

  // Tool filter from URL param
  const toolFilter = searchParams.get('tool') || null;

  const filteredProjects = portfolioProjects.filter(p => {
    const typeMatch = p.type === filter;
    if (!toolFilter) return typeMatch;
    // Filter by tool: check if any tag matches (case-insensitive)
    const toolMatch = p.tags.some(tag =>
      tag.toLowerCase().includes(toolFilter.toLowerCase()) ||
      toolFilter.toLowerCase().includes(tag.toLowerCase())
    );
    return toolMatch;
  });
  const total = filteredProjects.length;

  // Sync filter with URL param changes (e.g. back button)
  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'automation' || type === 'vibecoding') {
      setFilter(type);
    }
  }, [searchParams]);

  const handleFilterChange = (newFilter: 'automation' | 'vibecoding') => {
    const newParams: Record<string, string> = { type: newFilter };
    if (toolFilter) newParams.tool = toolFilter;
    setFilter(newFilter);
    setSearchParams(newParams);
  };

  const clearToolFilter = () => {
    const newParams: Record<string, string> = { type: filter };
    setSearchParams(newParams);
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

      {/* Strategy Switcher */}
      <div className="container max-w-7xl mx-auto px-4 pt-12 md:pt-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 md:mb-12">
          <div className="space-y-1 text-center md:text-left">
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground font-display">
              {isRu ? "Категории" : "Categories"}
            </h2>
            {toolFilter && (
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-pastel-yellow border-2 border-foreground shadow-[2px_2px_0px_0px_currentColor] text-xs font-bold uppercase tracking-wider">
                  {isRu ? "Инструмент:" : "Tool:"} {toolFilter}
                </span>
                <button
                  onClick={clearToolFilter}
                  className="text-xs text-muted-foreground hover:text-foreground underline transition-colors"
                >
                  {isRu ? "сбросить" : "clear"}
                </button>
              </div>
            )}
          </div>
          <div className="flex bg-card border-2 border-foreground p-1 shadow-[4px_4px_0px_0px_currentColor]">
            <button
              onClick={() => handleFilterChange('automation')}
              className={`px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all rounded-none ${filter === 'automation'
                ? 'bg-foreground text-background'
                : 'hover:bg-muted text-foreground'
                }`}
            >
              {isRu ? 'Автоматизации' : 'Automations'}
            </button>
            <button
              onClick={() => handleFilterChange('vibecoding')}
              className={`px-6 py-2.5 text-sm font-bold uppercase tracking-wider transition-all rounded-none ${filter === 'vibecoding'
                ? 'bg-foreground text-background'
                : 'hover:bg-muted text-foreground'
                }`}
            >
              {isRu ? 'Вайбкодинг' : 'Vibecoding'}
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        {total > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {filteredProjects.map((project, index) => {
              const bgClass = pastelBgClasses[index % pastelBgClasses.length];
              return (
                <Link key={project.id} to={`/cases/${project.id}`} className="group block focus:outline-none focus:ring-2 focus:ring-accent-lime focus:ring-offset-2">
                  <div className={`h-full flex flex-col p-6 md:p-8 border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_currentColor] ${bgClass}`}>

                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="lime" className="bg-background text-foreground border-foreground shrink-0 uppercase tracking-widest text-[10px]">
                        {isRu ? project.category_ru : project.category_en}
                      </Badge>
                      <div className="h-8 w-8 rounded-full bg-background border-2 border-foreground flex items-center justify-center -mr-2 -mt-2 group-hover:bg-foreground group-hover:text-background transition-colors shrink-0">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3 font-display line-clamp-2">
                      {isRu ? project.title_ru : project.title_en}
                    </h3>

                    <p className="text-sm text-foreground/80 mb-6 line-clamp-3 flex-1">
                      {isRu ? project.summary_ru : project.summary_en}
                    </p>

                    <div className="mt-auto pt-4 border-t-2 border-foreground/10">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="inline-block px-2 py-1 bg-background border border-foreground text-[10px] font-medium uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="inline-block px-2 py-1 bg-background border border-foreground text-[10px] font-medium uppercase tracking-wider">
                            +{project.tags.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center py-20 border-2 border-dashed border-muted-foreground/30">
            <p className="text-muted-foreground italic">
              {isRu ? "В этой категории пока нет кейсов." : "No cases in this category yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cases;
