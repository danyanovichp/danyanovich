import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
      icon: FileText,
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
      <div className="min-h-screen">
        
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
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
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">{t('home.hero.ctaContact')}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-muted/30 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <Card key={index} className="p-8 text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </Card>
              ))}
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

        {/* Expertise Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
              {t('home.expertise.title')}
            </h2>
            <div className="max-w-2xl mx-auto">
              {expertise.map((item, index) => (
                <Card key={index} className="p-8 md:p-12">
                  <div className="flex items-start gap-6">
                    <div className="p-4 bg-primary text-primary-foreground rounded-lg">
                      <item.icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1 space-y-4">
                      <h3 className="text-2xl font-bold">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                      <Button asChild variant="outline">
                        <Link to={item.link}>
                          {t('common.viewTemplates')}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold">
                {t('home.workflow.title')}
              </h2>
              <p className="text-sm text-muted-foreground border inline-block px-4 py-2 rounded-md">
                ({t('common.inDevelopment')})
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((item, index) => (
                <Card key={index} className="p-6">
                  <div className="text-5xl font-bold mb-4">{item.step}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
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
