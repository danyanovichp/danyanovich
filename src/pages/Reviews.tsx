import { useTranslation } from "react-i18next";
import { Star, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import SEO, { getReviewsSchema, getBreadcrumbSchema } from "@/components/SEO";
import { usePublicReviews } from "@/hooks/usePublicReviews";

const Reviews = () => {
  const { i18n, t } = useTranslation();
  const { reviews, isLoading } = usePublicReviews();
  const isRu = i18n.language === 'ru';

  const reviewsSchema = getReviewsSchema(isRu);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isRu ? 'Главная' : 'Home', url: 'https://danyanovich.com' },
    { name: isRu ? 'Отзывы' : 'Reviews', url: 'https://danyanovich.com/reviews' },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        titleRu="Отзывы клиентов | Дэн Янович"
        titleEn="Client Reviews | Dan Yanovich"
        descriptionRu="Отзывы о шаблонах Notion и консультациях от Дэна Яновича. Реальные истории успеха клиентов."
        descriptionEn="Reviews about Notion templates and consultations from Dan Yanovich. Real client success stories."
        url="https://danyanovich.com/reviews"
        structuredData={[reviewsSchema, breadcrumbSchema]}
      />

      {/* Hero Section */}
      <section className="bg-muted/30 py-16 md:py-20 border-b">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold">{t('reviews.title')}</h1>
            <p className="text-base md:text-lg text-muted-foreground">{t('reviews.subtitle')}</p>
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
                  <Card key={review.id} className="p-6 space-y-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{review.review_text}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{review.author_name}</span>
                      <span className="text-xs text-muted-foreground">
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
