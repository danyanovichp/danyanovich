import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PixelDecorations from "@/components/pixel-art/PixelDecorations";

const FAQ = () => {
  const { t, i18n } = useTranslation();

  const faqs = i18n.language === 'ru' ? [
    {
      question: "Как я могу заказать шаблон Notion?",
      answer: "Вы можете связаться со мной через Telegram (@danyanovich) или выбрать подходящий пакет на странице 'Пакеты услуг'. После обсуждения ваших потребностей я подготовлю персонализированное решение.",
    },
    {
      question: "Предоставляете ли вы поддержку после покупки?",
      answer: "Да, все пакеты включают период поддержки. В зависимости от выбранного пакета, вы получаете от 1 недели до постоянной поддержки с обновлениями и доработками.",
    },
    {
      question: "Можно ли настроить шаблон под мои нужды?",
      answer: "Абсолютно! Все шаблоны полностью кастомизируются. Я создаю индивидуальные решения, которые идеально соответствуют вашим задачам и рабочим процессам.",
    },
    {
      question: "Какие способы оплаты вы принимаете?",
      answer: "Принимаю банковские переводы, электронные платежи и криптовалюту. Детали оплаты обсуждаются индивидуально при оформлении заказа.",
    },
    {
      question: "Сколько времени занимает создание шаблона?",
      answer: "Время зависит от сложности проекта. Простые шаблоны готовы за 1-3 дня, комплексные решения могут занять 1-2 недели. Точные сроки обсуждаются перед началом работы.",
    },
    {
      question: "Обучаете ли вы работе с Notion?",
      answer: "Да, в пакеты включено обучение. Предоставляю видео-инструкции, текстовые руководства и провожу персональные консультации для вас и вашей команды.",
    },
  ] : [
    {
      question: "How can I order a Notion template?",
      answer: "You can contact me via Telegram (@danyanovich) or choose a suitable package on the 'Packages' page. After discussing your needs, I will prepare a personalized solution.",
    },
    {
      question: "Do you provide support after purchase?",
      answer: "Yes, all packages include a support period. Depending on the package chosen, you get from 1 week to continuous support with updates and improvements.",
    },
    {
      question: "Can templates be customized to my needs?",
      answer: "Absolutely! All templates are fully customizable. I create individual solutions that perfectly match your tasks and workflows.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "I accept bank transfers, electronic payments, and cryptocurrency. Payment details are discussed individually when placing an order.",
    },
    {
      question: "How long does it take to create a template?",
      answer: "Time depends on project complexity. Simple templates are ready in 1-3 days, complex solutions may take 1-2 weeks. Exact timeframes are discussed before starting work.",
    },
    {
      question: "Do you teach how to work with Notion?",
      answer: "Yes, training is included in the packages. I provide video tutorials, text guides, and conduct personal consultations for you and your team.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen relative">
      <PixelDecorations />

      {/* Hero Section */}
      <section className="bg-secondary py-16 md:py-20 border-b-4 border-border relative">
        <div className="container">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-2xl md:text-3xl">{t('faq.title')}</h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              {t('faq.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="pixel-border bg-background px-6"
                >
                  <AccordionTrigger className="text-sm font-bold hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
