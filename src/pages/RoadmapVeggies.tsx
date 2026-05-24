import { useTranslation } from "react-i18next";
import { LocalLink as Link } from "@/components/LocalLink";
import RoadmapView, { RoadmapPhase } from "@/components/RoadmapView";
import { ArrowLeft, Store } from "lucide-react";

export default function RoadmapVeggies() {
  const { i18n } = useTranslation();
  const isRu = i18n.language === "ru";

  const phases: RoadmapPhase[] = [
    {
      titleRu: "Фаза 1: Определение",
      titleEn: "Phase 1: Definition",
      steps: [
        { id: "v1-1", titleRu: "Собрать информацию о лавке", titleEn: "Collect shop info", descRu: "Локация, ассортимент, цены, часы работы, фото, конкурентная среда", descEn: "Location, assortment, prices, hours, photos, competition", status: "todo", priority: "high" },
        { id: "v1-2", titleRu: "Создать Telegram-канал", titleEn: "Create Telegram channel", descRu: "Канал с ежедневным ассортиментом, ценами и фото. Подписчики — локальные жители", descEn: "Daily updates with assortment, prices, photos", status: "todo", priority: "high" },
        { id: "v1-3", titleRu: "Создать контент-план на неделю", titleEn: "Weekly content plan", descRu: "Темы: новинки, сезонные продукты, рецепты, советы по выбору, «что сегодня привезли»", descEn: "New items, seasonal products, recipes, tips", status: "todo", priority: "high" },
      ],
    },
    {
      titleRu: "Фаза 2: Привлечение",
      titleEn: "Phase 2: Acquisition",
      steps: [
        { id: "v2-1", titleRu: "Запустить автоматический ежедневный пост", titleEn: "Auto daily post (cron)", descRu: "Cron-задача на Hermes: каждый день в 8:00 пост в Telegram-канал", descEn: "Cron job: daily 8 AM Telegram post via Hermes", status: "todo", priority: "high" },
        { id: "v2-2", titleRu: "Посты в локальные чаты района", titleEn: "Posts in local chats", descRu: "Найти активные чаты района/города. Делать полезные посты без прямой рекламы", descEn: "Find local community chats, share useful content", status: "todo", priority: "medium" },
        { id: "v2-3", titleRu: "Запустить реферальную программу", titleEn: "Referral program", descRu: "Приведи друга — скидка 10% обоим. Простая механика через Telegram", descEn: "Bring a friend — 10% off for both", status: "todo", priority: "low" },
        { id: "v2-4", titleRu: "Мониторинг конкурентов", titleEn: "Competitor monitoring", descRu: "Еженедельный обзор: что пишут конкуренты, какие цены, какие акции", descEn: "Weekly competitor review", status: "todo", priority: "medium" },
      ],
    },
    {
      titleRu: "Фаза 3: Масштабирование",
      titleEn: "Phase 3: Scaling",
      steps: [
        { id: "v3-1", titleRu: "Карточка товара с ценами на сайте", titleEn: "Product page on site", descRu: "Страница лавки на danyanovich.site с актуальным ассортиментом", descEn: "Shop page on danyanovich.site with live assortment", status: "todo", priority: "medium" },
        { id: "v3-2", titleRu: "Доставка/самовывоз через чат-бота", titleEn: "Delivery via chat-bot", descRu: "Приём заказов через Telegram-бота или Mini App", descEn: "Order taking via Telegram bot", status: "todo", priority: "low" },
        { id: "v3-3", titleRu: "Проанализировать метрики и оптимизировать", titleEn: "Analyze metrics & optimize", descRu: "Какие посты работают? Какое время лучшее для публикации? Что покупают чаще?", descEn: "Which posts work? Best posting time? Top items?", status: "todo", priority: "low" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <Link to="/businesses" className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          <ArrowLeft size={14} /> {isRu ? "Все бизнесы" : "All businesses"}
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500/20 text-emerald-400">
            <Store size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{isRu ? "Овощная лавка" : "Veggie Shop"}</h1>
            <p className="text-xs text-zinc-500">{isRu ? "Офлайн-бизнес · Ежедневное продвижение" : "Offline business · Daily promotion"}</p>
          </div>
        </div>
        <RoadmapView phases={phases} progress={{ done: 0, total: 10 }} />
      </div>
    </div>
  );
}
