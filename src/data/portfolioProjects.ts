export interface WorkflowNode {
  id: string;
  label: string;
  icon: string;
  color: string; // HSL color for node accent
  x: number; // percentage position
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
  {
    id: 'email-ai',
    title_ru: 'Email AI Ассистент',
    title_en: 'Email AI Assistant',
    category_ru: 'Автоматизация',
    category_en: 'Automation',
    summary_ru: 'Полностью автоматизированная система обработки входящих писем в Gmail. Анализирует через OpenAI, категоризирует (Work, Personal, Sales, Support, Spam), определяет приоритет и создаёт записи в Notion. Уведомления в Slack/Telegram, сохранение вложений в Google Drive, условные автоответы. Стоимость ~$20-30/мес.',
    summary_en: 'Fully automated email processing system for Gmail. Analyzes via OpenAI, categorizes (Work, Personal, Sales, Support, Spam), determines priority, and creates structured records in Notion. Slack/Telegram notifications, Google Drive attachments, conditional auto-replies. Cost ~$20-30/mo.',
    tags: ['Zapier', 'Gmail', 'OpenAI', 'Notion', 'Slack', 'Telegram'],
    features: [
      {
        title_ru: 'Интеллектуальный анализ',
        title_en: 'Intelligent Analysis',
        items_ru: [
          'Категоризация писем: Work, Personal, Sales, Support, Spam, Other',
          'Определение приоритета: High, Medium, Low',
          'AI-генерация резюме каждого письма',
          'Проверка необходимости ответа',
        ],
        items_en: [
          'Email categorization: Work, Personal, Sales, Support, Spam, Other',
          'Priority detection: High, Medium, Low',
          'AI-generated summary for each email',
          'Response requirement check',
        ],
      },
      {
        title_ru: 'Интеграции и расширения',
        title_en: 'Integrations & Extensions',
        items_ru: [
          'Уведомления через Slack, Email и Telegram для критичных писем',
          'Автоматическое сохранение вложений в Google Drive',
          'Условные автоответы для категорий Sales и Support',
          'Фильтрация noreply и спам-адресов',
        ],
        items_en: [
          'Notifications via Slack, Email and Telegram for critical emails',
          'Automatic attachment saving to Google Drive',
          'Conditional auto-replies for Sales and Support categories',
          'Filtering noreply and spam addresses',
        ],
      },
      {
        title_ru: 'Оптимизация стоимости',
        title_en: 'Cost Optimization',
        items_ru: [
          'GPT-3.5-turbo вместо GPT-4 для экономии',
          'Умные фильтры на уровне Zapier',
          'Кэширование результатов для предотвращения повторной обработки',
          'Батчинг и расписание запусков',
        ],
        items_en: [
          'GPT-3.5-turbo instead of GPT-4 for savings',
          'Smart Zapier-level filters',
          'Result caching to prevent reprocessing',
          'Batching and scheduled runs',
        ],
      },
    ],
    results_ru: [
      'Полностью автоматизированное управление входящей корреспонденцией',
      'Интеллектуальная категоризация и приоритизация всех писем',
      'Структурированная Notion база с фильтрами по категориям и приоритетам',
      'Мгновенные уведомления через Slack/Telegram для критичных писем',
      'Минимальное обслуживание после настройки',
      'Низкая стоимость ~$20-30/мес благодаря оптимизации',
    ],
    results_en: [
      'Fully automated incoming correspondence management',
      'Intelligent categorization and prioritization of all emails',
      'Structured Notion database with category and priority filters',
      'Instant Slack/Telegram notifications for critical emails',
      'Minimal maintenance after setup',
      'Low cost ~$20-30/mo thanks to optimization',
    ],
    cost: '$20-30/мес',
    workflow: {
      nodes: [
        { id: 'gmail', label: 'Gmail', icon: '📧', color: '0 72% 51%', x: 5, y: 40 },
        { id: 'zapier', label: 'Zapier', icon: '⚡', color: '24 95% 53%', x: 22, y: 40 },
        { id: 'openai', label: 'OpenAI', icon: '🧠', color: '160 60% 45%', x: 40, y: 40 },
        { id: 'formatter', label: 'Formatter', icon: '📋', color: '220 60% 50%', x: 58, y: 40 },
        { id: 'notion', label: 'Notion', icon: '📝', color: '0 0% 20%', x: 76, y: 40 },
        { id: 'slack', label: 'Slack', icon: '💬', color: '280 60% 50%', x: 76, y: 10 },
        { id: 'drive', label: 'G Drive', icon: '📁', color: '45 90% 50%', x: 76, y: 70 },
      ],
      connections: [
        { from: 'gmail', to: 'zapier' },
        { from: 'zapier', to: 'openai' },
        { from: 'openai', to: 'formatter' },
        { from: 'formatter', to: 'notion' },
        { from: 'formatter', to: 'slack' },
        { from: 'formatter', to: 'drive' },
      ],
    },
  },
  {
    id: 'clickup-reports',
    title_ru: 'ClickUp Reports Agent',
    title_en: 'ClickUp Reports Agent',
    category_ru: 'AI Агент',
    category_en: 'AI Agent',
    summary_ru: 'Python-агент для автоматизированной оценки качества задач в ClickUp. Загружает задачи, анализирует через локальную AI-модель (LM Studio), выставляет оценки по скорости и качеству, записывает результаты обратно в ClickUp с полной историей анализа.',
    summary_en: 'Python agent for automated task quality assessment in ClickUp. Loads tasks, analyzes via local AI model (LM Studio), scores speed and quality, writes results back to ClickUp with full analysis history.',
    tags: ['Python', 'ClickUp API', 'LM Studio', 'asyncio'],
    features: [
      {
        title_ru: 'Анализ и оценка',
        title_en: 'Analysis & Scoring',
        items_ru: [
          'Загрузка задач из ClickUp по пространству или списку',
          'Структурированный промпт с описанием, комментариями, чеклистами',
          'Оценки по двум критериям: скорость и качество',
          'Постоянная история оценок с анализом динамики',
        ],
        items_en: [
          'Task loading from ClickUp by space or list',
          'Structured prompt with description, comments, checklists',
          'Scores on two criteria: speed and quality',
          'Persistent scoring history with trend analysis',
        ],
      },
      {
        title_ru: 'Готовность к использованию',
        title_en: 'Production Ready',
        items_ru: [
          'Ручной запуск или запуск по расписанию (cron, GitHub Actions)',
          'Режим --dry-run для безопасного тестирования',
          'CLI-флаги для переопределения параметров на лету',
          'Гибкая настройка через .env файл',
        ],
        items_en: [
          'Manual or scheduled execution (cron, GitHub Actions)',
          '--dry-run mode for safe testing',
          'CLI flags for on-the-fly parameter override',
          'Flexible configuration via .env file',
        ],
      },
    ],
    results_ru: [
      'Единообразные, воспроизводимые оценки без ручной проверки',
      'Прозрачный и объективный подход к оценке',
      'Масштабируется под любые объёмы работ',
      'Полная готовность данных для отчётности и аналитики',
    ],
    results_en: [
      'Uniform, reproducible assessments without manual review',
      'Transparent and objective evaluation approach',
      'Scales to any workload volume',
      'Full data readiness for reporting and analytics',
    ],
    workflow: {
      nodes: [
        { id: 'clickup', label: 'ClickUp', icon: '✅', color: '270 60% 55%', x: 5, y: 40 },
        { id: 'agent', label: 'Python Agent', icon: '🐍', color: '55 80% 50%', x: 28, y: 40 },
        { id: 'lm', label: 'LM Studio', icon: '🤖', color: '160 60% 45%', x: 52, y: 40 },
        { id: 'scorer', label: 'Scorer', icon: '📊', color: '220 60% 50%', x: 75, y: 40 },
        { id: 'writeback', label: 'ClickUp Write', icon: '📝', color: '270 60% 55%', x: 75, y: 10 },
      ],
      connections: [
        { from: 'clickup', to: 'agent' },
        { from: 'agent', to: 'lm' },
        { from: 'lm', to: 'scorer' },
        { from: 'scorer', to: 'writeback' },
      ],
    },
  },
  {
    id: 'construction-ai',
    title_ru: 'Construction AI Agent',
    title_en: 'Construction AI Agent',
    category_ru: 'AI Инструмент',
    category_en: 'AI Tool',
    summary_ru: 'Универсальный инструмент для строительных специалистов: поиск цен на материалы, управление Google Sheets, проверка смет. Интеллектуальный поиск с кэшированием, автоматический fallback на локальную LLM, веб-интерфейс и мониторинг через Prometheus.',
    summary_en: 'Universal tool for construction professionals: material price search, Google Sheets management, estimate verification. Intelligent search with caching, automatic fallback to local LLM, web interface and Prometheus monitoring.',
    tags: ['Python', 'OpenAI', 'Google Sheets', 'Flask', 'Prometheus', 'LangChain'],
    features: [
      {
        title_ru: 'Основные возможности',
        title_en: 'Core Capabilities',
        items_ru: [
          'Поиск цен на материалы через OpenAI и веб-поиск',
          'Управление Google Sheets через естественный язык',
          'Автоматическая проверка смет: дубликаты, отсутствующие коды',
          'Импорт/экспорт Excel в формат VIORA BUILD',
        ],
        items_en: [
          'Material price search via OpenAI and web search',
          'Google Sheets management via natural language',
          'Automatic estimate verification: duplicates, missing codes',
          'Excel import/export to VIORA BUILD format',
        ],
      },
      {
        title_ru: 'Надёжность и мониторинг',
        title_en: 'Reliability & Monitoring',
        items_ru: [
          'SQLite-кэш для экономии API-бюджета',
          'Автоматический fallback на локальную LLM (LM Studio)',
          'Prometheus метрики: поиски, попадания кэша, время запросов',
          'Веб-интерфейс Flask + Vue/Tailwind',
        ],
        items_en: [
          'SQLite cache for API budget savings',
          'Automatic fallback to local LLM (LM Studio)',
          'Prometheus metrics: searches, cache hits, request times',
          'Flask + Vue/Tailwind web interface',
        ],
      },
    ],
    results_ru: [
      'Единый инструмент для материалов и смет',
      'Актуальные цены с кэшированием',
      'Автоматическое выявление ошибок в сметах',
      'Совместная работа через Google Sheets',
      'Fallback на локальную LLM гарантирует работоспособность',
      'Веб-интерфейс, CLI и программный API',
    ],
    results_en: [
      'Single tool for materials and estimates',
      'Up-to-date prices with caching',
      'Automatic error detection in estimates',
      'Team collaboration via Google Sheets',
      'Local LLM fallback guarantees uptime',
      'Web interface, CLI and programmatic API',
    ],
    workflow: {
      nodes: [
        { id: 'user', label: 'User', icon: '👤', color: '0 0% 50%', x: 5, y: 40 },
        { id: 'flask', label: 'Flask API', icon: '🌐', color: '0 0% 30%', x: 22, y: 40 },
        { id: 'openai', label: 'OpenAI', icon: '🧠', color: '160 60% 45%', x: 42, y: 20 },
        { id: 'lm', label: 'LM Studio', icon: '🤖', color: '55 80% 50%', x: 42, y: 60 },
        { id: 'cache', label: 'SQLite', icon: '💾', color: '220 60% 50%', x: 62, y: 40 },
        { id: 'sheets', label: 'G Sheets', icon: '📊', color: '120 60% 45%', x: 80, y: 20 },
        { id: 'prom', label: 'Prometheus', icon: '📈', color: '15 80% 50%', x: 80, y: 60 },
      ],
      connections: [
        { from: 'user', to: 'flask' },
        { from: 'flask', to: 'openai' },
        { from: 'flask', to: 'lm' },
        { from: 'openai', to: 'cache' },
        { from: 'lm', to: 'cache' },
        { from: 'cache', to: 'sheets' },
        { from: 'cache', to: 'prom' },
      ],
    },
  },
  {
    id: 'telegram-clickup',
    title_ru: 'Telegram to ClickUp',
    title_en: 'Telegram to ClickUp',
    category_ru: 'Автоматизация',
    category_en: 'Automation',
    summary_ru: 'Система обработки голосовых сообщений из Telegram и создания задач в ClickUp. Транскрибирует аудио через Whisper, анализирует через GPT-4, создаёт задачи с названием, описанием, дедлайном, приоритетом и ответственным. Работает по расписанию каждый час.',
    summary_en: 'Voice message processing system from Telegram to ClickUp tasks. Transcribes audio via Whisper, analyzes via GPT-4, creates tasks with title, description, deadline, priority and assignee. Runs hourly on schedule.',
    tags: ['Python', 'Telegram Bot API', 'OpenAI Whisper', 'GPT-4', 'ClickUp API'],
    features: [
      {
        title_ru: 'Обработка голоса',
        title_en: 'Voice Processing',
        items_ru: [
          'Поддержка: голосовые, пересланные, MP3, OGG, M4A, WAV',
          'Транскрипция через OpenAI Whisper с высокой точностью',
          'GPT-4 извлекает параметры задач из текста',
          'Гибкая интерпретация дедлайнов и относительных дат',
        ],
        items_en: [
          'Support: voice, forwarded, MP3, OGG, M4A, WAV',
          'Transcription via OpenAI Whisper with high accuracy',
          'GPT-4 extracts task parameters from text',
          'Flexible interpretation of deadlines and relative dates',
        ],
      },
      {
        title_ru: 'Управление и мониторинг',
        title_en: 'Management & Monitoring',
        items_ru: [
          'State.json для предотвращения двойной обработки',
          'Параллельная обработка для ускорения',
          'Markdown-отчеты после каждого запуска',
          'Итоговая сводка в Telegram чат',
          'Режимы --dry-run и --limit для тестирования',
        ],
        items_en: [
          'State.json to prevent double processing',
          'Parallel processing for speed',
          'Markdown reports after each run',
          'Summary report to Telegram chat',
          '--dry-run and --limit modes for testing',
        ],
      },
    ],
    results_ru: [
      'Создание задач через естественную речь в Telegram',
      'Автоматическая обработка каждый час',
      'Корректные дедлайны, приоритеты и ответственные',
      'Отсутствие дублирования при повторных запусках',
      'Поддержка множества форматов аудио',
      'Итоговая сводка для команды в Telegram',
    ],
    results_en: [
      'Task creation via natural speech in Telegram',
      'Automatic hourly processing',
      'Correct deadlines, priorities and assignees',
      'No duplication on repeated runs',
      'Multiple audio format support',
      'Team summary report in Telegram',
    ],
    workflow: {
      nodes: [
        { id: 'tg', label: 'Telegram', icon: '✈️', color: '200 80% 50%', x: 5, y: 40 },
        { id: 'bot', label: 'Bot', icon: '🤖', color: '200 60% 40%', x: 22, y: 40 },
        { id: 'whisper', label: 'Whisper', icon: '🎙️', color: '160 60% 45%', x: 40, y: 40 },
        { id: 'gpt', label: 'GPT-4', icon: '🧠', color: '160 60% 45%', x: 58, y: 40 },
        { id: 'clickup', label: 'ClickUp', icon: '✅', color: '270 60% 55%', x: 78, y: 30 },
        { id: 'summary', label: 'Summary', icon: '📋', color: '200 80% 50%', x: 78, y: 60 },
      ],
      connections: [
        { from: 'tg', to: 'bot' },
        { from: 'bot', to: 'whisper' },
        { from: 'whisper', to: 'gpt' },
        { from: 'gpt', to: 'clickup' },
        { from: 'gpt', to: 'summary' },
      ],
    },
  },
];
