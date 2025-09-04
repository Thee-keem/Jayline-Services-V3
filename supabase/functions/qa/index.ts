import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface QARequest {
  query: string;
  maxSources?: number;
}

interface QAResponse {
  answer: string;
  sources: Array<{
    title: string;
    content: string;
    url: string;
    similarity: number;
  }>;
  confidence: number;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { query, maxSources = 5 }: QARequest = await req.json();

    if (!query || query.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Create embedding for the query
    const embeddingResponse = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: query,
      }),
    });

    if (!embeddingResponse.ok) {
      throw new Error('Failed to create embedding');
    }

    const embeddingData = await embeddingResponse.json();
    const queryEmbedding = embeddingData.data[0].embedding;

    // Search for similar documents
    const { data: documents, error } = await supabase.rpc('match_documents', {
      query_embedding: queryEmbedding,
      match_threshold: 0.7,
      match_count: maxSources,
    });

    if (error) {
      console.error('Vector search error:', error);
      return new Response(
        JSON.stringify({ error: 'Search failed' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!documents || documents.length === 0) {
      return new Response(
        JSON.stringify({
          answer: "I don't have enough information to answer that question. Please contact Jay Line Services directly at +254 722 311 490 or info@jaylineservice.co.ke for assistance.",
          sources: [],
          confidence: 0.0,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Prepare context for RAG
    const context = documents
      .map((doc: any, index: number) => `[${index + 1}] ${doc.title}: ${doc.content}`)
      .join('\n\n');

    // Generate answer using OpenAI
    const completionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a helpful assistant for Jay Line Services, a leading HR and manpower solutions provider in Kenya. Answer questions based on the provided context. Always include inline citations using [1], [2], etc. format. Be concise but informative. If the context doesn't contain enough information, say so and suggest contacting the company directly.

Company contact: +254 722 311 490, info@jaylineservice.co.ke
Office: Beliani Annex, Ground Floor, Along Kangundo Road, Nairobi`,
          },
          {
            role: 'user',
            content: `Context:\n${context}\n\nQuestion: ${query}`,
          },
        ],
        max_tokens: 500,
        temperature: 0.3,
      }),
    });

    if (!completionResponse.ok) {
      throw new Error('Failed to generate response');
    }

    const completionData = await completionResponse.json();
    const answer = completionData.choices[0]?.message?.content || 'Unable to generate response';

    // Calculate confidence based on similarity scores
    const avgSimilarity = documents.reduce((sum: number, doc: any) => sum + doc.similarity, 0) / documents.length;
    const confidence = Math.min(avgSimilarity * 1.2, 1.0); // Boost confidence slightly

    // Format sources
    const sources = documents.map((doc: any) => ({
      title: doc.title,
      content: doc.content.substring(0, 200) + (doc.content.length > 200 ? '...' : ''),
      url: doc.url,
      similarity: doc.similarity,
    }));

    const response: QAResponse = {
      answer,
      sources,
      confidence: Math.round(confidence * 100) / 100, // Round to 2 decimal places
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('QA API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});