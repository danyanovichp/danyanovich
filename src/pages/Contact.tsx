import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Youtube, MessageCircle, FileText, Star, Quote, ExternalLink, User, Code2, Bot, Workflow, Zap, Globe, Gamepad2, AppWindow, ChevronRight, ChevronLeft, Award } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatsSection from "@/components/StatsSection";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRu = i18n.language === 'ru';

  // Navigation sections
  const sections = [
    { id: 'notion', label: 'Notion', icon: FileText },
    { id: 'ai', label: 'AI', icon: Bot },
    { id: 'n8n', label: 'n8n', icon: Workflow },
    { id: 'vibe-coding', label: isRu ? 'Вайб-кодинг' : 'Vibe Coding', icon: Code2 },
    { id: 'websites', label: isRu ? 'Сайты' : 'Websites', icon: Globe },
    { id: 'programs', label: isRu ? 'Программы' : 'Programs', icon: AppWindow },
    { id: 'games', label: isRu ? 'Игры' : 'Games', icon: Gamepad2 },
  ];

  // Expertise blocks data
  const expertiseBlocks = [
    {
      id: 'notion',
      icon: FileText,
      title: 'Notion',
      description: isRu 
        ? 'Эксперт по Notion с 2020 года. Создаю продвинутые рабочие пространства, базы данных и системы управления для бизнеса. Реализовал более 50 проектов различного масштаба.'
        : 'Notion expert since 2020. Creating advanced workspaces, databases, and management systems for businesses. Completed over 50 projects of various scales.',
      highlights: isRu 
        ? ['50+ проектов', 'Шаблоны', 'Автоматизация', 'Консалтинг']
        : ['50+ projects', 'Templates', 'Automation', 'Consulting'],
    },
    {
      id: 'ai',
      icon: Bot,
      title: isRu ? 'AI Инструменты' : 'AI Tools',
      description: isRu 
        ? 'Разрабатываю эффективные AI-решения с использованием ChatGPT, Claude и других инструментов. Создаю промпты и интеграции для автоматизации бизнес-процессов.'
        : 'Developing effective AI solutions using ChatGPT, Claude, and other tools. Creating prompts and integrations for business process automation.',
      highlights: isRu 
        ? ['ChatGPT', 'Claude', 'Промпт-инжиниринг', 'AI интеграции']
        : ['ChatGPT', 'Claude', 'Prompt Engineering', 'AI Integrations'],
    },
    {
      id: 'n8n',
      icon: Workflow,
      title: 'n8n',
      description: isRu 
        ? 'Создаю сложные автоматизации с n8n — мощной платформой для интеграции сервисов. Настраиваю воркфлоу для связи CRM, мессенджеров, баз данных и AI.'
        : 'Building complex automations with n8n — a powerful platform for service integration. Setting up workflows connecting CRM, messengers, databases, and AI.',
      highlights: isRu 
        ? ['Воркфлоу', 'Интеграции', 'API', 'Автоматизация']
        : ['Workflows', 'Integrations', 'API', 'Automation'],
    },
    {
      id: 'vibe-coding',
      icon: Code2,
      title: isRu ? 'Вайб-кодинг' : 'Vibe Coding',
      description: isRu 
        ? 'Создаю веб-приложения и сайты с помощью AI-assisted разработки. Использую современные технологии для быстрого создания качественных решений без традиционного программирования.'
        : 'Creating web applications and websites using AI-assisted development. Using modern technologies for rapid creation of quality solutions without traditional programming.',
      highlights: isRu 
        ? ['Lovable', 'Cursor', 'React', 'TypeScript']
        : ['Lovable', 'Cursor', 'React', 'TypeScript'],
    },
  ];

  // Websites data
  const websites = [
    {
      title: 'Viora Build Site 1',
      url: 'https://dev-l152.viorabuild.org/',
      description: isRu ? 'Современный лендинг' : 'Modern landing page',
    },
    {
      title: 'Viora Build Site 2',
      url: 'https://dev-l87.viorabuild.org/',
      description: isRu ? 'Бизнес-сайт' : 'Business website',
    },
    {
      title: 'Viora Build Site 3',
      url: 'https://dev-l3-26.viorabuild.org/',
      description: isRu ? 'Корпоративный портал' : 'Corporate portal',
    },
    {
      title: 'Viora Consulting',
      url: 'https://viora-consulting.lovable.app/',
      description: isRu ? 'Консалтинговый сайт' : 'Consulting website',
    },
  ];

  // Programs data
  const programs = [
    {
      title: isRu ? 'CRM Система' : 'CRM System',
      description: isRu ? 'Полноценная CRM для управления клиентами и продажами' : 'Full-featured CRM for client and sales management',
    },
    {
      title: isRu ? 'Система учёта' : 'Accounting System',
      description: isRu ? 'Программа для ведения учёта и финансов' : 'Program for accounting and finance management',
    },
    {
      title: isRu ? 'Трекер задач' : 'Task Tracker',
      description: isRu ? 'Инструмент для управления проектами и задачами' : 'Tool for project and task management',
    },
  ];

  // Games data
  const games = [
    {
      title: isRu ? 'AI Game Studio' : 'AI Game Studio',
      url: 'https://ai.studio/apps/drive/1kuZusi_K5jgX7NZTmZ-8quB9JgxNOOpH',
      description: isRu ? 'Интерактивная игра созданная с помощью AI' : 'Interactive game created with AI',
    },
  ];

  const socialLinks = [
    {
      icon: Youtube,
      title: isRu ? "YouTube канал" : "YouTube Channel",
      description: isRu 
        ? "Обучающие видео по Notion и автоматизации"
        : "Educational videos on Notion and automation",
      handle: "@danyanovich",
      link: "https://www.youtube.com/channel/UCzcTrBkzXgA9aaH05cWVi2g",
    },
    {
      icon: MessageCircle,
      title: isRu ? "Telegram канал" : "Telegram Channel",
      description: isRu 
        ? "Личный канал с инсайтами и шаблонами"
        : "Personal channel with insights and templates",
      handle: "@danyanovichp",
      link: "https://t.me/danyanovichp",
    },
    {
      icon: FileText,
      title: "Notion Marketplace",
      description: isRu 
        ? "Мои шаблоны на официальной площадке Notion"
        : "My templates on the official Notion marketplace",
      handle: "@danyanovich",
      link: "https://www.notion.so/@danyanovich",
    },
  ];

  const reviews = [
    {
      name: "Dmitri_Str",
      project: isRu ? "Оптимизация шаблона Notion" : "Notion Template Optimization",
      text: isRu 
        ? "Очень редко сейчас встретишь профессионалов такого уровня, очень быстро разобрался в задаче, максимально приветлив, предложил хорошие идеи, что в итоге улучшило изначально задуманное. Быстро и качественно выполнил. Если вам нужно качество и профессионал, то однозначно рекомендую!"
        : "Very rare to find professionals of this level. Quickly understood the task, very friendly, suggested good ideas that improved the original concept. Fast and quality work. Highly recommend!",
      rating: 5,
    },
    {
      name: "edgadirov",
      project: isRu ? "Notion база данных + шаблон" : "Notion Database + Template",
      text: isRu 
        ? "Отличная работа! Данил очень ответственный человек. К работе подошел с профессионализмом. Делали шаблон для облегчения работы учеников. Даже несколько раз созвонились, помог разобраться в notion и помог найти лучшее решение. Все сделано идеально!"
        : "Excellent work! Danil is very responsible. Approached the work professionally. Made a template for students. Even had several calls, helped understand Notion and find the best solution. Everything done perfectly!",
      rating: 5,
    },
    {
      name: "nesmeyanna",
      project: isRu ? "Notion 2 доски" : "Notion 2 Boards",
      text: isRu 
        ? "Данила восхитителен! В работе была простая задача, он дополнил её так, как я и не могла предположить, не зная о всех возможностях Notion. Рекомендую как профессионала, с удовольствием обращусь ещё."
        : "Danila is amazing! It was a simple task, but he enhanced it in ways I couldn't imagine, not knowing all of Notion's capabilities. Recommend as a professional!",
      rating: 5,
    },
    {
      name: "Aram_G",
      project: isRu ? "Notion Шаблон" : "Notion Template",
      text: isRu 
        ? "У меня был достаточно большой заказ, но Данила прекрасно и быстро со всем справился! Сразу видно опыт и умения! Очень рекомендую! Обязательно обращусь еще!"
        : "I had a fairly large order, but Danila handled everything perfectly and quickly! You can immediately see the experience and skills! Highly recommend!",
      rating: 5,
    },
    {
      name: "viguroo",
      project: isRu ? "База данных Notion" : "Notion Database",
      text: isRu 
        ? "Регулярно заказываю базы в notion, очень довольна качеством работы! Искренне рекомендую всем заказчикам!! Спасибо!!"
        : "Regularly order databases in Notion, very happy with the quality of work! Sincerely recommend to all clients!! Thank you!!",
      rating: 5,
    },
    {
      name: "Yulia_step",
      project: isRu ? "Консультация по Notion" : "Notion Consultation",
      text: isRu 
        ? "Очень быстро договорились про созвон и Данила на консультации подробно ответил на вопросы, показал возможные решения под наши и аналогичные задачи. Спасибо большое, прямо то, что нужно!"
        : "Quickly arranged a call and Danila answered all questions in detail during the consultation, showed possible solutions for our tasks. Thank you, exactly what we needed!",
      rating: 5,
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title={isRu ? 'Обо мне | Дэн Янович' : 'About Me | Dan Yanovich'}
        description={isRu 
          ? 'Узнайте больше о Дэне Яновиче — эксперте по Notion, AI инструментам, n8n и вайб-кодингу. Создал 10+ сайтов и программы для бизнеса.'
          : 'Learn more about Dan Yanovich — Notion, AI tools, n8n, and vibe coding expert. Created 10+ websites and business programs.'}
      />

      {/* Hero Section */}
      <section className="bg-muted/30 backdrop-blur-sm py-16 md:py-24 border-b border-border/20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <AnimatedSection>
              <h1 className="text-3xl md:text-5xl font-bold">{t('contact.title')}</h1>
            </AnimatedSection>
            
            {/* Bio Callout */}
            <AnimatedSection delay={100}>
              <div className="relative bg-card/50 backdrop-blur-sm border border-border/40 rounded-2xl p-6 md:p-8 text-left max-w-3xl mx-auto">
                <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full" />
                <div className="flex gap-5">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
                      <User className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                    </div>
                  </div>
                  {/* Bio Text */}
                  <div className="space-y-4">
                    <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
                      {t('contact.bio1')}
                    </p>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {t('contact.bio2')}
                    </p>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {t('contact.bio3')}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Section Navigation */}
            <AnimatedSection delay={150}>
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-8">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant="outline"
                    size="sm"
                    onClick={() => scrollToSection(section.id)}
                    className="gap-2 hover:bg-primary hover:text-primary-foreground transition-all"
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

      {/* Statistics Section */}
      <section className="py-16 md:py-20 bg-muted/10">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection delay={200}>
              <StatsSection />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Expertise Blocks - 2 Column Grid */}
      <section className="py-16 md:py-20 bg-muted/10 scroll-mt-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {expertiseBlocks.map((block, index) => (
                <AnimatedSection key={block.id} delay={index * 100}>
                  <Card 
                    id={block.id}
                    className="h-full overflow-hidden border-primary/20 hover:border-primary/40 transition-colors scroll-mt-20"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl">
                          <block.icon className="h-8 w-8 text-primary" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold">{block.title}</h2>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                        {block.description}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {block.highlights.map((highlight, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
                          >
                            {highlight}
                          </span>
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

      {/* Websites Section */}
      <section id="websites" className="py-16 md:py-20 bg-gradient-to-b from-muted/10 to-muted/30 scroll-mt-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {isRu ? 'Мои сайты' : 'My Websites'}
                  </h2>
                </div>
                <p className="text-muted-foreground">
                  {isRu 
                    ? 'Создал более 10 сайтов с помощью современных технологий'
                    : 'Created 10+ websites using modern technologies'}
                </p>
              </div>
            </AnimatedSection>
            
            <div className="grid md:grid-cols-2 gap-6">
              {websites.map((site, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <Card className="group h-full hover:border-primary/40 transition-all hover:scale-[1.02]">
                      <CardContent className="p-6 flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-semibold group-hover:text-primary transition-colors">
                            {site.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {site.description}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </CardContent>
                    </Card>
                  </a>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-16 md:py-20 bg-muted/5 scroll-mt-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 mb-4">
                  <AppWindow className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {isRu ? 'Мои программы' : 'My Programs'}
                  </h2>
                </div>
                <p className="text-muted-foreground">
                  {isRu 
                    ? 'В разработке — скоро здесь появятся программы для бизнеса'
                    : 'In development — business programs coming soon'}
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={100}>
              <Card className="border-dashed border-2 border-muted-foreground/30 bg-muted/20">
                <CardContent className="p-12 text-center space-y-4">
                  <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-muted-foreground">
                    {isRu ? 'В разработке' : 'In Development'}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    {isRu 
                      ? 'Сейчас я работаю над созданием полезных программ для бизнеса. Следите за обновлениями!'
                      : 'I am currently working on creating useful business programs. Stay tuned for updates!'}
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="py-16 md:py-20 bg-muted/20 scroll-mt-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 mb-4">
                  <Gamepad2 className="h-8 w-8 text-primary" />
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {isRu ? 'Мои игры' : 'My Games'}
                  </h2>
                </div>
                <p className="text-muted-foreground">
                  {isRu 
                    ? 'Интерактивные игры созданные с помощью AI'
                    : 'Interactive games created with AI'}
                </p>
              </div>
            </AnimatedSection>
            
            <div className="grid gap-6">
              {games.map((game, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <a
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Card className="group hover:border-primary/40 transition-all hover:scale-[1.01]">
                      <CardContent className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-primary/10 rounded-xl">
                            <Gamepad2 className="h-6 w-6 text-primary" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                              {game.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {game.description}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <ExternalLink className="h-4 w-4" />
                          {isRu ? 'Открыть' : 'Open'}
                        </Button>
                      </CardContent>
                    </Card>
                  </a>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Decorative orbs */}
        <div className="glass-orb top-20 left-1/4 w-64 h-64 bg-muted/30 animate-float" />
        <div className="glass-orb bottom-20 right-1/4 w-80 h-80 bg-muted/40 animate-float" style={{ animationDelay: '1.5s' }} />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-2xl md:text-3xl text-center mb-12 font-bold">
                {t('contact.social')}
              </h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-6">
              {socialLinks.map((social, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <Card className="group cursor-pointer h-full transition-all hover:scale-[1.02]">
                      <CardHeader className="space-y-4">
                        <div className="inline-flex p-4 bg-primary/90 backdrop-blur-sm text-primary-foreground rounded-2xl w-fit">
                          <social.icon className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold">{social.title}</h3>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          {social.description}
                        </p>
                        <span className="text-sm font-medium text-primary inline-flex items-center gap-2 group-hover:underline">
                          {social.handle}
                        </span>
                      </CardContent>
                    </Card>
                  </a>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Reviews Section with Carousel */}
      <ReviewsCarousel reviews={reviews} isRu={isRu} />
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
    <section className="py-16 md:py-20 bg-muted/20">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Award className="h-3 w-3 mr-1" />
                Kwork PRO
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {isRu ? 'Отзывы клиентов' : 'Client Reviews'}
              </h2>
              <p className="text-muted-foreground">
                {isRu ? `${reviews.length}+ положительных отзывов на Kwork` : `${reviews.length}+ positive reviews on Kwork`}
              </p>
            </div>
          </AnimatedSection>

          {/* Carousel Container */}
          <div 
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 hidden md:flex rounded-full shadow-glass"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 hidden md:flex rounded-full shadow-glass"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Reviews Grid */}
            <div className="grid md:grid-cols-3 gap-6 px-4 md:px-8">
              {visibleReviews.map((review, index) => (
                <Card 
                  key={`${review.name}-${currentIndex}-${index}`}
                  className={`h-full transition-all duration-500 ${
                    index === 1 ? 'md:scale-105 shadow-glass-lg border-primary/30' : 'opacity-70 md:opacity-100'
                  }`}
                >
                  <CardHeader className="pb-2">
                    <Quote className="h-8 w-8 text-primary/40 mb-2" />
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground italic line-clamp-4">
                      "{review.text}"
                    </p>
                    <div className="pt-2 border-t border-border/50">
                      <p className="font-semibold text-sm">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.project}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-primary w-6' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Kwork Link with Badge */}
          <AnimatedSection delay={300}>
            <div className="mt-12 text-center">
              <a 
                href="https://kwork.ru/user/danyanovich" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex flex-col items-center gap-3"
              >
                <Badge className="bg-green-500/10 text-green-600 border-green-500/30 hover:bg-green-500/20">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  {isRu ? 'PRO продавец' : 'PRO seller'}
                </Badge>
                <Button variant="outline" className="gap-2 group">
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