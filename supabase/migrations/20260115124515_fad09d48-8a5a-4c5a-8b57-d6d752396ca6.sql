-- Add MIME type and file size restrictions to the landing-screenshots bucket
UPDATE storage.buckets 
SET allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    file_size_limit = 5242880  -- 5MB
WHERE id = 'landing-screenshots';