import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedSection from "@/components/AnimatedSection";
import SEO from "@/components/SEO";

type FAQCategory = 'all' | 'general' | 'templates' | 'payment' | 'support';

interface FAQItem {
  question: string;
  answer: string;
  category: FAQCategory;
}

const FAQ = () => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('all');

  const categories: { value: FAQCategory; labelRu: string; labelEn: string }[] = [
    { value: 'all', labelRu: 'Все', labelEn: 'All' },
    { value: 'general', labelRu: 'Общие', labelEn: 'General' },
    { value: 'templates', labelRu: 'Шаблоны', labelEn: 'Templates' },
    { value: 'payment', labelRu: 'Оплата', labelEn: 'Payment' },
    { value: 'support', labelRu: 'Поддержка', labelEn: 'Support' },
  ];

  const faqs: FAQItem[] = i18n.language === 'ru' ? [
    // General
    {
      question: "Как я могу заказать шаблон Notion?",
      answer: "Вы можете связаться со мной через Telegram (@danyanovich) или выбрать подходящий пакет на странице 'Пакеты услуг'. После обсуждения ваших потребностей я подготовлю персонализированное решение.",
      category: 'general',
    },
    {
      question: "Что такое Notion и зачем он нужен?",
      answer: "Notion — это универсальный инструмент для организации работы, который объединяет заметки, базы данных, проектное управление и документацию в одном месте. Он помогает структурировать информацию и повысить продуктивность как для личного использования, так и для команд.",
      category: 'general',
    },
    {
      question: "Кому подходят ваши шаблоны?",
      answer: "Мои шаблоны подходят всем: от индивидуальных предпринимателей и фрилансеров до крупных команд. Есть решения для личной продуктивности, управления проектами, финансов, контент-планирования и многого другого.",
      category: 'general',
    },
    // Templates
    {
      question: "Можно ли настроить шаблон под мои нужды?",
      answer: "Абсолютно! Все шаблоны полностью кастомизируются. Я создаю индивидуальные решения, которые идеально соответствуют вашим задачам и рабочим процессам.",
      category: 'templates',
    },
    {
      question: "Сколько времени занимает создание шаблона?",
      answer: "Время зависит от сложности проекта. Простые шаблоны готовы за 1-3 дня, комплексные решения могут занять 1-2 недели. Точные сроки обсуждаются перед началом работы.",
      category: 'templates',
    },
    {
      question: "Получу ли я обновления шаблона?",
      answer: "Да, в зависимости от выбранного пакета, вы получаете обновления на определённый период. В пакете 'Бизнес' обновления предоставляются постоянно. Для базовых шаблонов обновления доступны по запросу.",
      category: 'templates',
    },
    {
      question: "Могу ли я использовать шаблон в нескольких рабочих пространствах?",
      answer: "Да, после покупки шаблон можно дублировать в любое количество ваших личных рабочих пространств Notion. Для командного использования обсуждаются отдельные лицензии.",
      category: 'templates',
    },
    // Payment
    {
      question: "Какие способы оплаты вы принимаете?",
      answer: "Принимаю банковские переводы, электронные платежи (Tribute, Boosty) и криптовалюту. Детали оплаты обсуждаются индивидуально при оформлении заказа.",
      category: 'payment',
    },
    {
      question: "Есть ли гарантия возврата денег?",
      answer: "Да, если шаблон не соответствует описанию или техническому заданию, я гарантирую возврат средств в течение 7 дней после покупки. Для кастомных проектов детали возврата обсуждаются индивидуально.",
      category: 'payment',
    },
    {
      question: "Есть ли скидки для студентов?",
      answer: "Да, для студентов предоставляется скидка 15% на все шаблоны и услуги. Для получения скидки свяжитесь со мной в Telegram с подтверждением статуса студента.",
      category: 'payment',
    },
    // Support
    {
      question: "Предоставляете ли вы поддержку после покупки?",
      answer: "Да, все пакеты включают период поддержки. В зависимости от выбранного пакета, вы получаете от 1 недели до постоянной поддержки с обновлениями и доработками.",
      category: 'support',
    },
    {
      question: "Обучаете ли вы работе с Notion?",
      answer: "Да, в пакеты включено обучение. Предоставляю видео-инструкции, текстовые руководства и провожу персональные консультации для вас и вашей команды.",
      category: 'support',
    },
    {
      question: "Как быстро вы отвечаете на вопросы?",
      answer: "Обычно отвечаю в течение нескольких часов в рабочие дни. Для клиентов с активной поддержкой время ответа — до 24 часов.",
      category: 'support',
    },
    {
      question: "Проводите ли вы консультации?",
      answer: "Да, провожу индивидуальные консультации по Notion, автоматизации и продуктивности. Вы можете забронировать сессию через страницу 'Консалтинг' или написать мне в Telegram.",
      category: 'support',
    },
    {
      question: "Работаете ли вы с командами?",
      answer: "Да, создаю корпоративные решения для команд любого размера. Это включает настройку рабочего пространства, обучение сотрудников и постоянную поддержку.",
      category: 'support',
    },
  ] : [
    // General
    {
      question: "How can I order a Notion template?",
      answer: "You can contact me via Telegram (@danyanovich) or choose a suitable package on the 'Packages' page. After discussing your needs, I will prepare a personalized solution.",
      category: 'general',
    },
    {
      question: "What is Notion and why do I need it?",
      answer: "Notion is a universal tool for organizing work that combines notes, databases, project management, and documentation in one place. It helps structure information and increase productivity for both personal use and teams.",
      category: 'general',
    },
    {
      question: "Who are your templates suitable for?",
      answer: "My templates are suitable for everyone: from individual entrepreneurs and freelancers to large teams. There are solutions for personal productivity, project management, finance, content planning, and much more.",
      category: 'general',
    },
    // Templates
    {
      question: "Can templates be customized to my needs?",
      answer: "Absolutely! All templates are fully customizable. I create individual solutions that perfectly match your tasks and workflows.",
      category: 'templates',
    },
    {
      question: "How long does it take to create a template?",
      answer: "Time depends on project complexity. Simple templates are ready in 1-3 days, complex solutions may take 1-2 weeks. Exact timeframes are discussed before starting work.",
      category: 'templates',
    },
    {
      question: "Will I receive template updates?",
      answer: "Yes, depending on the package chosen, you receive updates for a certain period. The 'Business' package includes continuous updates. For basic templates, updates are available upon request.",
      category: 'templates',
    },
    {
      question: "Can I use the template in multiple workspaces?",
      answer: "Yes, after purchase, you can duplicate the template to any number of your personal Notion workspaces. For team use, separate licenses are discussed.",
      category: 'templates',
    },
    // Payment
    {
      question: "What payment methods do you accept?",
      answer: "I accept bank transfers, electronic payments (Tribute, Boosty), and cryptocurrency. Payment details are discussed individually when placing an order.",
      category: 'payment',
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes, if the template doesn't match the description or technical specifications, I guarantee a refund within 7 days of purchase. For custom projects, refund details are discussed individually.",
      category: 'payment',
    },
    {
      question: "Are there discounts for students?",
      answer: "Yes, students receive a 15% discount on all templates and services. To get the discount, contact me on Telegram with proof of student status.",
      category: 'payment',
    },
    // Support
    {
      question: "Do you provide support after purchase?",
      answer: "Yes, all packages include a support period. Depending on the package chosen, you get from 1 week to continuous support with updates and improvements.",
      category: 'support',
    },
    {
      question: "Do you teach how to work with Notion?",
      answer: "Yes, training is included in the packages. I provide video tutorials, text guides, and conduct personal consultations for you and your team.",
      category: 'support',
    },
    {
      question: "How quickly do you respond to questions?",
      answer: "I usually respond within a few hours on business days. For clients with active support, response time is up to 24 hours.",
      category: 'support',
    },
    {
      question: "Do you offer consultations?",
      answer: "Yes, I conduct individual consultations on Notion, automation, and productivity. You can book a session through the 'Consulting' page or message me on Telegram.",
      category: 'support',
    },
    {
      question: "Do you work with teams?",
      answer: "Yes, I create corporate solutions for teams of any size. This includes workspace setup, employee training, and ongoing support.",
      category: 'support',
    },
  ];

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const matchesSearch = searchQuery === '' || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqs, activeCategory, searchQuery]);

  const getCategoryCount = (category: FAQCategory) => {
    if (category === 'all') return faqs.length;
    return faqs.filter(faq => faq.category === category).length;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        titleRu="FAQ | Дэн Янович"
        titleEn="FAQ | Dan Yanovich"
        descriptionRu="Ответы на часто задаваемые вопросы о шаблонах Notion, оплате, поддержке и услугах."
        descriptionEn="Answers to frequently asked questions about Notion templates, payment, support, and services."
      />

      {/* Hero Section */}
      <section className="bg-muted/30 py-16 md:py-20 border-b border-border/20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <AnimatedSection>
              <h1 className="text-3xl md:text-5xl font-bold">{t('faq.title')}</h1>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <p className="text-base md:text-lg text-muted-foreground">
                {t('faq.subtitle')}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Search */}
            <AnimatedSection delay={150}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={i18n.language === 'ru' ? 'Поиск по FAQ...' : 'Search FAQ...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </AnimatedSection>

            {/* Category Tabs */}
            <AnimatedSection delay={200}>
              <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as FAQCategory)}>
                <TabsList className="w-full flex-wrap h-auto gap-2 bg-transparent p-0">
                  {categories.map((cat) => (
                    <TabsTrigger
                      key={cat.value}
                      value={cat.value}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-2"
                    >
                      {i18n.language === 'ru' ? cat.labelRu : cat.labelEn}
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {getCategoryCount(cat.value)}
                      </Badge>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </AnimatedSection>

            {/* FAQ Items */}
            <AnimatedSection delay={250}>
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="border rounded-lg bg-background px-6"
                    >
                      <AccordionTrigger className="text-base font-bold hover:no-underline py-4 text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  {i18n.language === 'ru' 
                    ? 'Ничего не найдено. Попробуйте изменить запрос.'
                    : 'Nothing found. Try changing your search.'}
                </div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
