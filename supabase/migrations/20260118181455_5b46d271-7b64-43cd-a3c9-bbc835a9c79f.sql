-- Fix 1: Update template_landings INSERT policy to automatically set created_by
-- Drop existing insert policy and create new one that sets created_by

DROP POLICY IF EXISTS "Admins can insert landings" ON public.template_landings;

CREATE POLICY "Admins can insert landings"
ON public.template_landings
FOR INSERT
TO authenticated
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) AND 
  (created_by IS NULL OR created_by = auth.uid())
);

-- Create a trigger to automatically set created_by on insert
CREATE OR REPLACE FUNCTION public.set_created_by()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.created_by IS NULL THEN
    NEW.created_by = auth.uid();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS set_created_by_trigger ON public.template_landings;

CREATE TRIGGER set_created_by_trigger
BEFORE INSERT ON public.template_landings
FOR EACH ROW
EXECUTE FUNCTION public.set_created_by();

-- Update existing NULL created_by records (set to first admin found, or keep null if no admins)
UPDATE public.template_landings 
SET created_by = (SELECT user_id FROM public.user_roles WHERE role = 'admin' LIMIT 1)
WHERE created_by IS NULL;

-- Fix 2: Make user_roles SELECT policy more restrictive - only authenticated users can see their own roles
-- Drop existing policy
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- Create new policy that requires authentication AND only allows viewing own roles
CREATE POLICY "Authenticated users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);