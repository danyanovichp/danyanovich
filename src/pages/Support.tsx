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


        {/* Main Donation Card (Combined Hero & Donation) */}
        <section className="container mx-auto px-4 pt-24 pb-12 relative z-10">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto">
              <div className="rounded-none p-8 md:p-12 bg-card border-2 border-foreground shadow-[8px_8px_0px_0px_currentColor] text-center transition-all hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0px_0px_currentColor]">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-none bg-pastel-yellow border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] mb-6">
                  <Heart className="h-8 w-8 text-foreground" />
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  {isRu ? 'Поддержать' : 'Support Me'}
                </h1>
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed max-w-xl mx-auto">
                  {isRu
                    ? 'Если мои шаблоны, контент или консультации были вам полезны — вы можете поддержать мою работу. Это помогает создавать больше качественных материалов. 🙏'
                    : 'If my templates, content, or consulting have been helpful to you — you can support my work. It helps me create more quality materials. 🙏'}
                </p>
                <a
                  href={isRu ? "https://web.tribute.tg/d/GFn" : "https://web.tribute.tg/d/GFk"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full sm:w-auto gap-2 bg-foreground text-background border-2 border-foreground px-8 py-4 text-lg rounded-none font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_currentColor] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_0px_currentColor] transition-all"
                >
                  {isRu ? 'Поддержать' : 'Support'}
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Crypto Quick Donation */}
        <section className="container mx-auto px-4 pb-12 relative z-10">
          <AnimatedSection delay={100}>
            <div className="max-w-2xl mx-auto">
              <div className="rounded-none p-6 bg-muted/30 border-2 border-foreground border-dashed text-center flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4 text-left">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-none bg-pastel-yellow border-2 border-foreground shrink-0">
                    <CreditCard className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg">
                      {isRu ? 'Криптовалюта' : 'Cryptocurrency'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isRu
                        ? 'Также вы можете поддержать меня криптой'
                        : 'You can also support me with crypto'}
                    </p>
                  </div>
                </div>
                <a
                  href="https://nowpayments.io/donation/danyanovich"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full md:w-auto gap-2 bg-transparent text-foreground border-2 border-foreground px-5 py-2.5 sm:text-sm rounded-none font-bold uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors shrink-0"
                >
                  {isRu ? 'Отправить крипту' : 'Send Crypto'}
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
