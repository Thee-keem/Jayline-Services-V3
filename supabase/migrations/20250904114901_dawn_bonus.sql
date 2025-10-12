/*
  # Add posts table for blog draft management

  1. New Tables
    - `posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `status` (text, draft/published)
      - `source_urls` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `created_by` (text, optional)
      - `slug` (text, unique)

  2. Security
    - Enable RLS on `posts` table
    - Add policy for public to read published posts
    - Add policy for authenticated users to manage drafts

  3. Updates to suggestions table
    - Add missing columns to match requirements
    - Update RLS policies
*/

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  source_urls text[] DEFAULT '{}',
  slug text UNIQUE NOT NULL,
  created_by text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add missing columns to suggestions table if they don't exist
DO $$
BEGIN
  -- Add created_by column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'suggestions' AND column_name = 'created_by'
  ) THEN
    ALTER TABLE suggestions ADD COLUMN created_by text;
  END IF;

  -- Add question column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'suggestions' AND column_name = 'question'
  ) THEN
    ALTER TABLE suggestions ADD COLUMN question text;
  END IF;

  -- Add suggested_title column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'suggestions' AND column_name = 'suggested_title'
  ) THEN
    ALTER TABLE suggestions ADD COLUMN suggested_title text;
  END IF;

  -- Add suggested_content column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'suggestions' AND column_name = 'suggested_content'
  ) THEN
    ALTER TABLE suggestions ADD COLUMN suggested_content text;
  END IF;

  -- Add source_urls column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'suggestions' AND column_name = 'source_urls'
  ) THEN
    ALTER TABLE suggestions ADD COLUMN source_urls text[];
  END IF;

  -- Add confidence column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'suggestions' AND column_name = 'confidence'
  ) THEN
    ALTER TABLE suggestions ADD COLUMN confidence float DEFAULT 0.0;
  END IF;
END $$;

-- Enable RLS on posts table
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Posts policies
CREATE POLICY "Published posts are publicly readable"
  ON posts
  FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "Authenticated users can manage all posts"
  ON posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Update suggestions policies to be more permissive for admin access
DROP POLICY IF EXISTS "Users can create suggestions" ON suggestions;
DROP POLICY IF EXISTS "Suggestions are publicly readable" ON suggestions;

CREATE POLICY "Anyone can create suggestions"
  ON suggestions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can read suggestions"
  ON suggestions
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can update suggestions"
  ON suggestions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title text)
RETURNS text AS $$
BEGIN
  RETURN lower(
    regexp_replace(
      regexp_replace(
        regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
        '\s+', '-', 'g'
      ),
      '-+', '-', 'g'
    )
  );
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate slug for posts
CREATE OR REPLACE FUNCTION set_post_slug()
RETURNS trigger AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_slug(NEW.title);
    
    -- Ensure uniqueness
    WHILE EXISTS (SELECT 1 FROM posts WHERE slug = NEW.slug AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000')) LOOP
      NEW.slug := NEW.slug || '-' || extract(epoch from now())::text;
    END LOOP;
  END IF;
  
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_post_slug_trigger
  BEFORE INSERT OR UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION set_post_slug();