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

export interface PortfolioProject {
  id: string;
  title_ru: string;
  title_en: string;
  category_ru: string;
  category_en: string;
  summary_ru: string;
  summary_en: string;
  tags: string[];
  features: ProjectFeature[];
  results_ru: string[];
  results_en: string[];
  workflow: {
    nodes: WorkflowNode[];
    connections: WorkflowConnection[];
  };
  cost?: string;
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
];
