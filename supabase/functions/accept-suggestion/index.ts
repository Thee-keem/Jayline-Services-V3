import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface AcceptSuggestionRequest {
  suggestionId: string;
  action: 'accept' | 'reject';
  reviewedBy?: string;
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
      suggestionId,
      action,
      reviewedBy = 'admin'
    }: AcceptSuggestionRequest = await req.json();

    if (!suggestionId || !action) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: suggestionId, action' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!['accept', 'reject'].includes(action)) {
      return new Response(
        JSON.stringify({ error: 'Invalid action. Must be "accept" or "reject"' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client with service role key
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Fetch the suggestion
    const { data: suggestion, error: fetchError } = await supabase
      .from('suggestions')
      .select('*')
      .eq('id', suggestionId)
      .eq('status', 'pending')
      .single();

    if (fetchError || !suggestion) {
      return new Response(
        JSON.stringify({ error: 'Suggestion not found or already processed' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'reject') {
      // Simply update suggestion status to rejected
      const { error: updateError } = await supabase
        .from('suggestions')
        .update({ status: 'rejected' })
        .eq('id', suggestionId);

      if (updateError) {
        throw updateError;
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Suggestion rejected successfully',
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Handle accept action
    if (action === 'accept') {
      // Check if GitHub mode is enabled
      const useGitHubMode = Deno.env.get('USE_GITHUB_MODE') === 'true';

      if (useGitHubMode) {
        // GitHub PR mode (optional implementation)
        const githubToken = Deno.env.get('GITHUB_TOKEN');
        
        if (!githubToken) {
          return new Response(
            JSON.stringify({ error: 'GitHub mode enabled but GITHUB_TOKEN not configured' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Create markdown content
        const markdownContent = `---
title: "${suggestion.suggested_title}"
date: ${new Date().toISOString()}
status: draft
sources: ${JSON.stringify(suggestion.source_urls || [])}
---

${suggestion.suggested_content}
`;

        // Generate filename from title
        const filename = `${suggestion.suggested_title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.md`;

        // Note: Full GitHub integration would require Octokit setup
        // For now, we'll log the intent and fall back to Supabase
        console.log('GitHub mode: Would create PR with file:', filename);
        console.log('Content:', markdownContent);
      }

      // Create draft post in Supabase (always done, even in GitHub mode as backup)
      const { data: post, error: insertError } = await supabase
        .from('posts')
        .insert([
          {
            title: suggestion.suggested_title,
            content: suggestion.suggested_content,
            status: 'draft',
            source_urls: suggestion.source_urls || [],
            created_by: reviewedBy,
          },
        ])
        .select()
        .single();

      if (insertError) {
        console.error('Error creating post:', insertError);
        throw insertError;
      }

      // Update suggestion status to accepted
      const { error: updateError } = await supabase
        .from('suggestions')
        .update({ status: 'accepted' })
        .eq('id', suggestionId);

      if (updateError) {
        console.error('Error updating suggestion:', updateError);
        throw updateError;
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Suggestion accepted and draft post created',
          post,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

  } catch (error) {
    console.error('Accept suggestion API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});