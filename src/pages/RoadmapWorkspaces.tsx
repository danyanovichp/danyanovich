import { useTranslation } from "react-i18next";
import { LocalLink as Link } from "@/components/LocalLink";
import RoadmapView, { RoadmapPhase } from "@/components/RoadmapView";
import { ArrowLeft, Briefcase } from "lucide-react";

export default function RoadmapWorkspaces() {
  const { i18n } = useTranslation();
  const isRu = i18n.language === "ru";
  const phases: RoadmapPhase[] = [
    { titleRu: "Фаза 1: Упаковка", titleEn: "Phase 1: Packaging", steps: [
      { id: "w1-1", titleRu: "Дописать «Правила оформления рабочих пространств»", titleEn: "Finalize workspace rules doc", descRu: "Стандарты оформления, структура, naming conventions для всех будущих шаблонов", descEn: "Design standards, structure, naming conventions", status: "in-progress", priority: "high" },
      { id: "w1-2", titleRu: "Выбрать 3 флагманских шаблона для старта", titleEn: "Pick 3 flagship templates", descRu: "Например: маркетинг, разработка, HR — самые востребованные ниши", descEn: "Most in-demand niches: marketing, dev, HR", status: "todo", priority: "high" },
      { id: "w1-3", titleRu: "Создать лендинг услуги", titleEn: "Create service landing page", descRu: "Страница на сайте: что входит, цена, примеры работ, отзывы. Готово!", descEn: "Landing: what's included, pricing, examples, reviews. Done!", status: "done", priority: "high" },
      { id: "w1-4", titleRu: "Собрать портфолио из 50+ проектов", titleEn: "Gather portfolio of 50+ projects", descRu: "Описания выполненных проектов + результаты (что улучшилось у клиентов)", descEn: "Project descriptions + measurable results", status: "todo", priority: "medium" },
    ]},
    { titleRu: "Фаза 2: Запуск", titleEn: "Phase 2: Launch", steps: [
      { id: "w2-1", titleRu: "Опубликовать на Kwork / fl.ru / Pchel", titleEn: "List on freelance platforms", descRu: "Создать карточку услуги с прайсом и примерами", descEn: "Service listing with pricing and examples", status: "todo", priority: "high" },
      { id: "w2-2", titleRu: "Настроить CRM для лидов", titleEn: "Set up lead CRM", descRu: "Notion-база для отслеживания заявок, статусов, этапов", descEn: "Notion DB for lead tracking", status: "todo", priority: "medium" },
      { id: "w2-3", titleRu: "Запустить «бесплатный аудит рабочего пространства»", titleEn: "Launch free workspace audit", descRu: "Лид-магнит: анализ текущего Notion за 1 час, отчёт с рекомендациями", descEn: "Lead magnet: 1-hour workspace analysis", status: "todo", priority: "medium" },
    ]},
  ];
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <Link to="/businesses" className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300"><ArrowLeft size={14} /> {isRu ? "Все бизнесы" : "All businesses"}</Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-sky-500/20 text-sky-400"><Briefcase size={20} /></div>
          <div><h1 className="text-2xl font-bold">{isRu ? "Workspaces" : "Workspaces"}</h1><p className="text-xs text-zinc-500">{isRu ? "Готовые Notion-пространства для команд" : "Ready-made Notion spaces for teams"}</p></div>
        </div>
        <RoadmapView phases={phases} progress={{ done: 1, total: 7 }} />
      </div>
    </div>
  );
}
