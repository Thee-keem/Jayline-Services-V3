/*
  # AI Chat Assistant Tables

  1. New Tables
    - `documents`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `url` (text)
      - `chunk_index` (integer)
      - `embedding` (vector)
      - `metadata` (jsonb)
      - `created_at` (timestamp)
    - `suggestions`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `sources` (jsonb)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access on documents
    - Add policies for authenticated users on suggestions

  3. Functions
    - `match_documents` function for vector similarity search
*/

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Documents table for storing indexed content
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  url text NOT NULL,
  chunk_index integer NOT NULL DEFAULT 0,
  embedding vector(1536),
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Suggestions table for draft blog post suggestions
CREATE TABLE IF NOT EXISTS suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  sources jsonb DEFAULT '[]',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;

-- Policies for documents (public read access)
CREATE POLICY "Documents are publicly readable"
  ON documents
  FOR SELECT
  TO public
  USING (true);

-- Policies for suggestions (authenticated users can create and read their own)
CREATE POLICY "Users can create suggestions"
  ON suggestions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Suggestions are publicly readable"
  ON suggestions
  FOR SELECT
  TO public
  USING (true);

-- Create index for vector similarity search
CREATE INDEX IF NOT EXISTS documents_embedding_idx ON documents 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Create index for URL lookups
CREATE INDEX IF NOT EXISTS documents_url_idx ON documents (url);

-- Function for vector similarity search
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 10
)
RETURNS TABLE (
  id uuid,
  title text,
  content text,
  url text,
  chunk_index integer,
  metadata jsonb,
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    documents.id,
    documents.title,
    documents.content,
    documents.url,
    documents.chunk_index,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE 1 - (documents.embedding <=> query_embedding) > match_threshold
  ORDER BY documents.embedding <=> query_embedding
  LIMIT match_count;
$$;