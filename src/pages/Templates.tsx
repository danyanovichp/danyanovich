import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { premiumTemplates } from "@/data/premiumTemplates";
import { useProducts } from "@/hooks/useProducts";
import TemplateFilters, { TemplateCategory, TemplateStatus, SortOption } from "@/components/TemplateFilters";
import SEO, { getTemplatesSchema, getBreadcrumbSchema } from "@/components/SEO";

const Templates = () => {
  const { i18n } = useTranslation();
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('all');
  const [selectedStatus, setSelectedStatus] = useState<TemplateStatus>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');

  const mergedTemplates = useMemo(() => {
    const productMap = new Map(products.map(p => [p.id, p]));

    return premiumTemplates.map(template => {
      const dbProduct = productMap.get(template.id);
      if (dbProduct) {
        return {
          ...template,
          titleRu: dbProduct.title_ru || template.titleRu,
          titleEn: dbProduct.title_en || template.titleEn,
          descriptionRu: dbProduct.description_ru || template.descriptionRu,
          descriptionEn: dbProduct.description_en || template.descriptionEn,
          price: dbProduct.price || template.price,
          priceValue: dbProduct.price_value ?? template.priceValue,
          status: (dbProduct.status as 'available' | 'development') || template.status,
          category: (dbProduct.category as TemplateCategory) || template.category,
          popularity: dbProduct.popularity ?? template.popularity,
          image: dbProduct.image || template.image,
          link: dbProduct.link || template.link,
        };
      }
      return template;
    });
  }, [products]);

  const filteredTemplates = useMemo(() => {
    let filtered = mergedTemplates.filter(template => {
      const title = i18n.language === 'ru' ? template.titleRu : template.titleEn;
      const description = i18n.language === 'ru' ? template.descriptionRu : template.descriptionEn;
      const matchesSearch = searchQuery === '' ||
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' ||
        (selectedStatus === 'available' && template.status === 'available') ||
        (selectedStatus === 'development' && template.status === 'development');
      return matchesSearch && matchesCategory && matchesStatus;
    });

    switch (sortBy) {
      case 'popularity':
        filtered = [...filtered].sort((a, b) => b.popularity - a.popularity);
        break;
      case 'price-asc':
        filtered = [...filtered].sort((a, b) => a.priceValue - b.priceValue);
        break;
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => b.priceValue - a.priceValue);
        break;
      case 'date-newest':
        filtered = [...filtered].sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
        break;
      case 'date-oldest':
        filtered = [...filtered].sort((a, b) => new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime());
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedStatus, sortBy, i18n.language, mergedTemplates]);

  const isRu = i18n.language === 'ru';
  const templatesSchema = getTemplatesSchema(isRu);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isRu ? 'Главная' : 'Home', url: 'https://danyanovich.com' },
    { name: isRu ? 'Шаблоны' : 'Templates', url: 'https://danyanovich.com/templates' },
  ]);

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <SEO
          titleRu="Шаблоны Notion | Дэн Янович"
          titleEn="Notion Templates | Dan Yanovich"
          descriptionRu="Готовые системы в Notion для бизнеса и жизни. Шаблоны с базами данных, автоматизациями и визуализациями."
          descriptionEn="Ready-made Notion systems for business and life. Templates with databases, automations, and visualizations."
          url="https://danyanovich.com/templates"
          structuredData={[templatesSchema, breadcrumbSchema]}
        />
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-10">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {isRu ? 'Шаблоны Notion' : 'Notion Templates'}
            </h1>
            <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {isRu
                ? 'Готовые системы в Notion для бизнеса и жизни. Каждый шаблон — это продуманная структура с базами данных, автоматизациями и визуализациями.'
                : 'Ready-made Notion systems for business and life. Each template is a thoughtful structure with databases, automations, and visualizations.'}
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <TemplateFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
        </div>
      </section>

      {/* Notion Templates — Available */}
      {filteredTemplates.filter(t => t.status === 'available').length > 0 && (
        <section className="relative py-12 md:py-16 overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="flex items-center gap-4">
                <Badge variant="lime" className="px-4 py-1.5 text-sm">
                  Notion
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {isRu ? 'В продаже' : 'Available'}
                </Badge>
                <div className="flex-1 h-px bg-border/10" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.filter(t => t.status === 'available').map((template, index) => {
                  const title = isRu ? template.titleRu : template.titleEn;
                  const description = isRu ? template.descriptionRu : template.descriptionEn;
                  return (
                    <Link to={`/templates/${template.id}`} key={index}>
                      <Card className="cursor-pointer group h-full">
                        <div className="relative border-b-2 border-foreground">
                          <div className="py-4 bg-muted/30 flex items-center justify-center group-hover:bg-pastel-yellow transition-colors">
                            <template.icon className="h-10 w-10 text-foreground" />
                          </div>
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-primary text-primary-foreground border-2 border-foreground shadow-[2px_2px_0px_0px_currentColor] text-sm rounded-none px-3 py-1 font-bold">
                              {template.price}
                            </Badge>
                          </div>
                        </div>
                        <CardHeader className="space-y-2 pb-2">
                          <h3 className="text-base font-bold">{title}</h3>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* In Development Templates */}
      {filteredTemplates.filter(t => t.status === 'development').length > 0 && (
        <section className="relative py-12 md:py-16 overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-5xl mx-auto space-y-8">
              <div className="flex items-center gap-4">
                <Badge variant="lime" className="px-4 py-1.5 text-sm">
                  Notion
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {isRu ? 'В разработке' : 'In Development'}
                </Badge>
                <div className="flex-1 h-px bg-border/10" />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.filter(t => t.status === 'development').map((template, index) => {
                  const title = isRu ? template.titleRu : template.titleEn;
                  const description = isRu ? template.descriptionRu : template.descriptionEn;
                  return (
                    <Link to={`/templates/${template.id}`} key={index}>
                      <Card className="cursor-pointer group h-full opacity-60">
                        <div className="relative overflow-hidden border-b-2 border-foreground">
                          <div className="py-4 bg-muted/30 flex items-center justify-center group-hover:bg-muted/50 transition-colors">
                            <template.icon className="h-10 w-10 text-muted-foreground/40" />
                          </div>
                          <div className="absolute top-3 right-3">
                            <Badge variant="outline" className="text-xs bg-card border-2 border-foreground shadow-[2px_2px_0px_0px_currentColor] rounded-none font-bold">
                              {template.price}
                            </Badge>
                          </div>
                        </div>
                        <CardHeader className="space-y-2 pb-2">
                          <h3 className="text-base font-bold">{title}</h3>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* No Results */}
      {filteredTemplates.length === 0 && (
        <section className="py-16">
          <div className="container">
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                {isRu ? 'Шаблоны не найдены. Попробуйте изменить фильтры.' : 'No templates found. Try changing filters.'}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Templates;
