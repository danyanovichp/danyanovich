import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

const Reviews = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="bg-muted/30 py-16 md:py-20 border-b">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold">{t('reviews.title')}</h1>
            <p className="text-base md:text-lg text-muted-foreground">{t('reviews.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 md:py-20 flex-1 flex items-center justify-center">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            {/* Stars */}
            <div className="flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-10 w-10 text-foreground fill-foreground" />
              ))}
            </div>

            {/* Message */}
            <Card className="p-12 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">
                {t('reviews.comingSoon')}
              </h2>
              <p className="text-base text-muted-foreground">
                {i18n.language === 'ru' 
                  ? 'Здесь скоро появятся отзывы клиентов о моих услугах и шаблонах.'
                  : 'Client reviews about my services and templates will appear here soon.'}
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
