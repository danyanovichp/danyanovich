
-- Deny all writes on products (public SELECT already exists)
CREATE POLICY "No public insert on products" ON public.products FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "No public update on products" ON public.products FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY "No public delete on products" ON public.products FOR DELETE TO anon, authenticated USING (false);

-- Deny all writes on template_landings
CREATE POLICY "No public insert on template_landings" ON public.template_landings FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "No public update on template_landings" ON public.template_landings FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY "No public delete on template_landings" ON public.template_landings FOR DELETE TO anon, authenticated USING (false);

-- Deny all writes on template_faq
CREATE POLICY "No public insert on template_faq" ON public.template_faq FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "No public update on template_faq" ON public.template_faq FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY "No public delete on template_faq" ON public.template_faq FOR DELETE TO anon, authenticated USING (false);

-- Deny all writes on template_reviews
CREATE POLICY "No public insert on template_reviews" ON public.template_reviews FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "No public update on template_reviews" ON public.template_reviews FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY "No public delete on template_reviews" ON public.template_reviews FOR DELETE TO anon, authenticated USING (false);

-- Deny all writes on template_tags
CREATE POLICY "No public insert on template_tags" ON public.template_tags FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "No public update on template_tags" ON public.template_tags FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY "No public delete on template_tags" ON public.template_tags FOR DELETE TO anon, authenticated USING (false);

-- Deny all writes on template_tag_relations
CREATE POLICY "No public insert on template_tag_relations" ON public.template_tag_relations FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "No public update on template_tag_relations" ON public.template_tag_relations FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY "No public delete on template_tag_relations" ON public.template_tag_relations FOR DELETE TO anon, authenticated USING (false);

-- Deny update/delete on public_reviews (INSERT is allowed for review submission)
CREATE POLICY "No public update on public_reviews" ON public.public_reviews FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY "No public delete on public_reviews" ON public.public_reviews FOR DELETE TO anon, authenticated USING (false);

-- Deny all writes on site_settings
CREATE POLICY "No public insert on site_settings" ON public.site_settings FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "No public update on site_settings" ON public.site_settings FOR UPDATE TO anon, authenticated USING (false);
CREATE POLICY "No public delete on site_settings" ON public.site_settings FOR DELETE TO anon, authenticated USING (false);

-- Deny all writes on landing-screenshots storage bucket
CREATE POLICY "No public upload on landing-screenshots" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id != 'landing-screenshots');
CREATE POLICY "No public update on landing-screenshots" ON storage.objects FOR UPDATE TO anon, authenticated USING (bucket_id != 'landing-screenshots');
CREATE POLICY "No public delete on landing-screenshots" ON storage.objects FOR DELETE TO anon, authenticated USING (bucket_id != 'landing-screenshots');
