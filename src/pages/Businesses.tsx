import { useTranslation } from "react-i18next";
import { LocalLink as Link } from "@/components/LocalLink";
import { ArrowRight, ArrowUpRight, FileText, Store, Briefcase, Bot, CheckCircle2, TrendingUp } from "lucide-react";
import SEO from "@/components/SEO";

const businesses = [
  {
    id: "notion",
    icon: FileText,
    titleRu: "Notion-шаблоны",
    titleEn: "Notion Templates",
    descRu: "170+ шаблонов на Notion Marketplace. OS-экосистема: Second Brain, Real Estate, E-commerce и другие. Сайт-шоурум с фильтрацией.",
    descEn: "170+ templates on Notion Marketplace. OS ecosystem and showcase site.",
    color: "from-amber-500/20 to-yellow-600/20 border-amber-800/30",
    iconColor: "text-amber-400",
    progress: { done: 32, total: 170 },
    link: "/businesses/notion",
  },
  {
    id: "veggies",
    icon: Store,
    titleRu: "Овощная лавка",
    titleEn: "Veggie Shop",
    descRu: "Офлайн-магазин овощей и фруктов. Нужна система продвижения, ежедневный контент и привлечение клиентов.",
    descEn: "Offline fruit & vegetable shop. Daily promotion, content, and customer acquisition.",
    color: "from-emerald-500/20 to-green-600/20 border-emerald-800/30",
    iconColor: "text-emerald-400",
    progress: { done: 0, total: 1 },
    link: "/businesses/veggies",
  },
  {
    id: "workspaces",
    icon: Briefcase,
    titleRu: "Workspaces",
    titleEn: "Workspaces",
    descRu: "Готовые рабочие пространства Notion для команд. 50+ проектов внедрения, 100+ часов обучения.",
    descEn: "Ready-made Notion workspaces for teams. 50+ implementations.",
    color: "from-sky-500/20 to-blue-600/20 border-sky-800/30",
    iconColor: "text-sky-400",
    progress: { done: 1, total: 8 },
    link: "/businesses/workspaces",
  },
  {
    id: "ai",
    icon: Bot,
    titleRu: "AI & Автоматизация",
    titleEn: "AI & Automation",
    descRu: "AI-агенты, промпты, автоматизация Notion. База AI-агентов, интеграции с внешними сервисами.",
    descEn: "AI agents, prompts, Notion automation. Agent database and integrations.",
    color: "from-violet-500/20 to-fuchsia-600/20 border-violet-800/30",
    iconColor: "text-violet-400",
    progress: { done: 3, total: 12 },
    link: "/businesses/ai",
  },
  {
    id: "content",
    icon: TrendingUp,
    titleRu: "Контент & Блог",
    titleEn: "Content & Blog",
    descRu: "Статьи, кейсы, портфолио. Агентство-автоматизация, Solo Leveling, вебинары.",
    descEn: "Articles, cases, portfolio. Agency automation content.",
    color: "from-pink-500/20 to-rose-600/20 border-pink-800/30",
    iconColor: "text-pink-400",
    progress: { done: 4, total: 10 },
    link: "/businesses/content",
  },
];

export default function Businesses() {
  const { i18n } = useTranslation();
  const isRu = i18n.language === "ru";

  const totalDone = businesses.reduce((s, b) => s + b.progress.done, 0);
  const totalAll = businesses.reduce((s, b) => s + b.progress.total, 0);
  const pct = Math.round((totalDone / totalAll) * 100);

  return (
    <>
      <SEO
        titleRu="Мои проекты | Дэн Янович"
        titleEn="My Projects | Dan Yanovich"
        descriptionRu="Все проекты в одной экосистеме: Notion-шаблоны, Workspaces, AI & Автоматизация, Контент"
        descriptionEn="All projects in one ecosystem: Notion templates, Workspaces, AI & Automation, Content"
      />
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Header */}
        <div>
          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
            {isRu ? "ПОРТФЕЛЬ" : "PORTFOLIO"}
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {isRu ? "Мои проекты" : "My Projects"}
          </h1>
          <p className="text-sm text-zinc-500">
            {isRu
              ? "Все проекты в одной экосистеме. Каждый бизнес — часть фабрики."
              : "All projects in one ecosystem. Every business is part of the factory."}
          </p>
        </div>

        {/* Overall progress */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                {isRu ? "Общий прогресс экосистемы" : "Overall Ecosystem Progress"}
              </div>
              <div className="text-2xl font-bold">
                {totalDone}/{totalAll}
                <span className="text-sm font-normal text-zinc-500 ml-1">
                  {isRu ? "задач выполнено" : "tasks done"}
                </span>
              </div>
            </div>
            <div className="relative w-14 h-14">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#27272a" strokeWidth="2" />
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="#8b5cf6"
                  strokeWidth="2" strokeDasharray={`${pct} ${100 - pct}`} strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">{pct}%</span>
            </div>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-emerald-500 transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Business cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {businesses.map((b) => {
            const bpct = Math.round((b.progress.done / b.progress.total) * 100);
            return (
              <Link
                key={b.id}
                to={b.link}
                className={`group rounded-2xl border p-5 ${b.color} hover:brightness-110 transition-all 
                           hover:shadow-lg hover:shadow-${b.color.split(' ')[1]}/5
                           active:scale-[0.99] bg-black/40`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${b.iconColor} bg-zinc-900/60`}>
                    <b.icon size={20} />
                  </div>
                  <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                </div>
                <h3 className="text-base font-semibold mb-1">{isRu ? b.titleRu : b.titleEn}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-3">
                  {isRu ? b.descRu : b.descEn}
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        bpct === 0 ? "bg-zinc-700" : bpct === 100 ? "bg-emerald-500" : "bg-violet-500"
                      }`}
                      style={{ width: `${bpct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-zinc-600 font-mono">{bpct}%</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
}
