import React from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { Check, ChevronLeft } from "lucide-react";
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

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-4">{isRu ? "Кейс не найден" : "Case not found"}</h1>
                <Button onClick={() => navigate("/cases")} variant="outline">
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
                url={`https://danyanovich.com/cases/${project.id}`}
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
                </div>

                {/* Workflow Diagram */}
                <div className="space-y-3">
                    <h3 className="text-sm md:text-base font-semibold uppercase tracking-widest text-muted-foreground font-display">
                        {isRu ? "Архитектура" : "Architecture"}
                    </h3>
                    <div className="border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] bg-card p-4">
                        <WorkflowDiagram
                            nodes={project.workflow.nodes}
                            connections={project.workflow.connections}
                        />
                    </div>
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
        </div>
    );
};

export default CaseDetail;
