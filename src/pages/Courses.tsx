import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Users, CheckCircle } from "lucide-react";

const Courses = () => {
  const courseFeatures = [
    {
      icon: BookOpen,
      title: "Практический подход",
      description: "Все материалы основаны на реальных кейсах и проектах",
    },
    {
      icon: Clock,
      title: "В вашем темпе",
      description: "Учитесь когда удобно, доступ к материалам навсегда",
    },
    {
      icon: Users,
      title: "Поддержка",
      description: "Консультации и помощь в процессе обучения",
    },
  ];

  const benefits = [
    "Научитесь создавать эффективные системы в Notion",
    "Освоите автоматизацию рабочих процессов",
    "Получите готовые шаблоны для работы",
    "Сможете внедрять Notion в команде",
    "Узнаете лучшие практики организации данных",
    "Получите сертификат о прохождении курса",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent/20 via-accent/10 to-background py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Курсы и Обучение</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Комплексные программы обучения по Notion и AI-инструментам
            </p>
            <Button size="lg" asChild>
              <a href="/contact">Записаться на курс</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Что вы получите
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {courseFeatures.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 inline-flex p-3 rounded-lg bg-primary/10">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              Программа обучения
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              Структурированный подход от основ до продвинутых техник
            </p>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-2xl font-bold">Модуль 1: Основы Notion</h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Интерфейс и навигация</li>
                    <li>• Базовые блоки и их использование</li>
                    <li>• Создание первых страниц</li>
                    <li>• Организация рабочего пространства</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-2xl font-bold">Модуль 2: Базы данных</h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Создание и настройка баз данных</li>
                    <li>• Свойства и формулы</li>
                    <li>• Представления и фильтры</li>
                    <li>• Связанные базы данных</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-2xl font-bold">Модуль 3: Автоматизация</h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Интеграции с другими сервисами</li>
                    <li>• Автоматизация с помощью формул</li>
                    <li>• Шаблоны и их использование</li>
                    <li>• AI-возможности в Notion</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-2xl font-bold">
                    Модуль 4: Практические кейсы
                  </h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Система управления проектами</li>
                    <li>• CRM для малого бизнеса</li>
                    <li>• База знаний компании</li>
                    <li>• Личная система продуктивности</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Результаты обучения
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <p className="text-muted-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-gradient-brand mb-2">
                100+
              </div>
              <div className="text-muted-foreground">Часов обучения проведено</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient-brand mb-2">
                50+
              </div>
              <div className="text-muted-foreground">Выпускников курсов</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gradient-brand mb-2">
                4.9
              </div>
              <div className="text-muted-foreground">Средний рейтинг</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <Card className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Готовы начать обучение?
              </h2>
              <p className="text-muted-foreground mb-8">
                Свяжитесь со мной, чтобы узнать подробности о ближайших курсах и
                выбрать подходящую программу
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="/contact">Записаться</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/portfolio">Посмотреть примеры работ</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Courses;
