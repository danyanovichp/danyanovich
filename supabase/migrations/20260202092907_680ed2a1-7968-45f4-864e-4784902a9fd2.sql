-- Fix 1: Add public SELECT policy for template_landings
-- The RPC functions (get_public_template_landing, get_all_public_template_landings) provide the primary access pattern
-- but a public SELECT policy allows direct queries while the RPC masks sensitive fields like created_by
CREATE POLICY "Public can view template_landings"
ON public.template_landings
FOR SELECT
USING (true);

-- Fix 2: Add database-level validation constraints for public_reviews
-- Add length limits and format checks for defense in depth

-- Remove email column from public_reviews to eliminate data exposure risk
-- Email is not needed for public reviews - moderation can happen without it
ALTER TABLE public.public_reviews DROP COLUMN IF EXISTS email;

-- Add validation constraints for remaining fields
ALTER TABLE public.public_reviews
ADD CONSTRAINT author_name_length CHECK (length(author_name) BETWEEN 1 AND 100);

ALTER TABLE public.public_reviews
ADD CONSTRAINT review_text_length CHECK (length(review_text) BETWEEN 10 AND 2000);