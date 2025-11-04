-- Create storage bucket for property images
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true);

-- Create RLS policies for property images bucket
CREATE POLICY "Anyone can view property images"
ON storage.objects FOR SELECT
USING (bucket_id = 'property-images');

CREATE POLICY "Landlords can upload property images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'property-images' AND
  auth.uid()::text = (storage.foldername(name))[1] AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.user_type = 'landlord'
  )
);

CREATE POLICY "Landlords can update own property images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'property-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Landlords can delete own property images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'property-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);