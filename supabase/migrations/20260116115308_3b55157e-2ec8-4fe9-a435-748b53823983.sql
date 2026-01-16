-- Add main_image column to template_landings table
ALTER TABLE public.template_landings 
ADD COLUMN main_image text;