import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Youtube, MessageCircle, FileText, Star, Quote, ExternalLink, User, Code2, Bot, Workflow, Zap, Globe, Gamepad2, AppWindow, ChevronRight, ChevronLeft, Award, Linkedin, Wrench, Trophy } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatsSection from "@/components/StatsSection";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import DecorativeBlobs from "@/components/DecorativeBlobs";

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
    { id: 'notion', label: 'Notion', icon: FileText },
    { id: 'ai', label: 'AI', icon: Bot },
    { id: 'n8n', label: 'n8n', icon: Workflow },
    { id: 'vibe-coding', label: isRu ? 'Вайб-кодинг' : 'Vibe Coding', icon: Code2 },
    { id: 'tools', label: isRu ? 'Инструменты' : 'Tools', icon: AppWindow },
    { id: 'websites', label: isRu ? 'Сайты' : 'Websites', icon: Globe },
    { id: 'social', label: isRu ? 'Соц. Сети' : 'Social', icon: MessageCircle },
    { id: 'achievements', label: isRu ? 'Достижения' : 'Achievements', icon: Trophy },
    { id: 'programs', label: isRu ? 'Программы' : 'Programs', icon: Gamepad2 },
  ];

  const expertiseBlocks = settings.expertise_blocks.map(block => ({
    id: block.id,
    icon: getIconComponent(block.icon),
    title: isRu ? block.title_ru : block.title_en,
    description: isRu ? block.description_ru : block.description_en,
    highlights: isRu ? block.highlights_ru : block.highlights_en,
    link: block.link,
  }));

  const tools = settings.tools.map(tool => ({
    name: tool.name,
    description: isRu ? tool.description_ru : tool.description_en,
    icon: getIconComponent(tool.icon),
  }));

  const websites = settings.websites.map(website => ({
    title: website.title,
    url: website.url,
    description: isRu ? website.description_ru : website.description_en,
  }));

  const programsAndGames = settings.programs.map(program => ({
    title: isRu ? program.title_ru : program.title_en,
    url: program.url,
    description: isRu ? program.description_ru : program.description_en,
    type: program.type,
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

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        titleRu="Обо мне | Дэн Янович"
        titleEn="About Me | Dan Yanovich"
        descriptionRu="Узнайте больше о Дэне Яновиче — эксперте по Notion, AI инструментам, n8n и вайб-кодингу. Создал 10+ сайтов и программы для бизнеса."
        descriptionEn="Learn more about Dan Yanovich — Notion, AI tools, n8n, and vibe coding expert. Created 10+ websites and business programs."
      />

      {/* Hero Section — Google Labs style */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <DecorativeBlobs variant="hero" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <AnimatedSection>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight font-display">
                {t('contact.title')}
              </h1>
            </AnimatedSection>
            
            {/* Bio Callout — pastel card */}
            <AnimatedSection delay={100}>
              <div className="relative bg-pastel-lavender/15 rounded-3xl p-6 md:p-8 text-left max-w-3xl mx-auto">
                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-pastel-pink/30 flex items-center justify-center">
                      <User className="w-7 h-7 md:w-8 md:h-8 text-foreground" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
                      {isRu ? settings.bio.paragraph1_ru : settings.bio.paragraph1_en}
                    </p>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {isRu ? settings.bio.paragraph2_ru : settings.bio.paragraph2_en}
                    </p>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {isRu ? settings.bio.paragraph3_ru : settings.bio.paragraph3_en}
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

      {/* Statistics Section — pastel cards */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection delay={200}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: settings.stats.projects, label: isRu ? 'Проектов' : 'Projects', bg: 'bg-pastel-yellow/25' },
                  { value: settings.stats.templates, label: isRu ? 'Шаблонов' : 'Templates', bg: 'bg-pastel-pink/25' },
                  { value: settings.stats.websites, label: isRu ? 'Сайтов' : 'Websites', bg: 'bg-pastel-lavender/25' },
                  { value: settings.stats.hours, label: isRu ? 'Часов обучения' : 'Hours of training', bg: 'bg-pastel-mint/25' },
                ].map((stat, i) => (
                  <div key={i} className={`${stat.bg} rounded-3xl p-6 text-center space-y-2`}>
                    <p className="text-3xl md:text-4xl font-bold font-display">{stat.value}+</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Expertise Blocks — rotating pastel backgrounds */}
      <section className="py-16 md:py-20 scroll-mt-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {expertiseBlocks.map((block, index) => (
                <AnimatedSection key={block.id} delay={index * 100}>
                  <Link to={block.link}>
                    <Card 
                      id={block.id}
                      className={`h-full overflow-hidden border-0 ${pastelBgClasses[index % pastelBgClasses.length]} hover:scale-[1.02] cursor-pointer scroll-mt-20 transition-all`}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-background/50 rounded-2xl">
                            <block.icon className="h-8 w-8 text-foreground" />
                          </div>
                          <h2 className="text-xl md:text-2xl font-bold font-display">{block.title}</h2>
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
                              className="px-3 py-1 bg-background/50 text-foreground text-sm rounded-full font-medium"
                            >
                              {highlight}
                            </span>
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

      {/* Tools Section — pastel cards */}
      <section id="tools" className="py-16 md:py-20 scroll-mt-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
                  {isRu ? 'Инструменты' : 'Tools I Use'}
                </h2>
                <p className="text-muted-foreground">
                  {isRu ? 'Программы, в которых я работаю' : 'Programs I work with'}
                </p>
              </div>
            </AnimatedSection>
            
            <div className="grid md:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <Card className={`h-full border-0 ${pastelBgClasses[index % pastelBgClasses.length]}`}>
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                      <div className="p-4 bg-background/50 rounded-2xl">
                        <tool.icon className="h-8 w-8 text-foreground" />
                      </div>
                      <h3 className="text-lg font-bold font-display">{tool.name}</h3>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Websites Section */}
      <section id="websites" className="relative py-16 md:py-20 overflow-hidden scroll-mt-20">
        <DecorativeBlobs variant="section" />
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
                  {isRu ? 'Мои сайты' : 'My Websites'}
                </h2>
                <p className="text-muted-foreground">
                  {isRu ? 'Создал более 10 сайтов' : 'Created 10+ websites'}
                </p>
              </div>
            </AnimatedSection>
            
            <div className="grid md:grid-cols-2 gap-6">
              {websites.map((site, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <a href={site.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <Card className={`group h-full border-0 ${pastelBgClasses[index % pastelBgClasses.length]} hover:scale-[1.02] transition-all`}>
                      <CardContent className="p-6 flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-semibold font-display group-hover:text-foreground transition-colors">
                            {site.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{site.description}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-all" />
                      </CardContent>
                    </Card>
                  </a>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section id="social" className="relative py-16 md:py-20 overflow-hidden scroll-mt-20">
        <DecorativeBlobs variant="section" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl text-center mb-12 font-bold font-display">
                {isRu ? 'Соц. Сети' : 'Social Networks'}
              </h2>
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

      {/* Achievements Timeline */}
      <section id="achievements" className="py-16 md:py-20 scroll-mt-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-display">
                  {isRu ? 'Личные достижения' : 'Personal Achievements'}
                </h2>
              </div>
            </AnimatedSection>

            <div className="relative">
              <div className="absolute left-[28px] md:left-[32px] top-0 bottom-0 w-0.5 bg-pastel-coral/40" />
              {[
                { year: '2024', date: '11.03', title_ru: 'Пробежал полумарафон', title_en: 'Ran a Half Marathon' },
              ].map((item, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className="relative flex items-start gap-4 md:gap-6 mb-8 last:mb-0">
                    <div className="relative z-10 flex-shrink-0 w-14 md:w-16 flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-pastel-coral border-4 border-background shadow-md" />
                    </div>
                    <Card className="flex-1 border-0 bg-pastel-coral/15">
                      <CardContent className="p-4 md:p-6 flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-base md:text-lg font-display">
                            {isRu ? item.title_ru : item.title_en}
                          </h3>
                          <p className="text-sm text-muted-foreground">{item.date}.{item.year}</p>
                        </div>
                        <Badge variant="secondary" className="ml-4 text-xs">{item.year}</Badge>
                      </CardContent>
                    </Card>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs & Games */}
      <section id="programs" className="py-16 md:py-20 scroll-mt-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-3">
                  {isRu ? 'Мои Программы' : 'My Programs'}
                </h2>
                <p className="text-muted-foreground">
                  {isRu ? 'Игры и программы, созданные с помощью AI' : 'Games and programs created with AI'}
                </p>
              </div>
            </AnimatedSection>
            
            <div className="grid md:grid-cols-2 gap-6">
              {programsAndGames.map((item, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                      <Card className={`group h-full border-0 ${pastelBgClasses[index % pastelBgClasses.length]} hover:scale-[1.02] transition-all`}>
                        <CardContent className="p-6 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-background/50 rounded-2xl">
                              {item.type === 'game' ? <Gamepad2 className="h-6 w-6" /> : <AppWindow className="h-6 w-6" />}
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-semibold font-display">{item.title}</h3>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="gap-2">
                            <ExternalLink className="h-4 w-4" />
                            {isRu ? 'Открыть' : 'Open'}
                          </Button>
                        </CardContent>
                      </Card>
                    </a>
                  ) : (
                    <Card className="group h-full border-dashed border-2 border-muted-foreground/30 bg-muted/20">
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-muted/30 rounded-2xl">
                          <AppWindow className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold text-muted-foreground font-display">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Badge variant="secondary" className="ml-auto">
                          {isRu ? 'В разработке' : 'In Development'}
                        </Badge>
                      </CardContent>
                    </Card>
                  )}
                </AnimatedSection>
              ))}
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
