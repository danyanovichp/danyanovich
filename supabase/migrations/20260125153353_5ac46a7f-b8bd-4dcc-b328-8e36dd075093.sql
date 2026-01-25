-- Drop the problematic public SELECT policy that exposes created_by field
-- Public access should go through RPC functions which exclude sensitive fields
DROP POLICY IF EXISTS "Public can view template_landings" ON public.template_landings;