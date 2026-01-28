import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Star, Send, Loader2, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SEO, { getReviewsSchema, getBreadcrumbSchema } from "@/components/SEO";
import { usePublicReviews, ReviewFormData, checkReviewRateLimit } from "@/hooks/usePublicReviews";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const reviewSchema = z.object({
  author_name: z.string()
    .trim()
    .min(2, "Минимум 2 символа")
    .max(50, "Максимум 50 символов"),
  review_text: z.string()
    .trim()
    .min(10, "Минимум 10 символов")
    .max(1000, "Максимум 1000 символов"),
  rating: z.number().min(1).max(5),
  email: z.string().email("Неверный формат email").optional().or(z.literal(''))
});

const Reviews = () => {
  const { t, i18n } = useTranslation();
  const { reviews, isLoading, isSubmitting, submitReview } = usePublicReviews();
  const { toast } = useToast();
  const isRu = i18n.language === 'ru';

  const [formData, setFormData] = useState<ReviewFormData>({
    author_name: '',
    review_text: '',
    rating: 5,
    email: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [rateLimitSeconds, setRateLimitSeconds] = useState(0);

  // Check rate limit on mount and periodically
  useEffect(() => {
    const checkLimit = () => {
      const status = checkReviewRateLimit();
      setRateLimitSeconds(status.remainingSeconds);
    };
    
    checkLimit();
    const interval = setInterval(checkLimit, 1000);
    return () => clearInterval(interval);
  }, []);

  const reviewsSchema = getReviewsSchema(isRu);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isRu ? 'Главная' : 'Home', url: 'https://danyanovich.com' },
    { name: isRu ? 'Отзывы' : 'Reviews', url: 'https://danyanovich.com/reviews' },
  ]);

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const isRateLimited = rateLimitSeconds > 0;
  const rateLimitMinutes = Math.ceil(rateLimitSeconds / 60);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Check rate limit first
    if (isRateLimited) {
      toast({
        title: isRu ? 'Подождите' : 'Please wait',
        description: isRu 
          ? `Вы сможете отправить следующий отзыв через ${rateLimitMinutes} мин.`
          : `You can submit another review in ${rateLimitMinutes} min.`,
        variant: 'destructive'
      });
      return;
    }

    try {
      reviewSchema.parse(formData);
      await submitReview({
        author_name: formData.author_name,
        review_text: formData.review_text,
        rating: formData.rating,
        email: formData.email
      });
      
      setSubmitted(true);
      setFormData({ author_name: '', review_text: '', rating: 5, email: '' });
      
      toast({
        title: isRu ? 'Спасибо за отзыв!' : 'Thank you for your review!',
        description: isRu 
          ? 'Ваш отзыв будет опубликован после модерации.' 
          : 'Your review will be published after moderation.'
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else if (error instanceof Error && error.message.startsWith('RATE_LIMITED:')) {
        const minutes = error.message.split(':')[1];
        toast({
          title: isRu ? 'Подождите' : 'Please wait',
          description: isRu 
            ? `Вы сможете отправить следующий отзыв через ${minutes} мин.`
            : `You can submit another review in ${minutes} min.`,
          variant: 'destructive'
        });
      } else {
        toast({
          title: isRu ? 'Ошибка' : 'Error',
          description: isRu ? 'Не удалось отправить отзыв' : 'Failed to submit review',
          variant: 'destructive'
        });
      }
    }
  };

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
                  {isRu ? 'Пока нет отзывов. Станьте первым!' : 'No reviews yet. Be the first!'}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Submit Review Form */}
      <section className="py-12 md:py-16 bg-muted/30 border-t">
        <div className="container">
          <div className="max-w-xl mx-auto">
            <Card className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
                {isRu ? 'Оставить отзыв' : 'Leave a Review'}
              </h2>
              
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    {isRu 
                      ? 'Спасибо! Ваш отзыв появится после проверки.' 
                      : 'Thank you! Your review will appear after verification.'}
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSubmitted(false)}
                  >
                    {isRu ? 'Написать ещё' : 'Write another'}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Rating */}
                  <div className="space-y-2">
                    <Label>{isRu ? 'Оценка' : 'Rating'} *</Label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingClick(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star 
                            className={`h-8 w-8 ${star <= formData.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="author_name">{isRu ? 'Как вас представить?' : 'Your name'} *</Label>
                    <Input
                      id="author_name"
                      value={formData.author_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
                      placeholder={isRu ? 'Иван' : 'John'}
                      maxLength={50}
                    />
                    {errors.author_name && (
                      <p className="text-xs text-destructive">{errors.author_name}</p>
                    )}
                  </div>

                  {/* Review Text */}
                  <div className="space-y-2">
                    <Label htmlFor="review_text">{isRu ? 'Ваш отзыв' : 'Your review'} *</Label>
                    <Textarea
                      id="review_text"
                      value={formData.review_text}
                      onChange={(e) => setFormData(prev => ({ ...prev, review_text: e.target.value }))}
                      placeholder={isRu 
                        ? 'Расскажите о вашем опыте использования шаблонов...' 
                        : 'Tell us about your experience with the templates...'}
                      rows={4}
                      maxLength={1000}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      {errors.review_text ? (
                        <p className="text-destructive">{errors.review_text}</p>
                      ) : (
                        <span>{isRu ? 'Минимум 10 символов' : 'Minimum 10 characters'}</span>
                      )}
                      <span>{formData.review_text.length}/1000</span>
                    </div>
                  </div>

                  {/* Email (optional) */}
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-muted-foreground text-xs">({isRu ? 'необязательно' : 'optional'})</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="email@example.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {isRu 
                        ? 'Для обратной связи. Не будет опубликован.' 
                        : 'For feedback. Will not be published.'}
                    </p>
                  </div>

                  {/* Rate limit warning */}
                  {isRateLimited && (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        {isRu 
                          ? `Следующий отзыв можно отправить через ${rateLimitMinutes} мин.`
                          : `You can submit another review in ${rateLimitMinutes} min.`}
                      </span>
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isSubmitting || isRateLimited}>
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : isRateLimited ? (
                      <Clock className="h-4 w-4 mr-2" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    {isRu ? 'Отправить отзыв' : 'Submit Review'}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    {isRu 
                      ? 'Отзыв появится на сайте после проверки модератором.' 
                      : 'The review will appear on the site after moderation.'}
                  </p>
                </form>
              )}
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
