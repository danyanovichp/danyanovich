import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageCircle, Target, Users, Zap } from "lucide-react";
import SEO, { getServiceSchema, getBreadcrumbSchema } from "@/components/SEO";

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

  const isRu = i18n.language === 'ru';
  const serviceSchema = getServiceSchema(isRu);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isRu ? 'Главная' : 'Home', url: 'https://danyanovich.com' },
    { name: isRu ? 'Консалтинг' : 'Consulting', url: 'https://danyanovich.com/consulting' },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        titleRu="Консалтинг | Дэн Янович"
        titleEn="Consulting | Dan Yanovich"
        descriptionRu="Персональные консультации по Notion и AI-инструментам. Стратегия, обучение и автоматизация бизнес-процессов."
        descriptionEn="Personal Notion and AI consulting. Strategy, training, and business process automation."
        url="https://danyanovich.com/consulting"
        structuredData={[serviceSchema, breadcrumbSchema]}
      />
      {/* Hero Section with "In Development" Banner */}
      <section className="bg-pastel-yellow py-16 md:py-20 border-b-2 border-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* In Development Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] rounded-none text-base font-bold uppercase tracking-wider">
              <span>🚧</span>
              <span>{t('common.inDevelopment')}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold">{t('consulting.title')}</h1>
            <p className="text-base md:text-lg text-muted-foreground">{t('consulting.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="text-2xl md:text-3xl text-center mb-12 font-bold">
            {i18n.language === 'ru' ? 'Консалтинговые услуги' : 'Consulting Services'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {services.map((service, index) => (
              <Card key={index} className="text-center">
                <CardHeader className="space-y-4">
                  <div className="inline-flex p-4 bg-primary text-primary-foreground border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] rounded-none mx-auto">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold">{service.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <p className="text-base text-muted-foreground">
              {i18n.language === 'ru'
                ? 'Заинтересованы в консалтинговых услугах? Свяжитесь со мной для обсуждения вашего проекта.'
                : 'Interested in consulting services? Contact me to discuss your project.'}
            </p>
            <Button size="lg" asChild>
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
