import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import DecorativeBlobs from "@/components/DecorativeBlobs";

const Home = () => {
  const { i18n } = useTranslation();
  const isRu = i18n.language === 'ru';
  const { settings } = useSiteSettings();

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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight font-display">
              {isRu ? settings.hero.title_ru : settings.hero.title_en}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              {isRu ? settings.hero.subtitle_ru : settings.hero.subtitle_en}
            </p>
            <p className="text-base text-muted-foreground/80 max-w-xl mx-auto">
              {isRu ? settings.hero.description_ru : settings.hero.description_en}
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button asChild size="lg" className="px-8 py-3 text-base">
                <Link to="/templates">
                  {isRu ? "Шаблоны Notion" : "Notion Templates"}
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
                    <MessageSquare className="h-6 w-6 text-foreground" />
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
