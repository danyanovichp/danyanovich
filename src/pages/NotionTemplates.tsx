import { useTranslation } from "react-i18next";
import { ArrowRight, Download, Eye, FileText, ChevronRight, Bot, ExternalLink, Calendar, BarChart3, Brain, GraduationCap, Banknote, ClipboardList, LayoutGrid, Sparkles, BookOpen, Briefcase, DollarSign, Target, TrendingUp, Users, Zap } from "lucide-react";
import { LocalLink as Link } from "@/components/LocalLink";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";

const featuredTemplates = [
    {
        title: "Content Calendar",
        slug: "content-calendar-561",
        category: { en: "Marketing", ru: "Маркетинг" },
        description: {
            en: "Plan and organize your content strategy with a structured calendar system.",
            ru: "Планируйте и организуйте контент-стратегию с помощью структурированной системы календаря."
        },
        price: "Free",
        icon: Calendar,
        colorClass: "text-pastel-pink",
        bgClass: "bg-pastel-pink/20",
    },
    {
        title: "Sprints (Agile/Scrum)",
        slug: "sprints-agile-scrum",
        category: { en: "Project Management", ru: "Управление проектами" },
        description: {
            en: "Manage Agile sprints and Scrum workflows with this structured template.",
            ru: "Управляйте Agile-спринтами и Scrum-процессами с помощью этого шаблона."
        },
        price: "Free",
        icon: BarChart3,
        colorClass: "text-pastel-blue",
        bgClass: "bg-pastel-blue/20",
    },
    {
        title: "Knowledge Base (Second Brain)",
        slug: "knowledge-base-second-brain",
        category: { en: "Productivity", ru: "Продуктивность" },
        description: {
            en: "Build your personal knowledge management system — a true Second Brain in Notion.",
            ru: "Постройте персональную систему управления знаниями — настоящий Second Brain в Notion."
        },
        price: "Free",
        icon: Brain,
        colorClass: "text-pastel-purple",
        bgClass: "bg-pastel-purple/20",
    },
    {
        title: "Courses: Modules and Lessons",
        slug: "courses-modules-and-lessons",
        category: { en: "Education", ru: "Образование" },
        description: {
            en: "Organize your course content with modules, lessons, and progress tracking.",
            ru: "Организуйте содержание курса с модулями, уроками и отслеживанием прогресса."
        },
        price: "Free",
        icon: GraduationCap,
        colorClass: "text-pastel-lavender",
        bgClass: "bg-pastel-lavender/20",
    },
    {
        title: "Loan and Borrowing Tracker",
        slug: "loan-and-borrowing-tracker",
        category: { en: "Finance", ru: "Финансы" },
        description: {
            en: "Track loans, borrowings, and payments in one organized workspace.",
            ru: "Отслеживайте кредиты, займы и платежи в одном организованном пространстве."
        },
        price: "Free",
        icon: Banknote,
        colorClass: "text-accent-lime",
        bgClass: "bg-accent-lime/20",
    },
    {
        title: "Weekly Reports",
        slug: "weekly-reports",
        category: { en: "Business", ru: "Бизнес" },
        description: {
            en: "Create and manage structured weekly reports for your team.",
            ru: "Создавайте и управляйте структурированными еженедельными отчётами для команды."
        },
        price: "Free",
        icon: ClipboardList,
        colorClass: "text-accent-coral",
        bgClass: "bg-accent-coral/20",
    },
];

const NotionTemplates = () => {
    const { t, i18n } = useTranslation();
    const isRu = i18n.language === 'ru';

    const stats = [
        {
            value: "181",
            labelRu: "Шаблонов выпущено",
            labelEn: "Templates Released",
            icon: FileText,
            colorClass: "text-pastel-blue",
            bgClass: "bg-pastel-blue/20"
        },
        {
            value: "4464",
            labelRu: "Просмотров",
            labelEn: "Views",
            icon: Eye,
            colorClass: "text-pastel-pink",
            bgClass: "bg-pastel-pink/20"
        },
        {
            value: "1288",
            labelRu: "Скачиваний",
            labelEn: "Downloads",
            icon: Download,
            colorClass: "text-accent-lime",
            bgClass: "bg-accent-lime/20"
        },
        {
            value: "12",
            labelRu: "Создано ИИ агентов",
            labelEn: "AI Agents Created",
            icon: Bot,
            colorClass: "text-pastel-lavender",
            bgClass: "bg-pastel-lavender/20"
        },
        {
            value: "753",
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

            {/* Featured Templates Section */}
            <section className="py-16 md:py-24 border-t-2 border-foreground">
                <div className="container">
                    <div className="max-w-6xl mx-auto">
                        <AnimatedSection delay={100}>
                            <div className="text-center mb-12">
                                <Badge variant="outline" className="mb-4 text-sm px-4 py-1 uppercase tracking-wider">
                                    {isRu ? "На Notion Marketplace" : "On Notion Marketplace"}
                                </Badge>
                                <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
                                    {isRu ? "Популярные шаблоны" : "Featured Templates"}
                                </h2>
                                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                    {isRu
                                        ? "Нажмите на карточку, чтобы посмотреть шаблон и получить его на Notion Marketplace."
                                        : "Click on a card to preview the template and get it on the Notion Marketplace."}
                                </p>
                            </div>
                        </AnimatedSection>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredTemplates.map((template, i) => (
                                <AnimatedSection key={template.slug} delay={150 + i * 50}>
                                    <Card className="rounded-none border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] bg-card hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_currentColor] transition-all overflow-hidden group h-full flex flex-col">
                                        <CardContent className="p-6 flex flex-col flex-1 relative z-10">
                                            {/* Header: Icon + Category */}
                                            <div className="flex items-start justify-between mb-4">
                                                <div className={`p-3 rounded-full ${template.bgClass} group-hover:scale-110 transition-transform duration-300`}>
                                                    <template.icon className={`w-6 h-6 ${template.colorClass}`} />
                                                </div>
                                                <Badge variant="outline" className="text-xs uppercase tracking-wider">
                                                    {isRu ? template.category.ru : template.category.en}
                                                </Badge>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-xl font-bold font-display mb-2 group-hover:text-pastel-blue transition-colors">
                                                {template.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-sm text-muted-foreground mb-4 flex-1 leading-relaxed">
                                                {isRu ? template.description.ru : template.description.en}
                                            </p>

                                            {/* Price Badge + Buttons */}
                                            <div className="flex items-center gap-2 mb-4">
                                                <Badge className={`${template.price === "Free" ? "bg-accent-lime/20 text-accent-lime border-accent-lime/30" : "bg-pastel-pink/20 text-pastel-pink border-pastel-pink/30"} text-xs font-bold uppercase`}>
                                                    {template.price === "Free"
                                                        ? (isRu ? "Бесплатно" : "Free")
                                                        : template.price}
                                                </Badge>
                                            </div>

                                            <div className="flex gap-2 mt-auto">
                                                {/* View on Marketplace */}
                                                <a
                                                    href={`https://www.notion.com/templates/${template.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center flex-1 px-4 py-2.5 bg-foreground text-background font-bold uppercase tracking-wider text-xs border-2 border-foreground hover:bg-transparent hover:text-foreground transition-colors group/btn"
                                                >
                                                    {isRu ? "Посмотреть" : "Preview"}
                                                    <ExternalLink className="ml-2 w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                                </a>

                                                {/* Get / Buy Template */}
                                                <a
                                                    href={`https://www.notion.com/templates/${template.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={`inline-flex items-center justify-center flex-1 px-4 py-2.5 font-bold uppercase tracking-wider text-xs border-2 transition-colors ${
                                                        template.price === "Free"
                                                            ? "border-accent-lime text-accent-lime hover:bg-accent-lime hover:text-background"
                                                            : "border-pastel-pink text-pastel-pink hover:bg-pastel-pink hover:text-background"
                                                    }`}
                                                >
                                                    {template.price === "Free"
                                                        ? (isRu ? "Получить" : "Get Template")
                                                        : (isRu ? "Купить" : "Buy")}
                                                    <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                                </a>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </AnimatedSection>
                            ))}
                        </div>

                        {/* Browse All Templates Link */}
                        <AnimatedSection delay={500}>
                            <div className="mt-10 text-center">
                                <a
                                    href="https://www.notion.com/templates?q=danyanovich"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-sm font-bold uppercase tracking-wider hover:text-pastel-blue transition-colors group"
                                >
                                    {isRu ? "Посмотреть все 181 шаблон на Notion" : "Browse all 181 templates on Notion"}
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    <ExternalLink className="ml-1 w-3.5 h-3.5" />
                                </a>
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