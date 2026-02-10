-- Fix: Remove public SELECT policy on template_landings
-- Public access is handled via SECURITY DEFINER RPC functions 
-- (get_public_template_landing, get_all_public_template_landings) 
-- which don't expose the created_by field
DROP POLICY IF EXISTS "Public can view template_landings" ON public.template_landings;