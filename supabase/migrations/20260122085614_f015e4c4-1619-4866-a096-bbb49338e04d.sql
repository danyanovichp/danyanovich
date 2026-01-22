-- Add public SELECT policy for template_landings
-- This allows public users to view template landing pages (marketing content)
-- Admin write operations remain protected by existing policies

CREATE POLICY "Public can view template_landings" 
ON public.template_landings 
FOR SELECT 
USING (true);