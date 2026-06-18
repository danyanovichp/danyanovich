import { useTranslation } from "react-i18next";
import { LocalLink as Link } from "@/components/LocalLink";
import RoadmapView, { RoadmapPhase } from "@/components/RoadmapView";
import { ArrowLeft, FileText } from "lucide-react";
import SEO from "@/components/SEO";

export default function RoadmapNotion() {
  const { i18n, t } = useTranslation();
  const isRu = i18n.language === "ru";

  const phases: RoadmapPhase[] = [
    {
      titleRu: "Фаза 1: Фундамент ✅",
      titleEn: "Phase 1: Foundation ✅",
      steps: [
        { id: "n1-1", titleRu: "Создание OS-экосистемы (45 продуктов)", titleEn: "OS ecosystem created (45 products)", descRu: "Second Brain OS, Real Estate OS, E-commerce OS и другие — все сформулированы и размечены", descEn: "All OS products defined with prices and categories", status: "done", priority: "high" },
        { id: "n1-2", titleRu: "Галерея мини-шаблонов (95+ продуктов)", titleEn: "Mini template gallery (95+ products)", descRu: "Короткие шаблоны для конкретных задач со статусом «Продаётся»", descEn: "Short templates for specific tasks", status: "done", priority: "high" },
        { id: "n1-3", titleRu: "Запуск сайта danyanovich.site с Notion-разделом", titleEn: "Site launched with Notion section", descRu: "Деплой на Vercel, React/shadcn/ui, i18n RU/EN", descEn: "Vercel deploy, React/shadcn/ui, i18n RU/EN", status: "done", priority: "high" },
        { id: "n1-4", titleRu: "Выгрузка 32 шаблонов с Notion Marketplace на сайт", titleEn: "32 templates extracted from Marketplace", descRu: "Через __NEXT_DATA__ — описания, категории, иконки, цены", descEn: "Via __NEXT_DATA__ — descriptions, categories, icons, prices", status: "done", priority: "high" },
        { id: "n1-5", titleRu: "Детальные страницы для шаблонов", titleEn: "Detail pages for templates", descRu: "Hero, What's Inside, Pricing, FAQ, Related — notionsecondbrain.com стиль", descEn: "Full detail pages with pricing, FAQ, related templates", status: "done", priority: "high" },
      ],
    },
    {
      titleRu: "Фаза 2: Завершение сайта 🔄",
      titleEn: "Phase 2: Site Completion 🔄",
      steps: [
        { id: "n2-1", titleRu: "Добавить оставшиеся 138 шаблонов на сайт", titleEn: "Add remaining 138 templates to site", descRu: "Ты скидываешь ссылки — я парсю и добавляю в дата-файл", descEn: "You share links, I parse and add to data file", status: "in-progress", priority: "high" },
        { id: "n2-2", titleRu: "Починить фильтры на странице шаблонов", titleEn: "Fix template page filters", descRu: "Проверить в реальном браузере — React hydration может не работать в headless", descEn: "Check in real browser — React hydration issue", status: "todo", priority: "high" },
        { id: "n2-3", titleRu: "SEO: robots.txt, sitemap, мета-теги для каждого шаблона ✅", titleEn: "SEO: robots.txt, sitemap, meta tags per template ✅", descRu: "Автоматическая генерация SEO-заголовков и описаний для всех 170+ страниц — DONE", descEn: "Auto-generated SEO headers for 170+ pages — DONE", status: "done", priority: "medium" },
        { id: "n2-4", titleRu: "Аналитика: подключить Yandex.Metrica и Google Analytics", titleEn: "Analytics: Yandex.Metrica + Google Analytics", descRu: "Отслеживание просмотров, кликов, конверсий в покупку", descEn: "Track views, clicks, purchase conversions", status: "todo", priority: "medium" },
      ],
    },
    {
      titleRu: "Фаза 3: Рост",
      titleEn: "Phase 3: Growth",
      steps: [
        { id: "n3-1", titleRu: "Автоматический парсинг новых шаблонов", titleEn: "Auto-parsing new templates", descRu: "Cron-задача, которая проверяет новые шаблоны на Marketplace и добавляет на сайт", descEn: "Cron job checks Marketplace for new templates", status: "todo", priority: "medium" },
        { id: "n3-2", titleRu: "Локализация на английский — полноценная", titleEn: "Full English localization", descRu: "Английские версии всех описаний, категорий, SEO", descEn: "English descriptions, categories, SEO", status: "todo", priority: "medium" },
        { id: "n3-3", titleRu: "Связка с Gumroad/Lemon Squeezy для продаж", titleEn: "Gumroad / Lemon Squeezy integration", descRu: "Прямая покупка с кнопки на сайте, без редиректа на Notion", descEn: "Direct purchase button, no redirect to Notion", status: "todo", priority: "high" },
        { id: "n3-4", titleRu: "Блог-контент для SEO-трафика", titleEn: "Blog content for SEO traffic", descRu: "10 статей по Notion-оптимизации, каждую продвигаем в поиске", descEn: "10 articles about Notion optimization, SEO-promoted", status: "todo", priority: "low" },
        { id: "n3-5", titleRu: "Email-сбор + рассылка", titleEn: "Email collection + newsletter", descRu: "Форма подписки на сайте + автоворонка welcome-писем", descEn: "Subscription form + welcome auto-sequence", status: "todo", priority: "low" },
      ],
    },
  ];

  return (
    <>
      <SEO
        titleRu="Notion-шаблоны | Дэн Янович"
        titleEn="Notion Templates | Dan Yanovich"
        descriptionRu="170+ шаблонов Notion: Second Brain, Real Estate, E-commerce, Freelance и другие."
        descriptionEn="170+ Notion templates: Second Brain, Real Estate, E-commerce, Freelance and more."
      />
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <Link to="/businesses" className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          <ArrowLeft size={14} /> {isRu ? "Все проекты" : "All projects"}
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-500/20 text-amber-400">
            <FileText size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{isRu ? "Notion-шаблоны" : "Notion Templates"}</h1>
            <p className="text-xs text-zinc-500">{isRu ? "170+ шаблонов · OS-экосистема" : "170+ templates · OS ecosystem"}</p>
          </div>
        </div>
        <RoadmapView phases={phases} progress={{ done: 7, total: 14 }} />
      </div>
    </div>
    </>
  );
}
