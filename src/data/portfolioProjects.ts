export interface WorkflowNode {
  id: string;
  label: string;
  icon: string;
  color: string;
  x: number;
  y: number;
}

export interface WorkflowConnection {
  from: string;
  to: string;
}

export interface ProjectFeature {
  title_ru: string;
  title_en: string;
  items_ru: string[];
  items_en: string[];
}

export interface PortfolioSection {
  title_ru: string;
  title_en: string;
  body_ru: string;
  body_en: string;
  bullets_ru?: string[];
  bullets_en?: string[];
}

export interface RelatedCase {
  caseId: string;
  title_ru: string;
  title_en: string;
  blurb_ru: string;
  blurb_en: string;
}

export interface ExternalProjectLink {
  label: string;
  url: string;
}

export interface PortfolioProject {
  id: string;
  title_ru: string;
  title_en: string;
  category_ru: string;
  category_en: string;
  summary_ru: string;
  summary_en: string;
  tags: string[];
  features?: ProjectFeature[];
  results_ru?: string[];
  results_en?: string[];
  workflow?: {
    nodes: WorkflowNode[];
    connections: WorkflowConnection[];
  };
  lead_ru?: string;
  lead_en?: string;
  role_ru?: string;
  role_en?: string;
  period_ru?: string;
  period_en?: string;
  location_ru?: string;
  location_en?: string;
  format_ru?: string;
  format_en?: string;
  tools_used?: string[];
  sections?: PortfolioSection[];
  related_cases?: RelatedCase[];
  external_links?: ExternalProjectLink[];
  cost?: string;
  type: 'automation' | 'vibecoding' | 'company';
}

export const portfolioProjects: PortfolioProject[] = [
  // ── Project 1 — Email AI Assistant ──
  {
    id: 'email-ai',
    title_ru: 'Email AI Ассистент',
    title_en: 'Email AI Assistant',
    category_ru: 'Автоматизация',
    category_en: 'Automation',
    summary_ru: 'Полный цикл обработки входящей почты: Zapier отслеживает Gmail, GPT-4o анализирует письмо (категория, приоритет, черновик ответа), автоматически расставляет labels, сохраняет вложения в Google Drive по иерархии папок, создаёт карточку в Notion с AI-черновиком и кнопкой быстрого ответа. Стоимость ~$20-30/мес.',
    summary_en: 'Full email processing cycle: Zapier monitors Gmail, GPT-4o analyzes each email (category, priority, draft reply), auto-assigns labels, saves attachments to Google Drive by folder hierarchy, creates a Notion card with AI draft and one-click reply button. Cost ~$20-30/mo.',
    tags: ['Zapier', 'Gmail API', 'OpenAI GPT-4o', 'Notion API', 'Google Drive API'],
    features: [
      {
        title_ru: 'Анализ и категоризация',
        title_en: 'Analysis & Categorization',
        items_ru: [
          'GPT-4o определяет категорию письма (договор, запрос, счёт и т.д.)',
          'Оценка приоритета: срочное / обычное / информационное',
          'Извлечение ключевой информации: отправитель, тема, дедлайн',
          'Автоматическая генерация черновика ответа',
        ],
        items_en: [
          'GPT-4o determines email category (contract, request, invoice, etc.)',
          'Priority assessment: urgent / normal / informational',
          'Key info extraction: sender, subject, deadline',
          'Automatic draft reply generation',
        ],
      },
      {
        title_ru: 'Обработка и хранение',
        title_en: 'Processing & Storage',
        items_ru: [
          'Автоматическое присвоение labels в Gmail по категориям',
          'Сохранение вложений в Google Drive по иерархии папок',
          'Карточка в Notion: текст, ссылки на файлы, AI-черновик',
          'Кнопка быстрого ответа — переход в Gmail с готовым текстом',
        ],
        items_en: [
          'Auto-assign Gmail labels by category',
          'Save attachments to Google Drive by folder hierarchy',
          'Notion card: email text, Drive links, AI draft',
          'Quick reply button — opens Gmail with ready-made draft',
        ],
      },
    ],
    results_ru: [
      'Разбор почты сократился с 40 минут до 5-10 минут в день',
      'Все вложения структурированы в Google Drive по категориям',
      'Единое место управления корреспонденцией в Notion',
      'Черновик ответа готов сразу — одно нажатие переносит его в Gmail',
      'Стоимость обслуживания: ~$20-30/мес',
    ],
    results_en: [
      'Email processing reduced from 40 min to 5-10 min per day',
      'All attachments structured in Google Drive by category',
      'Single correspondence management hub in Notion',
      'Draft reply ready instantly — one click sends it to Gmail',
      'Maintenance cost: ~$20-30/mo',
    ],
    cost: '$20-30/мес',
    type: 'automation',
    workflow: {
      nodes: [
        { id: 'gmail', label: 'Gmail', icon: '📧', color: '0 72% 51%', x: 5, y: 40 },
        { id: 'zapier', label: 'Zapier', icon: '⚡', color: '24 95% 53%', x: 18, y: 40 },
        { id: 'gpt', label: 'GPT-4o', icon: '🧠', color: '160 60% 45%', x: 34, y: 40 },
        { id: 'labels', label: 'Gmail Labels', icon: '🏷️', color: '0 72% 51%', x: 52, y: 5 },
        { id: 'drive', label: 'Google Drive', icon: '📁', color: '45 90% 50%', x: 52, y: 38 },
        { id: 'notion', label: 'Notion', icon: '📝', color: '0 0% 20%', x: 52, y: 70 },
        { id: 'reply', label: 'Quick Reply', icon: '✉️', color: '220 70% 55%', x: 72, y: 70 },
      ],
      connections: [
        { from: 'gmail', to: 'zapier' },
        { from: 'zapier', to: 'gpt' },
        { from: 'gpt', to: 'labels' },
        { from: 'gpt', to: 'drive' },
        { from: 'gpt', to: 'notion' },
        { from: 'notion', to: 'reply' },
      ],
    },
  },

  // ── Project 2 — ClickUp Reports Agent ──
  {
    id: 'clickup-reports',
    title_ru: 'ClickUp Reports Agent',
    title_en: 'ClickUp Reports Agent',
    category_ru: 'AI Агент',
    category_en: 'AI Agent',
    summary_ru: 'Python-агент для персонализированной оценки 5 сотрудников. Загружает задачи из ClickUp, подгружает личную историю из SQLite, для активных задач — прогнозирует время и даёт рекомендации, для закрытых — выставляет оценки скорости и качества. Результаты записываются обратно в ClickUp и архивируются.',
    summary_en: 'Python agent for personalized assessment of 5 employees. Loads tasks from ClickUp, retrieves personal history from SQLite, forecasts time and gives recommendations for active tasks, scores speed and quality for closed tasks. Results written back to ClickUp and archived.',
    tags: ['Python 3.10+', 'ClickUp REST API', 'LM Studio', 'SQLite', 'asyncio'],
    features: [
      {
        title_ru: 'Персонализированный анализ',
        title_en: 'Personalized Analysis',
        items_ru: [
          'Загрузка задач по каждому из 5 сотрудников',
          'Личная история из SQLite: прошлые оценки, время, паттерны',
          'Для активных задач: прогноз времени на основе истории сотрудника',
          'Для закрытых задач: оценка скорости (факт vs прогноз) и качества',
        ],
        items_en: [
          'Task loading per each of 5 employees',
          'Personal history from SQLite: past scores, times, patterns',
          'Active tasks: time forecast based on employee history',
          'Closed tasks: speed score (actual vs forecast) and quality score',
        ],
      },
      {
        title_ru: 'Обратная связь и архив',
        title_en: 'Feedback & Archive',
        items_ru: [
          'Персональные рекомендации для каждого сотрудника',
          'Результаты записываются в кастомные поля ClickUp',
          'Аналитический комментарий с рекомендациями по росту',
          'Обновление архива SQLite — система умнеет с каждой задачей',
        ],
        items_en: [
          'Personalized recommendations for each employee',
          'Results written to ClickUp custom fields',
          'Analytical comment with growth recommendations',
          'SQLite archive update — system gets smarter with each task',
        ],
      },
    ],
    results_ru: [
      'Объективная и персонализированная оценка каждого из 5 сотрудников',
      'AI-рекомендации под конкретного человека на основе его истории',
      'Прогноз времени на задачу до её выполнения',
      'Сотрудники видят свой прогресс — мотивация и прозрачность',
      'Экономия часов руководителя на ручной анализ',
      'Полная история оценок для HR-решений и аналитики',
    ],
    results_en: [
      'Objective, personalized assessment of each of 5 employees',
      'AI recommendations tailored to each person based on their history',
      'Task time forecast before execution',
      'Employees see their progress — motivation and transparency',
      'Saves hours of manual analysis for the manager',
      'Complete scoring history for HR decisions and analytics',
    ],
    type: 'automation',
    workflow: {
      nodes: [
        { id: 'clickup', label: 'ClickUp', icon: '✅', color: '270 60% 55%', x: 5, y: 40 },
        { id: 'agent', label: 'Python Agent', icon: '🐍', color: '55 80% 50%', x: 20, y: 40 },
        { id: 'sqlite', label: 'SQLite History', icon: '💾', color: '220 60% 50%', x: 38, y: 5 },
        { id: 'lm-active', label: 'LLM: Прогноз', icon: '🔮', color: '160 60% 45%', x: 55, y: 15 },
        { id: 'lm-closed', label: 'LLM: Оценка', icon: '📊', color: '160 60% 45%', x: 55, y: 65 },
        { id: 'writeback', label: 'ClickUp Write', icon: '📝', color: '270 60% 55%', x: 75, y: 40 },
        { id: 'sqlite-upd', label: 'SQLite Upd', icon: '🔄', color: '220 60% 50%', x: 75, y: 5 },
      ],
      connections: [
        { from: 'clickup', to: 'agent' },
        { from: 'agent', to: 'sqlite' },
        { from: 'agent', to: 'lm-active' },
        { from: 'agent', to: 'lm-closed' },
        { from: 'sqlite', to: 'lm-active' },
        { from: 'sqlite', to: 'lm-closed' },
        { from: 'lm-active', to: 'writeback' },
        { from: 'lm-closed', to: 'writeback' },
        { from: 'writeback', to: 'sqlite-upd' },
      ],
    },
  },

  // ── Project 3 — Construction AI Agent ──
  {
    id: 'construction-ai',
    title_ru: 'Construction AI Agent',
    title_en: 'Construction AI Agent',
    category_ru: 'AI Инструмент',
    category_en: 'AI Tool',
    summary_ru: 'Веб-инструмент для сметчиков: поиск цен на материалы (OpenAI + fallback на локальную LLM), автоматическая проверка смет (дубликаты, коды, формат), экспорт/импорт через Google Sheets. Кэш SQLite для экономии API, мониторинг Prometheus. Три режима: веб, CLI, API.',
    summary_en: 'Web tool for estimators: material price search (OpenAI + local LLM fallback), automatic estimate verification (duplicates, codes, format), Google Sheets export/import. SQLite cache for API savings, Prometheus monitoring. Three modes: web, CLI, API.',
    tags: ['Python', 'Flask', 'Vue.js', 'Tailwind CSS', 'OpenAI API', 'Google Sheets API', 'SQLite', 'Prometheus'],
    features: [
      {
        title_ru: 'Поиск цен и проверка смет',
        title_en: 'Price Search & Estimate Verification',
        items_ru: [
          'Поиск цен: сначала кэш SQLite, затем OpenAI, fallback на локальную LLM',
          'Проверка смет: дубликаты, корректность кодов, ошибки формата',
          'Отчёт в Markdown с перечнем найденных проблем',
          'Импорт Excel с авто-распознаванием колонок',
        ],
        items_en: [
          'Price search: SQLite cache first, then OpenAI, fallback to local LLM',
          'Estimate check: duplicates, code correctness, format errors',
          'Markdown report with found issues',
          'Excel import with auto column recognition',
        ],
      },
      {
        title_ru: 'Интеграции и мониторинг',
        title_en: 'Integrations & Monitoring',
        items_ru: [
          'Экспорт результатов в Google Sheets для совместной работы',
          'Три режима: веб-интерфейс, CLI, программный API',
          'Автоматический fallback на локальную LLM при недоступности OpenAI',
          'Prometheus метрики: запросы, время, кэш vs API',
        ],
        items_en: [
          'Export results to Google Sheets for team collaboration',
          'Three modes: web interface, CLI, programmatic API',
          'Automatic fallback to local LLM when OpenAI unavailable',
          'Prometheus metrics: requests, timing, cache vs API',
        ],
      },
    ],
    results_ru: [
      'Ускорение рабочих процессов сметчиков на 30-40%',
      'Автоматическое выявление ошибок в смётах до их использования',
      'Актуальные цены с кэшированием — экономия на API',
      'Три режима работы: веб, CLI, API',
      'Fallback на локальную LLM при недоступности OpenAI',
      'Мониторинг нагрузки через Prometheus',
    ],
    results_en: [
      'Estimator workflows accelerated by 30-40%',
      'Automatic error detection in estimates before use',
      'Up-to-date prices with caching — API savings',
      'Three work modes: web, CLI, API',
      'Local LLM fallback when OpenAI unavailable',
      'Load monitoring via Prometheus',
    ],
    type: 'vibecoding',
    workflow: {
      nodes: [
        { id: 'user', label: 'User', icon: '👤', color: '0 0% 50%', x: 5, y: 40 },
        { id: 'flask', label: 'Flask', icon: '🌐', color: '0 0% 30%', x: 20, y: 40 },
        { id: 'openai', label: 'OpenAI', icon: '🧠', color: '160 60% 45%', x: 38, y: 10 },
        { id: 'lm', label: 'Local LLM', icon: '🤖', color: '55 80% 50%', x: 38, y: 70 },
        { id: 'cache', label: 'SQLite Cache', icon: '💾', color: '220 60% 50%', x: 55, y: 40 },
        { id: 'estimate', label: 'Estimate Check', icon: '🔍', color: '30 80% 50%', x: 55, y: 70 },
        { id: 'sheets', label: 'Google Sheets', icon: '📊', color: '120 60% 45%', x: 75, y: 10 },
        { id: 'prom', label: 'Prometheus', icon: '📈', color: '15 80% 50%', x: 75, y: 70 },
      ],
      connections: [
        { from: 'user', to: 'flask' },
        { from: 'flask', to: 'openai' },
        { from: 'flask', to: 'lm' },
        { from: 'flask', to: 'estimate' },
        { from: 'openai', to: 'cache' },
        { from: 'lm', to: 'cache' },
        { from: 'cache', to: 'sheets' },
        { from: 'estimate', to: 'sheets' },
        { from: 'flask', to: 'prom' },
      ],
    },
  },

  // ── Project 4 — Telegram to ClickUp ──
  {
    id: 'telegram-clickup',
    title_ru: 'Telegram to ClickUp',
    title_en: 'Telegram to ClickUp',
    category_ru: 'Автоматизация',
    category_en: 'Automation',
    summary_ru: 'Бот для создания задач из голосовых и текстовых сообщений Telegram. Whisper транскрибирует аудио, GPT-4 извлекает параметры (название, даты, приоритет, ответственный). Перед созданием проверяет дубли — если задача существует, обновляет её. Отчёт в Telegram по каждому действию.',
    summary_en: 'Bot for creating tasks from Telegram voice and text messages. Whisper transcribes audio, GPT-4 extracts parameters (title, dates, priority, assignee). Checks for duplicates before creation — updates existing task if found. Telegram report for every action.',
    tags: ['Python', 'Telegram Bot API', 'OpenAI Whisper', 'OpenAI GPT-4', 'ClickUp REST API', 'SQLite'],
    features: [
      {
        title_ru: 'Обработка сообщений',
        title_en: 'Message Processing',
        items_ru: [
          'Голосовые сообщения → транскрипция через Whisper',
          'Текстовые сообщения → напрямую к GPT-4',
          'GPT-4 извлекает: название, даты, приоритет, ответственный, описание',
          'Понимание естественного языка: «до пятницы» → конкретная дата',
        ],
        items_en: [
          'Voice messages → transcription via Whisper',
          'Text messages → directly to GPT-4',
          'GPT-4 extracts: title, dates, priority, assignee, description',
          'Natural language understanding: "by Friday" → specific date',
        ],
      },
      {
        title_ru: 'Умная работа с дублями',
        title_en: 'Smart Duplicate Handling',
        items_ru: [
          'Поиск похожей задачи в ClickUp по смыслу',
          'Задача не найдена → создание новой со всеми параметрами',
          'Задача найдена → проверка полноты, обновление новой информацией',
          'Telegram-отчёт: создана / обновлена / без изменений',
        ],
        items_en: [
          'Semantic search for similar tasks in ClickUp',
          'Task not found → create new with all parameters',
          'Task found → check completeness, update with new info',
          'Telegram report: created / updated / no changes',
        ],
      },
    ],
    results_ru: [
      'Задачи создаются голосом или текстом — без открытия ClickUp',
      'Полные параметры: название, описание, даты, приоритет, ответственный',
      'Дубли не создаются — система обновляет существующую задачу',
      'Прозрачность: Telegram-отчёт по каждому действию',
      'Поддержка всех форматов аудио Telegram',
    ],
    results_en: [
      'Tasks created by voice or text — no need to open ClickUp',
      'Full parameters: title, description, dates, priority, assignee',
      'No duplicates — system updates existing task',
      'Transparency: Telegram report for every action',
      'All Telegram audio formats supported',
    ],
    type: 'automation',
    workflow: {
      nodes: [
        { id: 'tg', label: 'Telegram', icon: '✈️', color: '200 80% 50%', x: 5, y: 40 },
        { id: 'whisper', label: 'Whisper', icon: '🎙️', color: '160 60% 45%', x: 22, y: 10 },
        { id: 'gpt', label: 'GPT-4', icon: '🧠', color: '160 60% 45%', x: 38, y: 40 },
        { id: 'dupcheck', label: 'Dup Check', icon: '🔍', color: '30 80% 50%', x: 55, y: 40 },
        { id: 'create', label: 'Create Task', icon: '➕', color: '120 60% 45%', x: 70, y: 15 },
        { id: 'update', label: 'Update Task', icon: '✏️', color: '45 90% 50%', x: 70, y: 65 },
        { id: 'report', label: 'TG Report', icon: '📋', color: '200 80% 50%', x: 88, y: 40 },
      ],
      connections: [
        { from: 'tg', to: 'whisper' },
        { from: 'tg', to: 'gpt' },
        { from: 'whisper', to: 'gpt' },
        { from: 'gpt', to: 'dupcheck' },
        { from: 'dupcheck', to: 'create' },
        { from: 'dupcheck', to: 'update' },
        { from: 'create', to: 'report' },
        { from: 'update', to: 'report' },
      ],
    },
  },

  // ── Project 5 — Voice Call Task Manager (NEW) ──
  {
    id: 'voice-calls',
    title_ru: 'Voice Call Task Manager',
    title_en: 'Voice Call Task Manager',
    category_ru: 'AI Агент',
    category_en: 'AI Agent',
    summary_ru: 'Система голосовых звонков для напоминания о задачах. GitHub Actions запускает скрипт по расписанию, загружает активные задачи из ClickUp для 6 сотрудников, совершает звонок через Twilio. AI-голос озвучивает задачи, принимает голосовой ответ. Если не ответил — fallback в Telegram с кнопками. Итоговый отчёт руководителю.',
    summary_en: 'Voice call system for task reminders. GitHub Actions runs script on schedule, loads active tasks from ClickUp for 6 employees, makes calls via Twilio. AI voice reads tasks, accepts voice responses. If no answer — Telegram fallback with buttons. Summary report to manager.',
    tags: ['GitHub Actions', 'Twilio API', 'ClickUp API', 'OpenAI', 'Telegram Bot API'],
    features: [
      {
        title_ru: 'Голосовые звонки и AI',
        title_en: 'Voice Calls & AI',
        items_ru: [
          'Автоматический запуск по расписанию через GitHub Actions',
          'Загрузка активных задач для каждого из 6 сотрудников',
          'Twilio звонок — реальный голосовой вызов на телефон',
          'AI-голос озвучивает задачи и анализирует ответ сотрудника',
          'Возможность перенести задачу или изменить приоритет прямо во время звонка',
        ],
        items_en: [
          'Automatic scheduled launch via GitHub Actions',
          'Load active tasks for each of 6 employees',
          'Twilio call — real voice call to phone',
          'AI voice reads tasks and analyzes employee response',
          'Ability to reschedule task or change priority during the call',
        ],
      },
      {
        title_ru: 'Резервный канал и отчётность',
        title_en: 'Fallback Channel & Reporting',
        items_ru: [
          'Если не ответил — повторный звонок через 1 час',
          'Fallback: Telegram-сообщение с кнопками (Выполнено / Не выполнено / Перенести)',
          'Статусы обновляются в ClickUp в реальном времени',
          'Сводный отчёт руководителю: кто подтвердил, кто перенёс, кто не ответил',
        ],
        items_en: [
          'No answer — retry call in 1 hour',
          'Fallback: Telegram message with buttons (Done / Not done / Reschedule)',
          'Statuses updated in ClickUp in real time',
          'Summary report to manager: who confirmed, rescheduled, or didn\'t respond',
        ],
      },
    ],
    results_ru: [
      'Сотрудники не пропускают задачи — активное голосовое напоминание',
      'Статусы обновляются автоматически без входа в ClickUp',
      'Работает с 6 сотрудниками параллельно',
      'Двойной канал: голос + Telegram = 100% охват',
      'Перенос и изменение задач прямо во время звонка',
    ],
    results_en: [
      'Employees don\'t miss tasks — active voice reminders',
      'Statuses update automatically without opening ClickUp',
      'Works with 6 employees in parallel',
      'Dual channel: voice + Telegram = 100% coverage',
      'Reschedule and modify tasks during the call',
    ],
    type: 'automation',
    workflow: {
      nodes: [
        { id: 'gh', label: 'GitHub Actions', icon: '⏰', color: '0 0% 30%', x: 5, y: 40 },
        { id: 'clickup', label: 'ClickUp', icon: '✅', color: '270 60% 55%', x: 22, y: 40 },
        { id: 'twilio', label: 'Twilio', icon: '📞', color: '0 72% 51%', x: 40, y: 30 },
        { id: 'ai-voice', label: 'AI Voice', icon: '🗣️', color: '160 60% 45%', x: 58, y: 10 },
        { id: 'tg-bot', label: 'TG Bot', icon: '💬', color: '200 80% 50%', x: 58, y: 65 },
        { id: 'cu-update', label: 'ClickUp Upd', icon: '📝', color: '270 60% 55%', x: 76, y: 40 },
        { id: 'report', label: 'Report', icon: '📋', color: '120 60% 45%', x: 76, y: 5 },
      ],
      connections: [
        { from: 'gh', to: 'clickup' },
        { from: 'clickup', to: 'twilio' },
        { from: 'twilio', to: 'ai-voice' },
        { from: 'twilio', to: 'tg-bot' },
        { from: 'ai-voice', to: 'cu-update' },
        { from: 'tg-bot', to: 'cu-update' },
        { from: 'cu-update', to: 'report' },
      ],
    },
  },

  // ── Project 6 — Viora Build Company Case ──
  {
    id: 'viora-build',
    title_ru: 'Viora Build',
    title_en: 'Viora Build',
    category_ru: 'Опыт работы',
    category_en: 'Work Experience',
    summary_ru: 'Строительная компания в Португалии, где я одновременно выстраивал цифровую инфраструктуру и управлял операционными процессами. За 1 год 8 месяцев помог стабилизировать 3 проекта вилл, внедрил 4 AI-инструмента и запустил новые направления: продажи, промо-материалы и продукт «Строительный Чекап».',
    summary_en: 'A construction company in Portugal where I built digital infrastructure and managed operations in parallel. Over 1 year 8 months, I helped stabilize 3 villa projects, implemented 4 AI tools, and launched new directions: sales, promo materials, and the "Construction Checkup" product.',
    tags: [
      'Jira',
      'ClickUp',
      'Notion',
      'Python',
      'OpenAI API',
      'amoCRM',
      'Power BI',
      'Grafana',
    ],
    lead_ru: 'Работал в двух ролях одновременно: выстраивал цифровую инфраструктуру компании и управлял операционными процессами на 3 строительных проектах вилл в Португалии.',
    lead_en: 'Worked in two roles simultaneously: built the company’s digital infrastructure and managed operations across 3 villa construction projects in Portugal.',
    role_ru: 'IT-специалист / Менеджер направления',
    role_en: 'IT Specialist / Direction Manager',
    period_ru: 'Июль 2024 — Февраль 2026 · 1 год 8 мес.',
    period_en: 'Jul 2024 — Feb 2026 · 1 year 8 months',
    location_ru: 'Португалия',
    location_en: 'Portugal',
    format_ru: 'Удалённо',
    format_en: 'Remote',
    tools_used: [
      'Jira',
      'ClickUp',
      'Notion',
      'Zapier',
      'n8n',
      'Python',
      'OpenAI API',
      'Whisper',
      'LM Studio',
      'Gemini',
      'Perplexity',
      'Flask',
      'Vue.js',
      'Tailwind CSS',
      'Google Sheets API',
      'Google Drive API',
      'Gmail API',
      'Telegram Bot API',
      'amoCRM',
      'Power BI',
      'Grafana',
      'Sora',
      'Lovable.app',
      'Figma',
    ],
    sections: [
      {
        title_ru: 'Управление проектами',
        title_en: 'Project Management',
        body_ru: 'Координировал полный цикл 3 проектов строительства вилл длительностью 6–12 месяцев: от планирования сроков и бюджетов до сдачи объекта клиенту.',
        body_en: 'Coordinated the full lifecycle of 3 villa construction projects lasting 6–12 months each: from planning timelines and budgets to client handover.',
        bullets_ru: [
          'Согласование сроков, ресурсов и бюджетов с клиентами',
          'Ежедневные синхронизации с командой и подрядчиками, планёрки, 1-on-1',
          'Контроль статусов в Jira и еженедельная отчётность руководству',
          'Подготовка документации, финализация и передача объектов клиентам',
        ],
        bullets_en: [
          'Aligned timelines, resources, and budgets with clients',
          'Ran daily syncs with the team and contractors, planning meetings, and 1-on-1s',
          'Tracked statuses in Jira and prepared weekly management reports',
          'Prepared documentation, finalized delivery, and handed over completed properties',
        ],
      },
      {
        title_ru: 'AI-автоматизации',
        title_en: 'AI Automations',
        body_ru: 'Разработал и внедрил 4 AI-инструмента, которые сократили операционные затраты команды на 30–40% и убрали ручную рутину в коммуникации, оценке задач и работе со сметами.',
        body_en: 'Designed and implemented 4 AI tools that reduced team operating costs by 30–40% and removed manual routine from communication, task evaluation, and estimate workflows.',
        bullets_ru: [
          'Email AI Assistant для автоматической обработки 50+ писем в день',
          'ClickUp Reports Agent для оценки качества и скорости работы команды',
          'Construction AI Agent для цен, смет и совместной работы через Sheets',
          'Telegram → ClickUp для создания задач из голосовых и текстовых сообщений',
        ],
        bullets_en: [
          'Email AI Assistant for automatic processing of 50+ emails per day',
          'ClickUp Reports Agent for team quality and speed evaluation',
          'Construction AI Agent for prices, estimates, and Sheets collaboration',
          'Telegram → ClickUp for creating tasks from voice and text messages',
        ],
      },
      {
        title_ru: 'Развитие бизнеса',
        title_en: 'Business Development',
        body_ru: 'Помог собрать операционную основу для роста компании: запустил отдел продаж, структурировал знания в Notion и встроил AI-ассистента для владельца.',
        body_en: 'Helped build the operational backbone for growth: launched the sales function, structured company knowledge in Notion, and introduced an AI assistant for the founder.',
        bullets_ru: [
          'Разработал sales-воронку и бизнес-процессы',
          'Нанял и обучил команду продаж за 3 месяца',
          'Настроил CRM в amoCRM',
          'Создал корпоративную базу знаний с SOP, шаблонами и процедурами',
        ],
        bullets_en: [
          'Designed the sales funnel and business processes',
          'Hired and trained the sales team in 3 months',
          'Configured CRM workflows in amoCRM',
          'Built a corporate knowledge base with SOPs, templates, and procedures',
        ],
      },
      {
        title_ru: 'Промо-материалы и сайты для инвесторов',
        title_en: 'Promo Materials and Investor Websites',
        body_ru: 'Инициировал направление по созданию коммерческих предложений и визуальных материалов для инвестиционных проектов компании.',
        body_en: 'Initiated a new direction focused on commercial proposals and visual materials for the company’s investment projects.',
        bullets_ru: [
          'Подготовил 17 коммерческих предложений с AI-визуализациями',
          'Генерировал внешний вид объектов на основе архитектурных планов и чертежей',
          'Собирал конверсионные сайты, оптимизированные под путь инвестора',
        ],
        bullets_en: [
          'Produced 17 commercial proposals with AI visualizations',
          'Generated building exteriors from architectural plans and blueprints',
          'Built conversion-oriented websites tailored to investor journeys',
        ],
      },
      {
        title_ru: 'Запуск продукта «Строительный Чекап»',
        title_en: 'Launching “Construction Checkup”',
        body_ru: 'Сопровождал полный цикл продукта для иностранцев, планирующих строить в Португалии: от исследования рынка до работающего MVP с лендингом и воронкой.',
        body_en: 'Owned the full product cycle for foreigners planning to build in Portugal: from market research to a working MVP with a landing page and sales funnel.',
        bullets_ru: [
          'Провёл исследование рынка через Gemini и Perplexity',
          'Спроектировал структуру продукта: 9 видео-модулей, 3 чек-листа и консультация',
          'Организовал контент, лендинг, платежи и автоматизацию доступа',
          'Разработал интерактивную карту Португалии и калькулятор стоимости строительства',
        ],
        bullets_en: [
          'Researched the market using Gemini and Perplexity',
          'Designed the product structure: 9 video modules, 3 checklists, and consulting',
          'Coordinated content, landing page, payments, and access automation',
          'Developed an interactive Portugal map and a construction cost calculator',
        ],
      },
    ],
    related_cases: [
      {
        caseId: 'email-ai',
        title_ru: 'Email AI Ассистент',
        title_en: 'Email AI Assistant',
        blurb_ru: 'Автоматизировал входящую почту руководителя и экономил 30–40 минут в день.',
        blurb_en: 'Automated the founder’s inbox and saved 30–40 minutes per day.',
      },
      {
        caseId: 'clickup-reports',
        title_ru: 'ClickUp Reports Agent',
        title_en: 'ClickUp Reports Agent',
        blurb_ru: 'Сделал объективную систему оценки команды без ручного анализа.',
        blurb_en: 'Built an objective team evaluation workflow without manual review.',
      },
      {
        caseId: 'construction-ai',
        title_ru: 'Construction AI Agent',
        title_en: 'Construction AI Agent',
        blurb_ru: 'Ускорил работу сметчиков и добавил проверку ошибок до использования смет.',
        blurb_en: 'Accelerated estimator workflows and caught estimate errors before use.',
      },
      {
        caseId: 'telegram-clickup',
        title_ru: 'Telegram → ClickUp',
        title_en: 'Telegram → ClickUp',
        blurb_ru: 'Позволил создавать задачи голосом и текстом без захода в ClickUp.',
        blurb_en: 'Enabled task creation by voice and text without opening ClickUp.',
      },
    ],
    external_links: [
      { label: 'dev-l29.viorabuild.org', url: 'http://dev-l29.viorabuild.org' },
      { label: 'dev-l30.viorabuild.org', url: 'http://dev-l30.viorabuild.org' },
      { label: 'algarve-haven-ventures.lovable.app', url: 'http://algarve-haven-ventures.lovable.app' },
    ],
    results_ru: [
      '3 проекта строительства вилл завершены в срок',
      '4 AI-инструмента сократили операционные затраты команды на 30–40%',
      'Собран работающий отдел продаж и CRM-процессы',
      '17 коммерческих предложений подготовлены для инвестиционных проектов',
      'MVP продукта «Строительный Чекап» запущен с лендингом и воронкой',
    ],
    results_en: [
      '3 villa construction projects were delivered on time',
      '4 AI tools reduced team operating costs by 30–40%',
      'A working sales function and CRM processes were established',
      '17 commercial proposals were produced for investment projects',
      'The “Construction Checkup” MVP launched with a landing page and funnel',
    ],
    type: 'company',
  },
];
