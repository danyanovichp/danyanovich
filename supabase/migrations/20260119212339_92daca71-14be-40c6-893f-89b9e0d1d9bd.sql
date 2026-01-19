-- Fix template_landings_creator_exposure: Hide created_by from public access
-- Create a view that excludes the created_by field for public access

-- Drop existing public SELECT policy
DROP POLICY IF EXISTS "Anyone can view landings" ON public.template_landings;

-- Create new policy that hides created_by for non-admins by using a security definer function
-- First, create a function that returns landings without created_by for public access
CREATE OR REPLACE FUNCTION public.get_public_template_landing(p_template_id text)
RETURNS TABLE (
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
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    id,
    template_id,
    headline,
    subheadline,
    solution_intro,
    solution_description,
    main_image,
    features,
    views,
    target_audience,
    screenshots,
    pain_points,
    created_at,
    updated_at
  FROM public.template_landings
  WHERE template_id = p_template_id;
$$;

-- Create a function to get all public template landings (without created_by)
CREATE OR REPLACE FUNCTION public.get_all_public_template_landings()
RETURNS TABLE (
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
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    id,
    template_id,
    headline,
    subheadline,
    solution_intro,
    solution_description,
    main_image,
    features,
    views,
    target_audience,
    screenshots,
    pain_points,
    created_at,
    updated_at
  FROM public.template_landings;
$$;

-- Create new SELECT policy: Admins can see all fields including created_by
CREATE POLICY "Admins can view all landings"
ON public.template_landings
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- For public/anonymous access, they must use the RPC functions above
-- No public SELECT policy means unauthenticated users cannot directly query the table