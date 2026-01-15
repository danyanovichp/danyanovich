-- Create products table for managing templates
CREATE TABLE public.products (
  id TEXT PRIMARY KEY,
  icon TEXT NOT NULL DEFAULT 'Layout',
  title_ru TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_ru TEXT NOT NULL,
  description_en TEXT NOT NULL,
  full_description_ru TEXT,
  full_description_en TEXT,
  price TEXT NOT NULL,
  price_value INTEGER NOT NULL DEFAULT 0,
  link TEXT DEFAULT '#',
  buildin_link TEXT,
  image TEXT,
  status TEXT NOT NULL DEFAULT 'development' CHECK (status IN ('available', 'development')),
  category TEXT NOT NULL DEFAULT 'productivity' CHECK (category IN ('business', 'personal', 'productivity', 'finance', 'education', 'health', 'creativity')),
  features_ru JSONB DEFAULT '[]'::jsonb,
  features_en JSONB DEFAULT '[]'::jsonb,
  added_date DATE DEFAULT CURRENT_DATE,
  popularity INTEGER DEFAULT 50,
  is_visible BOOLEAN DEFAULT true,
  display_on_home BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view visible products"
ON public.products
FOR SELECT
USING (true);

-- Admins can manage products
CREATE POLICY "Admins can insert products"
ON public.products
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update products"
ON public.products
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete products"
ON public.products
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();