-- Таблица для публичных отзывов от посетителей
CREATE TABLE public.public_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  review_text text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  email text,
  is_approved boolean DEFAULT false,
  is_visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Валидация рейтинга через триггер (вместо CHECK constraint)
CREATE OR REPLACE FUNCTION public.validate_review_rating()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.rating < 1 OR NEW.rating > 5 THEN
    RAISE EXCEPTION 'Rating must be between 1 and 5';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER validate_review_rating_trigger
BEFORE INSERT OR UPDATE ON public.public_reviews
FOR EACH ROW
EXECUTE FUNCTION public.validate_review_rating();

-- Триггер для updated_at
CREATE TRIGGER update_public_reviews_updated_at
BEFORE UPDATE ON public.public_reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Включить RLS
ALTER TABLE public.public_reviews ENABLE ROW LEVEL SECURITY;

-- Любой может отправить отзыв
CREATE POLICY "Anyone can submit reviews" 
ON public.public_reviews 
FOR INSERT 
WITH CHECK (true);

-- Только одобренные отзывы видны публично
CREATE POLICY "Public can view approved reviews"
ON public.public_reviews 
FOR SELECT
USING (is_approved = true AND is_visible = true);

-- Админы управляют всеми отзывами
CREATE POLICY "Admins can manage all reviews"
ON public.public_reviews 
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));