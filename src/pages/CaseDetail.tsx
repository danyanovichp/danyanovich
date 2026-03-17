import React from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowUpRight, Briefcase, CalendarDays, Check, ChevronLeft, MapPin, Sparkles } from "lucide-react";
import { LocalLink as Link } from "@/components/LocalLink";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import WorkflowDiagram from "@/components/WorkflowDiagram";
import { portfolioProjects } from "@/data/portfolioProjects";

const CaseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const isRu = i18n.language === "ru";

    const project = portfolioProjects.find((p) => p.id === id);
    const projectFeatures = project?.features ?? [];
    const projectResults = isRu ? project?.results_ru ?? [] : project?.results_en ?? [];
    const projectSections = project?.sections ?? [];
    const hasWorkflow = Boolean(project?.workflow?.nodes.length);
    const metaItems = project
        ? [
            project.role_ru || project.role_en
                ? {
                    icon: Briefcase,
                    value: isRu ? project.role_ru : project.role_en,
                }
                : null,
            project.period_ru || project.period_en
                ? {
                    icon: CalendarDays,
                    value: isRu ? project.period_ru : project.period_en,
                }
                : null,
            project.location_ru || project.location_en
                ? {
                    icon: MapPin,
                    value: isRu ? project.location_ru : project.location_en,
                }
                : null,
            project.format_ru || project.format_en
                ? {
                    icon: Sparkles,
                    value: isRu ? project.format_ru : project.format_en,
                }
                : null,
        ].filter(Boolean) as { icon: typeof Briefcase; value: string | undefined }[]
        : [];

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-4">{isRu ? "Кейс не найден" : "Case not found"}</h1>
                <Button onClick={() => navigate(`/${i18n.language}/cases`)} variant="outline">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    {isRu ? "Вернуться к кейсам" : "Back to Cases"}
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <SEO
                titleRu={`${project.title_ru} | Кейс | Дэн Янович`}
                titleEn={`${project.title_en} | Case | Dan Yanovich`}
                descriptionRu={project.summary_ru}
                descriptionEn={project.summary_en}
                url={`/cases/${project.id}`}
                type="article"
            />

            <div className="container max-w-5xl mx-auto py-12 md:py-20 px-4 space-y-10">
                {/* Back Button */}
                <div>
                    <Button onClick={() => navigate(-1)} variant="ghost" className="pl-0 hover:bg-transparent hover:underline text-muted-foreground">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        {isRu ? "Назад к кейсам" : "Back to cases"}
                    </Button>
                </div>

                {/* Header */}
                <div className="space-y-4">
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

                    {project.lead_ru || project.lead_en ? (
                        <div className="max-w-3xl border-2 border-foreground bg-pastel-yellow/25 shadow-[4px_4px_0px_0px_currentColor] p-5">
                            <p className="text-sm md:text-base leading-relaxed">
                                {isRu ? project.lead_ru : project.lead_en}
                            </p>
                        </div>
                    ) : null}

                    {metaItems.length > 0 ? (
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {metaItems.map((item) => (
                                <div
                                    key={item.value}
                                    className="flex items-center gap-3 border-2 border-foreground bg-card px-4 py-3 shadow-[4px_4px_0px_0px_currentColor]"
                                >
                                    <item.icon className="h-4 w-4 shrink-0" />
                                    <span className="text-sm font-medium">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>

                {/* Workflow Diagram */}
                {hasWorkflow ? (
                    <div className="space-y-3">
                        <h3 className="text-sm md:text-base font-semibold uppercase tracking-widest text-muted-foreground font-display">
                            {isRu ? "Архитектура" : "Architecture"}
                        </h3>
                        <div className="border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] bg-card p-4">
                            <WorkflowDiagram
                                nodes={project.workflow!.nodes}
                                connections={project.workflow!.connections}
                            />
                        </div>
                    </div>
                ) : null}

                {projectSections.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2">
                        {projectSections.map((section, index) => (
                            <div
                                key={`${section.title_en}-${index}`}
                                className="rounded-none bg-card border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] p-5 space-y-4"
                            >
                                <h3 className="text-lg font-semibold font-display">
                                    {isRu ? section.title_ru : section.title_en}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {isRu ? section.body_ru : section.body_en}
                                </p>
                                {((isRu ? section.bullets_ru : section.bullets_en) ?? []).length > 0 ? (
                                    <ul className="space-y-2">
                                        {((isRu ? section.bullets_ru : section.bullets_en) ?? []).map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-2 text-sm text-muted-foreground"
                                            >
                                                <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground/40 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}
                            </div>
                        ))}
                    </div>
                ) : null}

                {/* Features Grid */}
                {projectFeatures.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                        {projectFeatures.map((feature, fi) => (
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
                ) : null}

                {project.related_cases && project.related_cases.length > 0 ? (
                    <div className="space-y-4">
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-display">
                            {isRu ? "Связанные кейсы" : "Related Cases"}
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            {project.related_cases.map((related) => (
                                <Link
                                    key={related.caseId}
                                    to={`/cases/${related.caseId}`}
                                    className="group rounded-none bg-card border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] p-5 space-y-3 transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_currentColor]"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <h3 className="text-base font-semibold font-display">
                                            {isRu ? related.title_ru : related.title_en}
                                        </h3>
                                        <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {isRu ? related.blurb_ru : related.blurb_en}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : null}

                {project.external_links && project.external_links.length > 0 ? (
                    <div className="space-y-4">
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-display">
                            {isRu ? "Примеры работ" : "Project Links"}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {project.external_links.map((item) => (
                                <a
                                    key={item.url}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 border-2 border-foreground bg-card px-4 py-2 text-sm font-medium shadow-[4px_4px_0px_0px_currentColor] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_0px_currentColor]"
                                >
                                    {item.label}
                                    <ArrowUpRight className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>
                ) : null}

                {project.tools_used && project.tools_used.length > 0 ? (
                    <div className="space-y-4">
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-display">
                            {isRu ? "Инструменты" : "Tools Used"}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {project.tools_used.map((tool) => (
                                <Badge key={tool} variant="outline" className="text-xs font-normal">
                                    {tool}
                                </Badge>
                            ))}
                        </div>
                    </div>
                ) : null}

                {/* Results */}
                {projectResults.length > 0 ? (
                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-display">
                            {isRu ? "Результаты" : "Results"}
                        </p>
                        <ul className="grid md:grid-cols-2 gap-2">
                            {projectResults.map(
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
                ) : null}
            </div>
        </div>
    );
};

export default CaseDetail;
