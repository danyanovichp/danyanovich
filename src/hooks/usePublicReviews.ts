import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PublicReview {
  id: string;
  author_name: string;
  review_text: string;
  rating: number;
  email?: string;
  is_approved: boolean;
  is_visible: boolean;
  created_at: string;
}

export interface ReviewFormData {
  author_name: string;
  review_text: string;
  rating: number;
  email?: string;
}

export function usePublicReviews() {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchReviews = async () => {
    try {
      // Use the view that excludes email for public access
      const { data, error } = await supabase
        .from('public_reviews_visible')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews((data as PublicReview[]) || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitReview = async (formData: ReviewFormData): Promise<boolean> => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('public_reviews')
        .insert({
          author_name: formData.author_name.trim(),
          review_text: formData.review_text.trim(),
          rating: formData.rating,
          email: formData.email?.trim() || null
        });

      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error submitting review:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    reviews,
    isLoading,
    isSubmitting,
    submitReview,
    refetch: fetchReviews
  };
}

// Hook for admin to manage all reviews
export function useAdminReviews() {
  const [allReviews, setAllReviews] = useState<PublicReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchAllReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('public_reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAllReviews((data as PublicReview[]) || []);
    } catch (error) {
      console.error('Error fetching all reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const approveReview = async (id: string) => {
    try {
      const { error } = await supabase
        .from('public_reviews')
        .update({ is_approved: true })
        .eq('id', id);

      if (error) throw error;
      
      toast({ title: 'Отзыв одобрен' });
      fetchAllReviews();
    } catch (error) {
      console.error('Error approving review:', error);
      toast({ title: 'Ошибка', variant: 'destructive' });
    }
  };

  const rejectReview = async (id: string) => {
    try {
      const { error } = await supabase
        .from('public_reviews')
        .update({ is_approved: false, is_visible: false })
        .eq('id', id);

      if (error) throw error;
      
      toast({ title: 'Отзыв отклонён' });
      fetchAllReviews();
    } catch (error) {
      console.error('Error rejecting review:', error);
      toast({ title: 'Ошибка', variant: 'destructive' });
    }
  };

  const deleteReview = async (id: string) => {
    try {
      const { error } = await supabase
        .from('public_reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({ title: 'Отзыв удалён' });
      fetchAllReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      toast({ title: 'Ошибка', variant: 'destructive' });
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  return {
    allReviews,
    isLoading,
    approveReview,
    rejectReview,
    deleteReview,
    refetch: fetchAllReviews
  };
}
