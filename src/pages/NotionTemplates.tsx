import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Download,
  Eye,
  ChevronRight,
  Bot,
  ExternalLink,
  FileText,
  Search,
} from "lucide-react";
import { LocalLink as Link } from "@/components/LocalLink";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import {
  allTemplates,
  categoryGroups,
  type NotionTemplate,
} from "@/data/notionTemplates";

// Icon map: string name -> lucide component (for data-driven rendering)
import {
  Brain,
  Building2,
  Briefcase,
  ShoppingCart,
  FileStack,
  Lightbulb,
  Target,
  Heart,
  Clock,
  FlaskConical,
  TrendingUp,
  Truck,
  CalendarOff,
  Receipt,
  MessageSquareText,
  ListTodo,
  UtensilsCrossed,
  CalendarDays,
  Timer,
  GraduationCap,
  Shield,
  Sparkles,
  Users,
  RotateCcw,
  CheckCircle,
  PieChart,
  Headphones,
  CheckSquare,
  BookOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Building2,
  Briefcase,
  ShoppingCart,
  FileStack,
  Lightbulb,
  Target,
  Heart,
  Clock,
  Bot,
  FlaskConical,
  TrendingUp,
  Truck,
  CalendarOff,
  Receipt,
  MessageSquareText,
  ListTodo,
  UtensilsCrossed,
  CalendarDays,
  Timer,
  GraduationCap,
  Shield,
  Sparkles,
  Users,
  RotateCcw,
  CheckCircle,
  PieChart,
  Headphones,
  CheckSquare,
  BookOpen,
};

const NotionTemplates = () => {
  const { i18n } = useTranslation();
  const isRu = i18n.language === "ru";

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">(
    "all"
  );

  const filteredTemplates = useMemo(() => {
    let result = allTemplates;

    // Category filter
    if (activeCategory !== "all") {
      result = result.filter((t) => t.categoryGroup === activeCategory);
    }

    // Price filter
    if (priceFilter === "free") {
      result = result.filter((t) => t.price === 0);
    } else if (priceFilter === "paid") {
      result = result.filter((t) => t.price > 0);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.en.toLowerCase().includes(q) ||
          t.category.en.toLowerCase().includes(q)
      );
    }

    // Sort: paid first (by price desc), then free (by name)
    result = [...result].sort((a, b) => {
      if (a.price > 0 && b.price === 0) return -1;
      if (a.price === 0 && b.price > 0) return 1;
      if (a.price > 0 && b.price > 0) return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [activeCategory, searchQuery, priceFilter]);

  const stats = [
    {
      value: "172",
      labelRu: "Шаблонов выпущено",
      labelEn: "Templates Released",
      icon: FileText,
      colorClass: "text-pastel-blue",
      bgClass: "bg-pastel-blue/20",
    },
    {
      value: "4464",
      labelRu: "Просмотров",
      labelEn: "Views",
      icon: Eye,
      colorClass: "text-pastel-pink",
      bgClass: "bg-pastel-pink/20",
    },
    {
      value: "1288",
      labelRu: "Скачиваний",
      labelEn: "Downloads",
      icon: Download,
      colorClass: "text-accent-lime",
      bgClass: "bg-accent-lime/20",
    },
    {
      value: "12",
      labelRu: "Создано ИИ агентов",
      labelEn: "AI Agents Created",
      icon: Bot,
      colorClass: "text-pastel-lavender",
      bgClass: "bg-pastel-lavender/20",
    },
    {
      value: "753",
      labelRu: "Скачиваний агентов",
      labelEn: "Agent Downloads",
      icon: Download,
      colorClass: "text-accent-coral",
      bgClass: "bg-accent-coral/20",
    },
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
              <Badge
                variant="outline"
                className="mb-4 text-sm px-4 py-1 uppercase tracking-wider"
              >
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
        <div className="absolute top-1/4 left-10 w-24 h-24 bg-pastel-pink/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-pastel-blue/20 rounded-full blur-3xl" />
      </section>

      {/* Stats */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              {stats.map((stat, i) => (
                <Card
                  key={i}
                  className="flex-1 min-w-[180px] max-w-[200px] rounded-none border-2 border-foreground shadow-[3px_3px_0px_0px_currentColor] bg-card hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_currentColor] transition-all"
                >
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div
                      className={`p-2 rounded-full ${stat.bgClass} mb-3`}
                    >
                      <stat.icon className={`w-5 h-5 ${stat.colorClass}`} />
                    </div>
                    <div className="text-2xl md:text-3xl font-black font-display tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">
                      {isRu ? stat.labelRu : stat.labelEn}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workspaces Intro Section */}
      <section className="py-16 md:py-24 bg-zinc-50 dark:bg-zinc-950 border-t-2 border-foreground relative overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto space-y-12">
            
            {/* Header Block */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                <Badge className="bg-pastel-blue text-foreground border-2 border-foreground shadow-[2px_2px_0px_0px_currentColor] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-none">
                  WORKSPACES
                </Badge>
                <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-foreground leading-tight">
                  {isRu 
                    ? "Workspaces — готовые рабочие пространства для команд" 
                    : "Workspaces — Ready-to-Use Spaces for Teams"}
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                  {isRu 
                    ? "Профессионально спроектированные шаблоны рабочих пространств (в Notion и других инструментах), чтобы команда быстро стартовала с уже структурированной системой — без сборки “с нуля”."
                    : "Professionally designed workspace templates (in Notion and other tools) to help teams kickstart with a structured system instantly — no 'from scratch' building required."}
                </p>
                
                {/* Quick Start (Быстрый старт) */}
                <div className="bg-card border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] p-6 space-y-4 rounded-none">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    {isRu ? "⚡ БЫСТРЫЙ СТАРТ" : "⚡ QUICK START"}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        step: "01",
                        ru: "Выбрать шаблон в каталоге (ниже)",
                        en: "Choose a template in the catalog (below)"
                      },
                      {
                        step: "02",
                        ru: "Посмотреть кейсы (как выглядит вживую)",
                        en: "See case studies (how it looks in action)"
                      },
                      {
                        step: "03",
                        ru: "Обсудить внедрение / кастомизацию (Consulting)",
                        en: "Discuss implementation / customization (Consulting)"
                      }
                    ].map((s, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="text-2xl font-black text-pastel-pink">{s.step}</div>
                        <p className="text-xs text-foreground/80 font-bold leading-relaxed">
                          {isRu ? s.ru : s.en}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Consulting Banner / CTA Card */}
              <div className="lg:col-span-5 bg-pastel-yellow border-4 border-foreground shadow-[8px_8px_0px_0px_currentColor] p-8 space-y-6 rounded-none">
                <h3 className="text-2xl font-black font-display text-foreground">
                  {isRu ? "Нужна кастомизация под процессы?" : "Need Custom Implementation?"}
                </h3>
                <p className="text-sm text-foreground/80 font-semibold leading-relaxed">
                  {isRu 
                    ? "С 2020 года я помог более чем 50 компаниям выстроить эффективные рабочие пространства (Notion, Buildin.AI) и сэкономить сотни часов на проектировании операционных систем."
                    : "Since 2020, I have helped over 50 companies build efficient workspaces (Notion, Buildin.AI) and save hundreds of hours spent designing operating systems."}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isRu ? "Интеграции (Notion ↔ календарь ↔ задачи ↔ другие)" : "Integrations (Notion ↔ calendar ↔ tasks ↔ other)"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isRu ? "Обучение команды и подробные регламенты" : "Team training & comprehensive guidelines"}</span>
                  </div>
                </div>
                <Link
                  to="/consulting"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background border-2 border-foreground shadow-[3px_3px_0px_0px_currentColor] hover:bg-transparent hover:text-foreground text-xs font-bold uppercase tracking-wider transition-all rounded-none"
                >
                  {isRu ? "Заказать консалтинг" : "Get Consulting"}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Info Grid: Для кого & Что дает & Что входит */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Для кого (For Whom) */}
              <div className="bg-card border-2 border-foreground shadow-[6px_6px_0px_0px_currentColor] p-6 space-y-4 rounded-none">
                <div className="w-10 h-10 rounded-none bg-pastel-purple/20 text-pastel-purple flex items-center justify-center border-2 border-foreground">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display">{isRu ? "Для кого" : "For Whom"}</h3>
                <ul className="space-y-2.5 text-xs text-muted-foreground font-medium">
                  {[
                    { ru: "Стартапы и молодые компании", en: "Startups & early-stage companies" },
                    { ru: "Удалённые и распределённые команды", en: "Remote & distributed teams" },
                    { ru: "Фрилансеры и агентства", en: "Freelancers & agencies" },
                    { ru: "Компании, которые только внедряют систему управления проектами", en: "Companies newly adopting project management" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-pastel-purple shrink-0">▪</span>
                      <span>{isRu ? item.ru : item.en}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Что даёт (What It Gives) */}
              <div className="bg-card border-2 border-foreground shadow-[6px_6px_0px_0px_currentColor] p-6 space-y-4 rounded-none">
                <div className="w-10 h-10 rounded-none bg-accent-lime/20 text-accent-lime flex items-center justify-center border-2 border-foreground">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display">{isRu ? "Что даёт" : "What It Delivers"}</h3>
                <ul className="space-y-2.5 text-xs text-muted-foreground font-medium">
                  {[
                    { ru: "Экономия времени на проектировании системы", en: "Saves time spent on designing systems" },
                    { ru: "Быстрый онбординг и понятная структура", en: "Quick onboarding & clear structure" },
                    { ru: "Прозрачность работы команды и задач", en: "Team transparency & task clarity" },
                    { ru: "Гибкая кастомизация под процессы", en: "Flexible customization for your workflows" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent-lime shrink-0">▪</span>
                      <span>{isRu ? item.ru : item.en}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Что входит (What's Included) */}
              <div className="bg-card border-2 border-foreground shadow-[6px_6px_0px_0px_currentColor] p-6 space-y-4 rounded-none">
                <div className="w-10 h-10 rounded-none bg-pastel-pink/20 text-pastel-pink flex items-center justify-center border-2 border-foreground">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display">{isRu ? "Что входит (пакет)" : "What's Included (Package)"}</h3>
                <ul className="space-y-2.5 text-xs text-muted-foreground font-medium">
                  {[
                    { ru: "Готовые шаблоны под разные типы команд (маркетинг, разработка, дизайн, HR)", en: "Ready-made templates for various team types (marketing, dev, design, HR)" },
                    { ru: "Модульная архитектура (компоненты можно комбинировать)", en: "Modular architecture (combine components based on team needs)" },
                    { ru: "Документация и руководства по кастомизации", en: "Documentation & guides for customization" },
                    { ru: "Интеграции (Notion ↔ календарь ↔ задачи ↔ другие) по необходимости", en: "Integrations (Notion ↔ calendar ↔ tasks ↔ other) as needed" }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-pastel-pink shrink-0">▪</span>
                      <span>{isRu ? item.ru : item.en}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
            </div>

          </div>
        </div>
      </section>

      {/* Templates Grid with Filters */}
      <section className="py-8 md:py-16 border-t-2 border-foreground">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {/* Heading */}
            <AnimatedSection>
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-5xl font-bold font-display mb-3">
                  {isRu ? "Шаблоны Notion" : "Notion Templates"}
                </h2>
                <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                  {isRu
                    ? "Выберите систему для вашего бизнеса и продуктивности."
                    : "Get started with ready-made Notion setups to organize your work and life."}
                </p>
              </div>
            </AnimatedSection>

            {/* Search Bar */}
            <AnimatedSection delay={50}>
              <div className="max-w-md mx-auto mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={isRu ? "Поиск..." : "Search..."}
                    className="pl-10 rounded-full border-2 border-foreground bg-muted/50 h-11 font-medium focus:ring-0 focus:border-foreground"
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Category Filter Tabs (easlo.co style) */}
            <AnimatedSection delay={100}>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {categoryGroups.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                      activeCategory === cat.key
                        ? "bg-foreground text-background"
                        : "bg-muted/50 text-foreground hover:bg-muted"
                    }`}
                  >
                    {isRu ? cat.ru : cat.en}
                  </button>
                ))}
              </div>
            </AnimatedSection>

            {/* Price Filter */}
            <AnimatedSection delay={120}>
              <div className="flex justify-center gap-2 mb-8">
                {(
                  [
                    { key: "all", en: "All", ru: "Все" },
                    { key: "free", en: "Free", ru: "Бесплатные" },
                    { key: "paid", en: "Paid", ru: "Платные" },
                  ] as const
                ).map((pf) => (
                  <button
                    key={pf.key}
                    onClick={() => setPriceFilter(pf.key)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                      priceFilter === pf.key
                        ? "bg-pastel-pink text-white"
                        : "bg-transparent border-2 border-foreground/20 text-foreground/60 hover:border-foreground/40"
                    }`}
                  >
                    {isRu ? pf.ru : pf.en}
                  </button>
                ))}
              </div>
            </AnimatedSection>

            {/* Results count */}
            <div className="text-center text-sm text-muted-foreground mb-6">
              {isRu
                ? `${filteredTemplates.length} шаблонов`
                : `${filteredTemplates.length} templates`}
            </div>

            {/* Template Cards Grid (3 columns like easlo.co) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredTemplates.map((template, i) => (
                <TemplateCard
                  key={template.slug}
                  template={template}
                  isRu={isRu}
                  delay={150 + i * 30}
                />
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg">
                  {isRu
                    ? "Шаблоны не найдены. Попробуйте другой фильтр."
                    : "No templates found. Try a different filter."}
                </p>
              </div>
            )}

            {/* Browse All on Notion */}
            <AnimatedSection delay={600}>
              <div className="mt-12 text-center">
                <a
                  href="https://www.notion.com/@danyanovich"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-bold uppercase tracking-wider hover:text-pastel-blue transition-colors group"
                >
                  {isRu
                    ? "Посмотреть все 170 шаблонов на Notion"
                    : "Browse all 170 templates on Notion"}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <ExternalLink className="ml-1 w-3.5 h-3.5" />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-24 bg-muted/30 border-t-2 border-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection delay={200}>
              <Card className="rounded-none border-2 border-foreground shadow-[8px_8px_0px_0px_currentColor] bg-pastel-yellow overflow-hidden relative">
                <CardContent className="p-8 md:p-12 text-center relative z-10 space-y-6">
                  <h3 className="text-3xl md:text-4xl font-bold font-display text-foreground">
                    {isRu
                      ? "Перейти к библиотеке шаблонов"
                      : "Go to Templates Library"}
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
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                />
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="mt-12 text-center">
                <Link
                  to="/"
                  className="inline-flex items-center text-sm font-bold uppercase tracking-wider hover:text-pastel-blue transition-colors group"
                >
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

// Template Card Component (easlo.co style: image + name + price + PRO badge)
const TemplateCard = ({
  template,
  isRu,
  delay,
}: {
  template: NotionTemplate;
  isRu: boolean;
  delay: number;
}) => {
  const IconComponent = iconMap[template.icon] || Brain;
  const isPaid = template.price > 0;

  return (
    <AnimatedSection delay={delay}>
      <Link
        to={`/notion/${template.slug}`}
        className="block group"
      >
        <Card className="h-full rounded-none border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] bg-card hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_currentColor] transition-all overflow-hidden">
          {/* Image/Preview Area */}
          <div className={`${template.bgClass} p-6 flex items-center justify-center border-b-2 border-foreground/10`}>
            <div className="p-5 rounded-2xl bg-white/60 backdrop-blur-sm">
              <IconComponent className={`w-16 h-16 ${template.colorClass}`} />
            </div>
          </div>

          <CardContent className="p-5 relative">
            {/* Name + Badge row */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-lg font-bold font-display group-hover:text-pastel-blue transition-colors leading-tight">
                {template.name}
              </h3>
              {isPaid && (
                <Badge className="bg-foreground text-background text-[10px] font-bold shrink-0 rounded-full px-2 py-0.5">
                  PRO
                </Badge>
              )}
            </div>

            {/* Category */}
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
              {isRu ? template.category.ru : template.category.en}
            </div>

            {/* Description */}
            <p className="text-sm text-foreground/70 leading-relaxed mb-4 line-clamp-3">
              {isRu ? template.description.ru : template.description.en}
            </p>

            {/* Price + CTA */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-foreground/10">
              <span
                className={`text-lg font-bold ${
                  isPaid ? "text-pastel-pink" : "text-muted-foreground"
                }`}
              >
                {isPaid ? `$${template.price}` : isRu ? "Бесплатно" : "Free"}
              </span>
              <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-foreground/60 group-hover:text-pastel-blue transition-colors">
                {isRu ? "Подробнее" : "View"}
                <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </AnimatedSection>
  );
};

export default NotionTemplates;