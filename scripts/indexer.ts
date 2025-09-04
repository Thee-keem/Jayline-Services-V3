import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const SITE_BASE_URL = process.env.VITE_SITE_URL || 'https://jaylineservice.co.ke';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !OPENAI_API_KEY) {
  console.error('Missing required environment variables');
  process.exit(1);
}

// Initialize clients
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

interface Document {
  title: string;
  content: string;
  url: string;
  metadata?: Record<string, any>;
}

interface DocumentChunk {
  title: string;
  content: string;
  url: string;
  chunkIndex: number;
  metadata: Record<string, any>;
}

// Text chunking function
function chunkText(text: string, maxChunkSize: number = 1000, overlap: number = 200): string[] {
  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    let end = start + maxChunkSize;
    
    // Try to break at sentence boundary
    if (end < text.length) {
      const lastPeriod = text.lastIndexOf('.', end);
      const lastNewline = text.lastIndexOf('\n', end);
      const breakPoint = Math.max(lastPeriod, lastNewline);
      
      if (breakPoint > start + maxChunkSize * 0.5) {
        end = breakPoint + 1;
      }
    }

    chunks.push(text.slice(start, end).trim());
    start = end - overlap;
  }

  return chunks.filter(chunk => chunk.length > 50); // Filter out very short chunks
}

// Extract content from React components
function extractContentFromTSX(filePath: string): Document | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract text content from JSX (basic regex approach)
    const textMatches = content.match(/(?:>|"|\')([^<>"'{}]+)(?:<|"|\')(?![^<]*>)/g);
    if (!textMatches) return null;

    const extractedText = textMatches
      .map(match => match.replace(/^[>"']|[<"']$/g, '').trim())
      .filter(text => text.length > 10 && !text.includes('className') && !text.includes('import'))
      .join(' ');

    if (extractedText.length < 100) return null;

    // Determine page info from file path
    const fileName = path.basename(filePath, '.tsx');
    const pageUrl = fileName === 'Home' ? '/' : `/${fileName.toLowerCase()}`;
    
    return {
      title: `${fileName} Page - Jay Line Services`,
      content: extractedText,
      url: `${SITE_BASE_URL}${pageUrl}`,
      metadata: {
        type: 'page',
        component: fileName,
        lastModified: fs.statSync(filePath).mtime.toISOString(),
      },
    };
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return null;
  }
}

// Create embeddings for text chunks
async function createEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error creating embedding:', error);
    throw error;
  }
}

// Upsert document chunks to Supabase
async function upsertDocumentChunks(chunks: DocumentChunk[]): Promise<void> {
  for (const chunk of chunks) {
    try {
      const embedding = await createEmbedding(chunk.content);
      
      const { error } = await supabase
        .from('documents')
        .upsert({
          title: chunk.title,
          content: chunk.content,
          url: chunk.url,
          chunk_index: chunk.chunkIndex,
          embedding,
          metadata: chunk.metadata,
        }, {
          onConflict: 'url,chunk_index',
        });

      if (error) {
        console.error('Error upserting chunk:', error);
      } else {
        console.log(`✓ Indexed: ${chunk.title} (chunk ${chunk.chunkIndex})`);
      }
    } catch (error) {
      console.error(`Error processing chunk for ${chunk.title}:`, error);
    }
  }
}

// Main indexing function
async function indexSiteContent(): Promise<void> {
  console.log('🚀 Starting content indexing...');

  const allChunks: DocumentChunk[] = [];

  // Index React pages
  const pagesDir = path.join(process.cwd(), 'src', 'pages');
  const pageFiles = fs.readdirSync(pagesDir).filter(file => file.endsWith('.tsx'));

  for (const file of pageFiles) {
    const filePath = path.join(pagesDir, file);
    const document = extractContentFromTSX(filePath);
    
    if (document) {
      const chunks = chunkText(document.content);
      chunks.forEach((chunk, index) => {
        allChunks.push({
          title: document.title,
          content: chunk,
          url: document.url,
          chunkIndex: index,
          metadata: {
            ...document.metadata,
            totalChunks: chunks.length,
          },
        });
      });
    }
  }

  // Add static content
  const staticContent: Document[] = [
    {
      title: 'Jay Line Services - Company Overview',
      content: `Jay Line Services is a leading provider of comprehensive human resource solutions, manpower services, and financial consultancy in Kenya. With over 15 years of experience, we have successfully served 100+ corporate clients and completed 500+ successful placements. Our services include staff recruitment, HR consultancy, payroll management, executive search, manpower supply, training and development, and soft financing solutions.`,
      url: `${SITE_BASE_URL}/about`,
      metadata: { type: 'company_info' },
    },
    {
      title: 'Contact Information - Jay Line Services',
      content: `Contact Jay Line Services at +254 722 311 490 or +254 734 271 863. Email us at info@jaylineservice.co.ke. Our office is located at Beliani Annex, Ground Floor, Along Kangundo Road, P.O. Box 5322-00100, Nairobi, Kenya. Business hours are Monday-Friday 8:00 AM - 6:00 PM, Saturday 9:00 AM - 2:00 PM.`,
      url: `${SITE_BASE_URL}/contact`,
      metadata: { type: 'contact_info' },
    },
  ];

  // Process static content
  for (const document of staticContent) {
    const chunks = chunkText(document.content);
    chunks.forEach((chunk, index) => {
      allChunks.push({
        title: document.title,
        content: chunk,
        url: document.url,
        chunkIndex: index,
        metadata: {
          ...document.metadata,
          totalChunks: chunks.length,
        },
      });
    });
  }

  console.log(`📄 Processing ${allChunks.length} content chunks...`);

  // Clear existing documents
  const { error: deleteError } = await supabase
    .from('documents')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

  if (deleteError) {
    console.error('Error clearing existing documents:', deleteError);
  }

  // Upsert all chunks
  await upsertDocumentChunks(allChunks);

  console.log('✅ Content indexing completed!');
  console.log(`📊 Total chunks indexed: ${allChunks.length}`);
}

// Run indexer
if (import.meta.url === `file://${process.argv[1]}`) {
  indexSiteContent().catch(console.error);
}

export { indexSiteContent };