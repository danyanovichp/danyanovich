import { useState } from 'react';

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

export function checkReviewRateLimit(): RateLimitStatus {
  return { canSubmit: false, remainingSeconds: 0 };
}

export function usePublicReviews() {
  const [reviews] = useState<PublicReview[]>([]);

  const submitReview = async (_formData: ReviewFormData): Promise<boolean> => {
    return false;
  };

  return {
    reviews,
    isLoading: false,
    isSubmitting: false,
    submitReview,
    refetch: () => { },
  };
}
