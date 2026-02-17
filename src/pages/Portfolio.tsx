import { useTranslation } from "react-i18next";
import { ChevronDown, Check, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import WorkflowDiagram from "@/components/WorkflowDiagram";
import { portfolioProjects } from "@/data/portfolioProjects";

const Portfolio = () => {
  const { i18n } = useTranslation();
  const isRu = i18n.language === "ru";

  return (
    <div className="min-h-screen">
      <SEO
        titleRu="Портфолио | Дэн Янович"
        titleEn="Portfolio | Dan Yanovich"
        descriptionRu="Реализованные проекты: AI-автоматизации, агенты, интеграции. Zapier, OpenAI, Notion, ClickUp, Telegram."
        descriptionEn="Completed projects: AI automations, agents, integrations. Zapier, OpenAI, Notion, ClickUp, Telegram."
        url="https://danyanovich.com/portfolio"
      />

      {/* Hero */}
      <section className="py-16 md:py-20 border-b border-border/20">
        <div className="container">
          <AnimatedSection className="max-w-3xl mx-auto text-center space-y-4">
            <Badge variant="outline" className="mb-2">
              <Briefcase className="h-3 w-3 mr-1" />
              {isRu ? "Реализованные проекты" : "Completed Projects"}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold">
              {isRu ? "Портфолио" : "Portfolio"}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              {isRu
                ? "AI-автоматизации, агенты и интеграции для бизнеса"
                : "AI automations, agents and integrations for business"}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects */}
      <section className="py-12 md:py-16">
        <div className="container space-y-10">
          {portfolioProjects.map((project, idx) => (
            <AnimatedSection key={project.id}>
              <Card className="glass-card overflow-hidden">
                <CardHeader className="space-y-4 pb-4">
                  {/* Title row */}
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="secondary">
                      {isRu ? project.category_ru : project.category_en}
                    </Badge>
                    <h2 className="text-xl md:text-2xl font-bold">
                      {isRu ? project.title_ru : project.title_en}
                    </h2>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-4xl">
                    {isRu ? project.summary_ru : project.summary_en}
                  </p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Workflow Diagram */}
                  <div>
                    <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
                      {isRu ? "Архитектура" : "Architecture"}
                    </h3>
                    <WorkflowDiagram
                      nodes={project.workflow.nodes}
                      connections={project.workflow.connections}
                    />
                  </div>

                  {/* Detail Accordion */}
                  <Accordion type="multiple" className="space-y-2">
                    {/* Features */}
                    {project.features.map((feature, fi) => (
                      <AccordionItem
                        key={fi}
                        value={`${project.id}-feat-${fi}`}
                        className="border border-border/20 rounded-xl px-4 bg-card/30 backdrop-blur-sm"
                      >
                        <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3">
                          {isRu ? feature.title_ru : feature.title_en}
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 pb-2">
                            {(isRu ? feature.items_ru : feature.items_en).map(
                              (item, ii) => (
                                <li
                                  key={ii}
                                  className="flex items-start gap-2 text-sm text-muted-foreground"
                                >
                                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                  {item}
                                </li>
                              )
                            )}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}

                    {/* Results */}
                    <AccordionItem
                      value={`${project.id}-results`}
                      className="border border-border/20 rounded-xl px-4 bg-card/30 backdrop-blur-sm"
                    >
                      <AccordionTrigger className="text-sm font-semibold hover:no-underline py-3">
                        {isRu ? "Результаты" : "Results"}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 pb-2">
                          {(isRu
                            ? project.results_ru
                            : project.results_en
                          ).map((r, ri) => (
                            <li
                              key={ri}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
