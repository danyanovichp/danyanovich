import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Youtube, MessageCircle, FileText, Star, Quote, ExternalLink, User, Code2, Bot, Workflow, Zap, Globe, Gamepad2, AppWindow, ChevronRight, ChevronLeft, Award, Linkedin, Wrench, Trophy, Mail, MapPin, Briefcase, GraduationCap, Check, Clock, Database, Server, Palette, Languages, Calendar } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import DecorativeBlobs from "@/components/DecorativeBlobs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
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
  'bg-pastel-yellow/25',
  'bg-pastel-pink/25',
  'bg-pastel-lavender/25',
  'bg-pastel-mint/25',
  'bg-pastel-coral/25',
];

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRu = i18n.language === 'ru';
  const { settings, isLoading } = useSiteSettings();

  // Navigation sections
  const sections = [
    { id: 'profile', label: isRu ? 'Профиль' : 'Profile', icon: User },
    { id: 'experience', label: isRu ? 'Опыт' : 'Experience', icon: Briefcase },
    { id: 'tech-stack', label: isRu ? 'Стек' : 'Stack', icon: Code2 },
    { id: 'achievements', label: isRu ? 'Достижения' : 'Achievements', icon: Trophy },
    { id: 'social', label: isRu ? 'Контакты' : 'Contacts', icon: MessageCircle },
  ];

  const expertiseBlocks = settings.expertise_blocks.map(block => ({
    id: block.id,
    icon: getIconComponent(block.icon),
    title: isRu ? block.title_ru : block.title_en,
    description: isRu ? block.description_ru : block.description_en,
    highlights: isRu ? block.highlights_ru : block.highlights_en,
    link: block.link,
  }));

  const socialLinks = settings.social_links.map(link => ({
    icon: getIconComponent(link.icon),
    title: isRu ? link.title_ru : link.title_en,
    description: isRu ? link.description_ru : link.description_en,
    handle: link.handle,
    link: link.link,
  }));

  const reviews = [
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

  // Work experience data
  const workExperience = [
    {
      role_ru: 'IT-специалист и Менеджер',
      role_en: 'IT Specialist & Manager',
      company: 'Viora Build',
      company_desc_ru: 'строительная компания, Португалия',
      company_desc_en: 'construction company, Portugal',
      period_ru: 'Июль 2024 – Январь 2026 · 1.5 года',
      period_en: 'Jul 2024 – Jan 2026 · 1.5 years',
      bg: pastelBgClasses[0],
      description_ru: 'Работал в двух ролях одновременно. IT: внедрение систем управления, цифровая инфраструктура, разработка кастомных инструментов. Менеджер: управление процессами, найм и обучение сотрудников.',
      description_en: 'Worked in two roles simultaneously. IT: implementing management systems, digital infrastructure, custom tool development. Manager: process management, hiring and training employees.',
      projects: [
        {
          title_ru: 'Email AI Ассистент',
          title_en: 'Email AI Assistant',
          desc_ru: 'Система автоматического анализа, категоризации и обработки входящей корреспонденции с AI-рекомендациями для ответов.',
          desc_en: 'Automated email analysis, categorization and processing system with AI-powered response recommendations.',
          stack: ['Zapier', 'Gmail API', 'GPT-4o', 'Notion API', 'Google Drive'],
          results_ru: ['Полная автоматизация сортировки входящих писем', 'AI-рекомендации (экономия 30-40 мин/день)', 'Единое место управления корреспонденцией'],
          results_en: ['Full automation of incoming email sorting', 'AI recommendations (saving 30-40 min/day)', 'Single place to manage all correspondence'],
        },
        {
          title_ru: 'ClickUp Reports Agent',
          title_en: 'ClickUp Reports Agent',
          desc_ru: 'Система автоматической оценки качества и скорости выполнения задач для 5 сотрудников с AI-рекомендациями.',
          desc_en: 'Automated task quality and speed evaluation system for 5 employees with AI recommendations.',
          stack: ['Python', 'ClickUp API', 'LM Studio', 'SQLite'],
          results_ru: ['Объективная оценка производительности', 'Персонализированные рекомендации', 'Полная история оценок'],
          results_en: ['Objective performance evaluation', 'Personalized recommendations', 'Complete evaluation history'],
        },
        {
          title_ru: 'Construction AI Agent',
          title_en: 'Construction AI Agent',
          desc_ru: 'Универсальный инструмент для строительных специалистов и сметчиков: поиск цен, проверка смет, управление данными.',
          desc_en: 'Universal tool for construction specialists: price search, estimate validation, data management.',
          stack: ['Python', 'Flask', 'Vue.js', 'OpenAI API', 'Google Sheets', 'SQLite'],
          results_ru: ['Ускорение рабочих процессов на 30-40%', 'Автоматическое выявление ошибок в смётах', 'Актуальные цены с кэшированием'],
          results_en: ['30-40% workflow acceleration', 'Automatic estimate error detection', 'Up-to-date prices with caching'],
        },
        {
          title_ru: 'Telegram to ClickUp',
          title_en: 'Telegram to ClickUp',
          desc_ru: 'Создание и обновление задач в ClickUp из голосовых и текстовых сообщений в Telegram с проверкой дублей.',
          desc_en: 'Creating and updating ClickUp tasks from voice and text messages in Telegram with duplicate detection.',
          stack: ['Python', 'Telegram Bot API', 'OpenAI Whisper', 'GPT-4', 'ClickUp API'],
          results_ru: ['Задачи создаются голосом — без входа в ClickUp', 'Дубли не создаются — умное обновление', 'Прозрачность через Telegram-отчёты'],
          results_en: ['Tasks created by voice — no ClickUp login needed', 'No duplicates — smart update system', 'Transparency via Telegram reports'],
        },
      ],
    },
    {
      role_ru: 'CEO',
      role_en: 'CEO',
      company: 'Viora Consulting',
      company_desc_ru: 'консалтинговое направление Viora',
      company_desc_en: 'consulting division of Viora',
      period_ru: 'Сентябрь 2025 – Январь 2026 · 4 месяца',
      period_en: 'Sep 2025 – Jan 2026 · 4 months',
      bg: pastelBgClasses[1],
      description_ru: 'Возглавил консалтинговое направление. Разработал образовательный продукт — полный сервис помощи клиентам в планировании строительства в Португалии с AI-интеграцией.',
      description_en: 'Led the consulting division. Developed an educational product — a complete service for construction planning in Portugal with AI integration.',
      projects: [
        {
          title_ru: 'Курс по планированию строительства',
          title_en: 'Construction Planning Course',
          desc_ru: 'Комплексный курс/сервис по планированию строительства в Португалии с AI-ассистентом, интерактивной картой и калькулятором.',
          desc_en: 'Comprehensive course/service for construction planning in Portugal with AI assistant, interactive map and calculator.',
          stack: ['AI Agents', 'Gemini', 'Perplexity', 'Interactive Maps'],
          results_ru: ['Интегрированная система сбора данных через AI', 'База актуальных цен и подрядчиков', 'Калькулятор стоимости строительства'],
          results_en: ['Integrated AI data collection system', 'Up-to-date prices and contractors database', 'Construction cost calculator'],
        },
      ],
    },
    {
      role_ru: 'Продюсер цифровых продуктов',
      role_en: 'Digital Products Producer',
      company: 'Viora Development',
      company_desc_ru: 'девелоперское направление Viora',
      company_desc_en: 'development division of Viora',
      period_ru: 'Сентябрь 2025 – Январь 2026 · 4 месяца',
      period_en: 'Sep 2025 – Jan 2026 · 4 months',
      bg: pastelBgClasses[2],
      description_ru: 'Создавал коммерческие предложения для инвестиционных строительных проектов: из архитектурных планов генерировал AI-визуализации и собирал промо-сайты.',
      description_en: 'Created commercial proposals for investment construction projects: generated AI visualizations from architectural plans and built promo websites.',
      projects: [
        {
          title_ru: '17 коммерческих предложений',
          title_en: '17 Commercial Proposals',
          desc_ru: 'Из каждого плана/чертежа создавал визуализации готовых проектов и конверсионные промо-сайты для привлечения инвесторов.',
          desc_en: 'Created visualizations of finished projects and conversion promo websites for investor attraction from each plan/blueprint.',
          stack: ['Lovable.app', 'AI Visualization', 'Figma', 'HTML/CSS/JS'],
          results_ru: ['17 готовых коммерческих предложений', 'Высокий уровень визуализации', 'Конверсионные сайты для инвесторов'],
          results_en: ['17 ready commercial proposals', 'High-level visualizations', 'Conversion websites for investors'],
        },
      ],
    },
    {
      role_ru: 'Фриланс — Дэн Янович',
      role_en: 'Freelance — Dan Yanovich',
      company: 'No-Code Consulting',
      company_desc_ru: 'индивидуальная деятельность',
      company_desc_en: 'individual practice',
      period_ru: 'Июль 2020 – Настоящее время · 5+ лет',
      period_en: 'Jul 2020 – Present · 5+ years',
      bg: pastelBgClasses[3],
      description_ru: 'Комплексная фриланс-деятельность: консультирование, разработка шаблонов и автоматизаций для компаний разных ниш. 50+ проектов, 500+ Notion шаблонов.',
      description_en: 'Comprehensive freelance activity: consulting, template development and automations for companies across various niches. 50+ projects, 500+ Notion templates.',
      projects: [],
    },
  ];

  // Tech stack categories
  const techStack = [
    {
      title_ru: 'No-Code платформы',
      title_en: 'No-Code Platforms',
      icon: Workflow,
      bg: pastelBgClasses[0],
      items: ['Notion (продвинутый)', 'ClickUp', 'Bitrix24', 'Zapier Pro', 'n8n', 'Make.com'],
      items_en: ['Notion (advanced)', 'ClickUp', 'Bitrix24', 'Zapier Pro', 'n8n', 'Make.com'],
    },
    {
      title_ru: 'Программирование',
      title_en: 'Programming',
      icon: Code2,
      bg: pastelBgClasses[1],
      items: ['Python 3.10+', 'Flask / FastAPI', 'JavaScript', 'Vue.js / React', 'REST API', 'Git / GitHub'],
      items_en: ['Python 3.10+', 'Flask / FastAPI', 'JavaScript', 'Vue.js / React', 'REST API', 'Git / GitHub'],
    },
    {
      title_ru: 'AI и Machine Learning',
      title_en: 'AI & Machine Learning',
      icon: Bot,
      bg: pastelBgClasses[2],
      items: ['OpenAI API (GPT-4o, Whisper)', 'LangChain', 'LM Studio', 'AI-агенты', 'Промпт-инжиниринг'],
      items_en: ['OpenAI API (GPT-4o, Whisper)', 'LangChain', 'LM Studio', 'AI Agents', 'Prompt Engineering'],
    },
    {
      title_ru: 'Базы данных и DevOps',
      title_en: 'Databases & DevOps',
      icon: Database,
      bg: pastelBgClasses[3],
      items: ['SQLite', 'Google Sheets API', 'Notion API', 'Linux', 'Structured Logging', 'Prometheus'],
      items_en: ['SQLite', 'Google Sheets API', 'Notion API', 'Linux', 'Structured Logging', 'Prometheus'],
    },
  ];

  // Key achievements
  const achievements = [
    { text_ru: '50+ проектов по автоматизации', text_en: '50+ automation projects', value: '50+' },
    { text_ru: '500+ Notion шаблонов', text_en: '500+ Notion templates', value: '500+' },
    { text_ru: '100+ часов обучающих сессий', text_en: '100+ hours of training sessions', value: '100+' },
    { text_ru: '4 комплексные системы автоматизации в Viora Build', text_en: '4 complex automation systems at Viora Build', value: '4' },
    { text_ru: '17 коммерческих предложений с визуализациями', text_en: '17 commercial proposals with visualizations', value: '17' },
    { text_ru: 'Развитие 3 направлений бизнеса (Build, Consulting, Development)', text_en: '3 business divisions developed (Build, Consulting, Development)', value: '3' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        titleRu="Обо мне | Данила Путинцев — Дэн Янович"
        titleEn="About Me | Danila Putintsev — Dan Yanovich"
        descriptionRu="Архитектор рабочих пространств и цифровых систем. Специалист по автоматизации бизнеса и AI. 50+ проектов, 500+ шаблонов."
        descriptionEn="Workspace architect and digital systems specialist. Business automation and AI expert. 50+ projects, 500+ templates."
      />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <DecorativeBlobs variant="hero" />
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
            </AnimatedSection>
            
            {/* Contact links */}
            <AnimatedSection delay={100}>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="https://t.me/danyanovich" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pastel-blue/20 text-sm font-medium hover:bg-pastel-blue/30 transition-colors">
                  <MessageCircle className="h-4 w-4" /> Telegram
                </a>
                <a href="https://www.youtube.com/@danyanovich" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pastel-coral/20 text-sm font-medium hover:bg-pastel-coral/30 transition-colors">
                  <Youtube className="h-4 w-4" /> YouTube
                </a>
                <a href="https://www.linkedin.com/in/danila-putintsev/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pastel-lavender/20 text-sm font-medium hover:bg-pastel-lavender/30 transition-colors">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
                <a href="https://x.com/danyanovich" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pastel-mint/20 text-sm font-medium hover:bg-pastel-mint/30 transition-colors">
                  <XIcon className="h-4 w-4" /> X/Twitter
                </a>
                <a href="mailto:danilaputintsev2512@gmail.com" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pastel-yellow/20 text-sm font-medium hover:bg-pastel-yellow/30 transition-colors">
                  <Mail className="h-4 w-4" /> Email
                </a>
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
                    className="gap-2 rounded-full hover:bg-pastel-yellow/30 transition-all"
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
              <div className="relative bg-pastel-lavender/15 rounded-3xl p-6 md:p-8 space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold font-display">
                  {isRu ? 'Профессиональный профиль' : 'Professional Profile'}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {isRu
                    ? 'Специалист в проектировании, внедрении и масштабировании цифровых систем управления с фокусом на AI интеграцию. За 5+ лет работы с No-Code инструментами и AI реализовал 50+ проектов автоматизации, создал 500+ Notion шаблонов и провёл 100+ часов обучающих сессий.'
                    : 'Specialist in designing, implementing and scaling digital management systems with AI integration focus. Over 5+ years with No-Code tools and AI, completed 50+ automation projects, created 500+ Notion templates and conducted 100+ hours of training sessions.'}
                </p>

                {/* Focus areas */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { ru: 'Проектирование цифровой инфраструктуры', en: 'Digital infrastructure design' },
                    { ru: 'Кастомные автоматизации с AI', en: 'Custom automations with AI' },
                    { ru: 'Визуализации проектов и КП', en: 'Project visualizations & proposals' },
                    { ru: 'Обучение команд', en: 'Team training' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-accent-lime shrink-0" />
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
                  { title_ru: 'Аудит перед инструментами', title_en: 'Audit before tools', desc_ru: 'Сначала понимаю проблему, потом выбираю решение', desc_en: 'First understand the problem, then choose the solution', bg: pastelBgClasses[0] },
                  { title_ru: 'Измеримые результаты', title_en: 'Measurable results', desc_ru: 'Все внедрения сопровождаются метриками и KPI', desc_en: 'All implementations are accompanied by metrics and KPIs', bg: pastelBgClasses[1] },
                  { title_ru: 'Обучение как часть проекта', title_en: 'Training as part of the project', desc_ru: 'Команда должна владеть системой самостоятельно', desc_en: 'The team should own the system independently', bg: pastelBgClasses[2] },
                  { title_ru: 'Масштабируемость с нуля', title_en: 'Scalability from scratch', desc_ru: 'Архитектура строится с расчётом на рост', desc_en: 'Architecture built for growth', bg: pastelBgClasses[3] },
                ].map((item, i) => (
                  <div key={i} className={`${item.bg} rounded-2xl p-5 space-y-2`}>
                    <h4 className="text-sm font-semibold font-display">{isRu ? item.title_ru : item.title_en}</h4>
                    <p className="text-xs text-muted-foreground">{isRu ? item.desc_ru : item.desc_en}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: '50+', label_ru: 'Проектов', label_en: 'Projects', bg: 'bg-pastel-yellow/25' },
                  { value: '500+', label_ru: 'Шаблонов', label_en: 'Templates', bg: 'bg-pastel-pink/25' },
                  { value: '17', label_ru: 'Коммерч. предложений', label_en: 'Commercial Proposals', bg: 'bg-pastel-lavender/25' },
                  { value: '100+', label_ru: 'Часов обучения', label_en: 'Training Hours', bg: 'bg-pastel-mint/25' },
                ].map((stat, i) => (
                  <div key={i} className={`${stat.bg} rounded-3xl p-6 text-center space-y-2`}>
                    <p className="text-3xl md:text-4xl font-bold font-display">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{isRu ? stat.label_ru : stat.label_en}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section id="experience" className="py-16 md:py-20 scroll-mt-20">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-6">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-10">
                {isRu ? 'Опыт работы' : 'Work Experience'}
              </h2>
            </AnimatedSection>

            <Accordion type="multiple" className="space-y-4">
              {workExperience.map((job, jobIndex) => (
                <AnimatedSection key={jobIndex} delay={jobIndex * 100}>
                  <AccordionItem value={`job-${jobIndex}`} className={`${job.bg} rounded-3xl border-0 overflow-hidden`}>
                    <AccordionTrigger className="px-6 py-5 hover:no-underline">
                      <div className="flex flex-col items-start text-left gap-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg md:text-xl font-bold font-display">{isRu ? job.role_ru : job.role_en}</h3>
                          <Badge variant="outline" className="text-xs">{job.company}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {isRu ? job.company_desc_ru : job.company_desc_en} · {isRu ? job.period_ru : job.period_en}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 space-y-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {isRu ? job.description_ru : job.description_en}
                      </p>

                      {job.projects.length > 0 && (
                        <div className="space-y-4">
                          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground font-display">
                            {isRu ? 'Проекты' : 'Projects'}
                          </p>
                          {job.projects.map((project, pi) => (
                            <div key={pi} className="rounded-2xl bg-background/60 backdrop-blur-sm p-5 space-y-3">
                              <h4 className="text-sm font-semibold font-display">{isRu ? project.title_ru : project.title_en}</h4>
                              <p className="text-xs text-muted-foreground">{isRu ? project.desc_ru : project.desc_en}</p>
                              <div className="flex flex-wrap gap-1.5">
                                {project.stack.map((tech, ti) => (
                                  <Badge key={ti} variant="outline" className="text-[10px] font-normal">{tech}</Badge>
                                ))}
                              </div>
                              <ul className="space-y-1">
                                {(isRu ? project.results_ru : project.results_en).map((r, ri) => (
                                  <li key={ri} className="flex items-start gap-2 text-xs text-muted-foreground">
                                    <Check className="h-3 w-3 mt-0.5 text-accent-lime shrink-0" />
                                    {r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </AnimatedSection>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Technical Stack */}
      <section id="tech-stack" className="py-16 md:py-20 scroll-mt-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-10">
                {isRu ? 'Технический стек' : 'Technical Stack'}
              </h2>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 gap-6">
              {techStack.map((category, ci) => (
                <AnimatedSection key={ci} delay={ci * 100}>
                  <Card className={`h-full border-0 ${category.bg}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-background/50 rounded-2xl">
                          <category.icon className="h-6 w-6 text-foreground" />
                        </div>
                        <h3 className="text-lg font-bold font-display">{isRu ? category.title_ru : category.title_en}</h3>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {(isRu ? category.items : category.items_en).map((item, ii) => (
                          <Badge key={ii} variant="outline" className="text-xs font-normal">{item}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
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
              {achievements.map((achievement, ai) => (
                <AnimatedSection key={ai} delay={ai * 80}>
                  <div className={`${pastelBgClasses[ai % pastelBgClasses.length]} rounded-2xl p-5 flex items-center gap-4`}>
                    <span className="text-2xl md:text-3xl font-bold font-display shrink-0 w-16 text-center">{achievement.value}</span>
                    <p className="text-sm text-muted-foreground">{isRu ? achievement.text_ru : achievement.text_en}</p>
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
                      className={`h-full overflow-hidden border-0 ${pastelBgClasses[index % pastelBgClasses.length]} hover:scale-[1.02] cursor-pointer transition-all`}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-background/50 rounded-2xl">
                            <block.icon className="h-8 w-8 text-foreground" />
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold font-display">{block.title}</h3>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{block.description}</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {block.highlights.map((highlight, i) => (
                            <span key={i} className="px-3 py-1 bg-background/50 text-foreground text-sm rounded-full font-medium">{highlight}</span>
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

      {/* Social Links / Contact Info */}
      <section id="social" className="relative py-16 md:py-20 overflow-hidden scroll-mt-20">
        <DecorativeBlobs variant="section" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl text-center mb-12 font-bold font-display">
                {isRu ? 'Контакты' : 'Get in Touch'}
              </h2>
            </AnimatedSection>

            {/* Contact info card */}
            <AnimatedSection delay={50}>
              <div className="bg-pastel-blue/15 rounded-3xl p-6 md:p-8 mb-8 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{isRu ? 'Россия · GMT+3' : 'Russia · GMT+3'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                    <a href="mailto:danilaputintsev2512@gmail.com" className="hover:underline">danilaputintsev2512@gmail.com</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Languages className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{isRu ? 'Русский (родной), Английский (базовый)' : 'Russian (native), English (basic)'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{isRu ? 'Открыт для проектов и сотрудничества' : 'Open for projects and collaboration'}</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <AnimatedSection key={index} delay={index * 100}>
                    <a href={social.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                      <Card className={`group cursor-pointer h-full transition-all hover:scale-[1.02] border-0 ${pastelBgClasses[index % pastelBgClasses.length]}`}>
                        <CardHeader className="space-y-4">
                          <div className="inline-flex p-4 bg-background/50 rounded-2xl w-fit">
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <h3 className="text-lg font-bold font-display">{social.title}</h3>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground">{social.description}</p>
                          <span className="text-sm font-medium inline-flex items-center gap-2 group-hover:underline">
                            {social.handle}
                          </span>
                        </CardContent>
                      </Card>
                    </a>
                  </AnimatedSection>
                );
              })}
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
const ReviewsCarousel = ({ reviews, isRu }: { reviews: any[]; isRu: boolean }) => {
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
              <Badge variant="outline" className="mb-4">
                <Award className="h-3 w-3 mr-1" />
                Kwork PRO
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-2">
                {isRu ? 'Отзывы клиентов' : 'Client Reviews'}
              </h2>
              <p className="text-muted-foreground">
                {isRu ? `${reviews.length}+ положительных отзывов на Kwork` : `${reviews.length}+ positive reviews on Kwork`}
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
                  className={`h-full transition-all duration-500 border-0 ${
                    index === 1 
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
                  className={`h-2.5 rounded-full transition-all ${
                    index === currentIndex ? 'bg-foreground w-8' : 'bg-foreground/30 w-2.5 hover:bg-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <AnimatedSection delay={300}>
            <div className="mt-12 text-center">
              <a href="https://kwork.ru/user/danyanovich" target="_blank" rel="noopener noreferrer" className="inline-flex flex-col items-center gap-3">
                <Badge className="bg-pastel-mint/30 text-foreground border-pastel-mint/50 hover:bg-pastel-mint/40">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  {isRu ? 'PRO продавец' : 'PRO seller'}
                </Badge>
                <Button variant="outline" className="gap-2 group rounded-full">
                  <ExternalLink className="h-4 w-4 group-hover:rotate-12 transition-transform" />
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
