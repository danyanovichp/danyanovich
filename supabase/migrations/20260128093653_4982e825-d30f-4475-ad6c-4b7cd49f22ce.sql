-- Create a public view that excludes email field
CREATE VIEW public.public_reviews_visible
WITH (security_invoker=on) AS
  SELECT id, author_name, review_text, rating, is_approved, is_visible, created_at
  FROM public.public_reviews
  WHERE is_approved = true AND is_visible = true;

-- Drop the existing public SELECT policy
DROP POLICY IF EXISTS "Public can view approved reviews" ON public.public_reviews;

-- Create new restrictive policy - public can only access via the view, not direct table
-- But we need admins to still see emails for moderation
-- So we keep a policy for admins only on direct table access
CREATE POLICY "Only admins can directly select reviews" 
ON public.public_reviews 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));