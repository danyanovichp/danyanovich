-- Fix user_roles RLS policies by making them PERMISSIVE instead of RESTRICTIVE
-- This allows users to read their own roles and admins to manage all roles

-- Drop existing RESTRICTIVE policies
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

-- Create PERMISSIVE policy for users to view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
AS PERMISSIVE
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create PERMISSIVE policy for admins to manage all roles
CREATE POLICY "Admins can manage all roles"
ON public.user_roles
AS PERMISSIVE
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));