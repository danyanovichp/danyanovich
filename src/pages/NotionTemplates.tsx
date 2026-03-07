import { useTranslation } from "react-i18next";
import { ArrowRight, Download, Eye, FileText, ChevronRight, Bot } from "lucide-react";
import { LocalLink as Link } from "@/components/LocalLink";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";

const NotionTemplates = () => {
    const { t, i18n } = useTranslation();
    const isRu = i18n.language === 'ru';

    const stats = [
        {
            value: "88",
            labelRu: "Шаблонов выпущено",
            labelEn: "Templates Released",
            icon: FileText,
            colorClass: "text-pastel-blue",
            bgClass: "bg-pastel-blue/20"
        },
        {
            value: "4132",
            labelRu: "Просмотров",
            labelEn: "Views",
            icon: Eye,
            colorClass: "text-pastel-pink",
            bgClass: "bg-pastel-pink/20"
        },
        {
            value: "1192",
            labelRu: "Скачиваний",
            labelEn: "Downloads",
            icon: Download,
            colorClass: "text-accent-lime",
            bgClass: "bg-accent-lime/20"
        },
        {
            value: "3",
            labelRu: "Создано ИИ агентов",
            labelEn: "AI Agents Created",
            icon: Bot,
            colorClass: "text-pastel-lavender",
            bgClass: "bg-pastel-lavender/20"
        },
        {
            value: "524",
            labelRu: "Скачиваний агентов",
            labelEn: "Agent Downloads",
            icon: Download,
            colorClass: "text-accent-coral",
            bgClass: "bg-accent-coral/20"
        }
    ];

    return (
        <PageTransition>
            <SEO
                titleRu="Рабочие пространства Notion | Дэн Янович"
                titleEn="Notion Templates | Dan Yanovich"
                descriptionRu="Готовые рабочие пространства и шаблоны Notion для личной продуктивности и бизнеса."
                descriptionEn="Ready-made Notion workspaces and templates for personal productivity and business."
            />

            {/* Hero Section */}
            <section className="pt-32 pb-16 md:pt-40 md:pb-24 border-b-2 border-foreground relative overflow-hidden bg-background">
                <div className="container relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <AnimatedSection>
                            <Badge variant="outline" className="mb-4 text-sm px-4 py-1 uppercase tracking-wider">
                                {isRu ? "Экосистема" : "Ecosystem"}
                            </Badge>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight font-display mb-6 leading-tight">
                                {isRu ? "Рабочие пространства " : "Notion Workspace "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pastel-pink via-pastel-purple to-pastel-blue">
                                    Notion
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground mx-auto font-light leading-relaxed max-w-2xl">
                                {isRu
                                    ? "Готовые системы для замены хаоса в таблицах на централизованную операционную платформу."
                                    : "Ready-made systems to replace spreadsheet chaos with a centralized operating platform."}
                            </p>
                        </AnimatedSection>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-1/4 left-10 w-24 h-24 bg-pastel-pink/20 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-pastel-blue/20 rounded-full blur-3xl" />
            </section>

            {/* Dashboard Stats */}
            <section className="py-16 md:py-24">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <AnimatedSection delay={100}>
                            <h2 className="text-2xl md:text-3xl font-bold font-display text-center mb-10">
                                {isRu ? "Статистика проектов" : "Project Statistics"}
                            </h2>

                            <div className="flex flex-wrap justify-center gap-6">
                                {stats.map((stat, i) => (
                                    <Card key={i} className="flex-1 min-w-[250px] max-w-[320px] rounded-none border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] bg-card hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_currentColor] transition-all overflow-hidden relative group">
                                        <CardContent className="p-8 flex flex-col items-center justify-center text-center relative z-10">
                                            <div className={`p-4 rounded-full ${stat.bgClass} mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                                                <stat.icon className={`w-8 h-8 ${stat.colorClass}`} />
                                            </div>
                                            <div className="text-5xl md:text-6xl font-black font-display tracking-tight mb-2">
                                                {stat.value}
                                            </div>
                                            <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                                                {isRu ? stat.labelRu : stat.labelEn}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-muted/30 border-t-2 border-foreground">
                <div className="container">
                    <div className="max-w-3xl mx-auto">
                        <AnimatedSection delay={200}>
                            <Card className="rounded-none border-2 border-foreground shadow-[8px_8px_0px_0px_currentColor] bg-pastel-yellow overflow-hidden relative">
                                <CardContent className="p-8 md:p-12 text-center relative z-10 space-y-6">
                                    <h3 className="text-3xl md:text-4xl font-bold font-display text-foreground">
                                        {isRu ? "Перейти к библиотеке шаблонов" : "Go to Templates Library"}
                                    </h3>
                                    <p className="text-foreground/80 font-medium max-w-xl mx-auto text-lg">
                                        {isRu
                                            ? "Все мои шаблоны и системы размещены на официальной странице моего профиля в Notion."
                                            : "All my templates and systems are hosted on my official Notion profile page."}
                                    </p>

                                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                                        <a
                                            href="https://www.notion.com/@danyanovich"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-bold uppercase tracking-wider text-sm border-2 border-foreground hover:bg-transparent hover:text-foreground transition-colors group w-full sm:w-auto"
                                        >
                                            {isRu ? "Смотреть шаблоны" : "View Templates"}
                                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </CardContent>

                                {/* Decorative dots pattern */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                            </Card>
                        </AnimatedSection>

                        <AnimatedSection delay={300}>
                            <div className="mt-12 text-center">
                                <Link to="/" className="inline-flex items-center text-sm font-bold uppercase tracking-wider hover:text-pastel-blue transition-colors group">
                                    <ChevronRight className="w-4 h-4 mr-1 rotate-180 group-hover:-translate-x-1 transition-transform" />
                                    {isRu ? "Вернуться на главную" : "Back to Home"}
                                </Link>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </PageTransition>
    );
};

export default NotionTemplates;
