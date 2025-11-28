import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const Portfolio = () => {
  const projects = [
    {
      title: "Медиа-команда шаблон",
      description:
        "Комплексное решение для управления медиа-контентом и командной работы",
      category: "Рабочие пространства",
      link: "https://www.notion.so/1fa1cf04d99880c7b4e5d43042488a19?pvs=21",
      tags: ["Notion", "Команда", "Контент"],
    },
    {
      title: "Шаблон для небольшой компании",
      description: "Полноценная система управления малым бизнесом в Notion",
      category: "Рабочие пространства",
      link: "https://www.notion.so/7e43e4717b09471f8dc3fed5f8fd73e3?pvs=21",
      tags: ["Notion", "Бизнес", "Управление"],
    },
    {
      title: "Ведение Телеграма",
      description: "Система планирования и аналитики для Telegram-каналов",
      category: "Автоматизация",
      link: "https://www.notion.so/8eb98b9e46a2439b931d6c2c0d968175?pvs=21",
      tags: ["Notion", "Telegram", "Аналитика"],
    },
    {
      title: "Ведение заметок",
      description: "Персональная система управления знаниями и заметками",
      category: "Персональные инструменты",
      link: "https://www.notion.so/634ab2eb1de5410d9a3b74ed3318a635?pvs=21",
      tags: ["Notion", "Заметки", "Личное"],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/20 to-background py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Портфолио</h1>
            <p className="text-xl text-muted-foreground">
              Созданные рабочие пространства и решения для различных бизнес-задач
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-4">
                    {project.category}
                  </Badge>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="group/button" asChild>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Открыть проект
                      <ExternalLink className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Хотите похожий проект?
            </h2>
            <p className="text-muted-foreground mb-6">
              Свяжитесь со мной, чтобы обсудить ваши идеи и создать уникальное решение
              для вашего бизнеса.
            </p>
            <Button size="lg" asChild>
              <a href="/contact">Обсудить проект</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
