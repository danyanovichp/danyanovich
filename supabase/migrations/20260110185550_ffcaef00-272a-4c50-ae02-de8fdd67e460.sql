-- Add screenshots column to template_landings
ALTER TABLE public.template_landings 
ADD COLUMN screenshots jsonb DEFAULT '[]'::jsonb;

-- Create storage bucket for landing screenshots
INSERT INTO storage.buckets (id, name, public) 
VALUES ('landing-screenshots', 'landing-screenshots', true);

-- Allow anyone to view screenshots (public bucket)
CREATE POLICY "Anyone can view landing screenshots"
ON storage.objects FOR SELECT
USING (bucket_id = 'landing-screenshots');

-- Only admins can upload screenshots
CREATE POLICY "Admins can upload landing screenshots"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'landing-screenshots' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Only admins can update screenshots
CREATE POLICY "Admins can update landing screenshots"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'landing-screenshots' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Only admins can delete screenshots
CREATE POLICY "Admins can delete landing screenshots"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'landing-screenshots' 
  AND public.has_role(auth.uid(), 'admin')
);