import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Layout, GraduationCap, Bot, MessageSquare, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { premiumTemplates } from "@/data/premiumTemplates";

const Home = () => {
  const { t, i18n } = useTranslation();
  const isRu = i18n.language === 'ru';

  // Product categories with links to pages
  const productCategories = [
    {
      icon: Layout,
      title: isRu ? "Шаблоны" : "Templates",
      description: isRu ? "Notion шаблоны для продуктивности" : "Notion templates for productivity",
      count: `${premiumTemplates.length}+`,
      href: "/templates",
      color: "bg-primary",
    },
    {
      icon: GraduationCap,
      title: isRu ? "Курсы" : "Courses",
      description: isRu ? "Обучающие программы и уроки" : "Training programs and lessons",
      count: "3",
      href: "/courses",
      color: "bg-emerald-500",
    },
    {
      icon: Bot,
      title: isRu ? "AI Промпты" : "AI Prompts",
      description: isRu ? "Готовые промпты для нейросетей" : "Ready-made prompts for AI",
      count: "50+",
      href: "/ai-prompts",
      color: "bg-violet-500",
    },
    {
      icon: MessageSquare,
      title: isRu ? "Консалтинг" : "Consulting",
      description: isRu ? "Персональные консультации" : "Personal consultations",
      count: isRu ? "Услуги" : "Services",
      href: "/consulting",
      color: "bg-amber-500",
    },
  ];

  // Get popular available products
  const popularProducts = premiumTemplates
    .filter(t => t.status === 'available')
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 4);

  return (
    <PageTransition>
      <SEO 
        title={isRu ? 'Дэн Янович | Notion и AI Эксперт' : 'Dan Yanovich | Notion & AI Expert'}
        description={isRu 
          ? 'Создаю шаблоны Notion и консультирую по внедрению AI-инструментов. Более 50 проектов, 100+ часов обучения.'
          : 'Creating Notion templates and consulting on AI tools implementation. 50+ projects, 100+ hours of training.'}
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
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/templates">
                  {t('common.viewTemplates')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="relative bg-muted/30 backdrop-blur-sm py-16 md:py-24 overflow-hidden">
          <div className="glass-orb top-1/2 right-0 w-64 h-64 bg-muted/30 animate-float" style={{ animationDelay: '2s' }} />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold">
                  {isRu ? "📦 Продукты" : "📦 Products"}
                </h2>
                <p className="text-base md:text-lg text-muted-foreground">
                  {isRu ? "Всё что можно получить или купить" : "Everything available to get or purchase"}
                </p>
              </div>

              {/* Product Categories */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {productCategories.map((category) => (
                  <Link key={category.href} to={category.href}>
                    <Card className="h-full cursor-pointer group hover:border-primary/40 transition-all">
                      <CardHeader className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className={`inline-flex p-3 ${category.color} text-white rounded-xl`}>
                            <category.icon className="h-6 w-6" />
                          </div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </div>
                        <h3 className="text-xl font-bold">{category.title}</h3>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Popular Products */}
              {popularProducts.length > 0 && (
                <div className="space-y-8 pt-8">
                  <div className="flex items-center gap-4">
                    <Badge className="px-6 py-3 bg-primary/90 backdrop-blur-sm text-primary-foreground text-base font-medium rounded-full">
                      🔥 {isRu ? "Популярные" : "Popular"}
                    </Badge>
                    <div className="flex-1 h-px bg-border/20" />
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {popularProducts.map((product) => (
                      <Card key={product.id} className="group hover:border-primary/40 transition-all">
                        <CardHeader className="space-y-4">
                          <div className="aspect-video bg-muted/50 rounded-xl flex items-center justify-center overflow-hidden">
                            {product.image ? (
                              <img 
                                src={product.image} 
                                alt={isRu ? product.titleRu : product.titleEn}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <product.icon className="h-12 w-12 text-primary" />
                            )}
                          </div>
                          <h3 className="text-lg font-bold line-clamp-1">
                            {isRu ? product.titleRu : product.titleEn}
                          </h3>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {isRu ? product.descriptionRu : product.descriptionEn}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-primary">{product.price}</span>
                            <Button asChild size="sm">
                              <a href={product.link} target="_blank" rel="noopener noreferrer">
                                {isRu ? "Купить" : "Buy"}
                                <ExternalLink className="ml-2 h-3 w-3" />
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* View All Button */}
              <div className="flex justify-center pt-8">
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