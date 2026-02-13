import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

// Type definitions for site settings
export interface HeroSettings {
  title_ru: string;
  title_en: string;
  subtitle_ru: string;
  subtitle_en: string;
  description_ru: string;
  description_en: string;
}

export interface ConsultingSettings {
  title_ru: string;
  title_en: string;
  description_ru: string;
  description_en: string;
  price: string;
}

export interface BioSettings {
  paragraph1_ru: string;
  paragraph1_en: string;
  paragraph2_ru: string;
  paragraph2_en: string;
  paragraph3_ru: string;
  paragraph3_en: string;
}

export interface StatsSettings {
  projects: number;
  templates: number;
  websites: number;
  hours: number;
}

export interface SocialLink {
  id: string;
  icon: string;
  title_ru: string;
  title_en: string;
  description_ru: string;
  description_en: string;
  handle: string;
  link: string;
}

export interface ExpertiseBlock {
  id: string;
  icon: string;
  title_ru: string;
  title_en: string;
  description_ru: string;
  description_en: string;
  highlights_ru: string[];
  highlights_en: string[];
  link: string;
}

export interface Tool {
  id: string;
  name: string;
  description_ru: string;
  description_en: string;
  icon: string;
}

export interface Website {
  id: string;
  title: string;
  url: string;
  description_ru: string;
  description_en: string;
}

export interface Program {
  id: string;
  title_ru: string;
  title_en: string;
  description_ru: string;
  description_en: string;
  url?: string;
  type: 'game' | 'program';
}

// Default values matching current static content
const defaultHero: HeroSettings = {
  title_ru: "Дэн Янович",
  title_en: "Dan Yanovich",
  subtitle_ru: "Эксперт по Notion | AI-Инструменты",
  subtitle_en: "Notion Expert | AI Tools",
  description_ru: "Создаю рабочие пространства для компаний, готовых заменить хаос в таблицах на централизованную операционную систему на основе Notion, Buildin.AI",
  description_en: "I create workspaces for companies ready to replace spreadsheet chaos with a centralized operating system based on Notion, Buildin.AI",
};

const defaultConsulting: ConsultingSettings = {
  title_ru: "Консультация 1 час",
  title_en: "1 Hour Consultation",
  description_ru: "Персональная консультация по Notion, автоматизации и AI-инструментам. Разберём ваши задачи и найдём решения.",
  description_en: "Personal consultation on Notion, automation and AI tools. Let's discuss your tasks and find solutions.",
  price: "5 000 ₽",
};

const defaultBio: BioSettings = {
  paragraph1_ru: "С 2020 года создаю и консультирую рабочие пространства. Реализовал более 50 проектов по внедрению Notion, Buildin.AI и других инструментов для компаний различного масштаба.",
  paragraph1_en: "Since 2020, I have been creating and consulting workspaces. Implemented over 50 projects with Notion, Buildin.AI and other tools for companies of various sizes.",
  paragraph2_ru: "Разработал комплексные решения, повысившие эффективность рабочих процессов клиентов в среднем на 30%. Создал библиотеку специализированных шаблонов для различных бизнес-задач.",
  paragraph2_en: "Developed comprehensive solutions that increased client workflow efficiency by an average of 30%. Created a library of specialized templates for various business tasks.",
  paragraph3_ru: "Провел более 100 часов обучающих сессий, помогая командам максимально использовать возможности пространств.",
  paragraph3_en: "Conducted over 100 hours of training sessions, helping teams maximize workspace capabilities.",
};

const defaultStats: StatsSettings = {
  projects: 50,
  templates: 25,
  websites: 10,
  hours: 100,
};

const defaultSocialLinks: SocialLink[] = [
  {
    id: "youtube",
    icon: "Youtube",
    title_ru: "YouTube канал",
    title_en: "YouTube Channel",
    description_ru: "Обучающие видео по Notion и автоматизации",
    description_en: "Educational videos on Notion and automation",
    handle: "@danyanovich",
    link: "https://www.youtube.com/channel/UCzcTrBkzXgA9aaH05cWVi2g",
  },
  {
    id: "telegram",
    icon: "MessageCircle",
    title_ru: "Telegram канал",
    title_en: "Telegram Channel",
    description_ru: "Личный канал с инсайтами и шаблонами",
    description_en: "Personal channel with insights and templates",
    handle: "@danyanovichp",
    link: "https://t.me/danyanovichp",
  },
  {
    id: "notion",
    icon: "FileText",
    title_ru: "Notion Marketplace",
    title_en: "Notion Marketplace",
    description_ru: "Мои шаблоны на официальной площадке Notion",
    description_en: "My templates on the official Notion marketplace",
    handle: "@danyanovich",
    link: "https://www.notion.so/@danyanovich",
  },
  {
    id: "linkedin",
    icon: "Linkedin",
    title_ru: "LinkedIn",
    title_en: "LinkedIn",
    description_ru: "Профессиональный профиль",
    description_en: "Professional profile",
    handle: "Danila Putintsev",
    link: "https://www.linkedin.com/in/danila-putintsev/",
  },
  {
    id: "x",
    icon: "X",
    title_ru: "X (Twitter)",
    title_en: "X (Twitter)",
    description_ru: "Мысли и обновления",
    description_en: "Thoughts and updates",
    handle: "@danyanovich",
    link: "https://x.com/danyanovich",
  },
];

const defaultExpertiseBlocks: ExpertiseBlock[] = [
  {
    id: "notion",
    icon: "FileText",
    title_ru: "Notion",
    title_en: "Notion",
    description_ru: "Эксперт по Notion с 2020 года. Создаю продвинутые рабочие пространства, базы данных и системы управления для бизнеса. Реализовал более 50 проектов различного масштаба.",
    description_en: "Notion expert since 2020. Creating advanced workspaces, databases, and management systems for businesses. Completed over 50 projects of various scales.",
    highlights_ru: ["50+ проектов", "Шаблоны", "Автоматизация", "Консалтинг"],
    highlights_en: ["50+ projects", "Templates", "Automation", "Consulting"],
    link: "/templates",
  },
  {
    id: "ai",
    icon: "Bot",
    title_ru: "AI Инструменты",
    title_en: "AI Tools",
    description_ru: "Разрабатываю эффективные AI-решения с использованием ChatGPT, Claude и других инструментов. Создаю промпты и интеграции для автоматизации бизнес-процессов.",
    description_en: "Developing effective AI solutions using ChatGPT, Claude, and other tools. Creating prompts and integrations for business process automation.",
    highlights_ru: ["ChatGPT", "Claude", "Промпт-инжиниринг", "AI интеграции"],
    highlights_en: ["ChatGPT", "Claude", "Prompt Engineering", "AI Integrations"],
    link: "/ai-prompts",
  },
  {
    id: "n8n",
    icon: "Workflow",
    title_ru: "n8n",
    title_en: "n8n",
    description_ru: "Создаю сложные автоматизации с n8n — мощной платформой для интеграции сервисов. Настраиваю воркфлоу для связи CRM, мессенджеров, баз данных и AI.",
    description_en: "Building complex automations with n8n — a powerful platform for service integration. Setting up workflows connecting CRM, messengers, databases, and AI.",
    highlights_ru: ["Воркфлоу", "Интеграции", "API", "Автоматизация"],
    highlights_en: ["Workflows", "Integrations", "API", "Automation"],
    link: "/consulting",
  },
  {
    id: "vibe-coding",
    icon: "Code2",
    title_ru: "Вайб-кодинг",
    title_en: "Vibe Coding",
    description_ru: "Создаю веб-приложения и сайты с помощью AI-assisted разработки. Использую современные технологии для быстрого создания качественных решений без традиционного программирования.",
    description_en: "Creating web applications and websites using AI-assisted development. Using modern technologies for rapid creation of quality solutions without traditional programming.",
    highlights_ru: ["Lovable", "Cursor", "React", "TypeScript"],
    highlights_en: ["Lovable", "Cursor", "React", "TypeScript"],
    link: "/cases",
  },
];

const defaultTools: Tool[] = [
  {
    id: "notion",
    name: "Notion",
    description_ru: "Основной инструмент для создания шаблонов и систем",
    description_en: "Main tool for creating templates and systems",
    icon: "FileText",
  },
  {
    id: "buildin",
    name: "Buildin.AI",
    description_ru: "Платформа для создания веб-приложений",
    description_en: "Platform for creating web applications",
    icon: "Code2",
  },
  {
    id: "n8n",
    name: "n8n",
    description_ru: "Автоматизация бизнес-процессов",
    description_en: "Business process automation",
    icon: "Workflow",
  },
];

const defaultWebsites: Website[] = [
  {
    id: "viora1",
    title: "Viora Build Site 1",
    url: "https://dev-l152.viorabuild.org/",
    description_ru: "Современный лендинг",
    description_en: "Modern landing page",
  },
  {
    id: "viora2",
    title: "Viora Build Site 2",
    url: "https://dev-l87.viorabuild.org/",
    description_ru: "Бизнес-сайт",
    description_en: "Business website",
  },
  {
    id: "viora3",
    title: "Viora Build Site 3",
    url: "https://dev-l3-26.viorabuild.org/",
    description_ru: "Корпоративный портал",
    description_en: "Corporate portal",
  },
  {
    id: "viora-consulting",
    title: "Viora Consulting",
    url: "https://viora-consulting.lovable.app/",
    description_ru: "Консалтинговый сайт",
    description_en: "Consulting website",
  },
];

const defaultPrograms: Program[] = [
  {
    id: "ai-game",
    title_ru: "AI Game Studio",
    title_en: "AI Game Studio",
    description_ru: "Интерактивная игра созданная с помощью AI",
    description_en: "Interactive game created with AI",
    url: "https://ai.studio/apps/drive/1kuZusi_K5jgX7NZTmZ-8quB9JgxNOOpH",
    type: "game",
  },
  {
    id: "crm",
    title_ru: "CRM Система",
    title_en: "CRM System",
    description_ru: "Полноценная CRM для управления клиентами и продажами",
    description_en: "Full-featured CRM for client and sales management",
    type: "program",
  },
  {
    id: "accounting",
    title_ru: "Система учёта",
    title_en: "Accounting System",
    description_ru: "Программа для ведения учёта и финансов",
    description_en: "Program for accounting and finance management",
    type: "program",
  },
  {
    id: "task-tracker",
    title_ru: "Трекер задач",
    title_en: "Task Tracker",
    description_ru: "Инструмент для управления проектами и задачами",
    description_en: "Tool for project and task management",
    type: "program",
  },
];

// Settings keys
type SettingKey = 
  | 'hero' 
  | 'consulting' 
  | 'bio' 
  | 'stats' 
  | 'social_links' 
  | 'expertise_blocks' 
  | 'tools' 
  | 'websites' 
  | 'programs';

interface SiteSettingsState {
  hero: HeroSettings;
  consulting: ConsultingSettings;
  bio: BioSettings;
  stats: StatsSettings;
  social_links: SocialLink[];
  expertise_blocks: ExpertiseBlock[];
  tools: Tool[];
  websites: Website[];
  programs: Program[];
}

const defaultSettings: SiteSettingsState = {
  hero: defaultHero,
  consulting: defaultConsulting,
  bio: defaultBio,
  stats: defaultStats,
  social_links: defaultSocialLinks,
  expertise_blocks: defaultExpertiseBlocks,
  tools: defaultTools,
  websites: defaultWebsites,
  programs: defaultPrograms,
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettingsState>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');

      if (error) throw error;

      if (data && data.length > 0) {
        const newSettings = { ...defaultSettings };
        data.forEach((row) => {
          const key = row.key as SettingKey;
          if (key in newSettings) {
            (newSettings as Record<string, unknown>)[key] = row.value;
          }
        });
        setSettings(newSettings);
      }
    } catch (error) {
      console.error('Error fetching site settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return {
    settings,
    isLoading,
    refetch: fetchSettings,
  };
}
