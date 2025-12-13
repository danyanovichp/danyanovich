import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Check, ShoppingCart, Sparkles, ExternalLink, ImageIcon } from "lucide-react";
import { premiumTemplates } from "@/data/premiumTemplates";

const TemplateLanding = () => {
  const { templateId } = useParams();
  const { i18n } = useTranslation();
  
  const template = premiumTemplates.find(t => t.id === templateId);
  
  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">
            {i18n.language === 'ru' ? 'Шаблон не найден' : 'Template not found'}
          </h1>
          <Link to="/templates">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {i18n.language === 'ru' ? 'Вернуться к шаблонам' : 'Back to templates'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const title = i18n.language === 'ru' ? template.titleRu : template.titleEn;
  const description = i18n.language === 'ru' ? template.descriptionRu : template.descriptionEn;
  const fullDescription = i18n.language === 'ru' ? template.fullDescriptionRu : template.fullDescriptionEn;
  const features = i18n.language === 'ru' ? template.featuresRu : template.featuresEn;
  const isAvailable = template.status === 'available';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted/30 backdrop-blur-sm py-12 md:py-20 border-b border-border/20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Link to="/templates" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {i18n.language === 'ru' ? 'Все шаблоны' : 'All templates'}
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge className="px-4 py-2 bg-foreground/90 backdrop-blur-sm text-background text-sm font-medium rounded-full">
                    📝 Notion
                  </Badge>
                  {isAvailable ? (
                    <Badge className="px-4 py-2 bg-green-500/90 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                      ✓ {i18n.language === 'ru' ? 'Доступен' : 'Available'}
                    </Badge>
                  ) : (
                    <Badge className="px-4 py-2 bg-amber-500/90 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                      🚧 {i18n.language === 'ru' ? 'В разработке' : 'In Development'}
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-4">
                  <h1 className="text-3xl md:text-5xl font-bold">{title}</h1>
                  <p className="text-lg md:text-xl text-muted-foreground">{description}</p>
                </div>
                
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="text-3xl md:text-4xl font-bold text-primary">{template.price}</div>
                  {isAvailable ? (
                    <a href={template.link} target="_blank" rel="noopener noreferrer">
                      <Button size="lg" className="gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        {i18n.language === 'ru' ? 'Купить шаблон' : 'Buy Template'}
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  ) : (
                    <Button size="lg" disabled className="gap-2">
                      <Sparkles className="h-5 w-5" />
                      {i18n.language === 'ru' ? 'Скоро в продаже' : 'Coming Soon'}
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="w-full md:w-80 shrink-0">
                <div className="inline-flex p-6 bg-primary/10 backdrop-blur-sm rounded-2xl">
                  <template.icon className="h-24 w-24 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Screenshot Section */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden border-dashed border-2 border-border/40">
              <CardContent className="p-0">
                {template.image ? (
                  <img 
                    src={template.image} 
                    alt={title}
                    className="w-full aspect-video object-cover"
                  />
                ) : (
                  <div className="aspect-video bg-muted/50 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <ImageIcon className="h-16 w-16 text-muted-foreground/50 mx-auto" />
                      <p className="text-muted-foreground">
                        {i18n.language === 'ru' ? 'Скриншот шаблона' : 'Template screenshot'}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-12 md:py-16 bg-muted/30 backdrop-blur-sm">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">
                {i18n.language === 'ru' ? 'Описание' : 'Description'}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {fullDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold">
                {i18n.language === 'ru' ? 'Возможности' : 'Features'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="h-full">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot Gallery Section */}
      <section className="py-12 md:py-20 bg-muted/30 backdrop-blur-sm">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold">
                {i18n.language === 'ru' ? 'Скриншоты' : 'Screenshots'}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((_, index) => (
                <Card key={index} className="overflow-hidden border-dashed border-2 border-border/40">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-muted/50 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <ImageIcon className="h-10 w-10 text-muted-foreground/50 mx-auto" />
                        <p className="text-sm text-muted-foreground">
                          {i18n.language === 'ru' ? `Скриншот ${index + 1}` : `Screenshot ${index + 1}`}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              {i18n.language === 'ru' ? 'Готовы начать?' : 'Ready to start?'}
            </h2>
            <p className="text-lg text-muted-foreground">
              {i18n.language === 'ru' 
                ? 'Получите этот шаблон и начните организовывать свою жизнь уже сегодня.'
                : 'Get this template and start organizing your life today.'}
            </p>
            
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="text-3xl font-bold text-primary">{template.price}</div>
              {isAvailable ? (
                <a href={template.link} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    {i18n.language === 'ru' ? 'Купить шаблон' : 'Buy Template'}
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              ) : (
                <Button size="lg" disabled className="gap-2">
                  <Sparkles className="h-5 w-5" />
                  {i18n.language === 'ru' ? 'Скоро в продаже' : 'Coming Soon'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TemplateLanding;
