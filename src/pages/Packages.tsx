import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Packages = () => {
  const { t, i18n } = useTranslation();

  const packages = i18n.language === 'ru' ? [
    {
      name: "Стартовый",
      price: "от 15 000 ₽",
      description: "Идеально для начинающих и малого бизнеса",
      features: [
        "Консультация 1 час",
        "1 готовый шаблон",
        "Базовая настройка",
        "Инструкция по использованию",
        "Поддержка 1 неделя",
      ],
      popular: false,
    },
    {
      name: "Профессиональный",
      price: "от 35 000 ₽",
      description: "Для команд и растущего бизнеса",
      features: [
        "Консультация 3 часа",
        "3 кастомных шаблона",
        "Полная настройка под задачи",
        "Обучение команды (до 5 человек)",
        "Интеграции с сервисами",
        "Поддержка 1 месяц",
        "Видео-инструкции",
      ],
      popular: true,
    },
    {
      name: "Корпоративный",
      price: "от 75 000 ₽",
      description: "Комплексное решение для крупных компаний",
      features: [
        "Неограниченные консультации",
        "Индивидуальное рабочее пространство",
        "Автоматизация процессов",
        "Обучение всей команды",
        "Интеграции и API",
        "Постоянная поддержка",
        "Обновления и доработки",
        "Миграция данных",
      ],
      popular: false,
    },
  ] : [
    {
      name: "Starter",
      price: "from $200",
      description: "Perfect for beginners and small businesses",
      features: [
        "1 hour consultation",
        "1 ready template",
        "Basic setup",
        "Usage instructions",
        "1 week support",
      ],
      popular: false,
    },
    {
      name: "Professional",
      price: "from $450",
      description: "For teams and growing businesses",
      features: [
        "3 hours consultation",
        "3 custom templates",
        "Full task customization",
        "Team training (up to 5 people)",
        "Service integrations",
        "1 month support",
        "Video tutorials",
      ],
      popular: true,
    },
    {
      name: "Corporate",
      price: "from $950",
      description: "Comprehensive solution for large companies",
      features: [
        "Unlimited consultations",
        "Individual workspace",
        "Process automation",
        "Full team training",
        "Integrations and API",
        "Continuous support",
        "Updates and improvements",
        "Data migration",
      ],
      popular: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section with "In Development" Banner */}
      <section className="bg-muted/30 py-16 md:py-20 border-b">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* In Development Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md text-base font-medium">
              <span>🚧</span>
              <span>{t('common.inDevelopment')}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold">{t('packages.title')}</h1>
            <p className="text-base md:text-lg text-muted-foreground">{t('packages.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative ${
                  pkg.popular ? "ring-2 ring-primary" : ""
                }`}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 text-sm bg-primary text-primary-foreground">
                    {i18n.language === 'ru' ? 'Популярно' : 'Popular'}
                  </Badge>
                )}
                <CardHeader className="space-y-4 text-center">
                  <h3 className="text-xl font-bold">{pkg.name}</h3>
                  <div className="text-3xl font-bold">{pkg.price}</div>
                  <p className="text-sm text-muted-foreground">
                    {pkg.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-3 text-sm"
                      >
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={pkg.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link to="/contact">
                      {i18n.language === 'ru' ? 'Выбрать пакет' : 'Choose Package'}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;
