import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Lightbulb, Sparkles, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const stats = [
    { value: "50+", label: "Реализованных проектов" },
    { value: "30%", label: "Рост эффективности" },
    { value: "100+", label: "Часов обучения" },
    { value: "4+", label: "Года опыта" },
  ];

  const expertise = [
    {
      icon: Target,
      title: "Notion Эксперт",
      description:
        "Создаю шаблоны и консультирую по внедрению Notion. Помогаю организовать рабочие процессы для максимальной продуктивности.",
      link: "/portfolio",
    },
    {
      icon: Sparkles,
      title: "AI Решения",
      description:
        "Разрабатываю AI-промпты и автоматизирую задачи с использованием современных AI-инструментов для вашего бизнеса.",
      link: "/ai-prompts",
    },
  ];

  const process = [
    {
      number: "01",
      title: "Анализ потребностей",
      description:
        "Изучаю ваши задачи, определяю, что нужно автоматизировать и оптимизировать для максимальной эффективности",
    },
    {
      number: "02",
      title: "Создание решения",
      description:
        "Разрабатываю индивидуальный шаблон или адаптирую готовое решение под ваши специфические процессы",
    },
    {
      number: "03",
      title: "Обучение и демо",
      description:
        "Создаю демо-версию для тестирования, записываю обучающие материалы и инструкции по использованию",
    },
    {
      number: "04",
      title: "Поддержка",
      description:
        "Предоставляю готовый продукт и оказываю поддержку для расширения ваших возможностей",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="container relative">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Дэн Янович
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-primary-foreground/90">
              Создаю шаблоны | Эксперт по Notion и AI
            </p>
            <p className="text-lg mb-8 text-primary-foreground/80 max-w-2xl">
              С 2020 создаю и консультирую рабочие пространства, реализовал более 50
              проектов по внедрению Notion, Buildin.AI и других инструментов.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="shadow-accent"
                asChild
              >
                <Link to="/portfolio">
                  Портфолио
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-primary-foreground/10 border-primary-foreground/20 hover:bg-primary-foreground/20"
                asChild
              >
                <Link to="/contact">Связаться</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-secondary/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient-brand mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Моя Миссия</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Я делаю продуктивность в Notion доступной для всех — от новичка до профи
              за минимальное время. Быстро превращаю хаос задач и разрозненные
              инструменты в лёгкие, производительные Notion‑системы с понятной логикой
              и интерфейсами. Мои готовые решения и обучающие программы помогают
              командам и соло‑специалистам начать работать по‑новому без перегруза
              процессами.
            </p>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Экспертиза
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {expertise.map((item, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-8">
                  <div className="mb-6 inline-flex p-3 rounded-lg bg-brand-amber/10">
                    <item.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground mb-6">{item.description}</p>
                  <Button
                    variant="ghost"
                    className="group-hover:text-accent p-0"
                    asChild
                  >
                    <Link to={item.link}>
                      Узнать больше
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Как Я Работаю
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Простой и прозрачный процесс создания шаблонов — от идеи до готового
            продукта
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {process.map((step, index) => (
              <div
                key={index}
                className="relative animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-6xl font-bold text-brand-indigo-light mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Готовы начать работать эффективнее?
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90">
              Свяжитесь со мной, чтобы обсудить ваш проект и узнать, как я могу помочь
              вам достичь ваших целей.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="shadow-accent"
              asChild
            >
              <Link to="/contact">
                Начать сотрудничество
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
