import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t, i18n } = useTranslation();

  const socialLinks = [
    {
      icon: Youtube,
      title: i18n.language === 'ru' ? "YouTube канал" : "YouTube Channel",
      description: i18n.language === 'ru' 
        ? "Обучающие видео по Notion и автоматизации"
        : "Educational videos on Notion and automation",
      handle: "@262ai",
      link: "https://www.youtube.com/@262ai",
    },
    {
      icon: MessageCircle,
      title: i18n.language === 'ru' ? "Telegram канал" : "Telegram Channel",
      description: i18n.language === 'ru' 
        ? "Личный канал с инсайтами и шаблонами"
        : "Personal channel with insights and templates",
      handle: "@notion262",
      link: "https://t.me/notion262",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-secondary py-16 md:py-20 border-b-4 border-border">
        <div className="container">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-2xl md:text-3xl">{t('contact.title')}</h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl text-center mb-12">
              {t('contact.social')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {socialLinks.map((social, index) => (
                <Card
                  key={index}
                  className="pixel-border pixel-border-hover"
                >
                  <CardHeader className="space-y-4">
                    <div className="inline-flex p-3 pixel-border bg-primary w-fit">
                      <social.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-base font-bold">{social.title}</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-xs text-muted-foreground">
                      {social.description}
                    </p>
                    <p className="text-xs font-bold">{social.handle}</p>
                    <Button
                      variant="outline"
                      className="w-full"
                      asChild
                    >
                      <a
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {i18n.language === 'ru' ? 'Перейти' : 'Visit'}
                      </a>
                    </Button>
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

export default Contact;
