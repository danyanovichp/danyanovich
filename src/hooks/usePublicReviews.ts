import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Rate limiting constants
const REVIEW_COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes
const REVIEW_COOLDOWN_KEY = 'last_review_submit';

export interface PublicReview {
  id: string;
  author_name: string;
  review_text: string;
  rating: number;
  is_approved: boolean;
  is_visible: boolean;
  created_at: string;
}

export interface ReviewFormData {
  author_name: string;
  review_text: string;
  rating: number;
}

export interface RateLimitStatus {
  canSubmit: boolean;
  remainingSeconds: number;
}

// Check if user can submit a review based on cooldown
export function checkReviewRateLimit(): RateLimitStatus {
  const lastSubmission = localStorage.getItem(REVIEW_COOLDOWN_KEY);
  if (!lastSubmission) {
    return { canSubmit: true, remainingSeconds: 0 };
  }
  
  const elapsed = Date.now() - Number(lastSubmission);
  if (elapsed >= REVIEW_COOLDOWN_MS) {
    return { canSubmit: true, remainingSeconds: 0 };
  }
  
  const remainingMs = REVIEW_COOLDOWN_MS - elapsed;
  return { 
    canSubmit: false, 
    remainingSeconds: Math.ceil(remainingMs / 1000) 
  };
}

// Record a successful submission
function recordReviewSubmission(): void {
  localStorage.setItem(REVIEW_COOLDOWN_KEY, Date.now().toString());
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
    // Check rate limit before submission
    const rateLimit = checkReviewRateLimit();
    if (!rateLimit.canSubmit) {
      const minutes = Math.ceil(rateLimit.remainingSeconds / 60);
      throw new Error(`RATE_LIMITED:${minutes}`);
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('public_reviews')
        .insert({
          author_name: formData.author_name.trim(),
          review_text: formData.review_text.trim(),
          rating: formData.rating
        });

      if (error) throw error;
      
      // Record successful submission for rate limiting
      recordReviewSubmission();
      
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

