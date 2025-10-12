import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface SuggestRequest {
  question: string;
  suggestedTitle: string;
  suggestedContent: string;
  sourceUrls: string[];
  confidence?: number;
  createdBy?: string;
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
    const {
      question,
      suggestedTitle,
      suggestedContent,
      sourceUrls,
      confidence = 0.0,
      createdBy = 'anonymous'
    }: SuggestRequest = await req.json();

    // Validate required fields
    if (!question || !suggestedTitle || !suggestedContent) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: question, suggestedTitle, suggestedContent' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client with service role key
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Insert suggestion into database
    const { data, error } = await supabase
      .from('suggestions')
      .insert([
        {
          question,
          suggested_title: suggestedTitle,
          suggested_content: suggestedContent,
          source_urls: sourceUrls,
          confidence,
          created_by: createdBy,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to save suggestion' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        suggestion: data,
        message: 'Suggestion submitted successfully for review',
      }),
      {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Suggest API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});