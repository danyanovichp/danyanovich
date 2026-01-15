-- Fix products SELECT policy to only show visible, non-development products to public
-- Admins should still see all products

-- Drop the existing overly permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can view visible products" ON public.products;

-- Create a policy that allows public to see only visible, available products
CREATE POLICY "Public can view published products"
ON public.products
AS PERMISSIVE
FOR SELECT
USING (
  is_visible = true 
  AND status != 'development'
);

-- Create a policy that allows admins to see ALL products (including drafts)
CREATE POLICY "Admins can view all products"
ON public.products
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));