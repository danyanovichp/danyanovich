import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageCircle, Target, Users, Zap } from "lucide-react";
import PixelDecorations from "@/components/pixel-art/PixelDecorations";

const Consulting = () => {
  const { t, i18n } = useTranslation();

  const services = i18n.language === 'ru' ? [
    {
      icon: Target,
      title: "Стратегия",
      description: "Разработка стратегии оптимизации рабочих процессов",
    },
    {
      icon: Users,
      title: "Обучение",
      description: "Персональное обучение команд работе с Notion и AI",
    },
    {
      icon: Zap,
      title: "Автоматизация",
      description: "Внедрение автоматизации для повышения эффективности",
    },
  ] : [
    {
      icon: Target,
      title: "Strategy",
      description: "Developing workflow optimization strategy",
    },
    {
      icon: Users,
      title: "Training",
      description: "Personal team training on Notion and AI",
    },
    {
      icon: Zap,
      title: "Automation",
      description: "Implementing automation for efficiency gains",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen relative">
      <PixelDecorations />

      {/* Hero Section with "In Development" Banner */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20 border-b-4 border-border relative">
        <div className="container">
          <div className="max-w-3xl space-y-6">
            {/* In Development Badge */}
            <div className="inline-flex items-center gap-2 pixel-border px-4 py-2 bg-brand-amber text-background font-bold text-xs uppercase animate-pixel-pulse">
              <span>🚧</span>
              <span>{t('common.inDevelopment')}</span>
            </div>

            <h1 className="text-2xl md:text-3xl">{t('consulting.title')}</h1>
            <p className="text-xs md:text-sm opacity-90">
              {t('consulting.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="text-xl md:text-2xl text-center mb-12">
            {i18n.language === 'ru' ? 'Консалтинговые услуги' : 'Consulting Services'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {services.map((service, index) => (
              <Card
                key={index}
                className="pixel-border text-center"
              >
                <CardHeader className="space-y-4">
                  <div className="inline-flex p-3 pixel-border bg-primary mx-auto">
                    <service.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-base font-bold">{service.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <p className="text-sm text-muted-foreground">
              {i18n.language === 'ru' 
                ? 'Заинтересованы в консалтинговых услугах? Свяжитесь со мной для обсуждения вашего проекта.'
                : 'Interested in consulting services? Contact me to discuss your project.'}
            </p>
            <Button size="lg" asChild className="animate-pixel-bounce">
              <a
                href="https://t.me/danyanovich"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {i18n.language === 'ru' ? 'Связаться в Telegram' : 'Contact on Telegram'}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consulting;
