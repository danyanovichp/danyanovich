import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PixelCharacter from "@/components/pixel-art/PixelCharacter";
import PixelIcon from "@/components/pixel-art/PixelIcons";
import PixelDecorations from "@/components/pixel-art/PixelDecorations";
import PageTransition from "@/components/PageTransition";

const Home = () => {
  const { t } = useTranslation();

  const stats = [
    { value: "50+", label: t('home.stats.projects') },
    { value: "100+", label: t('home.stats.hours') },
    { value: "+30%", label: t('home.stats.efficiency') },
  ];

  const expertise = [
    {
      icon: 'notion' as const,
      title: t('home.expertise.notion.title'),
      description: t('home.expertise.notion.description'),
      link: "/templates"
    }
  ];

  const process = [
    {
      step: "01",
      title: t('home.workflow.step1.title'),
      description: t('home.workflow.step1.description')
    },
    {
      step: "02",
      title: t('home.workflow.step2.title'),
      description: t('home.workflow.step2.description')
    },
    {
      step: "03",
      title: t('home.workflow.step3.title'),
      description: t('home.workflow.step3.description')
    },
    {
      step: "04",
      title: t('home.workflow.step4.title'),
      description: t('home.workflow.step4.description')
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen relative">
        <PixelDecorations />
        
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-20 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight hover:animate-glitch cursor-default">
                {t('home.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                {t('home.hero.subtitle')}
              </p>
              <p className="text-sm md:text-base">
                {t('home.hero.description')}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to="/templates">
                    {t('common.viewTemplates')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">{t('home.hero.ctaContact')}</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-center items-center">
              <PixelCharacter />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-muted/50 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="p-6 text-center pixel-border hover:translate-y-[-4px] transition-transform">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2 animate-pixel-pulse">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase">
                    {stat.label}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold">{t('home.mission.title')}</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {t('home.mission.description')}
            </p>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="bg-muted/50 py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
              {t('home.expertise.title')}
            </h2>
            <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">
              {expertise.map((item, index) => (
                <Card key={index} className="p-8 pixel-border hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all group">
                  <div className="w-16 h-16 mb-4 group-hover:animate-pixel-bounce">
                    <PixelIcon type={item.icon} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground mb-6">{item.description}</p>
                  <Button asChild variant="outline">
                    <Link to={item.link}>
                      {t('common.viewTemplates')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 space-y-2">
              <h2 className="text-2xl md:text-4xl font-bold">
                {t('home.workflow.title')}
              </h2>
              <p className="text-xs text-muted-foreground uppercase pixel-border inline-block px-3 py-1 bg-brand-amber text-background">
                ({t('common.inDevelopment')})
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((item, index) => (
                <Card key={index} className="p-6 pixel-border hover:translate-y-[-4px] transition-transform">
                  <div className="text-4xl font-bold text-primary mb-4 animate-pixel-pulse">{item.step}</div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;
