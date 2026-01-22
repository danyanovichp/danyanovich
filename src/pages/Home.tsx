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
type ProductType = 'templates' | 'courses' | 'ai-prompts';

// Helper to get icon component from string name
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

  // Filter categories as small chips (removed 'all', 'consulting', 'games')
  const filterCategories = [
    { id: 'templates' as ProductType, label: isRu ? "Шаблоны" : "Templates", icon: Layout },
    { id: 'courses' as ProductType, label: isRu ? "Курсы" : "Courses", icon: GraduationCap },
    { id: 'ai-prompts' as ProductType, label: isRu ? "AI Промпты" : "AI Prompts", icon: Bot },
  ];

  // All products combined (templates from DB + mock products for other categories)
  const allProducts = useMemo(() => {
    // Merge DB products with static templates (DB takes priority for data)
    const productMap = new Map(dbProducts.map(p => [p.id, p]));
    
    const templateProducts = premiumTemplates
      .filter(template => {
        const dbProduct = productMap.get(template.id);
        const status = dbProduct?.status || template.status;
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

    // Mock products for other categories (Courses & AI Prompts - now in development)
    const otherProducts = [
      { id: 'course-notion-basics', type: 'courses' as ProductType, title: isRu ? 'Notion с нуля' : 'Notion Basics', description: isRu ? 'Полный курс для начинающих' : 'Complete course for beginners', price: '2 990 ₽', link: '/courses', image: undefined as string | undefined, icon: GraduationCap, status: 'development' as const, popularity: 90 },
      { id: 'course-notion-advanced', type: 'courses' as ProductType, title: isRu ? 'Notion PRO' : 'Notion PRO', description: isRu ? 'Продвинутые техники' : 'Advanced techniques', price: '4 990 ₽', link: '/courses', image: undefined as string | undefined, icon: GraduationCap, status: 'development' as const, popularity: 85 },
      { id: 'ai-prompt-pack', type: 'ai-prompts' as ProductType, title: isRu ? 'ChatGPT Pack' : 'ChatGPT Pack', description: isRu ? '50 промптов для ChatGPT' : '50 prompts for ChatGPT', price: '990 ₽', link: '/ai-prompts', image: undefined as string | undefined, icon: Bot, status: 'development' as const, popularity: 88 },
      { id: 'ai-prompt-midjourney', type: 'ai-prompts' as ProductType, title: isRu ? 'Midjourney Pack' : 'Midjourney Pack', description: isRu ? 'Промпты для генерации изображений' : 'Prompts for image generation', price: '1 490 ₽', link: '/ai-prompts', image: undefined as string | undefined, icon: Bot, status: 'development' as const, popularity: 82 },
    ];

    return [...templateProducts, ...otherProducts];
  }, [isRu, dbProducts]);

  // Filtered products
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

              {/* Filter Chips - Colorful (without 'All') */}
              <div className="flex flex-wrap justify-center gap-2">
                {filterCategories.map((category, index) => {
                  const colors = [
                    'from-blue-500 to-cyan-500',
                    'from-emerald-500 to-teal-500',
                    'from-amber-500 to-orange-500',
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
                {filteredProducts.slice(0, 12).map((product) => {
                  const isTemplate = product.type === 'templates';
                  const handleCardClick = () => {
                    if (isTemplate && product.status === 'available') {
                      navigate(`/templates/${product.id}`);
                    }
                  };
                  
                  return (
                    <Card 
                      key={product.id} 
                      className={`group hover:border-primary/40 transition-all ${isTemplate && product.status === 'available' ? 'cursor-pointer' : ''}`}
                      onClick={handleCardClick}
                    >
                      <CardHeader className="p-4 space-y-3">
                        <div className="aspect-[4/3] bg-muted/50 rounded-xl flex items-center justify-center overflow-hidden">
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
                              <product.icon className="h-10 w-10 text-primary" />
                            );
                          })()}
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
                            isTemplate ? (
                              <Button 
                                size="sm" 
                                variant="default"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/templates/${product.id}`);
                                }}
                              >
                                {isRu ? "Подробнее" : "Details"}
                              </Button>
                            ) : (
                              <Button asChild size="sm" variant="default">
                                <a 
                                  href={product.link} 
                                  target={product.link.startsWith('http') ? '_blank' : undefined} 
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {isRu ? "Перейти" : "Go"}
                                </a>
                              </Button>
                            )
                          ) : (
                            <Button size="sm" variant="secondary" disabled>
                              {isRu ? "Скоро" : "Soon"}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
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

        {/* Consulting Section - Separate */}
        <section className="relative py-16 md:py-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">
                  {isRu ? "💬 Консалтинг" : "💬 Consulting"}
                </h2>
                <p className="text-base text-muted-foreground">
                  {isRu ? "Персональные консультации по Notion и автоматизации" : "Personal consultations on Notion and automation"}
                </p>
              </div>

              <Card className="group hover:border-primary/40 transition-all">
                <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                  <div className="p-4 bg-primary/10 rounded-2xl">
                    <MessageSquare className="h-10 w-10 text-primary" />
                  </div>
                  <div className="flex-1 text-center md:text-left space-y-2">
                    <h3 className="text-xl font-bold">
                      {isRu ? "Консультация 1 час" : "1 Hour Consultation"}
                    </h3>
                    <p className="text-muted-foreground">
                      {isRu 
                        ? "Персональная консультация по Notion, автоматизации и AI-инструментам. Разберём ваши задачи и найдём решения."
                        : "Personal consultation on Notion, automation and AI tools. Let's discuss your tasks and find solutions."}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-2xl font-bold">5 000 ₽</span>
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
