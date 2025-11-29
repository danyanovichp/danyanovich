import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import PixelDecorations from "@/components/pixel-art/PixelDecorations";

const Reviews = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen relative">
      <PixelDecorations />

      {/* Hero Section */}
      <section className="bg-secondary py-16 md:py-20 border-b-4 border-border relative">
        <div className="container">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-2xl md:text-3xl">{t('reviews.title')}</h1>
            <p className="text-xs md:text-sm text-muted-foreground">
              {t('reviews.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 md:py-20 flex-1 flex items-center justify-center">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            {/* Pixel Stars */}
            <div className="flex justify-center gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pixel-float" style={{ animationDelay: `${i * 0.2}s` }}>
                  <Star className="h-8 w-8 text-brand-amber fill-brand-amber" />
                </div>
              ))}
            </div>

            {/* Message */}
            <div className="pixel-border p-8 bg-background space-y-4">
              <h2 className="text-xl md:text-2xl font-bold">
                {t('reviews.comingSoon')}
              </h2>
              <p className="text-sm text-muted-foreground">
                {i18n.language === 'ru' 
                  ? 'Здесь скоро появятся отзывы клиентов о моих услугах и шаблонах.'
                  : 'Client reviews about my services and templates will appear here soon.'}
              </p>
            </div>

            {/* Pixel character waiting */}
            <div className="w-32 h-32 mx-auto">
              <svg viewBox="0 0 32 32" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
                {/* Simple pixel character waiting */}
                <rect x="12" y="4" width="8" height="8" fill="hsl(var(--brand-indigo))" className="animate-pixel-pulse" />
                <rect x="14" y="6" width="2" height="2" fill="hsl(var(--background))" />
                <rect x="16" y="6" width="2" height="2" fill="hsl(var(--background))" />
                <rect x="8" y="12" width="16" height="8" fill="hsl(var(--brand-amber))" />
                <rect x="10" y="20" width="4" height="8" fill="hsl(var(--primary))" />
                <rect x="18" y="20" width="4" height="8" fill="hsl(var(--primary))" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
