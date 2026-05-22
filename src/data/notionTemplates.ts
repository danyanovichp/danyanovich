// Notion Templates Data
// Extracted from Notion Marketplace (__NEXT_DATA__) + manual enrichment
// 7 paid + 25 free = 32 templates (170 total on Marketplace, rest to be added)

export interface NotionTemplate {
  id: string;
  name: string;
  slug: string;
  price: number; // 0 = free
  description: {
    en: string;
    ru: string;
  };
  category: {
    en: string;
    ru: string;
  };
  categoryGroup: string; // Top-level filter group: Operations, Personal Productivity, Startup, etc.
  features?: {
    en: string[];
    ru: string[];
  };
  icon: string; // lucide icon name
  colorClass: string;
  bgClass: string;
}

// Category groups for filter tabs (matching easlo.co pattern)
export const categoryGroups = [
  { key: "all", en: "All", ru: "Все" },
  { key: "personal-productivity", en: "Personal Productivity", ru: "Личная продуктивность" },
  { key: "operations", en: "Operations", ru: "Операции" },
  { key: "marketing", en: "Marketing", ru: "Маркетинг" },
  { key: "finance", en: "Finance", ru: "Финансы" },
  { key: "real-estate", en: "Real Estate", ru: "Недвижимость" },
  { key: "freelance", en: "Freelance", ru: "Фриланс" },
  { key: "health", en: "Health & Fitness", ru: "Здоровье" },
  { key: "teaching", en: "Teaching", ru: "Обучение" },
  { key: "product", en: "Product", ru: "Продукт" },
];

// Paid templates with full features
const paidTemplatesData: NotionTemplate[] = [
  {
    id: "ea16f21a-615e-49e0-b177-e2affd3cf2ca",
    name: "Second Brain OS",
    slug: "second-brain-os-903",
    price: 39,
    description: {
      en: "A unified command center for thoughts, projects, and goals — where chaos turns into system, and random ideas become finished results.",
      ru: "Единый командный центр для мыслей, проектов и целей — где хаос превращается в систему, а случайные идеи становятся готовыми результатами.",
    },
    category: { en: "Second Brain", ru: "Second Brain" },
    categoryGroup: "personal-productivity",
    features: {
      en: [
        "Inbox capture system — all inputs flow through a structured pipeline",
        "Three-tier hierarchy: Areas → Projects → Actions with relational linking",
        "Project tracking with status pipeline and energy expenditure indicator",
        "5-level urgency scale with weekly and monthly calendar views",
        "Knowledge base: Notes flow from draft to final, grouped by notebook and topic",
        "Resource management: Videos, articles, podcasts with status tracking",
        "Processing pipeline: Inbox → Processing → Action → Result",
      ],
      ru: [
        "Система захвата Inbox — все входящие проходят через структурированный конвейер",
        "Трёхуровневая иерархия: Области → Проекты → Действия со связями",
        "Отслеживание проектов: статусы, сроки, индикатор затрат энергии",
        "5-уровневая шкала срочности с недельным и месячным календарём",
        "База знаний: заметки от черновика до финала, сгруппированы по тетради и теме",
        "Управление ресурсами: видео, статьи, подкасты с отслеживанием статуса",
        "Конвейер обработки: Inbox → Обработка → Действие → Результат",
      ],
    },
    icon: "Brain",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
  },
  {
    id: "2e7d872b-594c-816b-b466-00643d066f97",
    name: "Real Estate OS",
    slug: "real-estate-os-805",
    price: 50,
    description: {
      en: "Manage your real estate business in one place. Track properties, contacts, deals through a pipeline, and schedule showings, calls, and meetings — all linked together.",
      ru: "Управляйте бизнесом по недвижимости в одном месте. Отслеживайте объекты, контакты, сделки через пайплайн и планируйте показы, звонки и встречи — всё связано.",
    },
    category: { en: "Real Estate", ru: "Недвижимость" },
    categoryGroup: "real-estate",
    features: {
      en: [
        "Properties database with price, area, type, status, photos, and map view",
        "Contacts database for buyers, sellers, agents with kanban by status",
        "Deals pipeline: Qualification → Showing → Offer → Contract → Closed/Lost",
        "Activities tracker for calls, meetings, showings with calendar and daily focus",
        "Dashboard showing hot deals, today's tasks, and new properties",
        "All databases linked by relations — every deal connects to property and client",
      ],
      ru: [
        "База объектов: цена, площадь, тип, статус, фото и карта",
        "База контактов: покупатели, продавцы, агенты с канбан по статусам",
        "Пайплайн сделок: Квалификация → Показ → Предложение → Договор → Закрыто",
        "Трекер активностей: звонки, встречи, показы с календарём",
        "Дашборд: горячие сделки, задачи на сегодня, новые объекты",
        "Все базы связаны — каждая сделка привязана к объекту и клиенту",
      ],
    },
    icon: "Building2",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
  },
  {
    id: "2e7d872b-594c-81aa-84d1-006453b60d60",
    name: "Freelance OS",
    slug: "freelance-os-456",
    price: 40,
    description: {
      en: "Manage freelance projects, clients, portfolio, and reviews in one workspace. Track active projects on a kanban and collect client reviews.",
      ru: "Управляйте фриланс-проектами, клиентами, портфолио и отзывами в одном пространстве. Отслеживайте проекты на канбане и собирайте отзывы.",
    },
    category: { en: "Freelance", ru: "Фриланс" },
    categoryGroup: "freelance",
    features: {
      en: [
        "Projects database with status tracking and Active Projects kanban board",
        "Portfolio Showcase gallery for completed work",
        "Clients database with Active Clients view",
        "Knowledge Base for reference materials and guides",
        "Reviews collection with New Reviews (5-star) for marketing",
        "Main dashboard: Portfolio, Active Projects, Active Clients, New Reviews",
        "Simple workflow: add client → create project → link → complete → review",
      ],
      ru: [
        "База проектов с отслеживанием статусов и канбаном активных проектов",
        "Галерея портфолио для завершённых работ",
        "База клиентов с видом «Активные клиенты»",
        "База знаний для справочных материалов и руководств",
        "Коллекция отзывов: новые отзывы (5 звёзд) для маркетинга",
        "Главный дашборд: Портфолио, Проекты, Клиенты, Отзывы",
        "Простой флоу: клиент → проект → связь → завершение → отзыв",
      ],
    },
    icon: "Briefcase",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
  },
  {
    id: "2e7d872b-594c-8194-a7aa-0064e890e7fa",
    name: "E-commerce OS",
    slug: "e-commerce-os-261",
    price: 25,
    description: {
      en: "Manage your online store in one place — track products and stock levels, process orders on a kanban board, plan marketing campaigns, and monitor income and expenses across multiple sales platforms.",
      ru: "Управляйте интернет-магазином в одном месте — отслеживайте товары и остатки, обрабатывайте заказы на канбане, планируйте маркетинг и контролируйте финансы.",
    },
    category: { en: "E-commerce", ru: "Электронная коммерция" },
    categoryGroup: "operations",
    features: {
      en: [
        "Product Catalog with stock tracking and Low Stock alerts",
        "Order Management kanban — drag cards to update status",
        "Marketing Planner with promo calendar and campaign registry",
        "Finance Tracker — log income and expenses by category",
        "Platform Directory — manage sales channels with commission rates",
        "All databases connected — no switching between tools",
      ],
      ru: [
        "Каталог товаров с отслеживанием остатков и предупреждениями",
        "Канбан заказов — перетаскивайте карточки для обновления статуса",
        "Планер маркетинга: календарь промо и реестр кампаний",
        "Финансовый трекер: доходы и расходы по категориям",
        "Директория платформ: каналы продаж и комиссии",
        "Все базы связаны — не нужно переключаться между инструментами",
      ],
    },
    icon: "ShoppingCart",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
  },
  {
    id: "2e7d872b-594c-810f-b50b-0064b3194503",
    name: "Documents OS",
    slug: "documents-os-1",
    price: 20,
    description: {
      en: "Store, track, and manage all your important documents in one place. Set expiration dates, get renewal alerts, attach scans, log storage locations, and keep a version history — so nothing expires or gets lost.",
      ru: "Храните, отслеживайте и управляйте всеми важными документами в одном месте. Уведомления об истечении, сканы, места хранения и история версий.",
    },
    category: { en: "Documentation", ru: "Документооборот" },
    categoryGroup: "operations",
    features: {
      en: [
        "Documents database with type, status, owner, expiration date, and file scans",
        "Expiration alerts — flags documents expiring within 30 days",
        "Storage Locations database — track where originals are kept",
        "Versions & Logs — log every change with version number and date",
        "Dashboard: Attention gallery, Recently Updated list, Statistics view",
        "Quick Start guide built right into the template",
      ],
      ru: [
        "База документов: тип, статус, владелец, срок действия, сканы",
        "Уведомления об истечении — помечает документы за 30 дней",
        "Места хранения: отслеживайте, где лежат оригиналы",
        "Версии и логи: каждое изменение с номером версии и датой",
        "Дашборд: галерея внимания, недавние обновления, статистика",
        "Руководство Quick Start встроено прямо в шаблон",
      ],
    },
    icon: "FileStack",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
  },
  {
    id: "2e7d872b-594c-8101-ba20-0064c3973e7a",
    name: "Ideas OS",
    slug: "ideas-os-484",
    price: 10,
    description: {
      en: "Capture, score, and develop ideas with ICE scoring (Impact, Confidence, Effort). Includes an inbox, best ideas gallery, process kanban, roadmap timeline, and idea connections table.",
      ru: "Захватывайте, оценивайте и развивайте идеи с ICE-скорингом. Inbox, галерея лучших идей, канбан процесса, roadmap и связи между идеями.",
    },
    category: { en: "Idea Management", ru: "Управление идеями" },
    categoryGroup: "personal-productivity",
    features: {
      en: [
        "ICE Scoring — auto-calculated from Impact, Confidence, Effort (1-10)",
        "Idea funnel: Inbox → Review → Incubator → In Progress → Done",
        "Best Ideas gallery showing ideas with ICE Score > 20",
        "Process kanban board for status management",
        "Roadmap timeline view",
        "Connections table — link ideas to each other for cross-pollination",
        "Categories for theme grouping and Resources for supporting materials",
      ],
      ru: [
        "ICE-скоринг: автоподсчёт на основе Влияния, Уверенности и Усилий",
        "Воронка идей: Inbox → Обзор → Инкубатор → В работе → Готово",
        "Галерея лучших идей (ICE > 20)",
        "Канбан-доска для управления статусами",
        "Roadmap — таймлайн идей",
        "Таблица связей — связывайте идеи друг с другом",
        "Категории для группировки по темам и База ресурсов",
      ],
    },
    icon: "Lightbulb",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
  },
  {
    id: "2e7d872b-594c-81e4-be60-0064593cd736",
    name: "90 Day Planning",
    slug: "90-day-planning",
    price: 5,
    description: {
      en: "Plan your quarter with linked goals, projects, and tasks. Track progress automatically, prioritize daily work, and reflect in a built-in journal with mood tracking. Four connected databases on one dashboard.",
      ru: "Свяжите квартальные цели с проектами и задачами — всё в одном дашборде. Фокус дня, инбокс задач, таймлайн, канбан и дневник настроения.",
    },
    category: { en: "Planning & Goals", ru: "Планирование и цели" },
    categoryGroup: "personal-productivity",
    features: {
      en: [
        "4 connected databases: Goals, Projects, Tasks, Journal",
        "Three-level hierarchy: Goals → Projects → Tasks",
        "Automatic progress tracking — rolls up from tasks to goals",
        "Daily Focus view — today's tasks grouped by priority",
        "Task Inbox for undated tasks",
        "Project timeline and kanban boards",
        "Daily journal with mood tracking and calendar views",
        "Dashboard homepage with Quick Start guide",
      ],
      ru: [
        "4 связанные базы: Цели, Проекты, Задачи, Дневник",
        "Трёхуровневая иерархия: Цели → Проекты → Задачи",
        "Автоматическое отслеживание прогресса от задач к целям",
        "Фокус дня — задачи на сегодня по приоритету",
        "Inbox для задач без даты",
        "Таймлайн проектов и канбан-доски",
        "Дневник настроения с календарём",
        "Дашборд с руководством Quick Start",
      ],
    },
    icon: "Target",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
  },
];

// Free templates
const freeTemplatesData: NotionTemplate[] = [
  {
    id: "6e55eeb1-0db5-42f4-ac5c-d6c178075607",
    name: "Customer Success",
    slug: "customer-success",
    price: 0,
    description: {
      en: "Standardize client onboarding, track health, prioritize accounts, and surface upsell opportunities. Operate from one hub with guided pages and a unified Client Onboarding database.",
      ru: "Стандартизируйте онбординг клиентов, отслеживайте здоровье аккаунтов, приоритизируйте и находите возможности для допродаж. Всё в одном хабе.",
    },
    category: { en: "Customer Journey", ru: "Путь клиента" },
    categoryGroup: "operations",
    icon: "Heart",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
  },
  {
    id: "2b3d872b-594c-814b-b32b-0064da74cf22",
    name: "Consulting: Consultation Hours",
    slug: "consulting-consultation-hours",
    price: 0,
    description: {
      en: "Log every consulting session with clients, track hours, rates, payments, and outcomes. See who owes what, when the next session is, and how many package hours remain.",
      ru: "Записывайте каждую консультацию, отслеживайте часы, ставки, платежи и результаты. Видите, кто должен, когда следующая сессия и сколько часов осталось.",
    },
    category: { en: "Operations", ru: "Операции" },
    categoryGroup: "operations",
    icon: "Clock",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
  },
  {
    id: "free-ai-tools-tracker",
    name: "AI Tools Tracker",
    slug: "ai-tools-tracker",
    price: 0,
    description: {
      en: "System for organizing AI resources. Capture discoveries, compare features, track expenses. From scattered bookmarks to a curated intelligence hub that protects your budget.",
      ru: "Система для организации ИИ-ресурсов. Захватывайте находки, сравнивайте функции, отслеживайте расходы. От разбросанных закладок к курированному хабу.",
    },
    category: { en: "Product", ru: "Продукт" },
    categoryGroup: "product",
    icon: "Bot",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
  },
  {
    id: "free-hypothesis-testing",
    name: "Hypothesis Testing",
    slug: "hypothesis-testing",
    price: 0,
    description: {
      en: "System for experiment management. Formulate hypotheses, prioritize ideas, track results. From chaotic spreadsheets and chats to data-driven product growth based on verified insights.",
      ru: "Система управления экспериментами. Формулируйте гипотезы, приоритизируйте идеи, отслеживайте результаты. От хаоса к data-driven росту.",
    },
    category: { en: "Operations", ru: "Операции" },
    categoryGroup: "operations",
    icon: "FlaskConical",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
  },
  {
    id: "free-product-market-fit",
    name: "Product-Market Fit",
    slug: "product-market-fit",
    price: 0,
    description: {
      en: "Track key metrics, map their dependencies, and test growth hypotheses. From scattered spreadsheets and data chaos to complete clarity on your product's health.",
      ru: "Отслеживайте ключевые метрики, отображайте зависимости и тестируйте гипотезы роста. От разбросанных таблиц к полной ясности о здоровье продукта.",
    },
    category: { en: "Planning & Goals", ru: "Планирование и цели" },
    categoryGroup: "product",
    icon: "TrendingUp",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
  },
  {
    id: "free-suppliers-database",
    name: "Suppliers Database",
    slug: "suppliers-database-01",
    price: 0,
    description: {
      en: "Keep every supplier in one place — contacts, contracts, ratings, and order history. Compare alternatives, track payment terms, and never lose a vendor's details again.",
      ru: "Держите каждого поставщика в одном месте — контакты, контракты, рейтинги и история заказов. Сравнивайте альтернативы и никогда не теряйте данные поставщиков.",
    },
    category: { en: "Operations", ru: "Операции" },
    categoryGroup: "operations",
    icon: "Truck",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
  },
  {
    id: "free-time-off-tracking",
    name: "Time Off and Sick Leave Tracking",
    slug: "time-off-and-sick-leave-tracking",
    price: 0,
    description: {
      en: "Plan schedules, assign deputies, avoid conflicts. From staffing surprises to seamless continuity with a built-in team absence management system.",
      ru: "Планируйте графики, назначайте заместителей, избегайте конфликтов. От кадровых сюрпризов к бесперебойной работе команды.",
    },
    category: { en: "Operations", ru: "Операции" },
    categoryGroup: "operations",
    icon: "CalendarOff",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
  },
  {
    id: "free-accounts-receivable",
    name: "Accounts Receivable Tracking",
    slug: "accounts-receivable-tracking",
    price: 0,
    description: {
      en: "Track every outstanding debt from first invoice to final payment. See who owes what, how long it's overdue, and where to focus your collection efforts — all in one structured hub.",
      ru: "Отслеживайте каждую задолженность от первого инвойса до финальной оплаты. Видите, кто должен, насколько просрочено и на чём сфокусироваться.",
    },
    category: { en: "Operations", ru: "Операции" },
    categoryGroup: "finance",
    icon: "Receipt",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
  },
  {
    id: "free-sales-scripts",
    name: "Sales Scripts",
    slug: "sales-scripts",
    price: 0,
    description: {
      en: "Your team's playbook for every sales conversation — from cold calls to closing deals. Store scripts, track what works, and give every rep the words that win.",
      ru: "Плэйбук команды для каждого разговора — от холодных звонков до закрытия сделок. Храните скрипты и отслеживайте, что работает.",
    },
    category: { en: "Operations", ru: "Операции" },
    categoryGroup: "marketing",
    icon: "MessageSquareText",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
  },
  {
    id: "free-product-backlog",
    name: "Product Backlog",
    slug: "product-backlog-571",
    price: 0,
    description: {
      en: "Turn scattered feature requests into a prioritized roadmap. Score ideas with RICE, track sprints, assign teams, and ship what matters — all in one structured backlog.",
      ru: "Превратите разбросанные запросы в приоритизированный роадмап. Оценивайте идеи через RICE, отслеживайте спринты и поставляйте то, что важно.",
    },
    category: { en: "Product", ru: "Продукт" },
    categoryGroup: "product",
    icon: "ListTodo",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
  },
  {
    id: "free-meal-planner",
    name: "Meal Planner",
    slug: "meal-planner-149",
    price: 0,
    description: {
      en: "Save recipes, plan weekly menus, and track meal variety. From the eternal \"what's for dinner\" question to stress-free cooking and fewer takeout orders.",
      ru: "Сохраняйте рецепты, планируйте еженедельное меню и отслеживайте разнообразие. От вечного «что на ужин» к готовке без стресса.",
    },
    category: { en: "Health & Fitness", ru: "Здоровье" },
    categoryGroup: "health",
    icon: "UtensilsCrossed",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
  },
  {
    id: "free-editorial-calendar",
    name: "Editorial Calendar",
    slug: "editorial-calendar-794",
    price: 0,
    description: {
      en: "Capture ideas, schedule posts, manage editorial balance. From deadline panic to strategic posting with a built-in content planning system.",
      ru: "Захватывайте идеи, планируйте посты, управляйте редакционным балансом. От паники дедлайнов к стратегическому контент-планированию.",
    },
    category: { en: "Social Media Planner", ru: "Контент-план" },
    categoryGroup: "marketing",
    icon: "CalendarDays",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
  },
  {
    id: "free-team-time-tracking",
    name: "Team Time Tracking",
    slug: "team-time-tracking",
    price: 0,
    description: {
      en: "Log hours, track workload, calculate project budgets. From spreadsheet chaos and guesswork to transparent, data-driven leadership with team resource management.",
      ru: "Записывайте часы, отслеживайте нагрузку, считайте бюджеты проектов. От таблиц и догадок к прозрачному управлению ресурсами команды.",
    },
    category: { en: "Operations", ru: "Операции" },
    categoryGroup: "operations",
    icon: "Timer",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
  },
  {
    id: "free-courses-modules",
    name: "Courses: Modules and Lessons",
    slug: "courses-modules-and-lessons",
    price: 0,
    description: {
      en: "Structure your online course from modules to individual lessons. Track content readiness, assign instructors, link lessons in sequence, and monitor student completion rates.",
      ru: "Структурируйте онлайн-курс от модулей до отдельных уроков. Отслеживайте готовность контента, назначайте инструкторов и контролируйте прогресс студентов.",
    },
    category: { en: "Teaching", ru: "Обучение" },
    categoryGroup: "teaching",
    icon: "GraduationCap",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
  },
  {
    id: "free-objection-database",
    name: "Objection Database",
    slug: "objection-database",
    price: 0,
    description: {
      en: "Equip your sales team with proven scripts for every customer objection. Categorize by type and funnel stage, track conversion rates, and train new reps faster with real dialogue examples.",
      ru: "Оснастите команду продаж скриптами для каждого возражения. Категоризируйте, отслеживайте конверсии и обучайте новых быстрее на реальных примерах.",
    },
    category: { en: "Marketing", ru: "Маркетинг" },
    categoryGroup: "marketing",
    icon: "Shield",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
  },
  {
    id: "free-beauty-salon",
    name: "Beauty Salon: Client Booking",
    slug: "beauty-salon-client-booking",
    price: 0,
    description: {
      en: "Manage every salon appointment from booking to payment. Track specialists, services, materials, client history, prepayments, bonus points, cancellations, and before/after photos.",
      ru: "Управляйте каждой записью от бронирования до оплаты. Отслеживайте специалистов, услуги, историю клиентов, предоплаты и фотодо/после.",
    },
    category: { en: "Operations", ru: "Операции" },
    categoryGroup: "operations",
    icon: "Sparkles",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
  },
  {
    id: "free-referral-program",
    name: "Referral Program",
    slug: "suppliers-database",
    price: 0,
    description: {
      en: "Track every referral from registration to purchase. Monitor referrer performance, reward payouts, conversion rates, and referral quality — to grow your customer base through word of mouth.",
      ru: "Отслеживайте каждую реферальную регистрацию до покупки. Мониторьте производительность, выплаты, конверсии и качество рефералов.",
    },
    category: { en: "Marketing", ru: "Маркетинг" },
    categoryGroup: "marketing",
    icon: "Users",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
  },
  {
    id: "free-returns-refunds",
    name: "Returns & Refunds",
    slug: "returns-refunds",
    price: 0,
    description: {
      en: "Turn returns from a headache into actionable data. Track every refund request, analyze reasons, spot problematic items and customers — and reduce return rates with clear insights.",
      ru: "Превратите возвраты из головной боли в данные. Отслеживайте каждый запрос, анализируйте причины и снижайте процент возвратов.",
    },
    category: { en: "Operations", ru: "Операции" },
    categoryGroup: "operations",
    icon: "RotateCcw",
    colorClass: "text-accent-coral",
    bgClass: "bg-accent-coral/20",
  },
  {
    id: "free-quality-control",
    name: "Quality Control",
    slug: "quality-control",
    price: 0,
    description: {
      en: "Log every quality inspection from incoming materials to customer complaints. Track defect rates, root causes, corrective actions, and financial losses — so quality issues never repeat.",
      ru: "Записывайте каждую инспекцию качества. Отслеживайте уровень дефектов, корневые причины, корректирующие действия и финансовые потери.",
    },
    category: { en: "Operations", ru: "Операции" },
    categoryGroup: "operations",
    icon: "CheckCircle",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
  },
  {
    id: "free-idea-bank",
    name: "Idea Bank",
    slug: "idea-bank-959",
    price: 0,
    description: {
      en: "Capture, evaluate, and develop ideas from spark to implementation. Score each idea by potential, urgency, and resources needed — then track status, next steps, and outcomes.",
      ru: "Захватывайте, оценивайте и развивайте идеи от искры до реализации. Оценивайте по потенциалу, срочности и ресурсам — отслеживайте статусы и результаты.",
    },
    category: { en: "Personal Productivity", ru: "Личная продуктивность" },
    categoryGroup: "personal-productivity",
    icon: "Lightbulb",
    colorClass: "text-pastel-lavender",
    bgClass: "bg-pastel-lavender/20",
  },
  {
    id: "free-customer-segmentation",
    name: "Customer Segmentation",
    slug: "customer-segmentation",
    price: 0,
    description: {
      en: "Segment your customers by value, behavior, and engagement using RFM analysis, tier classification, and churn risk tracking. See exactly who drives your revenue — and who needs attention.",
      ru: "Сегментируйте клиентов по ценности, поведению и вовлечённости через RFM-анализ, классификацию по тирам и отслеживание риска оттока.",
    },
    category: { en: "Marketing", ru: "Маркетинг" },
    categoryGroup: "marketing",
    icon: "PieChart",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
  },
  {
    id: "free-invoice-tracker",
    name: "Invoice Tracker",
    slug: "invoice-tracker-615",
    price: 0,
    description: {
      en: "Track every invoice from draft to payment. See what's outstanding, what's overdue, and what's been paid — with dedicated views for clients, projects, reminders, and quarterly reports.",
      ru: "Отслеживайте каждый инвойс от черновика до оплаты. Видите дебиторку, просрочку и оплаты — с отдельными видами по клиентам, проектам и отчётам.",
    },
    category: { en: "Personal Finance", ru: "Личные финансы" },
    categoryGroup: "finance",
    icon: "FileText",
    colorClass: "text-accent-lime",
    bgClass: "bg-accent-lime/20",
  },
  {
    id: "free-support-service",
    name: "Support Service (Tickets)",
    slug: "support-service-tickets",
    price: 0,
    description: {
      en: "Turn every customer request into a trackable ticket with built-in SLA monitoring, multi-channel intake, escalation workflows, and satisfaction scoring — so nothing slips through the cracks.",
      ru: "Превратите каждый запрос в тикет с SLA-мониторингом, многоканальным приёмом, эскалациями и оценкой удовлетворённости.",
    },
    category: { en: "Operations", ru: "Операции" },
    categoryGroup: "operations",
    icon: "Headphones",
    colorClass: "text-pastel-pink",
    bgClass: "bg-pastel-pink/20",
  },
  {
    id: "free-simple-tasks",
    name: "Simple Tasks",
    slug: "simple-tasks-n",
    price: 0,
    description: {
      en: "Ideal for freelancers and managers struggling with routine. Use for daily planning of work tasks or personal projects.",
      ru: "Идеально для фрилансеров и менеджеров. Используйте для ежедневного планирования рабочих задач или личных проектов.",
    },
    category: { en: "Personal Productivity", ru: "Личная продуктивность" },
    categoryGroup: "personal-productivity",
    icon: "CheckSquare",
    colorClass: "text-pastel-blue",
    bgClass: "bg-pastel-blue/20",
  },
  {
    id: "free-knowledge-base",
    name: "Knowledge Base (Second Brain)",
    slug: "knowledge-base-second-brain",
    price: 0,
    description: {
      en: "Capture every insight, article, quote, and instruction — tag it, link it, and find it when it matters. Your thinking, finally organized.",
      ru: "Захватывайте каждую идею, статью, цитату и инструкцию — тегируйте, связывайте и находите, когда нужно. Ваше мышление, наконец организовано.",
    },
    category: { en: "Personal Productivity", ru: "Личная продуктивность" },
    categoryGroup: "personal-productivity",
    icon: "BookOpen",
    colorClass: "text-pastel-purple",
    bgClass: "bg-pastel-purple/20",
  },
];

export const allTemplates: NotionTemplate[] = [...paidTemplatesData, ...freeTemplatesData];

export const paidTemplates = paidTemplatesData;
export const freeTemplates = freeTemplatesData;

export function getTemplateBySlug(slug: string): NotionTemplate | undefined {
  return allTemplates.find((t) => t.slug === slug);
}

export function getTemplatesByCategory(categoryGroup: string): NotionTemplate[] {
  if (categoryGroup === "all") return allTemplates;
  return allTemplates.filter((t) => t.categoryGroup === categoryGroup);
}

export function searchTemplates(query: string): NotionTemplate[] {
  const q = query.toLowerCase();
  return allTemplates.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.en.toLowerCase().includes(q) ||
      t.description.ru.toLowerCase().includes(q) ||
      t.category.en.toLowerCase().includes(q)
  );
}