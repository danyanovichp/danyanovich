import { useTranslation } from "react-i18next";
import { ArrowRight, Download, Eye, FileText, ChevronRight, Bot, ExternalLink, Calendar, BarChart3, Brain, GraduationCap, Banknote, ClipboardList, Lightbulb, Target, Building2, FileStack, ShoppingCart, Briefcase } from "lucide-react";
import { LocalLink as Link } from "@/components/LocalLink";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";

const paidTemplates = [
    {
        title: "Second Brain OS",
        slug: "second-brain-os-903",
        price: "$39",
        category: { en: "Personal Productivity", ru: "Личная продуктивность" },
        tagline: {
            en: "A unified command center for thoughts, projects, and goals — where chaos turns into system, and random ideas become finished results.",
            ru: "Единый командный центр для мыслей, проектов и целей — где хаос превращается в систему, а случайные идеи становятся готовыми результатами."
        },
        features: {
            en: [
                "Inbox capture system — all inputs flow through a structured pipeline",
                "Three-tier hierarchy: Areas → Projects → Actions with relational linking",
                "Project tracking with status pipeline and energy expenditure indicator",
                "5-level urgency scale with weekly and monthly calendar views",
                "Knowledge base: Notes flow from draft to final, grouped by notebook and topic",
                "Resource management: Videos, articles, podcasts with status tracking",
                "Processing pipeline: Inbox → Processing → Action → Result"
            ],
            ru: [
                "Система захвата Inbox — все входящие проходят через структурированный конвейер",
                "Трёхуровневая иерархия: Области → Проекты → Действия со связями",
                "Отслеживание проектов: статусы, сроки, индикатор затрат энергии",
                "5-уровневая шкала срочности с недельным и месячным календарём",
                "База знаний: заметки от черновика до финала, сгруппированы по тетради и теме",
                "Управление ресурсами: видео, статьи, подкасты с отслеживанием статуса",
                "Конвейер обработки: Inbox → Обработка → Действие → Результат"
            ]
        },
        icon: Brain,
        colorClass: "text-pastel-purple",
        bgClass: "bg-pastel-purple/20",
    },
    {
        title: "Real Estate OS",
        slug: "real-estate-os-805",
        price: "$50",
        category: { en: "Real Estate", ru: "Недвижимость" },
        tagline: {
            en: "Manage your real estate business in one place. Track properties, contacts, deals through a pipeline, and schedule showings, calls, and meetings — all linked together.",
            ru: "Управляйте бизнесом по недвижимости в одном месте. Отслеживайте объекты, контакты, сделки через пайплайн и планируйте показы, звонки и встречи — всё связано."
        },
        features: {
            en: [
                "Properties database with price, area, type, status, photos, and map view",
                "Contacts database for buyers, sellers, agents with kanban by status",
                "Deals pipeline: Qualification → Showing → Offer → Contract → Closed/Lost",
                "Activities tracker for calls, meetings, showings with calendar and daily focus",
                "Dashboard showing hot deals, today's tasks, and new properties",
                "All databases linked by relations — every deal connects to property and client"
            ],
            ru: [
                "База объектов: цена, площадь, тип, статус, фото и карта",
                "База контактов: покупатели, продавцы, агенты с канбан по статусам",
                "Пайплайн сделок: Квалификация → Показ → Предложение → Договор → Закрыто",
                "Трекер активностей: звонки, встречи, показы с календарём",
                "Дашборд: горячие сделки, задачи на сегодня, новые объекты",
                "Все базы связаны — каждая сделка привязана к объекту и клиенту"
            ]
        },
        icon: Building2,
        colorClass: "text-pastel-blue",
        bgClass: "bg-pastel-blue/20",
    },
    {
        title: "Freelance OS",
        slug: "freelance-os-456",
        price: "$40",
        category: { en: "Freelance", ru: "Фриланс" },
        tagline: {
            en: "Manage freelance projects, clients, portfolio, and reviews in one workspace. Track active projects on a kanban and collect client reviews.",
            ru: "Управляйте фриланс-проектами, клиентами, портфолио и отзывами в одном пространстве. Отслеживайте проекты на канбане и собирайте отзывы."
        },
        features: {
            en: [
                "Projects database with status tracking and Active Projects kanban board",
                "Portfolio Showcase gallery for completed work",
                "Clients database with Active Clients view",
                "Knowledge Base for reference materials and guides",
                "Reviews collection with New Reviews (5-star) for marketing",
                "Main dashboard: Portfolio, Active Projects, Active Clients, New Reviews",
                "Simple workflow: add client → create project → link → complete → review"
            ],
            ru: [
                "База проектов с отслеживанием статусов и канбаном активных проектов",
                "Галерея портфолио для завершённых работ",
                "База клиентов с видом «Активные клиенты»",
                "База знаний для справочных материалов и руководств",
                "Коллекция отзывов: новые отзывы (5 звёзд) для маркетинга",
                "Главный дашборд: Портфолио, Проекты, Клиенты, Отзывы",
                "Простой флоу: клиент → проект → связь → завершение → отзыв"
            ]
        },
        icon: Briefcase,
        colorClass: "text-accent-coral",
        bgClass: "bg-accent-coral/20",
    },
    {
        title: "E-commerce OS",
        slug: "e-commerce-os-261",
        price: "$25",
        category: { en: "E-commerce", ru: "Электронная коммерция" },
        tagline: {
            en: "Manage your online store in one place — track products and stock, process orders on a kanban, plan marketing campaigns, and monitor income and expenses.",
            ru: "Управляйте интернет-магазином в одном месте — отслеживайте товары и остатки, обрабатывайте заказы на канбане, планируйте маркетинг и контролируйте финансы."
        },
        features: {
            en: [
                "Product Catalog with stock tracking and Low Stock alerts",
                "Order Management kanban — drag cards to update status",
                "Marketing Planner with promo calendar and campaign registry",
                "Finance Tracker — log income and expenses by category",
                "Platform Directory — manage sales channels with commission rates",
                "All databases connected — no switching between tools"
            ],
            ru: [
                "Каталог товаров с отслеживанием остатков и предупреждениями",
                "Канбан заказов — перетаскивайте карточки для обновления статуса",
                "Планер маркетинга: календарь промо и реестр кампаний",
                "Финансовый трекер: доходы и расходы по категориям",
                "Директория платформ: каналы продаж и комиссии",
                "Все базы связаны — не нужно переключаться между инструментами"
            ]
        },
        icon: ShoppingCart,
        colorClass: "text-accent-lime",
        bgClass: "bg-accent-lime/20",
    },
    {
        title: "Documents OS",
        slug: "documents-os-1",
        price: "$20",
        category: { en: "Documentation", ru: "Документооборот" },
        tagline: {
            en: "Store, track, and manage all your important documents in one place. Set expiration dates, get renewal alerts, attach scans, and log storage locations.",
            ru: "Храните, отслеживайте и управляйте всеми важными документами в одном месте. Уведомления об истечении, сканы, места хранения и история версий."
        },
        features: {
            en: [
                "Documents database with type, status, owner, expiration date, and file scans",
                "Expiration alerts — flags documents expiring within 30 days",
                "Storage Locations database — track where originals are kept",
                "Versions & Logs — log every change with version number and date",
                "Dashboard: Attention gallery, Recently Updated list, Statistics view",
                "Quick Start guide built right into the template"
            ],
            ru: [
                "База документов: тип, статус, владелец, срок действия, сканы",
                "Уведомления об истечении — помечает документы за 30 дней",
                "Места хранения: отслеживайте, где лежат оригиналы",
                "Версии и логи: каждое изменение с номером версии и датой",
                "Дашборд: галерея внимания, недавние обновления, статистика",
                "Руководство Quick Start встроено прямо в шаблон"
            ]
        },
        icon: FileStack,
        colorClass: "text-pastel-pink",
        bgClass: "bg-pastel-pink/20",
    },
    {
        title: "Ideas OS",
        slug: "ideas-os-484",
        price: "$10",
        category: { en: "Idea Management", ru: "Управление идеями" },
        tagline: {
            en: "Capture, score, and develop ideas with ICE scoring. Includes inbox, best ideas gallery, process kanban, roadmap timeline, and idea connections.",
            ru: "Захватывайте, оценивайте и развивайте идеи с ICE-скорингом. Inbox, галерея лучших идей, канбан процесса, roadmap и связи между идеями."
        },
        features: {
            en: [
                "ICE Scoring — auto-calculated from Impact, Confidence, Effort (1-10)",
                "Idea funnel: Inbox → Review → Incubator → In Progress → Done",
                "Best Ideas gallery showing ideas with ICE Score > 20",
                "Process kanban board for status management",
                "Roadmap timeline view",
                "Connections table — link ideas to each other for cross-pollination",
                "Categories for theme grouping and Resources for supporting materials"
            ],
            ru: [
                "ICE-скоринг: автоподсчёт на основе Влияния, Уверенности и Усилий",
                "Воронка идей: Inbox → Обзор → Инкубатор → В работе → Готово",
                "Галерея лучших идей (ICE > 20)",
                "Канбан-доска для управления статусами",
                "Roadmap — таймлайн идей",
                "Таблица связей — связывайте идеи друг с другом",
                "Категории для группировки по темам и База ресурсов"
            ]
        },
        icon: Lightbulb,
        colorClass: "text-pastel-lavender",
        bgClass: "bg-pastel-lavender/20",
    },
    {
        title: "90 Day Planning",
        slug: "90-day-planning",
        price: "$5",
        category: { en: "Planning & Goals", ru: "Планирование и цели" },
        tagline: {
            en: "Connect your quarterly goals to projects and tasks — all in one dashboard. Daily focus, task inbox, project timeline, kanban, and mood journal.",
            ru: "Свяжите квартальные цели с проектами и задачами — всё в одном дашборде. Фокус дня, инбокс задач, таймлайн, канбан и дневник настроения."
        },
        features: {
            en: [
                "4 connected databases: Goals, Projects, Tasks, Journal",
                "Three-level hierarchy: Goals → Projects → Tasks",
                "Automatic progress tracking — rolls up from tasks to goals",
                "Daily Focus view — today's tasks grouped by priority",
                "Task Inbox for undated tasks",
                "Project timeline and kanban boards",
                "Daily journal with mood tracking and calendar views",
                "Dashboard homepage with Quick Start guide"
            ],
            ru: [
                "4 связанные базы: Цели, Проекты, Задачи, Дневник",
                "Трёхуровневая иерархия: Цели → Проекты → Задачи",
                "Автоматическое отслеживание прогресса от задач к целям",
                "Фокус дня — задачи на сегодня по приоритету",
                "Inbox для задач без даты",
                "Таймлайн проектов и канбан-доски",
                "Дневник настроения с календарём",
                "Дашборд с руководством Quick Start"
            ]
        },
        icon: Target,
        colorClass: "text-pastel-blue",
        bgClass: "bg-pastel-blue/20",
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

            {/* Premium Templates Section */}
            <section className="py-16 md:py-24 border-t-2 border-foreground">
                <div className="container">
                    <div className="max-w-6xl mx-auto">
                        <AnimatedSection delay={100}>
                            <div className="text-center mb-12">
                                <Badge variant="outline" className="mb-4 text-sm px-4 py-1 uppercase tracking-wider border-pastel-pink text-pastel-pink">
                                    {isRu ? "Премиум на Notion Marketplace" : "Premium on Notion Marketplace"}
                                </Badge>
                                <h2 className="text-2xl md:text-3xl font-bold font-display mb-4">
                                    {isRu ? "Платные шаблоны" : "Premium Templates"}
                                </h2>
                                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                    {isRu
                                        ? "Полные операционные системы для вашего бизнеса и продуктивности. Каждая — с подробным описанием и ссылкой на покупку."
                                        : "Complete operating systems for your business and productivity. Each with a full description and purchase link."}
                                </p>
                            </div>
                        </AnimatedSection>

                        <div className="space-y-8">
                            {paidTemplates.map((template, i) => (
                                <AnimatedSection key={template.slug} delay={150 + i * 50}>
                                    <Card className="rounded-none border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] bg-card hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_currentColor] transition-all overflow-hidden group">
                                        <CardContent className="p-6 md:p-8 relative z-10">
                                            {/* Header */}
                                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                                                <div className="flex items-start gap-4">
                                                    <div className={`p-3 rounded-full ${template.bgClass} shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                                        <template.icon className={`w-6 h-6 ${template.colorClass}`} />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <h3 className="text-xl md:text-2xl font-bold font-display group-hover:text-pastel-blue transition-colors">
                                                                {template.title}
                                                            </h3>
                                                            <Badge className="bg-pastel-pink/20 text-pastel-pink border-pastel-pink/30 text-sm font-bold">
                                                                {template.price}
                                                            </Badge>
                                                        </div>
                                                        <Badge variant="outline" className="text-xs uppercase tracking-wider">
                                                            {isRu ? template.category.ru : template.category.en}
                                                        </Badge>
                                                    </div>
                                                </div>

                                                {/* Buy Button */}
                                                <a
                                                    href={`https://www.notion.com/templates/${template.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center shrink-0 px-6 py-3 bg-pastel-pink text-white font-bold uppercase tracking-wider text-sm border-2 border-pastel-pink hover:bg-transparent hover:text-pastel-pink transition-colors group/btn"
                                                >
                                                    {isRu ? "Купить" : "Buy"} {template.price}
                                                    <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                                </a>
                                            </div>

                                            {/* Tagline */}
                                            <p className="text-base md:text-lg text-foreground/80 mb-6 leading-relaxed">
                                                {isRu ? template.tagline.ru : template.tagline.en}
                                            </p>

                                            {/* Features */}
                                            <div className="mb-6">
                                                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">
                                                    {isRu ? "Что внутри" : "What's inside"}
                                                </h4>
                                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    {(isRu ? template.features.ru : template.features.en).map((feature, fi) => (
                                                        <li key={fi} className="flex items-start gap-2 text-sm text-foreground/70">
                                                            <span className={`shrink-0 mt-1 w-1.5 h-1.5 rounded-full ${template.bgClass} ${template.colorClass}`} style={{backgroundColor: 'currentColor', opacity: 0.6}} />
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Bottom actions */}
                                            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-foreground/10">
                                                <a
                                                    href={`https://www.notion.com/templates/${template.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center px-5 py-2.5 bg-foreground text-background font-bold uppercase tracking-wider text-xs border-2 border-foreground hover:bg-transparent hover:text-foreground transition-colors w-full sm:w-auto"
                                                >
                                                    {isRu ? "Предпросмотр на Notion" : "Preview on Notion"}
                                                    <ExternalLink className="ml-2 w-3.5 h-3.5" />
                                                </a>
                                                <a
                                                    href={`https://www.notion.com/templates/${template.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center px-5 py-2.5 border-2 border-pastel-pink text-pastel-pink hover:bg-pastel-pink hover:text-white font-bold uppercase tracking-wider text-xs transition-colors w-full sm:w-auto"
                                                >
                                                    {isRu ? "Купить шаблон" : "Get Template"}
                                                    <ArrowRight className="ml-2 w-3.5 h-3.5" />
                                                </a>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </AnimatedSection>
                            ))}
                        </div>

                        {/* Browse All Link */}
                        <AnimatedSection delay={600}>
                            <div className="mt-10 text-center">
                                <a
                                    href="https://www.notion.com/templates?q=danyanovich"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-sm font-bold uppercase tracking-wider hover:text-pastel-blue transition-colors group"
                                >
                                    {isRu ? "Посмотреть все 170 шаблонов на Notion" : "Browse all 170 templates on Notion"}
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