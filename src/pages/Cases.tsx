import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import WorkflowDiagram from "@/components/WorkflowDiagram";
import DecorativeBlobs from "@/components/DecorativeBlobs";
import { portfolioProjects } from "@/data/portfolioProjects";

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

  return (
    <div className="min-h-screen">
      <SEO
        titleRu="Кейсы | Дэн Янович"
        titleEn="Cases | Dan Yanovich"
        descriptionRu="Реализованные проекты: AI-автоматизации, агенты, интеграции."
        descriptionEn="Completed projects: AI automations, agents, integrations."
        url="https://danyanovich.com/cases"
      />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <DecorativeBlobs variant="hero" />
        <div className="container relative z-10">
          <AnimatedSection className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight font-display">
              {isRu ? "Кейсы" : "Cases"}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
              {isRu
                ? "AI-автоматизации, агенты и интеграции для бизнеса"
                : "AI automations, agents and integrations for business"}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects */}
      <section className="pb-24">
        <div className="container max-w-5xl space-y-16">
          {portfolioProjects.map((project, index) => (
            <AnimatedSection key={project.id}>
              <Card className={`overflow-hidden p-0 border-0 ${pastelBgClasses[index % pastelBgClasses.length]}`}>
                <CardContent className="p-8 md:p-10 space-y-8">
                  {/* Header */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge variant="lime">
                        {isRu ? project.category_ru : project.category_en}
                      </Badge>
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-display">
                        {isRu ? project.title_ru : project.title_en}
                      </h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs font-normal">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <p className="text-muted-foreground leading-relaxed max-w-3xl">
                      {isRu ? project.summary_ru : project.summary_en}
                    </p>
                  </div>

                  {/* Workflow Diagram */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 font-display">
                      {isRu ? "Архитектура" : "Architecture"}
                    </p>
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
                        className="rounded-2xl bg-background/60 backdrop-blur-sm p-5 space-y-3"
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
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Cases;
