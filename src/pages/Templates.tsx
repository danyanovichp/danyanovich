import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Briefcase, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import PixelDecorations from "@/components/pixel-art/PixelDecorations";

const Templates = () => {
  const { t, i18n } = useTranslation();

  const freeTemplates = [
    {
      icon: User,
      title: i18n.language === 'ru' ? "Личное" : "Personal",
      description: i18n.language === 'ru' 
        ? "Шаблоны для личной продуктивности, целей и самоорганизации"
        : "Templates for personal productivity, goals and self-organization",
      count: i18n.language === 'ru' ? "1 шаблон" : "1 template",
    },
  ];

  const premiumTemplates = [
    {
      icon: Briefcase,
      title: i18n.language === 'ru' ? "Бизнес" : "Business",
      description: i18n.language === 'ru' 
        ? "Профессиональные решения для команд и бизнес-процессов"
        : "Professional solutions for teams and business processes",
      count: i18n.language === 'ru' ? "Скоро" : "Coming Soon",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen relative">
      <PixelDecorations />
      
      {/* Hero Section */}
      <section className="bg-secondary py-16 md:py-20 border-b-4 border-border relative">
        <div className="container">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-2xl md:text-3xl">{t('templates.title')}</h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              {t('templates.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* FREE Templates Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* FREE Header */}
            <div className="flex items-center gap-4">
              <Badge className="pixel-border px-4 py-2 bg-green-600 text-white font-bold uppercase text-sm">
                {i18n.language === 'ru' ? '🎁 Бесплатно' : '🎁 Free'}
              </Badge>
              <div className="flex-1 h-1 bg-border" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {freeTemplates.map((template, index) => (
                <Card
                  key={index}
                  className="pixel-border pixel-border-hover"
                >
                  <CardHeader className="space-y-4">
                    <div className="inline-flex p-3 pixel-border bg-primary w-fit">
                      <template.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-base font-bold">{template.title}</h3>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-muted-foreground">
                      {template.description}
                    </p>
                    <p className="text-xs font-bold">{template.count}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM Templates Section */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* PREMIUM Header */}
            <div className="flex items-center gap-4">
              <Badge className="pixel-border px-4 py-2 bg-brand-amber text-background font-bold uppercase text-sm animate-pixel-pulse">
                <Sparkles className="mr-1 h-3 w-3 inline" />
                {i18n.language === 'ru' ? 'Премиум' : 'Premium'}
              </Badge>
              <div className="flex-1 h-1 bg-border" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {premiumTemplates.map((template, index) => (
                <Card
                  key={index}
                  className="pixel-border pixel-border-hover bg-background"
                >
                  <CardHeader className="space-y-4">
                    <div className="inline-flex p-3 pixel-border bg-brand-amber w-fit">
                      <template.icon className="h-6 w-6 text-background" />
                    </div>
                    <h3 className="text-base font-bold">{template.title}</h3>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-muted-foreground">
                      {template.description}
                    </p>
                    <p className="text-xs font-bold text-brand-amber">{template.count}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Templates;
