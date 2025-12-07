import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Youtube, MessageCircle, FileText, Star, Quote, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

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
      name: "Dmitri_Str",
      project: i18n.language === 'ru' ? "Оптимизация шаблона Notion" : "Notion Template Optimization",
      text: i18n.language === 'ru' 
        ? "Очень редко сейчас встретишь профессионалов такого уровня, очень быстро разобрался в задаче, максимально приветлив, предложил хорошие идеи, что в итоге улучшило изначально задуманное. Быстро и качественно выполнил. Если вам нужно качество и профессионал, то однозначно рекомендую!"
        : "Very rare to find professionals of this level. Quickly understood the task, very friendly, suggested good ideas that improved the original concept. Fast and quality work. Highly recommend!",
      rating: 5,
    },
    {
      name: "edgadirov",
      project: i18n.language === 'ru' ? "Notion база данных + шаблон" : "Notion Database + Template",
      text: i18n.language === 'ru' 
        ? "Отличная работа! Данил очень ответственный человек. К работе подошел с профессионализмом. Делали шаблон для облегчения работы учеников. Даже несколько раз созвонились, помог разобраться в notion и помог найти лучшее решение. Все сделано идеально!"
        : "Excellent work! Danil is very responsible. Approached the work professionally. Made a template for students. Even had several calls, helped understand Notion and find the best solution. Everything done perfectly!",
      rating: 5,
    },
    {
      name: "nesmeyanna",
      project: i18n.language === 'ru' ? "Notion 2 доски" : "Notion 2 Boards",
      text: i18n.language === 'ru' 
        ? "Данила восхитителен! В работе была простая задача, он дополнил её так, как я и не могла предположить, не зная о всех возможностях Notion. Рекомендую как профессионала, с удовольствием обращусь ещё."
        : "Danila is amazing! It was a simple task, but he enhanced it in ways I couldn't imagine, not knowing all of Notion's capabilities. Recommend as a professional!",
      rating: 5,
    },
    {
      name: "Aram_G",
      project: i18n.language === 'ru' ? "Notion Шаблон" : "Notion Template",
      text: i18n.language === 'ru' 
        ? "У меня был достаточно большой заказ, но Данила прекрасно и быстро со всем справился! Сразу видно опыт и умения! Очень рекомендую! Обязательно обращусь еще!"
        : "I had a fairly large order, but Danila handled everything perfectly and quickly! You can immediately see the experience and skills! Highly recommend!",
      rating: 5,
    },
    {
      name: "viguroo",
      project: i18n.language === 'ru' ? "База данных Notion" : "Notion Database",
      text: i18n.language === 'ru' 
        ? "Регулярно заказываю базы в notion, очень довольна качеством работы! Искренне рекомендую всем заказчикам!! Спасибо!!"
        : "Regularly order databases in Notion, very happy with the quality of work! Sincerely recommend to all clients!! Thank you!!",
      rating: 5,
    },
    {
      name: "Yulia_step",
      project: i18n.language === 'ru' ? "Консультация по Notion" : "Notion Consultation",
      text: i18n.language === 'ru' 
        ? "Очень быстро договорились про созвон и Данила на консультации подробно ответил на вопросы, показал возможные решения под наши и аналогичные задачи. Спасибо большое, прямо то, что нужно!"
        : "Quickly arranged a call and Danila answered all questions in detail during the consultation, showed possible solutions for our tasks. Thank you, exactly what we needed!",
      rating: 5,
    },
    {
      name: "Yaii",
      project: i18n.language === 'ru' ? "Создам шаблон Notion" : "Notion Template Creation",
      text: i18n.language === 'ru' 
        ? "Я поняла, что самостоятельно потрачу очень много времени на изучении Notion. Поэтому решила обратиться к специалисту. Даня понял мою задачу, хорошо и быстро справился с ней. Рекомендую!"
        : "I realized I would spend too much time learning Notion myself. So I decided to contact a specialist. Danya understood my task, did it well and quickly. Recommend!",
      rating: 5,
    },
    {
      name: "krekov13",
      project: i18n.language === 'ru' ? "RPG Шаблон Notion" : "RPG Notion Template",
      text: i18n.language === 'ru' 
        ? "На просторах всемирной сети то чего я попросил и как было сделано аналогов нет, буду обращаться точно только сюда, и всем советую!"
        : "On the entire internet, there's nothing like what I asked for and how it was done. Will definitely come back, and recommend to everyone!",
      rating: 5,
    },
    {
      name: "miko9301",
      project: i18n.language === 'ru' ? "База данных в Notion" : "Notion Database",
      text: i18n.language === 'ru' 
        ? "Все четко сделал по тз. Спасибо Данилу за работу."
        : "Everything done clearly according to specs. Thank you Danil for the work.",
      rating: 5,
    },
    {
      name: "artem_prgb",
      project: i18n.language === 'ru' ? "Notion БД" : "Notion Database",
      text: i18n.language === 'ru' 
        ? "Задание было объемным и сложным, Дэн выполнил все по ТЗ, проявил внимание к деталям, достаточно отзывчив и приятен в общении. Я доволен, буду обращаться еще)"
        : "The task was large and complex, Dan completed everything according to specs, paid attention to details, very responsive and pleasant to communicate with. Satisfied, will come back!",
      rating: 5,
    },
    {
      name: "krekov13",
      project: i18n.language === 'ru' ? "RPG планер" : "RPG Planner",
      text: i18n.language === 'ru' 
        ? "RPG планер, любой каприз только лучше! На все 100% понравилась работа!"
        : "RPG planner, every request made even better! 100% satisfied with the work!",
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
          <div className="max-w-5xl mx-auto">
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
                      <p className="text-xs text-muted-foreground">{review.project}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Kwork Link */}
            <div className="mt-12 text-center">
              <a 
                href="https://kwork.ru/user/danyanovich" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  {i18n.language === 'ru' ? 'Все отзывы на Kwork' : 'All reviews on Kwork'}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
