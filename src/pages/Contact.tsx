import { useState, useEffect, useCallback } from "react";
import { LocalLink as Link } from "@/components/LocalLink";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Youtube, MessageCircle, FileText, Star, Quote, ExternalLink, User, Code2, Bot, Workflow, Zap, Globe, Gamepad2, AppWindow, ChevronRight, ChevronLeft, Award, Linkedin, Wrench, Trophy, Mail, Briefcase, GraduationCap, Check, Clock, Database, Server, Palette } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import { useSiteSettings } from "@/hooks/useSiteSettings";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Helper to get icon component from string name
const getIconComponent = (iconName: string | undefined): React.ComponentType<{ className?: string }> => {
  if (!iconName || typeof iconName !== 'string') return FileText;
  if (iconName === 'X') return XIcon;
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  return icons[iconName] || FileText;
};

const pastelBgClasses = [
  'bg-pastel-yellow text-foreground',
  'bg-pastel-pink text-foreground',
  'bg-pastel-lavender text-foreground',
  'bg-pastel-mint text-foreground',
  'bg-pastel-coral text-foreground',
];

interface ReviewItem {
  name: string;
  project: string;
  text: string;
  rating: number;
}

interface ExperienceLink {
  href: string;
  label_ru: string;
  label_en: string;
  external?: boolean;
}

interface ExperienceProject {
  title_ru: string;
  title_en: string;
  desc_ru: string;
  desc_en: string;
  stack: string[];
  results_ru: string[];
  results_en: string[];
  link?: string;
  links?: ExperienceLink[];
  images?: string[];
}

interface ExperienceItem {
  role_ru: string;
  role_en: string;
  company: string;
  company_desc_ru: string;
  company_desc_en: string;
  period_ru: string;
  period_en: string;
  type: 'hybrid' | 'sales' | 'freelance';
  bg: string;
  description_ru: string;
  description_en: string;
  highlights_ru?: string[];
  highlights_en?: string[];
  projects: ExperienceProject[];
}

const Contact = () => {
  const { i18n } = useTranslation();
  const isRu = i18n.language === 'ru';
  const { settings } = useSiteSettings();

  // Navigation sections
  const sections = [
    { id: 'profile', label: isRu ? 'Профиль' : 'Profile', icon: User },
    { id: 'experience', label: isRu ? 'Опыт' : 'Experience', icon: Briefcase },
    { id: 'tech-stack', label: isRu ? 'Стек' : 'Stack', icon: Code2 },
    { id: 'achievements', label: isRu ? 'Достижения' : 'Achievements', icon: Trophy },
  ];

  const topSocialLinks = isRu
    ? [
        { href: "https://www.youtube.com/@danyanovich", label: "YouTube", icon: Youtube, className: "bg-destructive text-white" },
        { href: "https://t.me/danyanovichp", label: "Telegram", icon: MessageCircle, className: "bg-pastel-blue text-foreground" },
        { href: "https://www.notion.so/@danyanovich", label: "Notion", icon: FileText, className: "bg-pastel-lavender text-foreground" },
        { href: "https://github.com/danyanovich", label: "GitHub", icon: Code2, className: "bg-black text-white" },
        { href: "https://www.instagram.com/ai.now.danyanovich", label: "Instagram", icon: Globe, className: "bg-pastel-pink text-foreground" },
        { href: "https://setka.ru/users/019c6fb5-1080-7760-8b89-7b295c06922a?utm_source=seo", label: "Setka", icon: ExternalLink, className: "bg-pastel-mint text-foreground" },
        { href: "https://www.linkedin.com/in/danila-putintsev/", label: "LinkedIn", icon: Linkedin, className: "bg-primary text-white" },
        { href: "mailto:danilaputintsev2512@gmail.com", label: "Email", icon: Mail, className: "bg-pastel-yellow text-foreground" },
      ]
    : [
        { href: "https://www.youtube.com/@danyanovichp", label: "YouTube", icon: Youtube, className: "bg-destructive text-white" },
        { href: "https://t.me/danyanovichp", label: "Telegram", icon: MessageCircle, className: "bg-pastel-blue text-foreground" },
        { href: "https://www.notion.so/@danyanovich", label: "Notion", icon: FileText, className: "bg-pastel-lavender text-foreground" },
        { href: "https://github.com/danyanovich", label: "GitHub", icon: Code2, className: "bg-black text-white" },
        { href: "https://www.instagram.com/ai.now.danyanovich", label: "Instagram", icon: Globe, className: "bg-pastel-pink text-foreground" },
        { href: "https://www.linkedin.com/in/danila-putintsev/", label: "LinkedIn", icon: Linkedin, className: "bg-primary text-white" },
        { href: "mailto:danilaputintsev2512@gmail.com", label: "Email", icon: Mail, className: "bg-pastel-yellow text-foreground" },
      ];

  const expertiseBlocks = settings.expertise_blocks.map(block => ({
    id: block.id,
    icon: getIconComponent(block.icon),
    title: isRu ? block.title_ru : block.title_en,
    description: isRu ? block.description_ru : block.description_en,
    highlights: isRu ? block.highlights_ru : block.highlights_en,
    link: block.link,
  }));

  const reviews: ReviewItem[] = [
    { name: "Dmitri_Str", project: isRu ? "Оптимизация шаблона Notion" : "Notion Template Optimization", text: isRu ? "Очень редко сейчас встретишь профессионалов такого уровня, очень быстро разобрался в задаче, максимально приветлив, предложил хорошие идеи, что в итоге улучшило изначально задуманное. Быстро и качественно выполнил. Если вам нужно качество и профессионал, то однозначно рекомендую!" : "Very rare to find professionals of this level. Quickly understood the task, very friendly, suggested good ideas that improved the original concept. Fast and quality work. Highly recommend!", rating: 5 },
    { name: "edgadirov", project: isRu ? "Notion база данных + шаблон" : "Notion Database + Template", text: isRu ? "Отличная работа! Данил очень ответственный человек. К работе подошел с профессионализмом. Делали шаблон для облегчения работы учеников. Даже несколько раз созвонились, помог разобраться в notion и помог найти лучшее решение. Все сделано идеально!" : "Excellent work! Danil is very responsible. Approached the work professionally. Made a template for students. Even had several calls, helped understand Notion and find the best solution. Everything done perfectly!", rating: 5 },
    { name: "nesmeyanna", project: isRu ? "Notion 2 доски" : "Notion 2 Boards", text: isRu ? "Данила восхитителен! В работе была простая задача, он дополнил её так, как я и не могла предположить, не зная о всех возможностях Notion. Рекомендую как профессионала, с удовольствием обращусь ещё." : "Danila is amazing! It was a simple task, but he enhanced it in ways I couldn't imagine, not knowing all of Notion's capabilities. Recommend as a professional!", rating: 5 },
    { name: "Aram_G", project: isRu ? "Notion Шаблон" : "Notion Template", text: isRu ? "У меня был достаточно большой заказ, но Данила прекрасно и быстро со всем справился! Сразу видно опыт и умения! Очень рекомендую! Обязательно обращусь еще!" : "I had a fairly large order, but Danila handled everything perfectly and quickly! You can immediately see the experience and skills! Highly recommend!", rating: 5 },
    { name: "viguroo", project: isRu ? "База данных Notion" : "Notion Database", text: isRu ? "Регулярно заказываю базы в notion, очень довольна качеством работы! Искренне рекомендую всем заказчикам!! Спасибо!!" : "Regularly order databases in Notion, very happy with the quality of work! Sincerely recommend to all clients!! Thank you!!", rating: 5 },
    { name: "Yulia_step", project: isRu ? "Консультация по Notion" : "Notion Consultation", text: isRu ? "Очень быстро договорились про созвон и Данила на консультации подробно ответил на вопросы, показал возможные решения под наши и аналогичные задачи. Спасибо большое, прямо то, что нужно!" : "Quickly arranged a call and Danila answered all questions in detail during the consultation, showed possible solutions for our tasks. Thank you, exactly what we needed!", rating: 5 },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // State for interactive filters
  const [activeExpFilter, setActiveExpFilter] = useState<string>('all');
  const [activeStackFilter, setActiveStackFilter] = useState<string>('all');

  // Work experience data
  const workExperience: ExperienceItem[] = [
    {
      role_ru: 'IT-специалист / Менеджер направления',
      role_en: 'IT Specialist / Direction Manager',
      company: 'Viora Build',
      company_desc_ru: 'строительная компания, Португалия',
      company_desc_en: 'construction company, Portugal',
      period_ru: 'Июль 2024 – Февраль 2026 · 1 год 8 мес.',
      period_en: 'Jul 2024 – Feb 2026 · 1 year 8 mo.',
      type: 'hybrid',
      bg: pastelBgClasses[0],
      description_ru: 'Совмещал операционное управление с ролью инженера внедрения: запускал и адаптировал системы под реальные процессы компании, обучал команду, связывал менеджмент, подрядчиков и инструменты, а параллельно держал в фокусе стройку, продажи, документооборот и клиентские сервисы.\n\nПричина ухода: закрытие компании.',
      description_en: 'Combined operations management with an implementation-engineer role: launched and adapted systems around real company workflows, trained the team, connected management, contractors, and tools, while also staying responsible for construction operations, sales, document workflow, and client services.\n\nReason for leaving: company closure.',
      highlights_ru: ['3 проекта вилл завершены в срок', '5 AI-инструментов', '17 коммерческих предложений', 'Отдел продаж с нуля'],
      highlights_en: ['3 villa projects delivered on time', '5 AI tools', '17 commercial proposals', 'Sales team from scratch'],
      projects: [
        {
          title_ru: 'Управление строительными проектами',
          title_en: 'Construction Project Management',
          desc_ru: 'Координировал полный цикл 3 проектов строительства вилл длительностью 6–12 месяцев. Организовал еженедельные планёрки, 1-on-1 и чёткое распределение ответственности.',
          desc_en: 'Coordinated the full lifecycle of 3 villa construction projects lasting 6–12 months. Organized weekly planning meetings, 1-on-1s, and clear role distribution.',
          stack: ['Project Management', 'Jira', 'Excel Dashboards', 'Team Coordination'],
          results_ru: [
            'Все 3 проекта вилл успешно завершены в срок',
            'Спас 1 проект от срыва за счет приоритизации, пересмотра scope и перераспределения ресурсов',
            'Сроки сдачи этапов полностью нормализовались и стали прозрачными для клиентов'
          ],
          results_en: [
            'All 3 villa projects successfully delivered on time',
            'Saved 1 project from failure via task prioritization, scope review, and resource reallocation',
            'Project stages became fully normalized and transparent for clients'
          ]
        },
        {
          title_ru: 'Visual Orc и обучение команды',
          title_en: 'Visual Orc Rollout',
          desc_ru: 'Изучил новую для команды программу, организовал внедрение и выстроил обучение через презентации, практические задания, сбор вопросов и устранение узких мест.',
          desc_en: 'Learned a new tool for the team, organized the rollout, and built training through presentations, practical tasks, question collection, and bottleneck resolution.',
          stack: ['Visual Orc', 'Team Enablement', 'Training'],
          results_ru: ['Команда быстрее вошла в новую систему', 'Процесс внедрения стал управляемым', 'Обучение стало прикладным, а не формальным'],
          results_en: ['The team ramped up faster in the new system', 'Rollout became manageable', 'Training became practical instead of formal'],
          link: '/cases/viora-build',
        },
        {
          title_ru: 'Автоматизация продаж',
          title_en: 'Sales Ops Automation',
          desc_ru: 'Собрал отдел продаж из двух человек, подготовил скрипты, настроил транскрибацию и перевод звонков, AI-анализ качества и автоматическую отправку KPI с фиксацией в Google Sheets.',
          desc_en: 'Built a 2-person sales function, prepared scripts, set up call transcription and translation, AI quality analysis, and automatic KPI delivery with storage in Google Sheets.',
          stack: ['amoCRM', 'Notion', 'Google Sheets', 'Sales Scripts'],
          results_ru: ['Появилась измеримая система контроля продаж', 'Разбор звонков стал системным', 'Онбординг новых продавцов ускорился'],
          results_en: ['A measurable sales-control system was established', 'Call review became systematic', 'New salespeople ramped faster'],
          link: '/cases/viora-build',
        },
        {
          title_ru: 'ERP и структура смет',
          title_en: 'ERP + Estimate Structuring',
          desc_ru: 'Помогал настраивать ERP для строительного учёта, собрал общую базу работ и материалов, развивал базу типов работ и использовал OCR/AI для чеков и поиска стоимости.',
          desc_en: 'Supported ERP setup for construction accounting, built the shared works-and-materials base, expanded the work-types database, and used OCR/AI for receipts and price lookup.',
          stack: ['ERP', 'Construction AI', 'OCR', 'Work Database'],
          results_ru: ['Сметы стали более структурированными', 'Появилась единая база работ и материалов', 'Подготовка данных под автоматизацию ускорилась'],
          results_en: ['Estimates became more structured', 'A unified work-and-material database appeared', 'Automation-ready data preparation became faster'],
          links: [
            { href: '/cases/construction-ai', label_ru: 'Construction AI Agent', label_en: 'Construction AI Agent' },
          ],
        },
        {
          title_ru: 'Клиентский, обучающий и документный порталы',
          title_en: 'Client, Document & Training Portals',
          desc_ru: 'Развил клиентский портал в Notion, создал обучающее пространство для команды и автоматизировал документооборот между Gmail, Drive и Notion с логикой классификации документов.',
          desc_en: 'Expanded the client portal in Notion, created a team training space, and automated document workflow between Gmail, Drive, and Notion with document classification logic.',
          stack: ['Notion', 'Gmail', 'Google Drive', 'Document Workflow'],
          results_ru: ['Клиенты получили прозрачный контроль по объекту', 'Документооборот стал понятнее и быстрее', 'Онбординг команды ускорился'],
          results_en: ['Clients got transparent visibility into project status', 'Document operations became clearer and faster', 'Team onboarding accelerated'],
          images: ['/images/about/CleanShot_2026-02-15_at_15.22.302x.png']
        },
        {
          title_ru: 'Финансы и еженедельные отчёты',
          title_en: 'Finance + Weekly Reporting',
          desc_ru: 'Поддерживал финансовую операционку компании: помогал со сверкой платежей, подготовкой зарплат, поиском финансовых документов и собирал еженедельные управленческие отчёты в едином формате.',
          desc_en: 'Supported the company\'s financial operations: helped with payment checks, payroll prep, financial document lookup, and weekly management reporting in a unified format.',
          stack: ['Finance Ops', 'Power BI', 'Weekly Reporting'],
          results_ru: ['Повторяющиеся отчёты стали системными', 'Управленческая картина собиралась быстрее', 'Финансовые процессы стали прозрачнее'],
          results_en: ['Recurring reports became systematic', 'Management got a faster operating picture', 'Finance operations became more transparent'],
          link: '/cases/viora-build',
        },
        {
          title_ru: 'Звонилка: AI-напоминания о задачах',
          title_en: 'Voice Call Task Manager',
          desc_ru: 'Система голосовых звонков для напоминания о задачах. GitHub Actions запускает скрипт по расписанию, загружает задачи из ClickUp для 6 сотрудников, совершает звонок через Twilio. AI-голос озвучивает задачи, принимает голосовой ответ. Если не ответил — fallback в Telegram с кнопками.',
          desc_en: 'Voice call system for task reminders. GitHub Actions runs the script on schedule, loads tasks from ClickUp for 6 employees, makes calls via Twilio. AI voice reads tasks, accepts voice responses. No answer — Telegram fallback with buttons.',
          stack: ['GitHub Actions', 'Twilio', 'ClickUp API', 'OpenAI', 'Telegram Bot API'],
          results_ru: ['Сотрудники не пропускают задачи — активное голосовое напоминание', 'Двойной канал: голос + Telegram = 100% охват', 'Статусы обновляются без входа в ClickUp'],
          results_en: ['Employees don\'t miss tasks — active voice reminders', 'Dual channel: voice + Telegram = 100% coverage', 'Statuses update without opening ClickUp'],
          link: '/cases/voice-calls',
        },
      ],
    },
    {
      role_ru: 'Менеджер продукта / Руководитель направления',
      role_en: 'Product Manager / Head of Direction',
      company: 'Viora Consulting',
      company_desc_ru: 'цифровой консалтинг, Португалия',
      company_desc_en: 'digital consulting, Portugal',
      period_ru: 'Август 2025 – Февраль 2026 · 7 мес.',
      period_en: 'Aug 2025 – Feb 2026 · 7 mo.',
      type: 'hybrid',
      bg: pastelBgClasses[1],
      description_ru: 'Запустил образовательный цифровой продукт «Строительный Чекап» для иностранцев в Португалии. Отвечал за весь жизненный цикл: от исследования рынка и ценообразования до создания контента, разработки воронки продаж и запуска MVP.\n\nПродукт успешно запущен на стадии MVP, проект приостановлен в связи с отсутствием дальнейшего финансирования.',
      description_en: 'Launched the "Construction Checkup" educational digital product for expats in Portugal. Managed the entire lifecycle: from market research and pricing strategy to content creation, sales funnel design, and MVP launch.\n\nSuccessfully launched as MVP, suspended due to scaling funding changes.',
      highlights_ru: ['1 MVP запущен с нуля', '9 видео-модулей', '2 инструмента автоматизации', 'Калькулятор смет'],
      highlights_en: ['1 MVP launched from scratch', '9 video modules', '2 automation tools', 'Cost calculator'],
      projects: [
        {
          title_ru: 'Запуск продукта «Строительный Чекап»',
          title_en: 'Construction Checkup Product Launch',
          desc_ru: 'Полный цикл создания образовательного продукта: спроектировал структуру (9 модулей, 3 чек-листа), настроил прием платежей, доступ к контенту, собрал лендинг и воронку продаж.',
          desc_en: 'Full lifecycle creation of an educational product: designed the structure (9 modules, 3 checklists), set up payment gateway, content access, and built the landing page and sales funnel.',
          stack: ['Product Launch', 'Notion', 'Loom', 'Figma', 'Stripe', 'n8n'],
          results_ru: [
            'Продукт полностью спроектирован и запущен с нуля за 4 месяца',
            'Спроектирован и внедрен умный калькулятор стоимости строительства на ~20 параметров',
            'Воронка продаж полностью автоматизирована: лендинг → оплата → доступ → консультация'
          ],
          results_en: [
            'Product fully designed and launched from scratch in 4 months',
            'Designed and implemented a smart construction cost calculator (~20 parameters)',
            'Sales funnel fully automated: landing → payment → access → consultation'
          ]
        }
      ]
    },
    {
      role_ru: 'Представитель банка',
      role_en: 'Bank Representative',
      company: 'Т-Банк',
      company_desc_ru: 'T-Bank',
      company_desc_en: 'T-Bank',
      period_ru: 'Июнь 2024 – Июнь 2025 · 1 год 1 мес.',
      period_en: 'Jun 2024 – Jun 2025 · 1 year 1 mo.',
      type: 'sales',
      bg: pastelBgClasses[3],
      description_ru: 'Проведение встреч с клиентами и продажа банковских продуктов. Работа с возражениями и ведение переговоров. Работа в CRM и управление воронкой. Выполнение планов продаж.\n\nПричина ухода: смена работы на удаленный формат.',
      description_en: 'Conducting client meetings and selling banking products. Handling objections and negotiations. Working in CRM and pipeline management. Achieving sales targets.\n\nReason for leaving: transition to remote work.',
      projects: [],
    },
    {
      role_ru: 'Специалист поддержки клиентов',
      role_en: 'Customer Support Specialist',
      company: 'Точка Банк',
      company_desc_ru: 'банк для бизнеса',
      company_desc_en: 'business bank',
      period_ru: 'Март 2023 – Май 2024 · 1 год 3 мес.',
      period_en: 'Mar 2023 – May 2024 · 1 year 3 mo.',
      type: 'sales',
      bg: pastelBgClasses[2],
      description_ru: 'Дистанционное обслуживание и техническая поддержка корпоративных клиентов. Консультирование по тарифам, настройке расчетно-кассового обслуживания, валютному контролю и работе в интернет-банке.',
      description_en: 'Remote customer service and technical support for corporate clients. Consultations on tariffs, cash management services, currency control, and online banking systems.',
      projects: []
    },
    {
      role_ru: 'Фриланс — Дэн Янович',
      role_en: 'Freelance — Dan Yanovich',
      company: 'No-Code Consulting',
      company_desc_ru: 'индивидуальная деятельность',
      company_desc_en: 'individual practice',
      period_ru: 'Июль 2020 – Настоящее время · 5+ лет',
      period_en: 'Jul 2020 – Present · 5+ years',
      type: 'freelance',
      bg: pastelBgClasses[4 % pastelBgClasses.length],
      description_ru: 'Комплексная фриланс-деятельность: консультирование, разработка шаблонов и автоматизаций для компаний разных ниш. 50+ проектов, 500+ Notion шаблонов.',
      description_en: 'Comprehensive freelance activity: consulting, template development and automations for companies across various niches. 50+ projects, 500+ Notion templates.',
      projects: [],
    },
  ];

  // Tech stack categories
  const techStack = [
    {
      title_ru: 'No-Code',
      title_en: 'No-Code',
      icon: Workflow,
      bg: pastelBgClasses[0],
      type: 'nocode',
      items: ['Notion (продвинутый)', 'ClickUp', 'Jira', 'amoCRM', 'Zapier Pro', 'n8n', 'Lovable.app'],
      items_en: ['Notion (advanced)', 'ClickUp', 'Jira', 'amoCRM', 'Zapier Pro', 'n8n', 'Lovable.app'],
    },
    {
      title_ru: 'Код',
      title_en: 'Code',
      icon: Code2,
      bg: pastelBgClasses[1],
      type: 'code',
      items: ['Python 3.10+', 'Flask / FastAPI', 'JavaScript', 'Vue.js / React', 'Tailwind CSS', 'REST API', 'Git / GitHub'],
      items_en: ['Python 3.10+', 'Flask / FastAPI', 'JavaScript', 'Vue.js / React', 'Tailwind CSS', 'REST API', 'Git / GitHub'],
    },
    {
      title_ru: 'AI Инструменты',
      title_en: 'AI Tools',
      icon: Bot,
      bg: pastelBgClasses[2],
      type: 'ai',
      items: ['ИИ-агенты Notion', 'Автоматизации для бизнеса', 'Construction AI (сметы и цены)', 'Open Source решения (GitHub)', 'OpenAI API (GPT-4o, Whisper)', 'Gemini', 'LM Studio'],
      items_en: ['Notion AI Agents', 'Business Automations', 'Construction AI (Estimates & Prices)', 'Open Source solutions (GitHub)', 'OpenAI API (GPT-4o, Whisper)', 'Gemini', 'LM Studio'],
    },
    {
      title_ru: 'Интеграции и аналитика',
      title_en: 'Integrations & Analytics',
      icon: Database,
      bg: pastelBgClasses[3],
      type: 'infra',
      items: ['SQLite', 'Gmail API', 'Google Drive API', 'Google Sheets API', 'Telegram Bot API', 'Power BI', 'Grafana'],
      items_en: ['SQLite', 'Gmail API', 'Google Drive API', 'Google Sheets API', 'Telegram Bot API', 'Power BI', 'Grafana'],
    },
  ];

  const filteredExperience = activeExpFilter === 'all' ? workExperience : workExperience.filter(w => w.type === activeExpFilter);
  const filteredStack = activeStackFilter === 'all' ? techStack : techStack.filter(s => s.type === activeStackFilter);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        titleRu="Обо мне | Данила Путинцев — Дэн Янович"
        titleEn="About Me | Danila Putintsev — Dan Yanovich"
        descriptionRu="Архитектор рабочих пространств и цифровых систем. Специалист по автоматизации бизнеса и AI. 50+ проектов, 500+ шаблонов."
        descriptionEn="Workspace architect and digital systems specialist. Business automation and AI expert. 50+ projects, 500+ templates."
      />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <AnimatedSection>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight font-display">
                {isRu ? 'Данила Путинцев' : 'Danila Putintsev'}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
                {isRu
                  ? 'Архитектор рабочих пространств и цифровых систем · Специалист по автоматизации бизнеса и AI'
                  : 'Workspace Architect & Digital Systems · Business Automation & AI Specialist'}
              </p>
              <div className="mt-8 flex justify-center">
                <img
                  src="/images/about/Данила_short.jpeg"
                  alt={isRu ? 'Данила Путинцев' : 'Danila Putintsev'}
                  className="w-48 h-48 object-cover rounded-none border-4 border-foreground shadow-[8px_8px_0px_0px_currentColor] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0px_0px_currentColor] transition-all duration-300"
                />
              </div>
            </AnimatedSection>

            {/* Contact links */}
            <AnimatedSection delay={100}>
              <div className="flex flex-wrap justify-center gap-3">
                {topSocialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-none border-2 border-foreground shadow-[2px_2px_0px_0px_currentColor] text-sm font-bold uppercase tracking-wider hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all ${link.className}`}
                  >
                    <link.icon className="h-4 w-4" /> {link.label}
                  </a>
                ))}
              </div>
            </AnimatedSection>

            {/* Section Navigation */}
            <AnimatedSection delay={150}>
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-4">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant="outline"
                    size="sm"
                    onClick={() => scrollToSection(section.id)}
                    className="gap-2 rounded-none border-2 shadow-[2px_2px_0px_0px_currentColor] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all hover:bg-pastel-yellow hover:text-black"
                  >
                    <section.icon className="h-4 w-4" />
                    {section.label}
                  </Button>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Professional Profile */}
      <section id="profile" className="py-16 md:py-20 scroll-mt-20">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            <AnimatedSection>
              <div className="relative bg-card border-4 border-foreground shadow-[8px_8px_0px_0px_currentColor] rounded-none p-6 md:p-8 space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold font-display">
                  {isRu ? 'Профессиональный профиль' : 'Professional Profile'}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {isRu
                    ? 'Я помогаю компаниям и экспертам переходить от операционного хаоса к четким, автоматизированным системам. Мой подход универсален и строится на глубоком знании No-code инструментов и внедрении ИИ-решений в любые бизнес-процессы.'
                    : 'I help companies and experts transition from operational chaos to clear, automated systems. My approach is universal and based on deep knowledge of No-code tools and implementing AI solutions into any business processes.'}
                </p>

                {/* Focus areas */}
                <div className="grid sm:grid-cols-1 gap-3">
                  {[
                    { ru: 'С 2020 года создаю и консультирую рабочие пространства, реализовал более 50 проектов по внедрению Notion, Buildin.AI и других инструментов для компаний различного масштаба. Разработал комплексные решения, повысившие эффективность рабочих процессов клиентов в среднем на 30%, создал библиотеку специализированных шаблонов для различных бизнес-задач и провел более 100 часов обучающих сессий, помогая командам максимально использовать возможности пространств.', en: 'Since 2020, I have been designing and consulting on workspaces, implementing over 50 projects rolling out Notion, Buildin.AI, and other tools for companies of various scales. Developed comprehensive solutions that increased client workflow efficiency by an average of 30%, built a library of specialized templates for diverse business needs, and conducted over 100 hours of training sessions, helping teams maximize their workspaces\' capabilities.' },
                    { ru: 'Автоматизирую сложные процессы: Настраиваю порядок в системно сложных нишах. Внедряю ERP-системы, настраиваю финансовый учет и создаю клиентские порталы там, где важна идеальная точность.', en: 'Automate complex processes: Bring order to systematically complex niches. Implement ERP systems, set up financial accounting, and create client portals where perfect accuracy is crucial.' },
                    { ru: 'Сшиваю структуру компании: Настраиваю связки между административными отделами и производством, чтобы задачи выполнялись вовремя, а логика работы была понятна каждому сотруднику.', en: 'Stitch company structure together: Setup connections between administrative departments and production, so tasks are completed on time and work logic is clear to everyone.' },
                    { ru: 'Разрабатываю ИИ-агентов и автоматизации: Создаю интеллектуальных ассистентов для Notion, n8n и внутренние инструменты автоматизации рутины. Автор проекта Construction AI, который начинался как внутреннее решение, а вырос в коммерческий инструмент.', en: 'Develop AI agents and automations: Create smart assistants for Notion, n8n, and internal routine automations. Author of Construction AI, which started as an internal tool and expanded into a commercial product.' },
                    { ru: 'Open Source продукты: Публикую и поддерживаю открытые решения для интеграций и повышения эффективности на GitHub.', en: 'Open Source products: Publish and maintain open-source integration and productivity solutions on GitHub.' },
                    { ru: 'Внедряю культуру работы: Провел более 100 часов обучающих сессий. Моя цель — не просто сделать, а интегрировать систему в жизнь команды.', en: 'Implement work culture: Conducted 100+ hours of training sessions. My goal is not just to build, but to integrate the system into the team\'s life.' },
                    { ru: 'Развиваю сообщество: Делюсь опытом и готовыми решениями в YouTube-канале и создаю специализированные шаблоны.', en: 'Develop community: Share experience and ready-made solutions on YouTube and create specialized templates.' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 text-accent-lime shrink-0 mt-0.5" />
                      <span>{isRu ? item.ru : item.en}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Philosophy */}
            <AnimatedSection delay={100}>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title_ru: 'Сначала аудит — потом инструменты', title_en: 'Audit first — then tools', desc_ru: 'Я не продаю шаблоны, а решаю конкретную бизнес-задачу. Автоматизировать хаос нельзя.', desc_en: 'I don\'t sell templates, I solve specific business tasks. Chaos cannot be automated.', bg: pastelBgClasses[0] },
                  { title_ru: 'Прозрачность процессов', title_en: 'Process Transparency', desc_ru: 'Вы видите статус работ в реальном времени на общем дашборде.', desc_en: 'You see work status in real-time on a shared dashboard.', bg: pastelBgClasses[1] },
                  { title_ru: 'Обучение включено', title_en: 'Training Included', desc_ru: 'Я не оставляю команду один на один с новой системой. В стоимость входит обучение и инструкции.', desc_en: 'I don\'t leave the team alone with a new system. Training and instructions are included.', bg: pastelBgClasses[2] },
                  { title_ru: 'Просто о сложном', title_en: 'Simply about complex things', desc_ru: 'Объясняю логику работы без сложной терминологии, чтобы разобраться мог любой сотрудник.', desc_en: 'Explain logic without complex terminology so any employee can figure it out.', bg: pastelBgClasses[3] },
                ].map((item, i) => (
                  <div key={i} className={`${item.bg} border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] rounded-none p-5 space-y-2 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_currentColor] transition-all`}>
                    <h4 className="text-sm font-bold font-display">{isRu ? item.title_ru : item.title_en}</h4>
                    <p className="text-xs text-foreground/80 font-medium">{isRu ? item.desc_ru : item.desc_en}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-16 md:py-20 scroll-mt-20">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-8">
            <AnimatedSection>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="work-experience" className="border-0">
                  <AccordionTrigger className="border-2 border-foreground bg-card px-6 py-5 shadow-[6px_6px_0px_0px_currentColor] hover:no-underline">
                    <div className="space-y-2 text-left">
                      <h2 className="text-3xl md:text-4xl font-bold font-display">
                        {isRu ? 'Опыт работы' : 'Work Experience'}
                      </h2>
                      <p className="text-sm md:text-base text-muted-foreground max-w-3xl">
                        {isRu
                          ? 'Собрал здесь компании и роли, в которых соединял операционное управление, автоматизации и запуск новых направлений.'
                          : 'This is the part of my background where operations, automation, and new business directions came together.'}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-8">
                    <div className="space-y-8">
                      <div className="flex flex-wrap justify-center gap-2">
                        {[
                          { id: 'all', label_ru: 'Все', label_en: 'All' },
                          { id: 'hybrid', label_ru: 'Системы и операционка', label_en: 'Systems & Operations' },
                          { id: 'sales', label_ru: 'Продажи', label_en: 'Sales' },
                          { id: 'freelance', label_ru: 'Фриланс', label_en: 'Freelance' },
                        ].map((filter) => (
                          <Button
                            key={filter.id}
                            variant="outline"
                            size="sm"
                            onClick={() => setActiveExpFilter(filter.id)}
                            className={`rounded-none border-2 shadow-[2px_2px_0px_0px_currentColor] transition-all ${
                              activeExpFilter === filter.id
                                ? 'bg-foreground text-background'
                                : 'hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none'
                            }`}
                          >
                            {isRu ? filter.label_ru : filter.label_en}
                          </Button>
                        ))}
                      </div>

                      <div className="space-y-6">
                        {filteredExperience.map((item, index) => (
                          <div key={`${item.company}-${item.period_en}`} className={`${item.bg} border-2 border-foreground shadow-[6px_6px_0px_0px_currentColor] p-6 md:p-8 space-y-6`}>
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                              <div className="space-y-3">
                                <div className="space-y-1">
                                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-foreground/70">
                                    {item.company}
                                    {' · '}
                                    {isRu ? item.company_desc_ru : item.company_desc_en}
                                  </p>
                                  <h3 className="text-2xl md:text-3xl font-bold font-display">
                                    {isRu ? item.role_ru : item.role_en}
                                  </h3>
                                </div>
                                <p className="text-sm font-medium text-foreground/80">
                                  {isRu ? item.period_ru : item.period_en}
                                </p>
                                <p className="max-w-3xl text-sm md:text-base leading-relaxed text-foreground/80">
                                  {isRu ? item.description_ru : item.description_en}
                                </p>
                              </div>

                              <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
                                {((isRu ? item.highlights_ru : item.highlights_en) ?? []).map((highlight: string) => (
                                  <Badge key={highlight} variant="outline" className="bg-card text-xs font-bold uppercase tracking-wider">
                                    {highlight}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {item.projects.length > 0 ? (
                              <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value={`${item.company}-${index}`} className="border-0">
                                  <AccordionTrigger className="border-2 border-foreground bg-card px-5 py-4 text-left text-sm font-bold uppercase tracking-[0.22em] shadow-[4px_4px_0px_0px_currentColor] hover:no-underline">
                                    {isRu ? 'Ключевые результаты и инициативы' : 'Key Results and Initiatives'}
                                  </AccordionTrigger>
                                  <AccordionContent className="pt-5">
                                    <div className="grid gap-4 md:grid-cols-2">
                                      {item.projects.map((project, projectIndex: number) => (
                                        <div
                                          key={`${project.title_en}-${projectIndex}`}
                                          className="flex h-full flex-col gap-4 border-2 border-foreground bg-card p-5 shadow-[4px_4px_0px_0px_currentColor]"
                                        >
                                          {project.images?.length ? (
                                            <div className="overflow-hidden border-2 border-foreground">
                                              <img
                                                src={project.images[0]}
                                                alt={isRu ? project.title_ru : project.title_en}
                                                className="h-40 w-full object-cover"
                                                loading="lazy"
                                              />
                                            </div>
                                          ) : null}

                                          <div className="space-y-3">
                                            <div>
                                              <h4 className="text-lg font-bold font-display">
                                                {isRu ? project.title_ru : project.title_en}
                                              </h4>
                                              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                                {isRu ? project.desc_ru : project.desc_en}
                                              </p>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                              {(project.stack ?? []).map((stackItem: string) => (
                                                <span
                                                  key={stackItem}
                                                  className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider border border-foreground bg-muted/30"
                                                >
                                                  {stackItem}
                                                </span>
                                              ))}
                                            </div>

                                            <ul className="space-y-2">
                                              {(isRu ? project.results_ru : project.results_en).map((result: string) => (
                                                <li key={result} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-lime" />
                                                  {result}
                                                </li>
                                              ))}
                                            </ul>
                                          </div>

                                          {project.link || project.links?.length ? (
                                            <div className="mt-auto flex flex-wrap gap-2 pt-2">
                                              {project.link ? (
                                                <Link
                                                  to={project.link}
                                                  className="inline-flex items-center gap-2 border-2 border-foreground px-3 py-2 text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_currentColor] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4px_4px_0px_0px_currentColor]"
                                                >
                                                  {isRu ? 'Открыть кейс' : 'Open case'}
                                                </Link>
                                              ) : null}

                                              {(project.links ?? []).map((link) =>
                                                link.external ? (
                                                  <a
                                                    key={link.href}
                                                    href={link.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 border-2 border-foreground px-3 py-2 text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_currentColor] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4px_4px_0px_0px_currentColor]"
                                                  >
                                                    {isRu ? link.label_ru : link.label_en}
                                                  </a>
                                                ) : (
                                                  <Link
                                                    key={link.href}
                                                    to={link.href}
                                                    className="inline-flex items-center gap-2 border-2 border-foreground px-3 py-2 text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_currentColor] transition-all hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4px_4px_0px_0px_currentColor]"
                                                  >
                                                    {isRu ? link.label_ru : link.label_en}
                                                  </Link>
                                                )
                                              )}
                                            </div>
                                          ) : null}
                                        </div>
                                      ))}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Key Achievements */}
      <section id="achievements" className="py-16 md:py-20 scroll-mt-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-10">
                {isRu ? 'Ключевые достижения' : 'Key Achievements'}
              </h2>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { value: `${settings.stats.projects}+`, text_ru: `${settings.stats.projects}+ проектов по автоматизации`, text_en: `${settings.stats.projects}+ automation projects`, bg: 'bg-pastel-yellow text-foreground' },
                { value: `80+`, text_ru: `80+ Notion шаблонов (80% в паблике)`, text_en: `80+ Notion templates (80% public)`, bg: 'bg-pastel-pink text-foreground' },
                { value: `${settings.stats.hours}+`, text_ru: `${settings.stats.hours}+ часов обучающих сессий`, text_en: `${settings.stats.hours}+ hours of training sessions`, bg: 'bg-pastel-lavender text-foreground' },
                { value: `5`, text_ru: '5 AI-инструментов в Viora Build', text_en: '5 AI tools at Viora Build', bg: 'bg-pastel-mint text-foreground' },
                { value: `17`, text_ru: '17 коммерческих предложений с визуализациями', text_en: '17 commercial proposals with visualizations', bg: 'bg-pastel-coral text-foreground' },
                { value: `3`, text_ru: 'Развитие 3 направлений бизнеса (Build, Consulting, Development)', text_en: '3 business divisions developed (Build, Consulting, Development)', bg: 'bg-pastel-yellow text-foreground' },
              ].map((achievement, ai) => (
                <AnimatedSection key={ai} delay={ai * 80}>
                  <div className={`${achievement.bg} p-5 flex items-center gap-4 border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] rounded-none hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_currentColor] transition-all`}>
                    <span className="text-2xl md:text-3xl font-bold font-display shrink-0 w-20 text-center">{achievement.value}</span>
                    <p className="text-sm font-medium">{isRu ? achievement.text_ru : achievement.text_en}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Blocks (from settings) */}
      <section id="tech-stack" className="py-16 md:py-20 scroll-mt-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-10">
                {isRu ? 'Технический стек' : 'Tech Stack'}
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={60}>
              <div className="mb-8 flex flex-wrap justify-center gap-2">
                {[
                  { id: 'all', label_ru: 'Все', label_en: 'All' },
                  { id: 'nocode', label_ru: 'No-Code', label_en: 'No-Code' },
                  { id: 'code', label_ru: 'Код', label_en: 'Code' },
                  { id: 'ai', label_ru: 'AI', label_en: 'AI' },
                  { id: 'infra', label_ru: 'Интеграции', label_en: 'Integrations' },
                ].map((filter) => (
                  <Button
                    key={filter.id}
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveStackFilter(filter.id)}
                    className={`rounded-none border-2 shadow-[2px_2px_0px_0px_currentColor] transition-all ${
                      activeStackFilter === filter.id
                        ? 'bg-foreground text-background'
                        : 'hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none'
                    }`}
                  >
                    {isRu ? filter.label_ru : filter.label_en}
                  </Button>
                ))}
              </div>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-6">
              {filteredStack.map((category, ci) => (
                <AnimatedSection key={category.type} delay={ci * 100}>
                  <div className={`${category.bg} border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] rounded-none p-6 space-y-4 h-full`}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-card border-2 border-foreground shadow-[2px_2px_0px_0px_currentColor] rounded-none">
                        <category.icon className="h-6 w-6 text-foreground" />
                      </div>
                      <h3 className="text-lg font-bold font-display">
                        {isRu ? category.title_ru : category.title_en}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(isRu ? category.items : category.items_en).map((item, ii) => {
                        // Notion → /notion, rest → /cases?tool=item
                        const isNotion = item.toLowerCase().startsWith('notion');
                        const href = isNotion
                          ? '/notion'
                          : `/cases?tool=${encodeURIComponent(item.split(' ')[0].replace(/[()]/g, ''))}`;
                        return (
                          <Link
                            key={ii}
                            to={href}
                            className="px-3 py-1 bg-card border-2 border-foreground shadow-[2px_2px_0px_0px_currentColor] text-foreground text-xs font-bold uppercase tracking-wider hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4px_4px_0px_0px_currentColor] transition-all cursor-pointer"
                          >
                            {item}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Blocks (from settings) */}
      <section className="py-16 md:py-20 scroll-mt-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-10">
                {isRu ? 'Направления' : 'Expertise'}
              </h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-2 gap-6">
              {expertiseBlocks.map((block, index) => (
                <AnimatedSection key={block.id} delay={index * 100}>
                  <Link to={block.link}>
                    <Card
                      className={`h-full overflow-hidden border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] rounded-none ${pastelBgClasses[index % pastelBgClasses.length].split(' ')[0]} hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_currentColor] cursor-pointer transition-all`}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-card border-2 border-foreground shadow-[2px_2px_0px_0px_currentColor] rounded-none">
                            <block.icon className="h-8 w-8 text-foreground" />
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold font-display">{block.title}</h3>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-foreground font-medium leading-relaxed text-sm md:text-base">{block.description}</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {block.highlights.map((highlight, i) => (
                            <span key={i} className="px-3 py-1 bg-card border-2 border-foreground shadow-[2px_2px_0px_0px_currentColor] text-foreground text-sm font-bold uppercase tracking-wider">{highlight}</span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <ReviewsCarousel reviews={reviews} isRu={isRu} />

      {/* Education */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-10">
                {isRu ? 'Образование' : 'Education'}
              </h2>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 gap-6">
              <AnimatedSection delay={0}>
                <Card className="h-full border-0 bg-pastel-yellow/25">
                  <CardContent className="p-6 space-y-3">
                    <div className="p-3 bg-background/50 rounded-2xl w-fit">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold font-display">Alpi AI Creator Course</h3>
                    <p className="text-xs text-muted-foreground">{isRu ? 'Школа Alpi (Franch.AI) · 2025' : 'Alpi School (Franch.AI) · 2025'}</p>
                    <p className="text-sm text-muted-foreground">
                      {isRu ? 'Использование LLM (ChatGPT, Claude), разработка AI-ассистентов, интеграция AI в бизнес-процессы.' : 'Using LLMs (ChatGPT, Claude), developing AI assistants, integrating AI into business processes.'}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
              <AnimatedSection delay={100}>
                <Card className="h-full border-0 bg-pastel-mint/25">
                  <CardContent className="p-6 space-y-3">
                    <div className="p-3 bg-background/50 rounded-2xl w-fit">
                      <Code2 className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold font-display">{isRu ? 'Self-taught специалист' : 'Self-taught Specialist'}</h3>
                    <p className="text-xs text-muted-foreground">{isRu ? '5+ лет практики' : '5+ years of practice'}</p>
                    <p className="text-sm text-muted-foreground">
                      {isRu ? 'Постоянное развитие через реальные проекты, разработка 500+ Notion шаблонов, активное участие в сообществах.' : 'Continuous development through real projects, 500+ Notion templates created, active community participation.'}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Reviews Carousel Component
const ReviewsCarousel = ({ reviews, isRu }: { reviews: ReviewItem[]; isRu: boolean }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const visibleReviews = [
    reviews[(currentIndex - 1 + reviews.length) % reviews.length],
    reviews[currentIndex],
    reviews[(currentIndex + 1) % reviews.length],
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-2">
                {isRu ? 'Отзывы клиентов' : 'Client Reviews'}
              </h2>
              <p className="text-muted-foreground">
                {isRu ? `22+ положительных отзывов на Kwork` : `22+ positive reviews on Kwork`}
              </p>
            </div>
          </AnimatedSection>

          <div
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <Button variant="outline" size="icon" onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 hidden md:flex rounded-full">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 hidden md:flex rounded-full">
              <ChevronRight className="h-5 w-5" />
            </Button>

            <div className="grid md:grid-cols-3 gap-6 px-4 md:px-8">
              {visibleReviews.map((review, index) => (
                <Card
                  key={`${review.name}-${currentIndex}-${index}`}
                  className={`h-full transition-all duration-500 border-0 ${index === 1
                    ? 'md:scale-105 bg-pastel-yellow/20'
                    : 'opacity-70 md:opacity-100 bg-muted/20'
                    }`}
                >
                  <CardHeader className="pb-2">
                    <Quote className="h-8 w-8 text-muted-foreground/30 mb-2" />
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-pastel-yellow text-pastel-yellow" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground italic line-clamp-4">"{review.text}"</p>
                    <div className="pt-2 border-t border-border/50">
                      <p className="font-semibold text-sm font-display">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.project}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${index === currentIndex ? 'bg-foreground w-8' : 'bg-foreground/30 w-2.5 hover:bg-foreground/50'
                    }`}
                />
              ))}
            </div>
          </div>

          <AnimatedSection delay={300}>
            <div className="mt-12 text-center">
              <a href="https://kwork.ru/user/danyanovich" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2 group rounded-none border-2 border-foreground shadow-[3px_3px_0px_0px_currentColor] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px] transition-all">
                  <ExternalLink className="h-4 w-4" />
                  {isRu ? 'Все отзывы на Kwork' : 'All reviews on Kwork'}
                </Button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
