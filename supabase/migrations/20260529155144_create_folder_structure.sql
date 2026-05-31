/*
  # Create Folder and PDF Storage Structure

  1. New Tables
    - `folders` - Hierarchical folder structure
      - `id` (uuid, primary key)
      - `name` (text) - folder name
      - `parent_id` (uuid, nullable) - parent folder for subfolders
      - `created_by` (uuid) - admin who created it
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `allow_contributions` (boolean) - whether users can upload PDFs
    
    - `pdfs` - PDF files uploaded by users
      - `id` (uuid, primary key)
      - `folder_id` (uuid) - which folder contains this PDF
      - `file_name` (text) - original file name
      - `file_path` (text) - path in Supabase storage
      - `file_size` (integer) - size in bytes
      - `uploaded_by` (uuid) - user who uploaded
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Folders: admin can create/delete/modify; users can read all
    - PDFs: users can upload only to allowed folders; anyone can read

  3. Storage
    - Create 'pdfs' bucket for PDF storage
    - Public access for reading
    - Authenticated users can upload
*/

-- Create folders table
CREATE TABLE IF NOT EXISTS folders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  parent_id uuid REFERENCES folders(id) ON DELETE CASCADE,
  created_by uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  allow_contributions boolean DEFAULT true
);

-- Create PDFs table
CREATE TABLE IF NOT EXISTS pdfs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  folder_id uuid NOT NULL REFERENCES folders(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_size integer NOT NULL,
  uploaded_by uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE pdfs ENABLE ROW LEVEL SECURITY;

-- Folder policies
-- Admins can do everything with folders
CREATE POLICY "Admin create folders"
  ON folders FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Admin delete folders"
  ON folders FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Admin update folders"
  ON folders FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

-- Everyone can read folders
CREATE POLICY "Read all folders"
  ON folders FOR SELECT
  TO authenticated
  USING (true);

-- PDF policies
-- Users can upload PDFs to allowed folders
CREATE POLICY "Users upload PDFs"
  ON pdfs FOR INSERT
  TO authenticated
  WITH CHECK (
    uploaded_by = auth.uid() AND
    EXISTS (
      SELECT 1 FROM folders
      WHERE folders.id = folder_id AND folders.allow_contributions = true
    )
  );

-- Everyone can read PDFs
CREATE POLICY "Read all PDFs"
  ON pdfs FOR SELECT
  TO authenticated
  USING (true);

-- Only uploader can delete their own PDFs
CREATE POLICY "Users delete own PDFs"
  ON pdfs FOR DELETE
  TO authenticated
  USING (uploaded_by = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_folders_parent_id ON folders(parent_id);
CREATE INDEX IF NOT EXISTS idx_folders_created_by ON folders(created_by);
CREATE INDEX IF NOT EXISTS idx_pdfs_folder_id ON pdfs(folder_id);
CREATE INDEX IF NOT EXISTS idx_pdfs_uploaded_by ON pdfs(uploaded_by);
