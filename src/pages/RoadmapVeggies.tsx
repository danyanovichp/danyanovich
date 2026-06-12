import { useTranslation } from "react-i18next";
import { LocalLink as Link } from "@/components/LocalLink";
import RoadmapView, { RoadmapPhase } from "@/components/RoadmapView";
import { ArrowLeft, Store } from "lucide-react";

export default function RoadmapVeggies() {
  const { i18n } = useTranslation();
  const isRu = i18n.language === "ru";

  const name = isRu ? "Свежий Угол" : "Fresh Corner";

  const phases: RoadmapPhase[] = [
    {
      titleRu: "Фаза 1: Запуск 🏗️",
      titleEn: "Phase 1: Launch 🏗️",
      steps: [
        { id: "v0-1", titleRu: "Выбор локации и подписание аренды", titleEn: "Location selection & lease", descRu: "ЖК Самолёт / Светлоград — приоритетные. Замер трафика, расчёт юнит-экономики. Помещение СНЯТО", descEn: "Priority residential complexes. Traffic measurement done. LEASE SIGNED", status: "done", priority: "high" },
        { id: "v0-2", titleRu: "Регистрация ИП", titleEn: "Register sole proprietorship", descRu: "Патент или УСН 6%, ОКВЭД 47.21, расчётный счёт, эквайринг ≤ 1.5-2%", descEn: "Patent or simplified tax system, bank account, card terminal", status: "in-progress", priority: "high" },
        { id: "v0-3", titleRu: "Ремонт помещения", titleEn: "Renovation", descRu: "Электрика 10 кВт ✅. Осталось: вода, слив, стены (белый + оливковый), пол (керамогранит), жёлтая линия, вывеска", descEn: "Electric done ✅. Left: water, walls, floor, sign", status: "in-progress", priority: "high" },
        { id: "v0-4", titleRu: "Документы и разрешения", titleEn: "Permits & docs", descRu: "Роспотребнадзор, медкнижки, вывоз мусора, дератизация, огнетушители", descEn: "Sanitary permits, medical records, waste disposal, fire safety", status: "todo", priority: "high" },
        { id: "v0-5", titleRu: "Заказ оборудования", titleEn: "Order equipment", descRu: "Холодильная горка, морозильник, стеллажи, касса Эвотор, весы, соковыжималка, кондиционер (критично)", descEn: "Fridge, freezer, shelves, cash register, scales, AC (critical!)", status: "todo", priority: "high" },
        { id: "v0-6", titleRu: "Поставщики + первая закупка", titleEn: "Suppliers & first purchase", descRu: "Съездить на Привоз (Уральская) в 4:00, найти 2-3 поставщика на каждую категорию", descEn: "Visit wholesale market at 4 AM, find 2-3 suppliers per category", status: "todo", priority: "high" },
      ],
    },
    {
      titleRu: "Фаза 2: Маркетинг при запуске 📢",
      titleEn: "Phase 2: Launch Marketing 📢",
      steps: [
        { id: "v1-1", titleRu: "Создать Telegram-канал «Свежий Угол»", titleEn: "Create Telegram channel", descRu: "Ежедневный ассортимент, цены, фото. Канал для постоянных клиентов ЖК", descEn: "Daily updates with assortment, prices, photos for local residents", status: "todo", priority: "high" },
        { id: "v1-2", titleRu: "Создать Telegram-бота для предзаказов", titleEn: "Create Telegram bot for pre-orders", descRu: "«Написал в бот → пакет ждёт на кассе». Без агрегаторов, маржа целая", descEn: "Order via bot → bag ready at checkout. No aggregator fees", status: "todo", priority: "high" },
        { id: "v1-3", titleRu: "Газета «Скоро открытие»", titleEn: "Launch flyer distribution", descRu: "3 000-5 000 шт по почтовым ящикам в радиусе 500 м. Рецепты + акция «фреш бесплатно»", descEn: "3,000-5,000 flyers to mailboxes within 500m radius", status: "todo", priority: "high" },
        { id: "v1-4", titleRu: "Заполнить Яндекс.Карты и Google Maps", titleEn: "Set up Yandex Maps & Google Maps", descRu: "Фото ремонта, описание, часы работы. QR-код на упаковке → страница отзывов", descEn: "Photos, description, hours. QR on packaging → review page", status: "todo", priority: "medium" },
        { id: "v1-5", titleRu: "Визитки в заведения рядом", titleEn: "Business cards for nearby spots", descRu: "Салоны, кофейни, барбершопы в радиусе 300 м. «Соседям — скидка 10%»", descEn: "Salons, cafes, barbershops within 300m. 'Neighbor discount 10%'", status: "todo", priority: "medium" },
        { id: "v1-6", titleRu: "Вывеска (LED, объёмные буквы)", titleEn: "Install LED sign", descRu: "1.5×0.6 м, видна с дороги. Белый картон + маркер «Скоро открытие» пока идёт ремонт", descEn: "1.5×0.6m, visible from road. Cardboard sign during renovation", status: "todo", priority: "high" },
      ],
    },
    {
      titleRu: "Фаза 3: Открытие и операционка 🚀",
      titleEn: "Phase 3: Opening & Operations 🚀",
      steps: [
        { id: "v2-1", titleRu: "Нанять и обучить 2 продавцов", titleEn: "Hire & train 2 sellers", descRu: "График 2/2. Обучение: приёмка, касса, скрипты продаж, выкладка, уценка", descEn: "2/2 schedule. Training: receiving, checkout, scripts, display", status: "todo", priority: "high" },
        { id: "v2-2", titleRu: "Настроить Google Sheets для учёта", titleEn: "Set up Google Sheets accounting", descRu: "Ежедневный учёт: закупка, продажи, списания, остатки. Аналитика брака", descEn: "Daily tracking: purchases, sales, write-offs, leftovers", status: "todo", priority: "high" },
        { id: "v2-3", titleRu: "Первый день — открытие!", titleEn: "Grand opening!", descRu: "Акция «Фреш бесплатно», сбор контактов в Telegram, фото/видео, Z-отчёт", descEn: "Free juice promo, collect Telegram contacts, photos, Z-report", status: "todo", priority: "high" },
        { id: "v2-4", titleRu: "Запустить ежедневные посты в Telegram", titleEn: "Launch daily Telegram posts", descRu: "«Сегодня с Привоза» — ассортимент, цены, фото. Cron-задача на Hermes в 8:00", descEn: "'Today from market' — daily update via Hermes cron at 8 AM", status: "todo", priority: "high" },
        { id: "v2-5", titleRu: "Программа лояльности", titleEn: "Loyalty program", descRu: "Карта постоянного покупателя, «Приведи друга», Премиум-клуб (топ-20 клиентов)", descEn: "Loyalty card, refer-a-friend program, top-20 premium club", status: "todo", priority: "medium" },
      ],
    },
    {
      titleRu: "Фаза 4: Рост 📈",
      titleEn: "Phase 4: Growth 📈",
      steps: [
        { id: "v3-1", titleRu: "Нарезка и подготовка (добавленная стоимость)", titleEn: "Cut & prep (value add)", descRu: "Очищенный картофель (+50%), нарезанные фрукты, чищеные гранаты — рост маржи", descEn: "Peeled potatoes (+50%), cut fruit — margin boost", status: "todo", priority: "medium" },
        { id: "v3-2", titleRu: "Кросс-сейл: крафтовый хлеб, сыры, кофе", titleEn: "Cross-sell: bread, cheese, coffee", descRu: "Маржа 300-400%. Увеличивает средний чек без роста аренды", descEn: "300-400% margin. Increases avg check without extra rent", status: "todo", priority: "low" },
        { id: "v3-3", titleRu: "Доставка в радиусе 1-2 км", titleEn: "Delivery within 1-2 km", descRu: "Курьеры-подростки. Бесплатно от 1 000 ₽. Тяжёлые пакеты до двери", descEn: "Teen couriers. Free above 1000₽. Heavy bags to door", status: "todo", priority: "low" },
        { id: "v3-4", titleRu: "B2B (HoReCa) — поставки заведениям", titleEn: "B2B (HoReCa) supplies", descRu: "Стать поставщиком для ближайших кофеен и ресторанов. Свежая зелень, томаты, ягоды", descEn: "Supply nearby cafes & restaurants. Fresh herbs, tomatoes, berries", status: "todo", priority: "low" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <Link to="/businesses" className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
          <ArrowLeft size={14} /> {isRu ? "Все проекты" : "All projects"}
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-500/20 text-emerald-400">
            <Store size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{isRu ? `Лавка «${name}»` : name}</h1>
            <p className="text-xs text-zinc-500">
              {isRu
                ? "Краснодар · Овощи и фрукты · Помещение снято, идёт ремонт"
                : "Krasnodar · Fruits & Veggies · Space leased, renovation in progress"}
            </p>
          </div>
        </div>
        <RoadmapView phases={phases} progress={{ done: 2, total: 21 }} />
      </div>
    </div>
  );
}
