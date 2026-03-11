import { useTranslation } from "react-i18next";
import { Star, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import SEO, { getReviewsSchema, getBreadcrumbSchema } from "@/components/SEO";
import { SITE_URL } from "@/seo/site";
import { usePublicReviews } from "@/hooks/usePublicReviews";

const Reviews = () => {
  const { i18n, t } = useTranslation();
  const { reviews, isLoading } = usePublicReviews();
  const isRu = i18n.language === 'ru';

  const reviewsSchema = getReviewsSchema(isRu);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isRu ? 'Главная' : 'Home', url: SITE_URL },
    { name: isRu ? 'Отзывы' : 'Reviews', url: `${SITE_URL}/reviews` },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        titleRu="Отзывы клиентов | Дэн Янович"
        titleEn="Client Reviews | Dan Yanovich"
        descriptionRu="Отзывы о шаблонах Notion и консультациях от Дэна Яновича. Реальные истории успеха клиентов."
        descriptionEn="Reviews about Notion templates and consultations from Dan Yanovich. Real client success stories."
        url="/reviews"
        structuredData={[reviewsSchema, breadcrumbSchema]}
      />

      {/* Hero Section */}
      <section className="bg-pastel-pink py-16 md:py-20 border-b-2 border-foreground">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4 bg-card border-2 border-foreground shadow-[8px_8px_0px_0px_currentColor] p-8">
            <h1 className="text-3xl md:text-5xl font-bold font-display">{t('reviews.title')}</h1>
            <p className="text-base md:text-lg font-medium">{t('reviews.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Reviews List */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : reviews.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {reviews.map((review) => (
                  <Card key={review.id} className="p-6 space-y-4 rounded-none border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_currentColor] transition-all bg-card">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'text-foreground fill-foreground' : 'text-muted-foreground'}`}
                        />
                      ))}
                    </div>
                    <p className="text-sm font-medium">{review.review_text}</p>
                    <div className="flex items-center justify-between border-t-2 border-foreground pt-4 mt-2">
                      <span className="font-bold text-sm uppercase tracking-wider">{review.author_name}</span>
                      <span className="text-xs font-bold text-foreground/70">
                        {new Date(review.created_at).toLocaleDateString(isRu ? 'ru-RU' : 'en-US')}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="flex justify-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-8 w-8 text-muted-foreground" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  {isRu ? 'Пока нет отзывов.' : 'No reviews yet.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
