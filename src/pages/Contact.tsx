import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Youtube, MessageCircle, FileText } from "lucide-react";
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
      handle: "@danyanovich",
      link: "https://www.youtube.com/@danyanovich",
    },
    {
      icon: MessageCircle,
      title: i18n.language === 'ru' ? "Telegram канал" : "Telegram Channel",
      description: i18n.language === 'ru' 
        ? "Личный канал с инсайтами и шаблонами"
        : "Personal channel with insights and templates",
      handle: "@danyanovichp",
      link: "https://t.me/danyanovichp",
    },
    {
      icon: FileText,
      title: "Notion Marketplace",
      description: i18n.language === 'ru' 
        ? "Мои шаблоны на официальной площадке Notion"
        : "My templates on the official Notion marketplace",
      handle: "@danyanovich",
      link: "https://www.notion.so/@danyanovich",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted/30 py-16 md:py-20 border-b">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold">{t('contact.title')}</h1>
            <p className="text-base md:text-lg text-muted-foreground">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-center mb-12 font-bold">
              {t('contact.social')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {socialLinks.map((social, index) => (
                <Card key={index} className="group">
                  <CardHeader className="space-y-4">
                    <div className="inline-flex p-4 bg-primary text-primary-foreground rounded-lg w-fit">
                      <social.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold">{social.title}</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {social.description}
                    </p>
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:text-primary transition-colors inline-flex items-center gap-2 group-hover:underline"
                    >
                      {social.handle}
                    </a>
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
