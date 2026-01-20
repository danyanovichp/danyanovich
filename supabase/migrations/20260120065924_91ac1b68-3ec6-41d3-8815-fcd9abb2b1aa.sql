-- ===========================================
-- Таблица для FAQ вопросов и ответов
-- ===========================================
CREATE TABLE public.template_faq (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id text NOT NULL,
  question_ru text NOT NULL,
  question_en text,
  answer_ru text NOT NULL,
  answer_en text,
  sort_order int DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.template_faq ENABLE ROW LEVEL SECURITY;

-- RLS policies for template_faq
CREATE POLICY "Admins can manage template_faq"
  ON public.template_faq
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view template_faq"
  ON public.template_faq
  FOR SELECT
  USING (true);

-- Trigger for updated_at
CREATE TRIGGER update_template_faq_updated_at
  BEFORE UPDATE ON public.template_faq
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ===========================================
-- Таблица для отзывов
-- ===========================================
CREATE TABLE public.template_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id text NOT NULL,
  author_name text NOT NULL,
  author_avatar text,
  rating int NOT NULL DEFAULT 5,
  review_text_ru text NOT NULL,
  review_text_en text,
  is_featured boolean DEFAULT false,
  is_visible boolean DEFAULT true,
  source_link text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT rating_range CHECK (rating >= 1 AND rating <= 5)
);

-- Enable RLS
ALTER TABLE public.template_reviews ENABLE ROW LEVEL SECURITY;

-- RLS policies for template_reviews
CREATE POLICY "Admins can manage template_reviews"
  ON public.template_reviews
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view visible template_reviews"
  ON public.template_reviews
  FOR SELECT
  USING (is_visible = true);

-- Trigger for updated_at
CREATE TRIGGER update_template_reviews_updated_at
  BEFORE UPDATE ON public.template_reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ===========================================
-- Таблица для тегов
-- ===========================================
CREATE TABLE public.template_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_ru text NOT NULL UNIQUE,
  name_en text,
  color text DEFAULT '#6B7280',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.template_tags ENABLE ROW LEVEL SECURITY;

-- RLS policies for template_tags
CREATE POLICY "Admins can manage template_tags"
  ON public.template_tags
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view template_tags"
  ON public.template_tags
  FOR SELECT
  USING (true);

-- ===========================================
-- Связь шаблонов и тегов
-- ===========================================
CREATE TABLE public.template_tag_relations (
  template_id text NOT NULL,
  tag_id uuid NOT NULL REFERENCES public.template_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (template_id, tag_id)
);

-- Enable RLS
ALTER TABLE public.template_tag_relations ENABLE ROW LEVEL SECURITY;

-- RLS policies for template_tag_relations
CREATE POLICY "Admins can manage template_tag_relations"
  ON public.template_tag_relations
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view template_tag_relations"
  ON public.template_tag_relations
  FOR SELECT
  USING (true);

-- ===========================================
-- Новые поля в template_landings
-- ===========================================
ALTER TABLE public.template_landings 
ADD COLUMN IF NOT EXISTS video_url text,
ADD COLUMN IF NOT EXISTS seo_title_ru text,
ADD COLUMN IF NOT EXISTS seo_title_en text,
ADD COLUMN IF NOT EXISTS seo_description_ru text,
ADD COLUMN IF NOT EXISTS seo_description_en text,
ADD COLUMN IF NOT EXISTS seo_keywords text;

-- ===========================================
-- Новые поля в products для скидок и аналитики
-- ===========================================
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS discount_percent int,
ADD COLUMN IF NOT EXISTS discount_end_date date,
ADD COLUMN IF NOT EXISTS promo_text text,
ADD COLUMN IF NOT EXISTS view_count int DEFAULT 0;

-- ===========================================
-- Обновление RPC функций для новых полей
-- ===========================================
DROP FUNCTION IF EXISTS public.get_public_template_landing(text);
CREATE OR REPLACE FUNCTION public.get_public_template_landing(p_template_id text)
RETURNS TABLE(
  id uuid,
  template_id text,
  headline text,
  subheadline text,
  solution_intro text,
  solution_description text,
  main_image text,
  features jsonb,
  views jsonb,
  target_audience jsonb,
  screenshots jsonb,
  pain_points jsonb,
  video_url text,
  seo_title_ru text,
  seo_title_en text,
  seo_description_ru text,
  seo_description_en text,
  seo_keywords text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT 
    tl.id,
    tl.template_id,
    tl.headline,
    tl.subheadline,
    tl.solution_intro,
    tl.solution_description,
    tl.main_image,
    tl.features,
    tl.views,
    tl.target_audience,
    tl.screenshots,
    tl.pain_points,
    tl.video_url,
    tl.seo_title_ru,
    tl.seo_title_en,
    tl.seo_description_ru,
    tl.seo_description_en,
    tl.seo_keywords,
    tl.created_at,
    tl.updated_at
  FROM public.template_landings tl
  WHERE tl.template_id = p_template_id;
$$;

DROP FUNCTION IF EXISTS public.get_all_public_template_landings();
CREATE OR REPLACE FUNCTION public.get_all_public_template_landings()
RETURNS TABLE(
  id uuid,
  template_id text,
  headline text,
  subheadline text,
  solution_intro text,
  solution_description text,
  main_image text,
  features jsonb,
  views jsonb,
  target_audience jsonb,
  screenshots jsonb,
  pain_points jsonb,
  video_url text,
  seo_title_ru text,
  seo_title_en text,
  seo_description_ru text,
  seo_description_en text,
  seo_keywords text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT 
    tl.id,
    tl.template_id,
    tl.headline,
    tl.subheadline,
    tl.solution_intro,
    tl.solution_description,
    tl.main_image,
    tl.features,
    tl.views,
    tl.target_audience,
    tl.screenshots,
    tl.pain_points,
    tl.video_url,
    tl.seo_title_ru,
    tl.seo_title_en,
    tl.seo_description_ru,
    tl.seo_description_en,
    tl.seo_keywords,
    tl.created_at,
    tl.updated_at
  FROM public.template_landings tl;
$$;