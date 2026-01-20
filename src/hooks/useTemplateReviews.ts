import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface ReviewItem {
  id?: string;
  template_id: string;
  author_name: string;
  author_avatar: string;
  rating: number;
  review_text_ru: string;
  review_text_en: string;
  is_featured: boolean;
  is_visible: boolean;
  source_link: string;
}

export function useTemplateReviews(templateId?: string) {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (templateId) {
      fetchReviews(templateId);
    }
  }, [templateId]);

  const fetchReviews = async (id: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("template_reviews")
        .select("*")
        .eq("template_id", id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReviews(
        (data || []).map(r => ({
          ...r,
          author_avatar: r.author_avatar || "",
          review_text_en: r.review_text_en || "",
          source_link: r.source_link || "",
        }))
      );
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addReview = () => {
    if (!templateId) return;
    setReviews(prev => [
      {
        template_id: templateId,
        author_name: "",
        author_avatar: "",
        rating: 5,
        review_text_ru: "",
        review_text_en: "",
        is_featured: false,
        is_visible: true,
        source_link: "",
      },
      ...prev,
    ]);
  };

  const removeReview = async (index: number) => {
    const review = reviews[index];
    if (review.id) {
      try {
        await supabase.from("template_reviews").delete().eq("id", review.id);
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    }
    setReviews(prev => prev.filter((_, i) => i !== index));
  };

  const updateReview = (
    index: number,
    field: keyof ReviewItem,
    value: string | number | boolean
  ) => {
    setReviews(prev =>
      prev.map((review, i) => (i === index ? { ...review, [field]: value } : review))
    );
  };

  const saveReview = async (index: number) => {
    const review = reviews[index];
    if (!review.author_name.trim() || !review.review_text_ru.trim()) {
      toast({
        title: "Ошибка",
        description: "Заполните имя автора и текст отзыва",
        variant: "destructive",
      });
      return false;
    }

    setIsSaving(true);
    try {
      const dataToSave = {
        template_id: review.template_id,
        author_name: review.author_name,
        author_avatar: review.author_avatar || null,
        rating: review.rating,
        review_text_ru: review.review_text_ru,
        review_text_en: review.review_text_en || null,
        is_featured: review.is_featured,
        is_visible: review.is_visible,
        source_link: review.source_link || null,
      };

      if (review.id) {
        const { error } = await supabase
          .from("template_reviews")
          .update(dataToSave)
          .eq("id", review.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("template_reviews")
          .insert(dataToSave)
          .select()
          .single();
        if (error) throw error;
        setReviews(prev =>
          prev.map((r, i) => (i === index ? { ...r, id: data.id } : r))
        );
      }

      toast({
        title: "Сохранено",
        description: "Отзыв успешно сохранён",
      });
      return true;
    } catch (error: any) {
      console.error("Error saving review:", error);
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось сохранить отзыв",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    reviews,
    isLoading,
    isSaving,
    addReview,
    removeReview,
    updateReview,
    saveReview,
    refetch: () => templateId && fetchReviews(templateId),
  };
}
