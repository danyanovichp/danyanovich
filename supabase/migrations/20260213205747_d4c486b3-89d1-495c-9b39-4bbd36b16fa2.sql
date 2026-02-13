
-- Drop ALL admin policies that depend on has_role function

-- template_landings
DROP POLICY IF EXISTS "Admins can update landings" ON public.template_landings;
DROP POLICY IF EXISTS "Admins can delete landings" ON public.template_landings;
DROP POLICY IF EXISTS "Admins can insert landings" ON public.template_landings;
DROP POLICY IF EXISTS "Admins can view all landings" ON public.template_landings;

-- products
DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
DROP POLICY IF EXISTS "Admins can update products" ON public.products;
DROP POLICY IF EXISTS "Admins can delete products" ON public.products;
DROP POLICY IF EXISTS "Admins can view all products" ON public.products;

-- template_faq
DROP POLICY IF EXISTS "Admins can manage template_faq" ON public.template_faq;

-- template_reviews
DROP POLICY IF EXISTS "Admins can manage template_reviews" ON public.template_reviews;

-- template_tags
DROP POLICY IF EXISTS "Admins can manage template_tags" ON public.template_tags;

-- template_tag_relations
DROP POLICY IF EXISTS "Admins can manage template_tag_relations" ON public.template_tag_relations;

-- public_reviews
DROP POLICY IF EXISTS "Admins can manage all reviews" ON public.public_reviews;
DROP POLICY IF EXISTS "Only admins can directly select reviews" ON public.public_reviews;

-- site_settings
DROP POLICY IF EXISTS "Admins can manage site settings" ON public.site_settings;

-- storage
DROP POLICY IF EXISTS "Admins can upload landing screenshots" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update landing screenshots" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete landing screenshots" ON storage.objects;

-- user_roles policies
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Authenticated users can view their own roles" ON public.user_roles;

-- Now drop the table, function, and type
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP FUNCTION IF EXISTS public.has_role(_user_id uuid, _role app_role);
DROP TYPE IF EXISTS public.app_role CASCADE;
