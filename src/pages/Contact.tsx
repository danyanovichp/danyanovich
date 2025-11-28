import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, MessageCircle, Mail } from "lucide-react";

const Contact = () => {
  const socialLinks = [
    {
      icon: Youtube,
      title: "YouTube канал",
      description: "Обучающие видео по Notion и автоматизации",
      handle: "@262ai",
      link: "https://www.youtube.com/@262ai",
      color: "text-red-600",
    },
    {
      icon: MessageCircle,
      title: "Telegram канал",
      description: "Личный канал с инсайтами и шаблонами",
      handle: "@notion262",
      link: "https://t.me/notion262",
      color: "text-blue-500",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/20 to-background py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Контакты</h1>
            <p className="text-xl text-muted-foreground">
              Свяжитесь со мной для обсуждения проектов и сотрудничества
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {socialLinks.map((social, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className={`mb-4 inline-flex p-3 rounded-lg bg-secondary w-fit ${social.color}`}>
                      <social.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{social.title}</h3>
                    <p className="text-muted-foreground">{social.description}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-mono text-primary mb-4">
                      {social.handle}
                    </p>
                    <Button variant="outline" className="group/button" asChild>
                      <a
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Перейти
                        <social.icon className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Direct Contact Card */}
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 inline-flex p-3 rounded-lg bg-accent/10">
                  <Mail className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Прямая связь</h3>
                <p className="text-muted-foreground">
                  Готовы обсудить ваш проект? Выберите удобный способ связи
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-6">
                  Я отвечаю на все запросы в течение 24 часов
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" asChild>
                    <a
                      href="https://t.me/notion262"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Telegram
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a
                      href="https://www.youtube.com/@262ai"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Youtube className="mr-2 h-5 w-5" />
                      YouTube
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Часто задаваемые вопросы
            </h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="font-bold">Как быстро вы отвечаете?</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Обычно отвечаю в течение 24 часов. В Telegram отвечаю быстрее
                    всего.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <h3 className="font-bold">Какие проекты вы берете?</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Работаю с проектами любого масштаба - от личных систем до
                    корпоративных решений в Notion и AI-автоматизации.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <h3 className="font-bold">Сколько стоят ваши услуги?</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Стоимость зависит от сложности проекта. Свяжитесь со мной для
                    индивидуального расчета.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
