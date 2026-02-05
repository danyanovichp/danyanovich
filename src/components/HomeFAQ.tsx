import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    id: "notion-safety",
    questionRu: "Безопасно ли использовать Notion в РФ?",
    questionEn: "Is Notion safe to use in Russia?",
    answerRu: "Я строю системы с возможностью резервного копирования — все данные можно экспортировать в CSV, Markdown или JSON в любой момент. Для критичных процессов использую n8n, который можно развернуть на вашем собственном сервере. Ваши данные — всегда ваши.",
    answerEn: "I build systems with backup capabilities — all data can be exported to CSV, Markdown, or JSON at any time. For critical processes, I use n8n which can be deployed on your own server. Your data is always yours.",
  },
  {
    id: "payment",
    questionRu: "Как происходит оплата?",
    questionEn: "How do I pay?",
    answerRu: "Принимаю переводы на карты российских банков (Сбербанк, Тинькофф), криптовалюту (USDT, BTC), а также международные переводы. Возможна оплата частями для крупных проектов. Всё обсуждаем индивидуально.",
    answerEn: "I accept transfers to Russian bank cards (Sberbank, Tinkoff), cryptocurrency (USDT, BTC), and international transfers. Payment in installments is possible for large projects. Everything is discussed individually.",
  },
  {
    id: "custom-system",
    questionRu: "Можно ли заказать индивидуальную систему?",
    questionEn: "Can I order a custom system?",
    answerRu: "Да! Большинство моих проектов — это кастомные решения под конкретные задачи бизнеса. Начинаем с бесплатного экспресс-аудита на 15 минут, где разбираем вашу ситуацию и определяем, чем могу помочь. Напишите мне в Telegram для записи.",
    answerEn: "Yes! Most of my projects are custom solutions for specific business needs. We start with a free 15-minute express audit where we analyze your situation and determine how I can help. Message me on Telegram to book.",
  },
  {
    id: "timeline",
    questionRu: "Сколько времени занимает внедрение?",
    questionEn: "How long does implementation take?",
    answerRu: "Зависит от сложности: простой шаблон настраивается за 1-2 дня, комплексная система автоматизации — 2-4 недели. После внедрения провожу обучение вашей команды и даю 2 недели поддержки бесплатно.",
    answerEn: "It depends on complexity: a simple template takes 1-2 days, a comprehensive automation system takes 2-4 weeks. After implementation, I train your team and provide 2 weeks of free support.",
  },
];

const HomeFAQ = () => {
  const { i18n } = useTranslation();
  const isRu = i18n.language === "ru";

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-10">
            <h2 className="text-2xl md:text-4xl font-bold">
              {isRu ? "❓ Частые вопросы" : "❓ FAQ"}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              {isRu 
                ? "Ответы на главные вопросы клиентов из России" 
                : "Answers to the main questions from Russian clients"}
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item) => (
              <AccordionItem 
                key={item.id} 
                value={item.id}
                className="bg-card/70 backdrop-blur-sm border border-border/30 rounded-2xl px-6 data-[state=open]:shadow-glass transition-all"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                  {isRu ? item.questionRu : item.questionEn}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {isRu ? item.answerRu : item.answerEn}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
