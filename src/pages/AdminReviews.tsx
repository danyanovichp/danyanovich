import { useTranslation } from "react-i18next";
import { Check, X, Trash2, Star, Loader2, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAdminReviews } from "@/hooks/usePublicReviews";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const AdminReviews = () => {
  const { i18n } = useTranslation();
  const { allReviews, isLoading, approveReview, rejectReview, deleteReview } = useAdminReviews();
  const { isAdmin, isLoading: authLoading } = useAuth();
  const isRu = i18n.language === 'ru';

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  const pendingReviews = allReviews.filter(r => !r.is_approved && r.is_visible);
  const approvedReviews = allReviews.filter(r => r.is_approved);
  const rejectedReviews = allReviews.filter(r => !r.is_visible);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          {isRu ? 'Модерация отзывов' : 'Review Moderation'}
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Pending Reviews */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                  {pendingReviews.length}
                </Badge>
                {isRu ? 'Ожидают модерации' : 'Pending Moderation'}
              </h2>
              
              {pendingReviews.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  {isRu ? 'Нет отзывов на модерацию' : 'No reviews pending'}
                </p>
              ) : (
                <div className="grid gap-4">
                  {pendingReviews.map((review) => (
                    <Card key={review.id} className="p-4">
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
                                />
                              ))}
                            </div>
                            <span className="font-medium text-sm">{review.author_name}</span>
                            {review.email && (
                              <a 
                                href={`mailto:${review.email}`}
                                className="text-muted-foreground hover:text-foreground"
                              >
                                <Mail className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{review.review_text}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(review.created_at).toLocaleString(isRu ? 'ru-RU' : 'en-US')}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => approveReview(review.id)}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            {isRu ? 'Одобрить' : 'Approve'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => rejectReview(review.id)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            {isRu ? 'Отклонить' : 'Reject'}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </section>

            {/* Approved Reviews */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Badge variant="outline" className="text-green-600 border-green-600">
                  {approvedReviews.length}
                </Badge>
                {isRu ? 'Опубликованные' : 'Published'}
              </h2>
              
              {approvedReviews.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  {isRu ? 'Нет опубликованных отзывов' : 'No published reviews'}
                </p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {approvedReviews.map((review) => (
                    <Card key={review.id} className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
                                />
                              ))}
                            </div>
                            <span className="font-medium text-sm">{review.author_name}</span>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive"
                            onClick={() => deleteReview(review.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{review.review_text}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </section>

            {/* Rejected Reviews */}
            {rejectedReviews.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Badge variant="outline" className="text-red-600 border-red-600">
                    {rejectedReviews.length}
                  </Badge>
                  {isRu ? 'Отклонённые' : 'Rejected'}
                </h2>
                
                <div className="grid gap-4 md:grid-cols-2">
                  {rejectedReviews.map((review) => (
                    <Card key={review.id} className="p-4 opacity-60">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{review.author_name}</span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive"
                            onClick={() => deleteReview(review.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{review.review_text}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviews;
