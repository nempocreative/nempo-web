CREATE TABLE public.yearbook_photo_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name text NOT NULL DEFAULT 'Teman sekelas',
  caption text,
  storage_path text NOT NULL UNIQUE,
  mime_type text NOT NULL,
  status text NOT NULL DEFAULT 'menunggu',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.yearbook_photo_submissions TO authenticated;
GRANT ALL ON public.yearbook_photo_submissions TO service_role;

ALTER TABLE public.yearbook_photo_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin dapat melihat kiriman foto yearbook"
ON public.yearbook_photo_submissions
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin dapat melihat file foto yearbook"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'yearbook-moments'
  AND public.has_role(auth.uid(), 'admin')
);