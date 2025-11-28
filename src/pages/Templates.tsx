import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, User, Briefcase } from "lucide-react";

const Templates = () => {
  const templateCategories = [
    {
      icon: User,
      title: "Личное",
      description: "Шаблоны для личной продуктивности, целей и самоорганизации",
      count: "1 шаблон",
      category: "personal",
    },
    {
      icon: Briefcase,
      title: "Бизнес",
      description: "Профессиональные решения для команд и бизнес-процессов",
      count: "0 шаблонов",
      category: "business",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/20 to-background py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Готовые Шаблоны
            </h1>
            <p className="text-xl text-muted-foreground">
              Профессиональные решения, которые вы можете приобрести и настроить под
              свои задачи
            </p>
          </div>
        </div>
      </section>

      {/* Templates Categories */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {templateCategories.map((category, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 w-fit">
                    <category.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold">{category.title}</h3>
                    <Badge variant="secondary">{category.count}</Badge>
                  </div>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardHeader>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="group/button w-full"
                    asChild
                  >
                    <a href={`/templates?category=${category.category}`}>
                      Смотреть шаблоны
                      <ExternalLink className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Почему выбирают мои шаблоны
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Готовы к использованию</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Все шаблоны протестированы и готовы к использованию сразу после
                  покупки
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">Легко настраиваются</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Гибкая структура позволяет адаптировать шаблоны под ваши
                  специфические задачи
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-xl font-bold">С поддержкой</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Включают подробные инструкции и видео-гайды по использованию
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Нужен индивидуальный шаблон?
            </h2>
            <p className="text-muted-foreground mb-8">
              Если готовые шаблоны не подходят, я могу создать уникальное решение
              специально для вас
            </p>
            <Button size="lg" asChild>
              <a href="/contact">Заказать индивидуальный шаблон</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Templates;
