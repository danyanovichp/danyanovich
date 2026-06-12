import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Star,
} from "lucide-react";
import { LocalLink as Link } from "@/components/LocalLink";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import { getTemplateBySlug, allTemplates, type NotionTemplate } from "@/data/notionTemplates";
import { useState } from "react";

// Same icon map as in NotionTemplates
import {
  Brain, Building2, Briefcase, ShoppingCart, FileStack,
  Lightbulb, Target, Heart, Clock, Bot, FlaskConical,
  TrendingUp, Truck, CalendarOff, Receipt, MessageSquareText,
  ListTodo, UtensilsCrossed, CalendarDays, Timer, GraduationCap,
  Shield, Sparkles, Users, RotateCcw, CheckCircle, PieChart,
  Headphones, CheckSquare, BookOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Brain, Building2, Briefcase, ShoppingCart, FileStack,
  Lightbulb, Target, Heart, Clock, Bot, FlaskConical,
  TrendingUp, Truck, CalendarOff, Receipt, MessageSquareText,
  ListTodo, UtensilsCrossed, CalendarDays, Timer, GraduationCap,
  Shield, Sparkles, Users, RotateCcw, CheckCircle, PieChart,
  Headphones, CheckSquare, BookOpen,
};

const NotionTemplateDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isRu = i18n.language === "ru";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const template = slug ? getTemplateBySlug(slug) : undefined;

  if (!template) {
    return (
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center pt-32">
          <h1 className="text-4xl font-bold font-display mb-4">
            {isRu ? "Шаблон не найден" : "Template Not Found"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isRu
              ? "Запрашиваемый шаблон не существует."
              : "The requested template does not exist."}
          </p>
          <Link to="/notion">
            <Button variant="outline" className="border-2 border-foreground">
              <ArrowLeft className="mr-2 w-4 h-4" />
              {isRu ? "Назад к шаблонам" : "Back to Templates"}
            </Button>
          </Link>
        </div>
      </PageTransition>
    );
  }

  const IconComponent = iconMap[template.icon] || Brain;
  const isPaid = template.price > 0;
  const localeDesc = isRu ? template.description.ru : template.description.en;
  const localeFeatures = template.features
    ? isRu
      ? template.features.ru
      : template.features.en
    : [];
  const marketplaceUrl = template.downloadUrl || `https://www.notion.com/templates/${template.slug}`;

  // Related templates (same category group, exclude current)
  const relatedTemplates = allTemplates
    .filter((t) => t.categoryGroup === template.categoryGroup && t.slug !== template.slug)
    .slice(0, 3);

  // FAQ items
  const faqItems = isPaid
    ? [
        {
          q: isRu ? "Как это работает?" : "How does this work?",
          a: isRu
            ? "После оплаты вы получите ссылку на дублирование шаблона в ваш Notion. Нажмите «Duplicate» — и шаблон появится в вашем workspace."
            : "After purchase, you'll get a link to duplicate the template into your Notion workspace. Click \"Duplicate\" and it's yours.",
        },
        {
          q: isRu
            ? `Стоит ли это $${template.price}?`
            : `Is this really worth $${template.price}?`,
          a: isRu
            ? `Шаблон экономит десятки часов на настройку. Вместо создания с нуля вы получаете готовую систему с подключёнными базами, связями и дашбордами.`
            : `This template saves dozens of hours of setup. Instead of building from scratch, you get a ready-made system with connected databases, relations, and dashboards.`,
        },
        {
          q: isRu
            ? "Могу ли я использовать с бесплатным планом Notion?"
            : "Can I use this with Notion's free plan?",
          a: isRu
            ? "Да! Все шаблоны работают на бесплатном плане Notion. Никакых дополнительных подписок не требуется."
            : "Yes! All templates work on Notion's free plan. No additional subscriptions needed.",
        },
        {
          q: isRu ? "Какова политика возврата?" : "What is your refund policy?",
          a: isRu
            ? "Если шаблон не оправдал ожиданий — напишите нам в течение 14 дней, и мы вернём деньги."
            : "If the template doesn't meet your expectations, contact us within 14 days for a full refund.",
        },
      ]
    : [
        {
          q: isRu ? "Как это работает?" : "How does this work?",
          a: isRu
            ? "Нажмите «Get Template» — шаблон продублируется в ваш Notion workspace. Это бесплатно."
            : "Click \"Get Template\" — the template will be duplicated into your Notion workspace. It's free.",
        },
        {
          q: isRu
            ? "Могу ли я использовать с бесплатным планом Notion?"
            : "Can I use this with Notion's free plan?",
          a: isRu
            ? "Да! Этот шаблон полностью работает на бесплатном плане Notion."
            : "Yes! This template fully works on Notion's free plan.",
        },
        {
          q: isRu ? "Могу ли я изменить шаблон?" : "Can I customize the template?",
          a: isRu
            ? "Конечно! После дублирования шаблон полностью ваш — меняйте базы, виды, свойства и дизайн."
            : "Absolutely! After duplicating, the template is fully yours — change databases, views, properties, and design.",
        },
      ];

  return (
    <PageTransition>
      <SEO
        titleRu={`${template.name} | Шаблоны Notion`}
        titleEn={`${template.name} | Notion Templates`}
        descriptionRu={template.description.ru}
        descriptionEn={template.description.en}
      />

      {/* Back link */}
      <div className="container pt-24">
        <Link
          to="/notion"
          className="inline-flex items-center text-sm font-bold uppercase tracking-wider hover:text-pastel-blue transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          {isRu ? "Все шаблоны" : "All Templates"}
        </Link>
      </div>

      {/* HERO (notionsecondbrain.com style) */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <AnimatedSection>
              {/* Icon */}
              <div
                className={`inline-flex p-5 rounded-full ${template.bgClass} mb-6`}
              >
                <IconComponent className={`w-12 h-12 ${template.colorClass}`} />
              </div>

              {/* Category badge */}
              <Badge
                variant="outline"
                className="mb-4 text-xs px-3 py-1 uppercase tracking-wider"
              >
                {isRu ? template.category.ru : template.category.en}
              </Badge>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-extrabold font-display tracking-tight leading-tight mb-4">
                {template.name}
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
                {localeDesc}
              </p>

              {/* CTA + Rating */}
              <div className="flex flex-col items-center gap-4 mt-8">
                {isPaid ? (
                  <a
                    href={marketplaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background font-bold uppercase tracking-wider text-sm rounded-full border-2 border-foreground hover:bg-transparent hover:text-foreground transition-colors group"
                  >
                    {isRu ? "Купить шаблон" : "Get Template"} — ${template.price}
                    <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ) : (
                  <a
                    href={marketplaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background font-bold uppercase tracking-wider text-sm rounded-full border-2 border-foreground hover:bg-transparent hover:text-foreground transition-colors group"
                  >
                    {isRu ? "Получить бесплатно" : "Get Free Template"}
                    <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
                {/* Star rating */}
                <div className="flex items-center gap-1 text-muted-foreground">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 fill-pastel-yellow text-pastel-yellow"
                    />
                  ))}
                  <span className="text-sm ml-2">
                    {isRu ? "на Notion Marketplace" : "on Notion Marketplace"}
                  </span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* PREVIEW IMAGE (large screenshot area) */}
      <section className="pb-12 md:pb-20">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <AnimatedSection delay={100}>
              <div
                className={`${template.bgClass} rounded-2xl border-2 border-foreground shadow-[8px_8px_0px_0px_currentColor] p-4 md:p-8 flex items-center justify-center overflow-hidden`}
              >
                {template.screenshot ? (
                  <img
                    src={template.screenshot}
                    alt={template.name}
                    className="w-full h-auto rounded-lg border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] object-cover max-h-[600px]"
                  />
                ) : (
                  <div className="p-8 md:p-12 bg-white/70 backdrop-blur-sm rounded-xl">
                    <IconComponent
                      className={`w-32 h-32 md:w-48 md:h-48 ${template.colorClass}`}
                    />
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FEATURES — "What's inside" (notionsecondbrain.com style) */}
      {localeFeatures.length > 0 && (
        <section className="py-12 md:py-20 border-t-2 border-foreground">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection delay={150}>
                <h2 className="text-2xl md:text-4xl font-extrabold font-display text-center mb-4">
                  {isRu ? "Что внутри" : "What's inside"}
                </h2>
                <p className="text-center text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
                  {isRu
                    ? "Всё, что вы получите с этим шаблоном:"
                    : "Everything you get with this template:"}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {localeFeatures.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl border-2 border-foreground/10 hover:border-foreground/30 transition-colors"
                    >
                      <div
                        className={`p-1.5 rounded-full ${template.bgClass} shrink-0 mt-0.5`}
                      >
                        <Check className={`w-4 h-4 ${template.colorClass}`} />
                      </div>
                      <span className="text-sm md:text-base text-foreground/80 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}

      {/* PRICING (notionsecondbrain.com style — dark card) */}
      <section className="py-12 md:py-20 border-t-2 border-foreground">
        <div className="container">
          <div className="max-w-lg mx-auto">
            <AnimatedSection delay={200}>
              <h2 className="text-2xl md:text-4xl font-extrabold font-display text-center mb-8">
                {isRu ? "Оплатите один раз — используйте навсегда" : "Pay once, use forever."}
              </h2>

              <div className="bg-foreground text-background rounded-2xl p-8 md:p-10 space-y-6">
                <div className="text-center">
                  <p className="text-sm font-semibold uppercase tracking-wider text-background/60 mb-2">
                    {template.name}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-4xl md:text-5xl font-extrabold font-display">
                      {isPaid ? `$${template.price}` : isRu ? "Бесплатно" : "Free"}
                    </span>
                  </div>
                  <p className="text-sm text-background/60 mt-2">
                    {isPaid
                      ? isRu
                        ? "Разовая оплата"
                        : "One-time payment"
                      : isRu
                      ? "Без оплаты"
                      : "No payment required"}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-accent-lime shrink-0" />
                    <span className="text-sm">
                      {isRu ? "Доступ к шаблону" : "Template access"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-accent-lime shrink-0" />
                    <span className="text-sm">
                      {isRu ? "Руководство Quick Start" : "Quick Start guide"}
                    </span>
                  </div>
                  {isPaid && (
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-accent-lime shrink-0" />
                      <span className="text-sm">
                        {isRu
                          ? "14 дней гарантии возврата"
                          : "14-day money-back guarantee"}
                      </span>
                    </div>
                  )}
                  {!isPaid && (
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-accent-lime shrink-0" />
                      <span className="text-sm">
                        {isRu
                          ? "Работает на бесплатном плане Notion"
                          : "Works on Notion's free plan"}
                      </span>
                    </div>
                  )}
                </div>

                <a
                  href={marketplaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3 bg-background text-foreground font-bold uppercase tracking-wider text-sm rounded-full hover:bg-background/80 transition-colors"
                >
                  {isPaid
                    ? isRu
                      ? `Купить за $${template.price}`
                      : `Get Template — $${template.price}`
                    : isRu
                    ? "Получить бесплатно"
                    : "Get Free Template"}
                </a>

                <p className="text-center text-xs text-background/40">
                  {isRu
                    ? "Оплата через Notion Marketplace"
                    : "Payment secured on Notion Marketplace"}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — 3 steps */}
      <section className="py-12 md:py-20 border-t-2 border-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection delay={250}>
              <h2 className="text-2xl md:text-4xl font-extrabold font-display text-center mb-12">
                {isRu
                  ? "Ваш шаблон готов за 3 шага"
                  : "Your template ready in 1, 2, 3"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    num: "1",
                    title: isRu ? "Дублируйте" : "Duplicate",
                    desc: isRu
                      ? "Нажмите «Duplicate» на странице шаблона в Notion"
                      : "Click \"Duplicate\" on the template page in Notion",
                  },
                  {
                    num: "2",
                    title: isRu ? "Настройте" : "Set up",
                    desc: isRu
                      ? "Шаблон появится в вашем workspace — заполните свои данные"
                      : "The template appears in your workspace — fill in your data",
                  },
                  {
                    num: "3",
                    title: isRu ? "Кастомизируйте" : "Customize",
                    desc: isRu
                      ? "Меняйте вьюхи, свойства и дизайн под свои нужды"
                      : "Customize views, properties, and design to fit your needs",
                  },
                ].map((step) => (
                  <div key={step.num} className="text-center">
                    <div className="text-6xl md:text-8xl font-extrabold font-display text-foreground/5 mb-4 select-none">
                      {step.num}
                    </div>
                    <h3 className="text-lg font-bold font-display mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ (notionsecondbrain.com style — accordion) */}
      <section className="py-12 md:py-20 border-t-2 border-foreground">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <AnimatedSection delay={300}>
              <h2 className="text-2xl md:text-4xl font-extrabold font-display text-center mb-8">
                {isRu ? "Частые вопросы" : "Frequently Asked Questions"}
              </h2>

              <div className="space-y-3">
                {faqItems.map((faq, i) => (
                  <div
                    key={i}
                    className="border-2 border-foreground/10 rounded-xl overflow-hidden hover:border-foreground/20 transition-colors"
                  >
                    <button
                      onClick={() =>
                        setOpenFaq(openFaq === i ? null : i)
                      }
                      className="w-full flex items-center justify-between p-4 text-left"
                    >
                      <span className="text-sm md:text-base font-bold pr-4">
                        {faq.q}
                      </span>
                      {openFaq === i ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                      )}
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* RELATED TEMPLATES */}
      {relatedTemplates.length > 0 && (
        <section className="py-12 md:py-20 border-t-2 border-foreground bg-muted/30">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <AnimatedSection delay={350}>
                <h2 className="text-2xl md:text-3xl font-bold font-display text-center mb-8">
                  {isRu ? "Похожие шаблоны" : "Related Templates"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedTemplates.map((rt) => {
                    const RtIcon = iconMap[rt.icon] || Brain;
                    return (
                      <Link
                        key={rt.slug}
                        to={`/notion/${rt.slug}`}
                        className="block group"
                      >
                        <Card className="h-full rounded-none border-2 border-foreground shadow-[3px_3px_0px_0px_currentColor] bg-card hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[5px_5px_0px_0px_currentColor] transition-all overflow-hidden">
                          <div
                            className={`${rt.bgClass} p-4 flex items-center justify-center border-b border-foreground/10`}
                          >
                            <div className="p-3 rounded-xl bg-white/60">
                              <RtIcon
                                className={`w-8 h-8 ${rt.colorClass}`}
                              />
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="text-base font-bold font-display group-hover:text-pastel-blue transition-colors mb-1">
                              {rt.name}
                            </h3>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {isRu
                                  ? rt.category.ru
                                  : rt.category.en}
                              </span>
                              <span
                                className={`text-sm font-bold ${
                                  rt.price > 0
                                    ? "text-pastel-pink"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {rt.price > 0
                                  ? `$${rt.price}`
                                  : isRu
                                  ? "Бесплатно"
                                  : "Free"}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}
    </PageTransition>
  );
};

export default NotionTemplateDetail;