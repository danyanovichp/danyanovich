import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PageTransition from "@/components/PageTransition";

const Home = () => {
  const { t } = useTranslation();


  return (
    <PageTransition>
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

        {/* Mission Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold">{t('home.mission.title')}</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t('home.mission.description')}
            </p>
          </div>
        </section>

      </div>
    </PageTransition>
  );
};

export default Home;
