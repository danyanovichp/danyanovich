import { useTranslation } from "react-i18next";
import { LocalLink as Link } from "@/components/LocalLink";
import RoadmapView, { RoadmapPhase } from "@/components/RoadmapView";
import { ArrowLeft, Bot } from "lucide-react";

export default function RoadmapAI() {
  const { i18n } = useTranslation();
  const isRu = i18n.language === "ru";
  const phases: RoadmapPhase[] = [
    { titleRu: "Фаза 1: База", titleEn: "Phase 1: Foundation", steps: [
      { id: "ai1-1", titleRu: "Создать страницу AI-промптов", titleEn: "Create AI prompts page", descRu: "Готовые промпты для Notion, копирайтинга, анализа данных на сайте", descEn: "Ready prompts for Notion, copywriting, data analysis", status: "done", priority: "high" },
      { id: "ai1-2", titleRu: "Собрать базу AI-агентов", titleEn: "Build AI agents database", descRu: "Структура уже есть в Notion (AI Agents DB). Нужно открыть доступ интеграции", descEn: "Structure exists in Notion. Need API access.", status: "in-progress", priority: "high" },
      { id: "ai1-3", titleRu: "Страница AI-консультаций", titleEn: "AI consulting page", descRu: "Услуги по настройке AI-агентов для Notion и рабочих процессов", descEn: "AI agent setup services for Notion workflows", status: "done", priority: "high" },
    ]},
    { titleRu: "Фаза 2: Продукты", titleEn: "Phase 2: Products", steps: [
      { id: "ai2-1", titleRu: "Выгрузить AI Agents DB на сайт", titleEn: "Export AI Agents DB to site", descRu: "Фильтруемый каталог AI-агентов с описаниями и ссылками", descEn: "Filterable catalog with descriptions and links", status: "todo", priority: "high" },
      { id: "ai2-2", titleRu: "Автоматизация: Notion Worker для синхронизации", titleEn: "Notion Worker for sync", descRu: "Sync с внешними источниками данных, автозаполнение баз", descEn: "Sync with external data sources", status: "todo", priority: "medium" },
      { id: "ai2-3", titleRu: "Пакет «AI-агент для Notion» под ключ", titleEn: "AI agent for Notion package", descRu: "Настройка AI-агента + обучение + сопровождение — готовый продукт", descEn: "Setup + training + support — turnkey product", status: "todo", priority: "medium" },
    ]},
    { titleRu: "Фаза 3: Масштаб", titleEn: "Phase 3: Scale", steps: [
      { id: "ai3-1", titleRu: "Telegram-бот для доступа к AI-агентам", titleEn: "Telegram bot for AI agents", descRu: "Доступ к AI-агентам через Telegram, без захода в Notion", descEn: "Access AI agents via Telegram without Notion", status: "todo", priority: "low" },
      { id: "ai3-2", titleRu: "Маркетплейс AI-промптов", titleEn: "AI prompt marketplace", descRu: "Коллекция промптов с рейтингом, категориями, платным доступом", descEn: "Prompt collection with ratings, categories, paid access", status: "todo", priority: "low" },
    ]},
  ];
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <Link to="/businesses" className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300"><ArrowLeft size={14} /> {isRu ? "Все проекты" : "All projects"}</Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-violet-500/20 text-violet-400"><Bot size={20} /></div>
          <div><h1 className="text-2xl font-bold">{isRu ? "AI & Автоматизация" : "AI & Automation"}</h1><p className="text-xs text-zinc-500">{isRu ? "Промпты, агенты, интеграции" : "Prompts, agents, integrations"}</p></div>
        </div>
        <RoadmapView phases={phases} progress={{ done: 3, total: 8 }} />
      </div>
    </div>
  );
}
