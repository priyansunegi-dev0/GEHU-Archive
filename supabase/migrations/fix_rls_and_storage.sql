-- ==========================================================
-- GEHU ARCHIVE - Fix Migration
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ==========================================================

-- ──────────────────────────────────────────
-- Step 1: Create tables (if not already done)
-- ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS folders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  parent_id uuid REFERENCES folders(id) ON DELETE CASCADE,
  created_by uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  allow_contributions boolean DEFAULT true
);

CREATE TABLE IF NOT EXISTS pdfs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  folder_id uuid NOT NULL REFERENCES folders(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_size integer NOT NULL,
  uploaded_by uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- ──────────────────────────────────────────
-- Step 2: Enable RLS
-- ──────────────────────────────────────────
ALTER TABLE folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE pdfs ENABLE ROW LEVEL SECURITY;

-- ──────────────────────────────────────────
-- Step 3: Drop old policies to avoid conflicts
-- ──────────────────────────────────────────
DROP POLICY IF EXISTS "Admin create folders" ON folders;
DROP POLICY IF EXISTS "Admin delete folders" ON folders;
DROP POLICY IF EXISTS "Admin update folders" ON folders;
DROP POLICY IF EXISTS "Read all folders" ON folders;
DROP POLICY IF EXISTS "Anon read folders" ON folders;
DROP POLICY IF EXISTS "Users upload PDFs" ON pdfs;
DROP POLICY IF EXISTS "Read all PDFs" ON pdfs;
DROP POLICY IF EXISTS "Anon read PDFs" ON pdfs;
DROP POLICY IF EXISTS "Users delete own PDFs" ON pdfs;

-- ──────────────────────────────────────────
-- Step 4: Folder policies
-- ──────────────────────────────────────────

-- ANYONE (including anonymous visitors) can read folders for the home page
CREATE POLICY "Anon read folders"
  ON folders FOR SELECT
  TO anon
  USING (true);

-- Authenticated users can also read folders
CREATE POLICY "Read all folders"
  ON folders FOR SELECT
  TO authenticated
  USING (true);

-- Only authenticated users (admin) can create folders
CREATE POLICY "Admin create folders"
  ON folders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- Admin can delete folders they created
CREATE POLICY "Admin delete folders"
  ON folders FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());

-- Admin can update any folder (e.g. toggle contributions)
CREATE POLICY "Admin update folders"
  ON folders FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- ──────────────────────────────────────────
-- Step 5: PDF policies
-- ──────────────────────────────────────────

-- ANYONE can read PDFs
CREATE POLICY "Anon read PDFs"
  ON pdfs FOR SELECT
  TO anon
  USING (true);

-- Authenticated users can read PDFs
CREATE POLICY "Read all PDFs"
  ON pdfs FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can upload PDFs to folders where contributions are allowed
CREATE POLICY "Users upload PDFs"
  ON pdfs FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IS NOT NULL AND
    EXISTS (
      SELECT 1 FROM folders
      WHERE folders.id = folder_id AND folders.allow_contributions = true
    )
  );

-- Users can delete their own PDFs
CREATE POLICY "Users delete own PDFs"
  ON pdfs FOR DELETE
  TO authenticated
  USING (uploaded_by = auth.uid());

-- ──────────────────────────────────────────
-- Step 6: Create indexes
-- ──────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_folders_parent_id ON folders(parent_id);
CREATE INDEX IF NOT EXISTS idx_folders_created_by ON folders(created_by);
CREATE INDEX IF NOT EXISTS idx_pdfs_folder_id ON pdfs(folder_id);

-- ──────────────────────────────────────────
-- Step 7: Storage bucket for PDFs
-- ──────────────────────────────────────────

-- Create the pdfs storage bucket (public so anyone can view uploaded files)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'pdfs',
  'pdfs',
  true,
  52428800,  -- 50MB limit
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = ARRAY['application/pdf'];

-- Storage policies: anyone can read, authenticated users can upload
DROP POLICY IF EXISTS "Public read pdfs storage" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload pdfs storage" ON storage.objects;
DROP POLICY IF EXISTS "Users delete own pdf storage" ON storage.objects;

CREATE POLICY "Public read pdfs storage"
  ON storage.objects FOR SELECT
  TO anon
  USING (bucket_id = 'pdfs');

CREATE POLICY "Authenticated upload pdfs storage"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'pdfs');

CREATE POLICY "Users delete own pdf storage"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'pdfs' AND auth.uid() = owner::uuid);
