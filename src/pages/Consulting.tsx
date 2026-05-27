import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageCircle, Target, Users, Zap, CheckCircle, Database, Cpu, BookOpen, Lightbulb, ArrowRight, Shield, MousePointerClick, GraduationCap, CalendarCheck, HelpCircle } from "lucide-react";
import SEO, { getServiceSchema, getBreadcrumbSchema } from "@/components/SEO";
import { SITE_URL } from "@/seo/site";

const Consulting = () => {
  const { t, i18n } = useTranslation();
  const isRu = i18n.language === 'ru';

  const services = isRu ? [
    {
      icon: Target,
      title: "Стратегия",
      description: "Разработка стратегии оптимизации рабочих процессов",
    },
    {
      icon: Users,
      title: "Обучение",
      description: "Обучение команд по использованию Notion и Buildin.AI",
    },
    {
      icon: Zap,
      title: "Автоматизация",
      description: "Внедрение автоматизации для повышения эффективности",
    },
  ] : [
    {
      icon: Target,
      title: "Strategy",
      description: "Developing workflow optimization strategy",
    },
    {
      icon: Users,
      title: "Training",
      description: "Team training on Notion and Buildin.AI",
    },
    {
      icon: Zap,
      title: "Automation",
      description: "Implementing automation for efficiency gains",
    },
  ];

  const benefits = isRu ? [
    { icon: CheckCircle, text: "Оказание услуг на высоком уровне" },
    { icon: BookOpen, text: "Объяснение каждого блока и как он работает" },
    { icon: Lightbulb, text: "Объяснение функций Notion и как они работают" },
    { icon: BookOpen, text: "Подробные инструкции как вносить изменения в шаблон" },
    { icon: Users, text: "Обучение команд по использованию Notion и Buildin.AI" },
    { icon: Cpu, text: "Демонстрация примеров использования ИИ для улучшения процессов" },
  ] : [
    { icon: CheckCircle, text: "High-quality service delivery" },
    { icon: BookOpen, text: "Explanation of each block and how it works" },
    { icon: Lightbulb, text: "Explanation of Notion features and how they work" },
    { icon: BookOpen, text: "Detailed instructions for modifying the template" },
    { icon: Users, text: "Team training on Notion and Buildin.AI" },
    { icon: Cpu, text: "Demonstrations of using AI to improve processes" },
  ];

  const pillars = isRu ? [
    {
      icon: Database,
      title: "Цифровой штаб",
      subtitle: "Централизованная база данных",
      description: "Не набор страниц, а система связанных баз: Projects → Tasks → Clients. Нет «сирот» — данных без привязки.",
    },
    {
      icon: Zap,
      title: "Inbox Zero",
      subtitle: "Принудительная маршрутизация",
      description: "У сотрудника нет возможности сохранить данные «в никуда». Непривязанная задача горит красным, пока её не распределят.",
    },
    {
      icon: MousePointerClick,
      title: "Ролевые дашборды",
      subtitle: "Прозрачность процессов",
      description: "Директор видит деньги и сроки, менеджер — задачи на сегодня. Никто не роется в чужих папках.",
    },
    {
      icon: BookOpen,
      title: "Регламенты в контексте",
      subtitle: "Управляемые процессы",
      description: "Инструкция «Как делать задачу» лежит внутри карточки задачи. Сотрудник не думает, как оформить — он нажимает кнопку.",
    },
  ] : [
    {
      icon: Database,
      title: "Digital HQ",
      subtitle: "Centralized database",
      description: "Not a set of pages, but a system of linked databases: Projects → Tasks → Clients. No orphans — no data without a connection.",
    },
    {
      icon: Zap,
      title: "Inbox Zero",
      subtitle: "Forced routing",
      description: "Employees can't save data «nowhere». Unassigned tasks glow red until someone claims them.",
    },
    {
      icon: MousePointerClick,
      title: "Role-based dashboards",
      subtitle: "Process transparency",
      description: "The CEO sees money and deadlines, the manager sees today's tasks. Nobody digs through someone else's folders.",
    },
    {
      icon: BookOpen,
      title: "In-context rules",
      subtitle: "Managed processes",
      description: "The «how to do this task» instruction lives inside the task card. The employee doesn't think about formatting — they press a button.",
    },
  ];

  const steps = isRu ? [
    {
      icon: Shield,
      title: "Стресс-тест архитектуры",
      description: "Создаю тестового пользователя и пытаюсь «сломать» систему. Если можно создать задачу без проекта — переделываю.",
    },
    {
      icon: MousePointerClick,
      title: "Правило 3-х кликов",
      description: "Директору достаточно 3 кликов, чтобы увидеть просроченные задачи. Если больше — переделываю навигацию.",
    },
    {
      icon: GraduationCap,
      title: "Защита от дурака",
      description: "Видео-инструкции внутри блоков Notion. Новый сотрудник нажимает Play и понимает, что делать — без звонков директору.",
    },
    {
      icon: CalendarCheck,
      title: "Гарантийный период",
      description: "2 недели поддержки после сдачи. Баги всплывают — это нормально. Я рядом, чтобы всё поправить.",
    },
  ] : [
    {
      icon: Shield,
      title: "Architecture stress test",
      description: "I create a test user and try to «break» the system. If a task can be created without a project — I redo it.",
    },
    {
      icon: MousePointerClick,
      title: "3-click rule",
      description: "The CEO needs 3 clicks max to see overdue tasks. More than that — I redesign the navigation.",
    },
    {
      icon: GraduationCap,
      title: "Fool-proof onboarding",
      description: "Video guides embedded in Notion blocks. A new hire presses Play and knows what to do — no calls to the boss.",
    },
    {
      icon: CalendarCheck,
      title: "Warranty period",
      description: "2 weeks of support after delivery. Bugs surface — that's normal. I'm there to fix everything.",
    },
  ];

  const whyMe = isRu ? [
    {
      title: "Паралич выбора",
      description: "В Notion тысячи функций. Директор заходит, пугается и уходит в WhatsApp. Я убираю лишнее и оставляю то, что нужно именно им.",
    },
    {
      title: "Защита от ошибок",
      description: "Я знаю, что без свойства «Ответственный» задачу никто не сделает. Клиент этого не знает — и набьёт шишки через месяц.",
    },
    {
      title: "Время",
      description: "Новичку нужно 50–100 часов YouTube, чтобы собрать такую систему. Мой чек дешевле, чем 100 часов работы директора.",
    },
  ] : [
    {
      title: "Choice paralysis",
      description: "Notion has thousands of features. A CEO opens it, gets overwhelmed, and goes back to WhatsApp. I remove the noise and keep only what they need.",
    },
    {
      title: "Error protection",
      description: "I know that without an «Assignee» property, no task gets done. The client doesn't know this — and pays for it a month later.",
    },
    {
      title: "Time",
      description: "A beginner needs 50–100 hours of YouTube to build a similar system. My rate is cheaper than 100 hours of a CEO's time.",
    },
  ];

  const serviceSchema = getServiceSchema(isRu);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isRu ? 'Главная' : 'Home', url: SITE_URL },
    { name: isRu ? 'Консалтинг' : 'Consulting', url: `${SITE_URL}/consulting` },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        titleRu="Консалтинг | Дэн Янович"
        titleEn="Consulting | Dan Yanovich"
        descriptionRu="Персональные консультации по Notion и AI-инструментам. Стратегия, обучение и автоматизация бизнес-процессов."
        descriptionEn="Personal Notion and AI consulting. Strategy, training, and business process automation."
        url="/consulting"
        structuredData={[serviceSchema, breadcrumbSchema]}
      />
      <section className="bg-pastel-yellow py-16 md:py-20 border-b-2 border-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold">{t('consulting.title')}</h1>
            <p className="text-base md:text-lg text-muted-foreground">{t('consulting.subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="text-2xl md:text-3xl text-center mb-12 font-bold">
            {isRu ? 'Консалтинговые услуги' : 'Consulting Services'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {services.map((service, index) => (
              <Card key={index} className="text-center">
                <CardHeader className="space-y-4">
                  <div className="inline-flex p-4 bg-primary text-primary-foreground border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] rounded-none mx-auto">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold">{service.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-center mb-10 font-bold">
              {isRu ? 'Что вы получаете' : 'What you get'}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-sm border-2 border-foreground bg-card">
                  <benefit.icon className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                  <span className="text-sm font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30 border-y-2 border-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-center mb-4 font-bold">
              {isRu ? 'Проектирую цифровые штабы' : 'I design digital HQs'}
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              {isRu
                ? 'С 2020 года реализовал более 50 проектов по внедрению рабочих пространств. Каждый проект — это не набор страниц, а работающий механизм.'
                : 'Since 2020, I\'ve delivered 50+ workspace implementations. Every project is a working mechanism — not a bunch of pages.'}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {pillars.map((pillar, index) => (
                <div key={index} className="p-6 border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_currentColor]">
                  <div className="flex items-center gap-3 mb-2">
                    <pillar.icon className="h-5 w-5 text-primary" />
                    <h3 className="text-base font-bold">{pillar.title}</h3>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">{pillar.subtitle}</p>
                  <p className="text-sm text-muted-foreground">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-center mb-4 font-bold">
              {isRu ? 'Как я внедряю' : 'How I implement'}
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              {isRu
                ? 'Четыре шага, которые превращают систему из «набора страниц» в протестированный механизм с инструкцией по эксплуатации.'
                : 'Four steps that turn a system from «a bunch of pages» into a tested mechanism with an operating manual.'}
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-4 p-6 border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_currentColor]">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground border-2 border-foreground flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <step.icon className="h-5 w-5 text-primary" />
                      <h3 className="font-bold">{step.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30 border-y-2 border-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-center mb-10 font-bold">
              🎯 {isRu ? 'Позиционирование' : 'Positioning'}
            </h2>
            <p className="text-center text-muted-foreground mb-10">
              {isRu
                ? 'Два ключевых фокуса, которые отличают мой консалтинг:'
                : 'Two key focuses that set my consulting apart:'}
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_currentColor]">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-bold">
                    {isRu ? 'Хранение' : 'Storage'}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {isRu
                    ? 'Информация всегда где-то хранится, и доступ к ней должен быть удобным, а передача — простой.'
                    : 'Information is always stored somewhere — access to it should be convenient, and transfer should be simple.'}
                </p>
              </div>
              <div className="p-6 border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_currentColor]">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-bold">
                    {isRu ? 'Автоматизация' : 'Automation'}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {isRu
                    ? 'Входящую и исходящую информацию можно и нужно автоматизировать.'
                    : 'Incoming and outgoing information can and should be automated.'}
                </p>
              </div>
            </div>
            <blockquote className="mt-10 p-6 bg-primary/5 border-l-4 border-primary text-center">
              <p className="text-base font-medium italic">
                {isRu
                  ? 'Я продаю решение проблемы, а не инструмент. Каждый проект — это концепция:'
                  : 'I sell the solution to the problem, not the tool. Every project is a concept:'}
              </p>
              <div className="flex items-center justify-center gap-2 mt-4 text-sm font-bold">
                <span>{isRu ? 'консалтинг' : 'consulting'}</span>
                <ArrowRight className="h-4 w-4" />
                <span>{isRu ? 'продукт' : 'product'}</span>
                <ArrowRight className="h-4 w-4" />
                <span>{isRu ? 'результат' : 'result'}</span>
              </div>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl text-center mb-4 font-bold">
              {isRu ? 'Почему не самостоятельно?' : 'Why not do it yourself?'}
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              {isRu
                ? 'В программе изначально есть только инструменты — молоток и гвозди. А я продаю Архитектуру и Строительство.'
                : 'The program only gives you tools — a hammer and nails. I sell Architecture and Construction.'}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {whyMe.map((item, index) => (
                <div key={index} className="p-6 border-2 border-foreground bg-card shadow-[4px_4px_0px_0px_currentColor]">
                  <div className="flex items-center gap-2 mb-3">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <h3 className="font-bold">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30 border-t-2 border-foreground">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <p className="text-base text-muted-foreground">
              {isRu
                ? 'Заинтересованы в консалтинговых услугах? Свяжитесь со мной для обсуждения вашего проекта.'
                : 'Interested in consulting services? Contact me to discuss your project.'}
            </p>
            <Button size="lg" asChild>
              <a
                href="https://t.me/danyanovich"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {isRu ? 'Связаться в Telegram' : 'Contact on Telegram'}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consulting;
