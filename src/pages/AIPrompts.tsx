import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Brain, Zap, Target } from "lucide-react";
import { useTranslation } from "react-i18next";
import PixelDecorations from "@/components/pixel-art/PixelDecorations";

const AIPrompts = () => {
  const { t, i18n } = useTranslation();

  const features = [
    {
      icon: Brain,
      title: i18n.language === 'ru' ? "Интеллектуальные промпты" : "Smart Prompts",
      description: i18n.language === 'ru'
        ? "Коллекция тщательно проработанных промптов для различных AI-моделей"
        : "Collection of carefully crafted prompts for various AI models",
    },
    {
      icon: Zap,
      title: i18n.language === 'ru' ? "Быстрая автоматизация" : "Fast Automation",
      description: i18n.language === 'ru'
        ? "Ускорьте рабочие процессы с помощью готовых AI-решений"
        : "Speed up workflows with ready-made AI solutions",
    },
    {
      icon: Target,
      title: i18n.language === 'ru' ? "Точные результаты" : "Precise Results",
      description: i18n.language === 'ru'
        ? "Получайте качественные ответы от AI благодаря оптимизированным промптам"
        : "Get quality AI responses with optimized prompts",
    },
  ];

  const categories = [
    {
      title: i18n.language === 'ru' ? "Бизнес и маркетинг" : "Business & Marketing",
      description: i18n.language === 'ru' 
        ? "Промпты для создания контента, стратегий и анализа"
        : "Prompts for content creation, strategies and analysis",
      count: i18n.language === 'ru' ? "12+ промптов" : "12+ prompts",
    },
    {
      title: i18n.language === 'ru' ? "Разработка" : "Development",
      description: i18n.language === 'ru' 
        ? "Помощь в написании кода и решении технических задач"
        : "Help with coding and solving technical problems",
      count: i18n.language === 'ru' ? "15+ промптов" : "15+ prompts",
    },
    {
      title: i18n.language === 'ru' ? "Креатив" : "Creative",
      description: i18n.language === 'ru' 
        ? "Генерация идей, сценариев и креативного контента"
        : "Generating ideas, scripts and creative content",
      count: i18n.language === 'ru' ? "10+ промптов" : "10+ prompts",
    },
    {
      title: i18n.language === 'ru' ? "Анализ данных" : "Data Analysis",
      description: i18n.language === 'ru' 
        ? "Обработка и интерпретация данных с помощью AI"
        : "Processing and interpreting data with AI",
      count: i18n.language === 'ru' ? "8+ промптов" : "8+ prompts",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen relative">
      <PixelDecorations />
      
      {/* Hero Section with "In Development" Banner */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20 border-b-4 border-border relative">
        <div className="container">
          <div className="max-w-3xl space-y-6">
            {/* In Development Badge */}
            <div className="inline-flex items-center gap-2 pixel-border px-4 py-2 bg-brand-amber text-background font-bold text-xs uppercase animate-pixel-pulse">
              <span>🚧</span>
              <span>{t('common.inDevelopment')}</span>
            </div>

            <h1 className="text-2xl md:text-3xl">{t('aiPrompts.title')}</h1>
            <p className="text-xs md:text-sm opacity-90">
              {t('aiPrompts.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="pixel-border p-6 bg-background space-y-3 text-center"
              >
                <div className="inline-flex p-3 pixel-border bg-primary mx-auto">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-sm font-bold">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="text-xl md:text-2xl text-center mb-12">
            {i18n.language === 'ru' ? 'Категории промптов' : 'Prompt Categories'}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="pixel-border pixel-border-hover"
              >
                <CardHeader>
                  <h3 className="text-base font-bold">{category.title}</h3>
                  <p className="text-xs text-muted-foreground mt-2">
                    {category.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-xs font-bold">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIPrompts;
