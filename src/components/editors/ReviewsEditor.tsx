import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, Trash2, Save, Loader2, Star, Quote, ExternalLink } from "lucide-react";
import { useTemplateReviews } from "@/hooks/useTemplateReviews";

interface ReviewsEditorProps {
  templateId: string;
}

export function ReviewsEditor({ templateId }: ReviewsEditorProps) {
  const {
    reviews,
    isLoading,
    isSaving,
    addReview,
    removeReview,
    updateReview,
    saveReview,
  } = useTemplateReviews(templateId);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Quote className="h-5 w-5" />
          Отзывы ({reviews.length})
        </CardTitle>
        <Button variant="outline" size="sm" onClick={addReview}>
          <Plus className="h-4 w-4 mr-1" />
          Добавить
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Нет отзывов. Нажмите "Добавить" для создания нового отзыва.
          </p>
        ) : (
          <Accordion type="multiple" className="space-y-2">
            {reviews.map((review, index) => (
              <AccordionItem
                key={review.id || index}
                value={`review-${index}`}
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 w-full">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium truncate flex-1 text-left">
                      {review.author_name || `Отзыв ${index + 1}`}
                    </span>
                    {review.is_featured && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                        Featured
                      </span>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeReview(index);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Имя автора *</Label>
                      <Input
                        value={review.author_name}
                        onChange={(e) => updateReview(index, "author_name", e.target.value)}
                        placeholder="Иван Петров"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>URL аватара</Label>
                      <Input
                        value={review.author_avatar}
                        onChange={(e) => updateReview(index, "author_avatar", e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Рейтинг</Label>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => updateReview(index, "rating", i + 1)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              i < review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-muted-foreground hover:text-amber-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Текст отзыва (RU) *</Label>
                      <Textarea
                        value={review.review_text_ru}
                        onChange={(e) => updateReview(index, "review_text_ru", e.target.value)}
                        placeholder="Отличный шаблон! Рекомендую всем..."
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Текст отзыва (EN)</Label>
                      <Textarea
                        value={review.review_text_en}
                        onChange={(e) => updateReview(index, "review_text_en", e.target.value)}
                        placeholder="Great template! I recommend it to everyone..."
                        rows={4}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Ссылка на источник</Label>
                    <div className="flex gap-2">
                      <Input
                        value={review.source_link}
                        onChange={(e) => updateReview(index, "source_link", e.target.value)}
                        placeholder="https://kwork.ru/..."
                      />
                      {review.source_link && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => window.open(review.source_link, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-2 border-t">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={review.is_featured}
                          onCheckedChange={(checked) =>
                            updateReview(index, "is_featured", checked)
                          }
                        />
                        <Label className="text-sm">Featured</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={review.is_visible}
                          onCheckedChange={(checked) =>
                            updateReview(index, "is_visible", checked)
                          }
                        />
                        <Label className="text-sm">Видимый</Label>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => saveReview(index)}
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-1" />
                      ) : (
                        <Save className="h-4 w-4 mr-1" />
                      )}
                      Сохранить
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}
