import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Youtube, MessageCircle, FileText, Star, Quote } from "lucide-react";
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
      link: "https://www.youtube.com/channel/UCzcTrBkzXgA9aaH05cWVi2g",
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

  const reviews = [
    {
      name: i18n.language === 'ru' ? "Алексей К." : "Alex K.",
      company: i18n.language === 'ru' ? "IT-компания" : "IT Company",
      text: i18n.language === 'ru' 
        ? "Дэн полностью перестроил наше рабочее пространство в Notion. Теперь вся команда работает в единой системе, а время на рутинные задачи сократилось вдвое."
        : "Dan completely rebuilt our Notion workspace. Now the whole team works in a unified system, and time spent on routine tasks has been cut in half.",
      rating: 5,
    },
    {
      name: i18n.language === 'ru' ? "Мария С." : "Maria S.",
      company: i18n.language === 'ru' ? "Маркетинговое агентство" : "Marketing Agency",
      text: i18n.language === 'ru' 
        ? "Благодаря консультации смогли настроить автоматизацию контент-плана. Экономим около 10 часов в неделю на планировании."
        : "Thanks to the consultation, we were able to set up content plan automation. We save about 10 hours a week on planning.",
      rating: 5,
    },
    {
      name: i18n.language === 'ru' ? "Игорь П." : "Igor P.",
      company: i18n.language === 'ru' ? "Стартап" : "Startup",
      text: i18n.language === 'ru' 
        ? "Обучающие сессии были очень полезными. Теперь наша команда использует Notion на максимум, и все процессы стали прозрачными."
        : "The training sessions were very helpful. Now our team uses Notion to the fullest, and all processes have become transparent.",
      rating: 5,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-muted/30 backdrop-blur-sm py-16 md:py-20 border-b border-border/20">
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
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Decorative orbs */}
        <div className="glass-orb top-20 left-1/4 w-64 h-64 bg-muted/30 animate-float" />
        <div className="glass-orb bottom-20 right-1/4 w-80 h-80 bg-muted/40 animate-float" style={{ animationDelay: '1.5s' }} />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-center mb-12 font-bold">
              {t('contact.social')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="group cursor-pointer h-full transition-all hover:scale-[1.02]">
                    <CardHeader className="space-y-4">
                      <div className="inline-flex p-4 bg-primary/90 backdrop-blur-sm text-primary-foreground rounded-2xl w-fit">
                        <social.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-bold">{social.title}</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {social.description}
                      </p>
                      <span className="text-sm font-medium text-primary inline-flex items-center gap-2 group-hover:underline">
                        {social.handle}
                      </span>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 md:py-20 bg-muted/20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-center mb-12 font-bold">
              {i18n.language === 'ru' ? 'Отзывы' : 'Reviews'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <Card key={index} className="h-full">
                  <CardHeader className="pb-2">
                    <Quote className="h-8 w-8 text-primary/40 mb-2" />
                    <div className="flex gap-0.5 mb-2">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground italic">
                      "{review.text}"
                    </p>
                    <div className="pt-2 border-t border-border/50">
                      <p className="font-semibold text-sm">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.company}</p>
                    </div>
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
