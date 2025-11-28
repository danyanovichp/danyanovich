import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const Packages = () => {
  const packages = [
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
  ];

  const additionalServices = [
    {
      title: "Индивидуальное обучение",
      description: "Персональные занятия по Notion",
      price: "5 000 ₽/час",
    },
    {
      title: "Доработка шаблона",
      description: "Модификация существующих решений",
      price: "от 10 000 ₽",
    },
    {
      title: "AI-автоматизация",
      description: "Интеграция AI-инструментов",
      price: "от 20 000 ₽",
    },
    {
      title: "Техническая поддержка",
      description: "Ежемесячная поддержка и консультации",
      price: "от 15 000 ₽/мес",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/20 to-background py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Пакеты Услуг
            </h1>
            <p className="text-xl text-muted-foreground">
              Выберите подходящий пакет или создайте индивидуальное предложение
            </p>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative ${
                  pkg.popular
                    ? "border-primary shadow-lg scale-105 md:scale-110"
                    : ""
                }`}
              >
                {pkg.popular && (
                  <Badge
                    className="absolute -top-3 left-1/2 -translate-x-1/2"
                    variant="default"
                  >
                    Популярный
                  </Badge>
                )}
                <CardHeader className="text-center pb-8">
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-gradient-brand mb-2">
                    {pkg.price}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {pkg.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
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
                    <a href="/contact">Выбрать пакет</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">
            Дополнительные Услуги
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Расширьте возможности вашего пакета дополнительными опциями
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {additionalServices.map((service, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                    <Badge variant="secondary" className="ml-4">
                      {service.price}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Как мы работаем
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  title: "Консультация",
                  description: "Обсуждаем ваши задачи и выбираем решение",
                },
                {
                  step: "2",
                  title: "Разработка",
                  description: "Создаем и настраиваем систему под ваши нужды",
                },
                {
                  step: "3",
                  title: "Обучение",
                  description: "Показываем как работать с новой системой",
                },
                {
                  step: "4",
                  title: "Поддержка",
                  description: "Помогаем в процессе использования",
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Не нашли подходящий пакет?
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Я могу создать индивидуальное предложение специально для ваших задач и
              бюджета
            </p>
            <Button size="lg" variant="secondary" className="shadow-accent" asChild>
              <a href="/contact">Обсудить индивидуальное решение</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;
