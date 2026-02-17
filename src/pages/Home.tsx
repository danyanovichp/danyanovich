import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useMemo } from "react";
import { ArrowRight, Layout, GraduationCap, Bot, MessageSquare } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { useProducts } from "@/hooks/useProducts";
import { useLandingPreviews } from "@/hooks/useLandingPreviews";
import { premiumTemplates } from "@/data/premiumTemplates";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import DecorativeBlobs from "@/components/DecorativeBlobs";

type ProductType = 'templates' | 'courses' | 'ai-prompts';

const pastelBgClasses = [
  'bg-pastel-yellow/30',
  'bg-pastel-pink/30',
  'bg-pastel-lavender/30',
  'bg-pastel-mint/30',
  'bg-pastel-coral/30',
];

const getIconComponent = (iconName: string | undefined): React.ComponentType<{ className?: string }> => {
  if (!iconName || typeof iconName !== 'string') return Layout;
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  return icons[iconName] || Layout;
};

const Home = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRu = i18n.language === 'ru';
  const [activeFilter, setActiveFilter] = useState<ProductType>('templates');
  const { getMainImage } = useLandingPreviews();
  const { products: dbProducts, isLoading } = useProducts();
  const { settings } = useSiteSettings();

  const filterCategories = [
    { id: 'templates' as ProductType, label: isRu ? "Шаблоны" : "Templates", icon: Layout },
    { id: 'courses' as ProductType, label: isRu ? "Курсы" : "Courses", icon: GraduationCap },
    { id: 'ai-prompts' as ProductType, label: isRu ? "AI Промпты" : "AI Prompts", icon: Bot },
  ];

  const allProducts = useMemo(() => {
    const productMap = new Map(dbProducts.map(p => [p.id, p]));
    
    const templateProducts = premiumTemplates
      .filter(template => {
        const dbProduct = productMap.get(template.id);
        const isVisible = dbProduct?.is_visible ?? true;
        const displayOnHome = dbProduct?.display_on_home ?? true;
        return isVisible && displayOnHome;
      })
      .map(template => {
        const dbProduct = productMap.get(template.id);
        return {
          id: template.id,
          type: 'templates' as ProductType,
          title: isRu 
            ? (dbProduct?.title_ru || template.titleRu) 
            : (dbProduct?.title_en || template.titleEn),
          description: isRu 
            ? (dbProduct?.description_ru || template.descriptionRu) 
            : (dbProduct?.description_en || template.descriptionEn),
          price: dbProduct?.price || template.price,
          link: dbProduct?.link || template.link,
          image: dbProduct?.image || template.image,
          icon: getIconComponent(dbProduct?.icon ?? (typeof template.icon === 'string' ? template.icon : 'Layout')),
          status: (dbProduct?.status as 'available' | 'development') || template.status,
          popularity: dbProduct?.popularity ?? template.popularity,
        };
      });

    const otherProducts = [
      { id: 'course-notion-basics', type: 'courses' as ProductType, title: isRu ? 'Notion с нуля' : 'Notion Basics', description: isRu ? 'Полный курс для начинающих' : 'Complete course for beginners', price: '2 990 ₽', link: '/courses', image: undefined as string | undefined, icon: GraduationCap, status: 'development' as const, popularity: 90 },
      { id: 'course-notion-advanced', type: 'courses' as ProductType, title: isRu ? 'Notion PRO' : 'Notion PRO', description: isRu ? 'Продвинутые техники' : 'Advanced techniques', price: '4 990 ₽', link: '/courses', image: undefined as string | undefined, icon: GraduationCap, status: 'development' as const, popularity: 85 },
      { id: 'ai-prompt-pack', type: 'ai-prompts' as ProductType, title: isRu ? 'ChatGPT Pack' : 'ChatGPT Pack', description: isRu ? '50 промптов для ChatGPT' : '50 prompts for ChatGPT', price: '990 ₽', link: '/ai-prompts', image: undefined as string | undefined, icon: Bot, status: 'development' as const, popularity: 88 },
      { id: 'ai-prompt-midjourney', type: 'ai-prompts' as ProductType, title: isRu ? 'Midjourney Pack' : 'Midjourney Pack', description: isRu ? 'Промпты для генерации изображений' : 'Prompts for image generation', price: '1 490 ₽', link: '/ai-prompts', image: undefined as string | undefined, icon: Bot, status: 'development' as const, popularity: 82 },
    ];

    return [...templateProducts, ...otherProducts];
  }, [isRu, dbProducts]);

  const filteredProducts = useMemo(() => {
    const products = allProducts.filter(p => p.type === activeFilter);
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
        <section className="relative container mx-auto px-4 py-24 md:py-40 overflow-hidden">
          <DecorativeBlobs variant="hero" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight font-display">
              {isRu ? settings.hero.title_ru : settings.hero.title_en}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              {isRu ? settings.hero.subtitle_ru : settings.hero.subtitle_en}
            </p>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
              {isRu ? settings.hero.description_ru : settings.hero.description_en}
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button asChild size="lg" className="px-8 py-3 text-base">
                <Link to="/products">
                  {isRu ? "Продукты" : "Products"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-8 py-3 text-base">
                <Link to="/cases">
                  {isRu ? "Кейсы" : "Cases"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>


        {/* Products Section — max 5 */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <DecorativeBlobs variant="section" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto space-y-10">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-display">
                  {isRu ? "Продукты" : "Products"}
                </h2>
                <p className="text-base md:text-lg text-muted-foreground">
                  {isRu ? "Всё что можно получить или купить" : "Everything available to get or purchase"}
                </p>
              </div>

              {/* Filter Chips */}
              <div className="flex flex-wrap justify-center gap-2">
                {filterCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                      activeFilter === category.id
                        ? 'bg-foreground text-background'
                        : 'bg-muted/40 border border-border/10 text-muted-foreground hover:text-foreground hover:bg-muted/60'
                    }`}
                  >
                    {category.icon && <category.icon className="h-3.5 w-3.5" />}
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Products Grid — only 5 */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
                {filteredProducts.slice(0, 5).map((product, index) => {
                  const isTemplate = product.type === 'templates';
                  const handleCardClick = () => {
                    if (isTemplate && product.status === 'available') {
                      navigate(`/templates/${product.id}`);
                    }
                  };
                  
                  return (
                    <Card 
                      key={product.id} 
                      className={`group ${pastelBgClasses[index % pastelBgClasses.length]} border-0 ${isTemplate && product.status === 'available' ? 'cursor-pointer' : ''}`}
                      onClick={handleCardClick}
                    >
                      <CardHeader className="p-4 space-y-3">
                        <div className="aspect-[4/3] bg-background/50 rounded-2xl flex items-center justify-center overflow-hidden">
                          {(() => {
                            const landingImage = isTemplate ? getMainImage(product.id) : null;
                            const displayImage = landingImage || product.image;
                            return displayImage ? (
                              <img 
                                src={displayImage} 
                                alt={product.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <product.icon className="h-8 w-8 text-muted-foreground/50" />
                            );
                          })()}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold line-clamp-1 font-display">{product.title}</h3>
                            {product.status === 'development' && (
                              <Badge variant="outline" className="text-[10px] shrink-0">
                                {isRu ? 'Скоро' : 'Soon'}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 space-y-3">
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold">{product.price}</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* View All Button */}
              <div className="flex justify-center pt-4">
                <Button asChild size="lg" className="px-10 py-3 text-base">
                  <Link to="/products">
                    {isRu ? "Все продукты" : "All Products"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Consulting Section */}
        <section className="relative py-16 md:py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight font-display">
                  {isRu ? "Консалтинг" : "Consulting"}
                </h2>
                <p className="text-base text-muted-foreground">
                  {isRu ? "Персональные консультации по Notion и автоматизации" : "Personal consultations on Notion and automation"}
                </p>
              </div>

              <Card className="bg-pastel-blue/20 border-0">
                <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                  <div className="p-4 bg-background/50 rounded-2xl">
                    <MessageSquare className="h-8 w-8 text-foreground" />
                  </div>
                  <div className="flex-1 text-center md:text-left space-y-2">
                    <h3 className="text-lg font-bold font-display">
                      {isRu ? settings.consulting.title_ru : settings.consulting.title_en}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isRu ? settings.consulting.description_ru : settings.consulting.description_en}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-2xl font-bold font-display">{settings.consulting.price}</span>
                    <Button asChild>
                      <Link to="/consulting">
                        {isRu ? "Записаться" : "Book"}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;
