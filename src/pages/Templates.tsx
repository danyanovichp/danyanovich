import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User, Briefcase } from "lucide-react";
import { useTranslation } from "react-i18next";

const Templates = () => {
  const { t, i18n } = useTranslation();

  const templateCategories = [
    {
      icon: User,
      title: i18n.language === 'ru' ? "Личное" : "Personal",
      description: i18n.language === 'ru' 
        ? "Шаблоны для личной продуктивности, целей и самоорганизации"
        : "Templates for personal productivity, goals and self-organization",
      count: i18n.language === 'ru' ? "1 шаблон" : "1 template",
      category: "personal",
    },
    {
      icon: Briefcase,
      title: i18n.language === 'ru' ? "Бизнес" : "Business",
      description: i18n.language === 'ru' 
        ? "Профессиональные решения для команд и бизнес-процессов"
        : "Professional solutions for teams and business processes",
      count: i18n.language === 'ru' ? "0 шаблонов" : "0 templates",
      category: "business",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-secondary py-16 md:py-20 border-b-4 border-border">
        <div className="container">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-2xl md:text-3xl">{t('templates.title')}</h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              {t('templates.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Templates Categories */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {templateCategories.map((category, index) => (
              <Card
                key={index}
                className="pixel-border pixel-border-hover"
              >
                <CardHeader className="space-y-4">
                  <div className="inline-flex p-3 pixel-border bg-primary w-fit">
                    <category.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-base font-bold">{category.title}</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    {category.description}
                  </p>
                  <p className="text-xs font-bold">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Templates;
