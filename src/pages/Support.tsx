import { useTranslation } from "react-i18next";
import { Heart, CreditCard, ExternalLink } from "lucide-react";
import SEO from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";

const Support = () => {
  const { i18n } = useTranslation();
  const isRu = i18n.language === 'ru';

  return (
    <>
      <SEO
        titleRu="Поддержать — Дэн Янович"
        titleEn="Support — Dan Yanovich"
        descriptionRu="Поддержите мою работу криптовалютой"
        descriptionEn="Support my work with cryptocurrency"
      />
      <div className="relative min-h-screen">
        

        {/* Hero */}
        <section className="container mx-auto px-4 pt-24 pb-12 relative z-10">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pastel-peach/30 mb-6">
                <Heart className="h-8 w-8 text-foreground" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
                {isRu ? 'Поддержать' : 'Support Me'}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {isRu
                  ? 'Если мои шаблоны, контент или консультации были вам полезны — вы можете поддержать мою работу. Это помогает создавать больше качественных материалов.'
                  : 'If my templates, content, or consulting have been helpful to you — you can support my work. It helps me create more quality materials.'}
              </p>
            </div>
          </AnimatedSection>
        </section>

        {/* NOWPayments Quick Donation */}
        <section className="container mx-auto px-4 pb-12 relative z-10">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto">
              <div className="rounded-2xl p-8 bg-pastel-peach/20 border border-border/10 text-center transition-all hover:scale-[1.01]">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pastel-peach/40 mb-4">
                  <CreditCard className="h-6 w-6 text-foreground" />
                </div>
                <h2 className="font-display text-xl font-semibold mb-2">
                  {isRu ? 'Быстрый донат' : 'Quick Donation'}
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {isRu
                    ? 'Самый простой способ поддержать — через любую криптовалюту в один клик.'
                    : 'The easiest way to support — via any cryptocurrency in one click.'}
                </p>
                <a
                  href="https://nowpayments.io/donation/danyanovich"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  {isRu ? 'Поддержать' : 'Donate Now'}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Crypto Wallets */}

        {/* Motivational */}
        <section className="container mx-auto px-4 pb-24 relative z-10">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-muted-foreground leading-relaxed">
                {isRu
                  ? 'Ваша поддержка идёт на разработку новых шаблонов, создание обучающего контента и развитие open-source проектов. Спасибо! 🙏'
                  : 'Your support goes towards developing new templates, creating educational content, and advancing open-source projects. Thank you! 🙏'}
              </p>
            </div>
          </AnimatedSection>
        </section>
      </div>
    </>
  );
};

export default Support;
