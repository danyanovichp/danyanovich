export interface FeatureSection {
  id: string;
  emoji: string;
  titleRu: string;
  titleEn: string;
  descriptionRu: string;
  descriptionEn: string;
  features: {
    nameRu: string;
    nameEn: string;
    descriptionRu: string;
    descriptionEn: string;
  }[];
}

export interface Review {
  id: string;
  author: string;
  role: string;
  avatarUrl?: string;
  rating: number;
  textRu: string;
  textEn: string;
}

export const secondBrainFeatureSections: FeatureSection[] = [
  {
    id: "projects-tasks",
    emoji: "🧠",
    titleRu: "Управление проектами и задачами",
    titleEn: "Project & Task Management",
    descriptionRu: "Полная система для организации всех ваших дел и проектов",
    descriptionEn: "Complete system for organizing all your tasks and projects",
    features: [
      {
        nameRu: "Инбокс",
        nameEn: "Inbox",
        descriptionRu: "Единая точка сбора всех входящих идей, задач и мыслей — ничего не теряется",
        descriptionEn: "Single collection point for all incoming ideas, tasks and thoughts — nothing gets lost"
      },
      {
        nameRu: "Области",
        nameEn: "Areas",
        descriptionRu: "Постоянные сферы ответственности без дедлайна (работа, здоровье, финансы)",
        descriptionEn: "Permanent areas of responsibility without deadlines (work, health, finances)"
      },
      {
        nameRu: "Проекты",
        nameEn: "Projects",
        descriptionRu: "Задачи с конкретной целью и дедлайном, группировка по областям",
        descriptionEn: "Tasks with specific goals and deadlines, grouped by areas"
      },
      {
        nameRu: "Действия",
        nameEn: "Actions",
        descriptionRu: "Конкретные шаги/задачи с отслеживанием статуса",
        descriptionEn: "Specific steps/tasks with status tracking"
      },
      {
        nameRu: "Цели",
        nameEn: "Goals",
        descriptionRu: "Долгосрочное планирование и целеполагание",
        descriptionEn: "Long-term planning and goal setting"
      }
    ]
  },
  {
    id: "knowledge-base",
    emoji: "📚",
    titleRu: "База знаний",
    titleEn: "Knowledge Base",
    descriptionRu: "Храните и организуйте все свои знания в одном месте",
    descriptionEn: "Store and organize all your knowledge in one place",
    features: [
      {
        nameRu: "Заметки",
        nameEn: "Notes",
        descriptionRu: "Быстрые записи, мысли, черновики",
        descriptionEn: "Quick notes, thoughts, drafts"
      },
      {
        nameRu: "Блокноты",
        nameEn: "Notebooks",
        descriptionRu: "Группировка заметок по тематике",
        descriptionEn: "Grouping notes by topic"
      },
      {
        nameRu: "Темы",
        nameEn: "Topics",
        descriptionRu: "Теги/категории для организации контента",
        descriptionEn: "Tags/categories for content organization"
      },
      {
        nameRu: "Ресурсы",
        nameEn: "Resources",
        descriptionRu: "Переиспользуемые материалы, шаблоны, инструкции, ссылки",
        descriptionEn: "Reusable materials, templates, instructions, links"
      }
    ]
  },
  {
    id: "planning-habits",
    emoji: "📅",
    titleRu: "Планирование и привычки",
    titleEn: "Planning & Habits",
    descriptionRu: "Трекер привычек и планирование событий",
    descriptionEn: "Habit tracker and event planning",
    features: [
      {
        nameRu: "Привычки",
        nameEn: "Habits",
        descriptionRu: "Трекер ежедневных привычек с кнопками быстрого выполнения",
        descriptionEn: "Daily habit tracker with quick completion buttons"
      },
      {
        nameRu: "События",
        nameEn: "Events",
        descriptionRu: "Календарь встреч, мероприятий, важных дат",
        descriptionEn: "Calendar for meetings, events, important dates"
      }
    ]
  },
  {
    id: "archive",
    emoji: "🗄️",
    titleRu: "Архив",
    titleEn: "Archive",
    descriptionRu: "Хранилище завершённых элементов для повторного использования",
    descriptionEn: "Storage of completed items for reuse",
    features: [
      {
        nameRu: "Архив областей",
        nameEn: "Areas Archive",
        descriptionRu: "Завершённые области ответственности",
        descriptionEn: "Completed areas of responsibility"
      },
      {
        nameRu: "Архив проектов",
        nameEn: "Projects Archive",
        descriptionRu: "Завершённые проекты со всеми материалами",
        descriptionEn: "Completed projects with all materials"
      },
      {
        nameRu: "Архив ресурсов",
        nameEn: "Resources Archive",
        descriptionRu: "Сохранённые ресурсы и материалы",
        descriptionEn: "Saved resources and materials"
      }
    ]
  },
  {
    id: "structure",
    emoji: "⚙️",
    titleRu: "Структурные особенности",
    titleEn: "Structural Features",
    descriptionRu: "Продуманная архитектура для максимальной эффективности",
    descriptionEn: "Thoughtful architecture for maximum efficiency",
    features: [
      {
        nameRu: "Синхронизированная навигация",
        nameEn: "Synchronized Navigation",
        descriptionRu: "Единая навигация на всех страницах шаблона",
        descriptionEn: "Unified navigation across all template pages"
      },
      {
        nameRu: "Связи между базами",
        nameEn: "Database Relations",
        descriptionRu: "Проекты → области, действия → проекты, заметки → блокноты/темы",
        descriptionEn: "Projects → areas, actions → projects, notes → notebooks/topics"
      },
      {
        nameRu: "Множественные представления",
        nameEn: "Multiple Views",
        descriptionRu: "Разные views для разных сценариев работы",
        descriptionEn: "Different views for different work scenarios"
      },
      {
        nameRu: "Подсказки",
        nameEn: "Tooltips",
        descriptionRu: "Встроенные подсказки для новых пользователей",
        descriptionEn: "Built-in tips for new users"
      }
    ]
  }
];

export const secondBrainReviews: Review[] = [
  {
    id: "1",
    author: "Алексей М.",
    role: "Предприниматель",
    rating: 5,
    textRu: "Наконец-то нашёл систему, которая объединяет все мои проекты и знания. Работаю с этим шаблоном уже 3 месяца — продуктивность выросла в разы.",
    textEn: "Finally found a system that combines all my projects and knowledge. Been working with this template for 3 months — productivity increased dramatically."
  },
  {
    id: "2",
    author: "Мария К.",
    role: "Продакт-менеджер",
    rating: 5,
    textRu: "Идеальная реализация методологии PARA. Всё связано, ничего не теряется. Особенно нравится система архивации.",
    textEn: "Perfect implementation of PARA methodology. Everything is connected, nothing gets lost. Especially love the archiving system."
  },
  {
    id: "3",
    author: "Дмитрий В.",
    role: "Разработчик",
    rating: 5,
    textRu: "Использую для хранения технических заметок и управления личными проектами. Синхронизация между базами — это гениально!",
    textEn: "Using it for storing technical notes and managing personal projects. Database synchronization is genius!"
  }
];

export const secondBrainVideoUrl = ""; // Placeholder for YouTube embed URL
