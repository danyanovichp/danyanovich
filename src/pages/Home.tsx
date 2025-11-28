import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Target, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  const stats = [
    { value: "50+", label: t('home.stats.projects') },
    { value: "100+", label: t('home.stats.hours') },
    { value: "+30%", label: t('home.stats.efficiency') },
  ];

  const expertise = [
    {
      icon: Target,
      title: t('home.expertise.notion.title'),
      description: t('home.expertise.notion.description'),
      link: "/portfolio",
    },
    {
      icon: Sparkles,
      title: t('home.expertise.ai.title'),
      description: t('home.expertise.ai.description'),
      link: "/ai-prompts",
    },
  ];

  const process = [
    {
      number: "01",
      title: t('home.workflow.step1.title'),
      description: t('home.workflow.step1.description'),
    },
    {
      number: "02",
      title: t('home.workflow.step2.title'),
      description: t('home.workflow.step2.description'),
    },
    {
      number: "03",
      title: t('home.workflow.step3.title'),
      description: t('home.workflow.step3.description'),
    },
    {
      number: "04",
      title: t('home.workflow.step4.title'),
      description: t('home.workflow.step4.description'),
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary text-primary-foreground py-16 md:py-24 border-b-4 border-border">
        <div className="container">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-2xl md:text-4xl">
              {t('home.hero.title')}
            </h1>
            <p className="text-sm md:text-base opacity-90">
              {t('home.hero.subtitle')}
            </p>
            <p className="text-xs md:text-sm opacity-80 max-w-2xl">
              {t('home.hero.description')}
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/portfolio">
                  {t('home.hero.ctaPortfolio')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">{t('home.hero.ctaContact')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-secondary">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="pixel-border p-6 bg-background text-center"
              >
                <div className="text-2xl md:text-3xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-xl md:text-2xl">{t('home.mission.title')}</h2>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              {t('home.mission.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container">
          <h2 className="text-xl md:text-2xl text-center mb-12">
            {t('home.expertise.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {expertise.map((item, index) => (
              <Card
                key={index}
                className="pixel-border pixel-border-hover group"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex p-3 pixel-border bg-primary">
                    <item.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-base font-bold">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                  <Button
                    variant="ghost"
                    className="p-0 text-xs"
                    asChild
                  >
                    <Link to={item.link}>
                      {t('common.learnMore')}
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="text-xl md:text-2xl text-center mb-4">
            {t('home.workflow.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-12">
            {process.map((step, index) => (
              <div
                key={index}
                className="pixel-border p-6 bg-background space-y-3"
              >
                <div className="text-4xl font-bold opacity-20">
                  {step.number}
                </div>
                <h3 className="text-sm font-bold">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
