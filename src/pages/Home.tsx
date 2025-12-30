import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useMemo } from "react";
import { ArrowRight, Layout, GraduationCap, Bot, MessageSquare, ExternalLink, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { premiumTemplates } from "@/data/premiumTemplates";

type ProductType = 'all' | 'templates' | 'courses' | 'ai-prompts' | 'consulting' | 'games';

const Home = () => {
  const { t, i18n } = useTranslation();
  const isRu = i18n.language === 'ru';
  const [activeFilter, setActiveFilter] = useState<ProductType>('all');

  // Filter categories as small chips
  const filterCategories = [
    { id: 'all' as ProductType, label: isRu ? "Все" : "All", icon: null },
    { id: 'templates' as ProductType, label: isRu ? "Шаблоны" : "Templates", icon: Layout },
    { id: 'courses' as ProductType, label: isRu ? "Курсы" : "Courses", icon: GraduationCap },
    { id: 'ai-prompts' as ProductType, label: isRu ? "AI Промпты" : "AI Prompts", icon: Bot },
    { id: 'consulting' as ProductType, label: isRu ? "Консалтинг" : "Consulting", icon: MessageSquare },
    { id: 'games' as ProductType, label: isRu ? "Игры" : "Games", icon: Gamepad2 },
  ];

  // All products combined (templates from data + mock products for other categories)
  const allProducts = useMemo(() => {
    const templateProducts = premiumTemplates.map(t => ({
      id: t.id,
      type: 'templates' as ProductType,
      title: isRu ? t.titleRu : t.titleEn,
      description: isRu ? t.descriptionRu : t.descriptionEn,
      price: t.price,
      link: t.link,
      image: t.image,
      icon: t.icon,
      status: t.status,
      popularity: t.popularity,
    }));

    // Mock products for other categories
    const otherProducts = [
      { id: 'course-notion-basics', type: 'courses' as ProductType, title: isRu ? 'Notion с нуля' : 'Notion Basics', description: isRu ? 'Полный курс для начинающих' : 'Complete course for beginners', price: '2 990 ₽', link: '/courses', image: undefined as string | undefined, icon: GraduationCap, status: 'available' as const, popularity: 90 },
      { id: 'course-notion-advanced', type: 'courses' as ProductType, title: isRu ? 'Notion PRO' : 'Notion PRO', description: isRu ? 'Продвинутые техники' : 'Advanced techniques', price: '4 990 ₽', link: '/courses', image: undefined as string | undefined, icon: GraduationCap, status: 'available' as const, popularity: 85 },
      { id: 'ai-prompt-pack', type: 'ai-prompts' as ProductType, title: isRu ? 'ChatGPT Pack' : 'ChatGPT Pack', description: isRu ? '50 промптов для ChatGPT' : '50 prompts for ChatGPT', price: '990 ₽', link: '/ai-prompts', image: undefined as string | undefined, icon: Bot, status: 'available' as const, popularity: 88 },
      { id: 'ai-prompt-midjourney', type: 'ai-prompts' as ProductType, title: isRu ? 'Midjourney Pack' : 'Midjourney Pack', description: isRu ? 'Промпты для генерации изображений' : 'Prompts for image generation', price: '1 490 ₽', link: '/ai-prompts', image: undefined as string | undefined, icon: Bot, status: 'available' as const, popularity: 82 },
      { id: 'consulting-hour', type: 'consulting' as ProductType, title: isRu ? 'Консультация 1 час' : '1 Hour Consultation', description: isRu ? 'Персональная консультация' : 'Personal consultation', price: '5 000 ₽', link: '/consulting', image: undefined as string | undefined, icon: MessageSquare, status: 'available' as const, popularity: 75 },
      { id: 'pixel-cafe-tycoon', type: 'games' as ProductType, title: 'Pixel Cafe Tycoon', description: isRu ? 'Интерактивная игра-симулятор кафе' : 'Interactive cafe simulator game', price: isRu ? 'Бесплатно' : 'Free', link: '/games/pixel-cafe-tycoon', image: undefined as string | undefined, icon: Gamepad2, status: 'available' as const, popularity: 95 },
      { id: 'game-notion-quest', type: 'games' as ProductType, title: isRu ? 'Notion Quest' : 'Notion Quest', description: isRu ? 'Игра-квест в Notion' : 'Quest game in Notion', price: '490 ₽', link: '#', image: undefined as string | undefined, icon: Gamepad2, status: 'development' as const, popularity: 70 },
      { id: 'game-productivity-rpg', type: 'games' as ProductType, title: isRu ? 'Productivity RPG' : 'Productivity RPG', description: isRu ? 'RPG-система продуктивности' : 'Productivity RPG system', price: '790 ₽', link: '#', image: undefined as string | undefined, icon: Gamepad2, status: 'development' as const, popularity: 65 },
    ];

    return [...templateProducts, ...otherProducts];
  }, [isRu]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    let products = activeFilter === 'all' 
      ? allProducts 
      : allProducts.filter(p => p.type === activeFilter);
    
    return products.sort((a, b) => b.popularity - a.popularity);
  }, [allProducts, activeFilter]);

  return (
    <PageTransition>
      <SEO 
        titleRu="Дэн Янович | Notion и AI Эксперт"
        titleEn="Dan Yanovich | Notion & AI Expert"
        descriptionRu="Создаю шаблоны Notion и консультирую по внедрению AI-инструментов. Более 50 проектов, 100+ часов обучения."
        descriptionEn="Creating Notion templates and consulting on AI tools implementation. 50+ projects, 100+ hours of training."
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative container mx-auto px-4 py-16 md:py-24 overflow-hidden">
          {/* Decorative glass orbs */}
          <div className="glass-orb top-20 left-10 w-72 h-72 bg-muted/50" />
          <div className="glass-orb bottom-10 right-10 w-96 h-96 bg-muted/40 animate-float" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              {t('home.hero.subtitle')}
            </p>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.hero.description')}
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section className="relative bg-muted/30 backdrop-blur-sm py-16 md:py-24 overflow-hidden">
          <div className="glass-orb top-1/2 right-0 w-64 h-64 bg-muted/30 animate-float" style={{ animationDelay: '2s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold">
                  {isRu ? "📦 Продукты" : "📦 Products"}
                </h2>
                <p className="text-base md:text-lg text-muted-foreground">
                  {isRu ? "Всё что можно получить или купить" : "Everything available to get or purchase"}
                </p>
              </div>

              {/* Filter Chips - Colorful */}
              <div className="flex flex-wrap justify-center gap-2">
                {filterCategories.map((category, index) => {
                  const colors = [
                    'from-violet-500 to-purple-600',
                    'from-blue-500 to-cyan-500',
                    'from-emerald-500 to-teal-500',
                    'from-amber-500 to-orange-500',
                    'from-pink-500 to-rose-500',
                    'from-orange-500 to-red-500',
                  ];
                  const colorClass = colors[index % colors.length];
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveFilter(category.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        activeFilter === category.id
                          ? `bg-gradient-to-r ${colorClass} text-white shadow-lg scale-105`
                          : 'bg-background/80 backdrop-blur-sm border border-border/50 text-foreground hover:border-border hover:shadow-md'
                      }`}
                    >
                      {category.icon && <category.icon className="h-3.5 w-3.5" />}
                      {category.label}
                    </button>
                  );
                })}
              </div>

              {/* Products Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.slice(0, 12).map((product) => (
                  <Card key={product.id} className="group hover:border-primary/40 transition-all">
                    <CardHeader className="p-4 space-y-3">
                      <div className="aspect-[4/3] bg-muted/50 rounded-xl flex items-center justify-center overflow-hidden">
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <product.icon className="h-10 w-10 text-primary" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold line-clamp-1">{product.title}</h3>
                          {product.status === 'development' && (
                            <Badge variant="secondary" className="text-xs shrink-0">
                              {isRu ? 'Скоро' : 'Soon'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-base font-bold">{product.price}</span>
                        {product.status === 'available' && product.link !== '#' ? (
                          <Button asChild size="sm" variant="default">
                            <a href={product.link} target={product.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                              {isRu ? "Купить" : "Buy"}
                              <ExternalLink className="ml-1.5 h-3 w-3" />
                            </a>
                          </Button>
                        ) : (
                          <Button size="sm" variant="secondary" disabled>
                            {isRu ? "Скоро" : "Soon"}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* View All Button */}
              <div className="flex justify-center pt-4">
                <Button asChild size="lg" variant="outline">
                  <Link to="/templates">
                    {t('common.viewAll')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;