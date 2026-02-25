-- Fix inverted storage policies
DROP POLICY IF EXISTS "No public upload on landing-screenshots" ON storage.objects;
DROP POLICY IF EXISTS "No public update on landing-screenshots" ON storage.objects;
DROP POLICY IF EXISTS "No public delete on landing-screenshots" ON storage.objects;

-- Create correct deny-all policies for storage writes
CREATE POLICY "Deny all public uploads" 
  ON storage.objects FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (false);

CREATE POLICY "Deny all public updates" 
  ON storage.objects FOR UPDATE 
  TO anon, authenticated 
  USING (false);

CREATE POLICY "Deny all public deletes" 
  ON storage.objects FOR DELETE 
  TO anon, authenticated 
  USING (false);