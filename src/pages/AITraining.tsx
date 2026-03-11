import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Brain, Sparkles, MessageSquare, Zap, Target, BookOpen, CheckCircle, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LocalLink as Link } from "@/components/LocalLink";

import SEO, { getBreadcrumbSchema } from "@/components/SEO";
import { SITE_URL } from "@/seo/site";

const AITraining = () => {
  const { i18n } = useTranslation();
  const isRu = i18n.language === 'ru';

  const trainingModules = [
    {
      icon: Brain,
      title: isRu ? "Основы работы с AI" : "AI Fundamentals",
      description: isRu
        ? "Понимание принципов работы ChatGPT, Claude и других моделей"
        : "Understanding how ChatGPT, Claude and other models work",
    },
    {
      icon: MessageSquare,
      title: isRu ? "Промпт-инжиниринг" : "Prompt Engineering",
      description: isRu
        ? "Создание эффективных промптов для получения точных результатов"
        : "Creating effective prompts for accurate results",
    },
    {
      icon: Zap,
      title: isRu ? "Автоматизация с AI" : "AI Automation",
      description: isRu
        ? "Интеграция AI в рабочие процессы и автоматизация задач"
        : "Integrating AI into workflows and task automation",
    },
    {
      icon: Target,
      title: isRu ? "AI для бизнеса" : "AI for Business",
      description: isRu
        ? "Практическое применение AI для решения бизнес-задач"
        : "Practical AI application for solving business challenges",
    },
  ];

  const benefits = isRu ? [
    "Научитесь писать эффективные промпты для любых задач",
    "Освоите работу с ChatGPT, Claude, Gemini и другими AI",
    "Узнаете как автоматизировать рутинные задачи",
    "Получите готовые шаблоны промптов для работы",
    "Научитесь генерировать контент, код и идеи",
    "Повысите продуктивность в 3-5 раз",
  ] : [
    "Learn to write effective prompts for any task",
    "Master ChatGPT, Claude, Gemini and other AI tools",
    "Learn how to automate routine tasks",
    "Get ready-made prompt templates for work",
    "Learn to generate content, code and ideas",
    "Increase productivity 3-5x",
  ];

  const topics = [
    {
      title: isRu ? "ChatGPT Мастерство" : "ChatGPT Mastery",
      items: isRu ? [
        "Архитектура и возможности GPT-4",
        "Системные промпты и роли",
        "Цепочки рассуждений (Chain of Thought)",
        "Работа с контекстом и памятью",
      ] : [
        "GPT-4 architecture and capabilities",
        "System prompts and roles",
        "Chain of Thought reasoning",
        "Working with context and memory",
      ],
    },
    {
      title: isRu ? "AI для контента" : "AI for Content",
      items: isRu ? [
        "Генерация текстов и статей",
        "Создание маркетинговых материалов",
        "Редактирование и рерайтинг",
        "Мультиязычный контент",
      ] : [
        "Text and article generation",
        "Marketing materials creation",
        "Editing and rewriting",
        "Multilingual content",
      ],
    },
    {
      title: isRu ? "AI для разработки" : "AI for Development",
      items: isRu ? [
        "Генерация и отладка кода",
        "Документирование проектов",
        "Автоматизация с помощью AI API",
        "Интеграция AI в приложения",
      ] : [
        "Code generation and debugging",
        "Project documentation",
        "Automation with AI API",
        "AI integration in applications",
      ],
    },
  ];

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isRu ? 'Главная' : 'Home', url: SITE_URL },
    { name: isRu ? 'ИИ Обучение' : 'AI Training', url: `${SITE_URL}/ai-training` },
  ]);

  const aiTrainingSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${SITE_URL}/ai-training#course`,
    name: isRu ? 'ИИ Обучение' : 'AI Training',
    description: isRu
      ? 'Курс по работе с искусственным интеллектом и промпт-инжинирингу'
      : 'Course on working with artificial intelligence and prompt engineering',
    provider: {
      '@id': `${SITE_URL}/#person`,
    },
    educationalLevel: isRu ? 'Начальный - Продвинутый' : 'Beginner - Advanced',
    teaches: ['Prompt Engineering', 'ChatGPT', 'AI Automation', 'Claude', 'Gemini'],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        titleRu="ИИ Обучение | Дэн Янович"
        titleEn="AI Training | Dan Yanovich"
        descriptionRu="Обучение работе с искусственным интеллектом: ChatGPT, Claude, Gemini. Промпт-инжиниринг и автоматизация с AI."
        descriptionEn="AI training: ChatGPT, Claude, Gemini. Prompt engineering and AI automation."
        url="/ai-training"
        structuredData={[aiTrainingSchema, breadcrumbSchema]}
      />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-pastel-lavender border-b-2 border-foreground">
        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center space-y-8 bg-card border-2 border-foreground shadow-[8px_8px_0px_0px_currentColor] p-8 md:p-12">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-primary border-2 border-foreground shadow-[2px_2px_0px_0px_currentColor] text-primary-foreground text-sm font-bold uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              <span>{isRu ? 'Новый курс 2024' : 'New Course 2024'}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {isRu ? (
                <>ИИ Обучение<br /><span className="text-primary">для продуктивности</span></>
              ) : (
                <>AI Training<br /><span className="text-primary">for Productivity</span></>
              )}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {isRu
                ? 'Научитесь использовать ChatGPT, Claude и другие AI-инструменты для повышения эффективности работы в 3-5 раз'
                : 'Learn to use ChatGPT, Claude and other AI tools to increase your work efficiency 3-5x'
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <Link to="/contact">
                  {isRu ? 'Записаться на курс' : 'Enroll Now'}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/ai-prompts">
                  {isRu ? 'Смотреть промпты' : 'View Prompts'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Training Modules */}
      <section className="py-16 md:py-20 bg-card border-b-2 border-foreground">
        <div className="container">
          <h2 className="text-2xl md:text-3xl text-center mb-12 font-bold">
            {isRu ? 'Модули обучения' : 'Training Modules'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {trainingModules.map((module, index) => (
              <Card key={index} className="text-center rounded-none border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_currentColor] transition-all">
                <CardHeader className="space-y-4">
                  <div className="inline-flex p-4 bg-primary text-primary-foreground border-2 border-foreground shadow-[2px_2px_0px_0px_currentColor] mx-auto">
                    <module.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold">{module.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {module.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="text-2xl md:text-3xl text-center mb-12 font-bold">
            {isRu ? 'Что вы изучите' : 'What You Will Learn'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {topics.map((topic, index) => (
              <Card key={index} className="p-6 rounded-none border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_currentColor] transition-all">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 font-display">
                  <BookOpen className="h-5 w-5 text-foreground" />
                  {topic.title}
                </h3>
                <ul className="space-y-3">
                  {topic.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 bg-pastel-yellow border-b-2 border-foreground border-t-2">
        <div className="container">
          <h2 className="text-2xl md:text-3xl text-center mb-12 font-bold">
            {isRu ? 'Результаты обучения' : 'Learning Outcomes'}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 border-2 border-foreground rounded-none shadow-[4px_4px_0px_0px_currentColor] p-4 bg-card hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_currentColor] transition-all">
                <CheckCircle className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <Card className="max-w-3xl mx-auto p-8 md:p-12 text-center bg-primary text-primary-foreground rounded-none border-2 border-foreground shadow-[8px_8px_0px_0px_currentColor]">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-display">
              {isRu ? 'Готовы начать?' : 'Ready to Start?'}
            </h2>
            <p className="text-primary-foreground/80 mb-6">
              {isRu
                ? 'Запишитесь на обучение и начните использовать AI для повышения продуктивности'
                : 'Enroll in training and start using AI to boost your productivity'
              }
            </p>
            <Button size="lg" variant="secondary" className="gap-2" asChild>
              <Link to="/contact">
                {isRu ? 'Связаться со мной' : 'Contact Me'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AITraining;
