import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Brain, Zap, Target } from "lucide-react";

const AIPrompts = () => {
  const features = [
    {
      icon: Brain,
      title: "Интеллектуальные промпты",
      description:
        "Коллекция тщательно проработанных промптов для различных AI-моделей",
    },
    {
      icon: Zap,
      title: "Быстрая автоматизация",
      description:
        "Ускорьте рабочие процессы с помощью готовых AI-решений",
    },
    {
      icon: Target,
      title: "Точные результаты",
      description:
        "Получайте качественные ответы от AI благодаря оптимизированным промптам",
    },
  ];

  const categories = [
    {
      title: "Бизнес и маркетинг",
      description: "Промпты для создания контента, стратегий и анализа",
      count: "12+ промптов",
    },
    {
      title: "Разработка",
      description: "Помощь в написании кода и решении технических задач",
      count: "15+ промптов",
    },
    {
      title: "Креатив",
      description: "Генерация идей, сценариев и креативного контента",
      count: "10+ промптов",
    },
    {
      title: "Анализ данных",
      description: "Обработка и интерпретация данных с помощью AI",
      count: "8+ промптов",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-accent/90 to-accent/80 text-accent-foreground py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="container relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-foreground/10 mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">AI Промпты</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Коллекция промптов для работы с искусственным интеллектом
            </h1>
            <p className="text-xl mb-8 text-accent-foreground/90">
              Простой и эффективный способ работы с искусственным интеллектом
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="shadow-lg"
              >
                Начать
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-accent-foreground/10 border-accent-foreground/20 hover:bg-accent-foreground/20"
              >
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Создавайте с AI
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 inline-flex p-3 rounded-lg bg-accent/10">
                    <feature.icon className="h-8 w-8 text-accent" />
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

      {/* Categories Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Категории промптов
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Выберите категорию, которая соответствует вашим задачам
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <span className="text-sm font-medium text-accent">
                      {category.count}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              О Дэн Янович AI
            </h2>
            <Card>
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Я создаю инновационные AI решения для бизнеса. Моя миссия - сделать
                  искусственный интеллект доступным и простым в использовании. С опытом
                  работы с различными AI-моделями, я помогаю компаниям и частным лицам
                  эффективно использовать современные технологии для решения их задач.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Начните использовать AI эффективно
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Свяжитесь со мной, чтобы узнать больше о промптах и AI-решениях для
              вашего бизнеса.
            </p>
            <Button size="lg" variant="secondary" className="shadow-accent" asChild>
              <a href="/contact">Связаться</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIPrompts;
