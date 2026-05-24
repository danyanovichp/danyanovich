import { useTranslation } from "react-i18next";
import { LocalLink as Link } from "@/components/LocalLink";
import RoadmapView, { RoadmapPhase } from "@/components/RoadmapView";
import { ArrowLeft, TrendingUp } from "lucide-react";

export default function RoadmapContent() {
  const { i18n } = useTranslation();
  const isRu = i18n.language === "ru";
  const phases: RoadmapPhase[] = [
    { titleRu: "Фаза 1: База контента", titleEn: "Phase 1: Content Base", steps: [
      { id: "c1-1", titleRu: "Статья «Solo Leveling» опубликована", titleEn: "Solo Leveling article published", descRu: "Первый кейс в портфолио", descEn: "First portfolio case study", status: "done", priority: "high" },
      { id: "c1-2", titleRu: "Статья «The Agency Automation Advantage»", titleEn: "Agency Automation Advantage article", descRu: "Английская статья об автоматизации агентств", descEn: "English article about agency automation", status: "done", priority: "high" },
      { id: "c1-3", titleRu: "Статья «How to Scale Your Agency»", titleEn: "How to Scale Your Agency article", descRu: "Практическое руководство по масштабированию", descEn: "Practical scaling guide", status: "done", priority: "high" },
      { id: "c1-4", titleRu: "Презентация «Как искать сотрудников в США»", titleEn: "US hiring presentation", descRu: "Готовая презентация — контент для лидогенерации", descEn: "Ready presentation — lead gen content", status: "done", priority: "medium" },
    ]},
    { titleRu: "Фаза 2: Продвижение", titleEn: "Phase 2: Promotion", steps: [
        { id: "c2-1", titleRu: "Добавить все статьи на сайт в Blog-раздел", titleEn: "Add all articles to blog section", descRu: "Перенести существующие статьи из Notion на сайт (сделано: 3 новые статьи)", descEn: "Migrate existing articles from Notion to site (done: 3 new articles)", status: "done", priority: "high" },
      { id: "c2-2", titleRu: "SEO-оптимизация блога", titleEn: "Blog SEO optimization", descRu: "Ключевые слова, мета-описания, внутренняя перелинковка", descEn: "Keywords, meta descriptions, internal linking", status: "todo", priority: "medium" },
      { id: "c2-3", titleRu: "Запустить weekly-рассылку", titleEn: "Launch weekly newsletter", descRu: "Подборка: новая статья, новый шаблон, AI-инсайт", descEn: "Weekly roundup: new article, template, AI insight", status: "todo", priority: "low" },
    ]},
  ];
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <Link to="/businesses" className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300"><ArrowLeft size={14} /> {isRu ? "Все бизнесы" : "All businesses"}</Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-pink-500/20 text-pink-400"><TrendingUp size={20} /></div>
          <div><h1 className="text-2xl font-bold">{isRu ? "Контент & Блог" : "Content & Blog"}</h1><p className="text-xs text-zinc-500">{isRu ? "Статьи, кейсы, портфолио" : "Articles, cases, portfolio"}</p></div>
        </div>
        <RoadmapView phases={phases} progress={{ done: 4, total: 7 }} />
      </div>
    </div>
  );
}
