import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  ru: {
    translation: {
      nav: {
        home: 'ГЛАВНАЯ',
        templates: 'ШАБЛОНЫ',
        courses: 'КУРСЫ',
        aiPrompts: 'AI ПРОМПТЫ',
        consulting: 'КОНСАЛТИНГ',
        packages: 'ПАКЕТЫ',
        reviews: 'ОТЗЫВЫ',
        faq: 'FAQ',
        contact: 'КОНТАКТЫ',
        portfolio: 'ПОРТФОЛИО',
      },
      home: {
        hero: {
          title: 'Дэн Янович',
          subtitle: 'Эксперт по Notion | AI-Инструменты',
          description: 'Помогаю бизнесу и профессионалам оптимизировать рабочие процессы с помощью Notion и современных AI-технологий',
          ctaPortfolio: 'Посмотреть портфолио',
          ctaContact: 'Связаться',
        },
        expertise: {
          title: 'Моя экспертиза',
          notion: {
            title: 'Notion Эксперт',
            description: 'Создаю продвинутые шаблоны и системы для организации работы',
          },
          ai: {
            title: 'AI Промпты',
            description: 'Разрабатываю эффективные промпты для ChatGPT и других AI-инструментов',
          },
        },
        stats: {
          projects: 'Проектов реализовано',
          hours: 'Часов обучения',
          efficiency: 'Рост эффективности',
        },
        mission: {
          title: 'Моя миссия',
          description: 'Делаю продуктивность доступной для всех — от новичка до профи. Превращаю хаос задач в лёгкие, производительные системы с понятной логикой.',
        },
        workflow: {
          title: 'Как я работаю',
          step1: {
            title: 'Анализ потребностей',
            description: 'Изучаю ваши задачи и определяю точки роста',
          },
          step2: {
            title: 'Разработка решения',
            description: 'Создаю индивидуальную систему под ваши цели',
          },
          step3: {
            title: 'Внедрение',
            description: 'Помогаю освоить инструменты и начать работу',
          },
          step4: {
            title: 'Поддержка',
            description: 'Сопровождаю и оптимизирую процессы',
          },
        },
      },
      portfolio: {
        title: 'Портфолио',
        subtitle: 'Избранные проекты и реализации',
      },
      templates: {
        title: 'Шаблоны Notion',
        subtitle: 'Готовые решения для быстрого старта',
      },
      courses: {
        title: 'Обучающие курсы',
        subtitle: 'Освойте Notion и AI-инструменты',
      },
      aiPrompts: {
        title: 'AI Промпты',
        subtitle: 'Эффективные промпты для работы с AI',
        categories: {
          all: 'Все',
          productivity: 'Продуктивность',
          content: 'Контент',
          coding: 'Код',
          business: 'Бизнес',
        },
      },
      packages: {
        title: 'Пакеты услуг',
        subtitle: 'Выберите подходящий пакет',
      },
      contact: {
        title: 'Контакты',
        subtitle: 'Свяжитесь со мной',
        social: 'Социальные сети',
      },
      faq: {
        title: 'Часто задаваемые вопросы',
        subtitle: 'Ответы на популярные вопросы',
      },
      reviews: {
        title: 'Отзывы клиентов',
        subtitle: 'Что говорят о моих услугах',
        comingSoon: 'Отзывы появятся здесь в будущем',
      },
      consulting: {
        title: 'Консалтинговые услуги',
        subtitle: 'Индивидуальные решения для вашего бизнеса',
      },
      common: {
        learnMore: 'Узнать больше',
        getStarted: 'Начать',
        viewAll: 'Смотреть все',
        viewTemplates: 'Посмотреть шаблоны',
        inDevelopment: 'В разработке',
        comingSoon: 'Скоро',
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: 'HOME',
        templates: 'TEMPLATES',
        courses: 'COURSES',
        aiPrompts: 'AI PROMPTS',
        consulting: 'CONSULTING',
        packages: 'PACKAGES',
        reviews: 'REVIEWS',
        faq: 'FAQ',
        contact: 'CONTACT',
        portfolio: 'PORTFOLIO',
      },
      home: {
        hero: {
          title: 'Dan Yanovich',
          subtitle: 'Notion Expert | AI Tools',
          description: 'I help businesses and professionals optimize workflows using Notion and modern AI technologies',
          ctaPortfolio: 'View Portfolio',
          ctaContact: 'Contact Me',
        },
        expertise: {
          title: 'My Expertise',
          notion: {
            title: 'Notion Expert',
            description: 'Creating advanced templates and systems for work organization',
          },
          ai: {
            title: 'AI Prompts',
            description: 'Developing effective prompts for ChatGPT and other AI tools',
          },
        },
        stats: {
          projects: 'Projects Completed',
          hours: 'Training Hours',
          efficiency: 'Efficiency Growth',
        },
        mission: {
          title: 'My Mission',
          description: 'Making productivity accessible to everyone — from beginner to pro. Turning task chaos into easy, productive systems with clear logic.',
        },
        workflow: {
          title: 'How I Work',
          step1: {
            title: 'Needs Analysis',
            description: 'Studying your tasks and identifying growth points',
          },
          step2: {
            title: 'Solution Development',
            description: 'Creating a custom system for your goals',
          },
          step3: {
            title: 'Implementation',
            description: 'Helping you master tools and get started',
          },
          step4: {
            title: 'Support',
            description: 'Accompanying and optimizing processes',
          },
        },
      },
      portfolio: {
        title: 'Portfolio',
        subtitle: 'Featured projects and implementations',
      },
      templates: {
        title: 'Notion Templates',
        subtitle: 'Ready-made solutions for quick start',
      },
      courses: {
        title: 'Training Courses',
        subtitle: 'Master Notion and AI Tools',
      },
      aiPrompts: {
        title: 'AI Prompts',
        subtitle: 'Effective prompts for working with AI',
        categories: {
          all: 'All',
          productivity: 'Productivity',
          content: 'Content',
          coding: 'Code',
          business: 'Business',
        },
      },
      packages: {
        title: 'Service Packages',
        subtitle: 'Choose the right package',
      },
      contact: {
        title: 'Contact',
        subtitle: 'Get in touch with me',
        social: 'Social Media',
      },
      faq: {
        title: 'Frequently Asked Questions',
        subtitle: 'Answers to popular questions',
      },
      reviews: {
        title: 'Client Reviews',
        subtitle: 'What people say about my services',
        comingSoon: 'Reviews will appear here soon',
      },
      consulting: {
        title: 'Consulting Services',
        subtitle: 'Custom solutions for your business',
      },
      common: {
        learnMore: 'Learn More',
        getStarted: 'Get Started',
        viewAll: 'View All',
        viewTemplates: 'View Templates',
        inDevelopment: 'In Development',
        comingSoon: 'Coming Soon',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
