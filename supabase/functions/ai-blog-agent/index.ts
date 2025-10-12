import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface BlogDraftRequest {
  topic?: string;
  keywords?: string[];
  targetAudience?: string;
  contentType?: 'guide' | 'news' | 'analysis' | 'howto';
  scheduledFor?: string;
}

interface BlogMetadata {
  title: string;
  description: string;
  keywords: string[];
  category: string;
  readingTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
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
      topic,
      keywords = [],
      targetAudience = 'HR professionals and business owners in Kenya',
      contentType = 'guide',
      scheduledFor
    }: BlogDraftRequest = await req.json();

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Generate topic if not provided
    let finalTopic = topic;
    if (!finalTopic) {
      const topicResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
              content: 'You are an expert content strategist for Jay Line Services, an HR and manpower solutions company in Kenya. Generate relevant blog topics that would be valuable for HR professionals and business owners.',
            },
            {
              role: 'user',
              content: `Generate a specific, actionable blog topic related to HR, recruitment, or business management in Kenya. Focus on current trends and practical advice. Return only the topic title.`,
            },
          ],
          max_tokens: 100,
          temperature: 0.7,
        }),
      });

      if (!topicResponse.ok) {
        throw new Error('Failed to generate topic');
      }

      const topicData = await topicResponse.json();
      finalTopic = topicData.choices[0]?.message?.content?.trim() || 'HR Best Practices in Kenya';
    }

    // Generate comprehensive blog content
    const contentResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: `You are a professional content writer for Jay Line Services, a leading HR and manpower solutions provider in Kenya. Write comprehensive, SEO-optimized blog posts that provide genuine value to HR professionals and business owners.

Guidelines:
- Write in a professional yet accessible tone
- Include practical, actionable advice
- Reference Kenyan business context and regulations where relevant
- Structure content with clear headings and subheadings
- Include examples and case studies when appropriate
- Ensure content is original and valuable
- Target audience: ${targetAudience}
- Content type: ${contentType}`,
          },
          {
            role: 'user',
            content: `Write a comprehensive blog post about: "${finalTopic}"

${keywords.length > 0 ? `Focus keywords: ${keywords.join(', ')}` : ''}

Structure the content with:
1. Engaging introduction
2. Main sections with clear headings
3. Practical tips and actionable advice
4. Conclusion with key takeaways
5. Call-to-action mentioning Jay Line Services

Aim for 1500-2000 words. Use markdown formatting for headings and structure.`,
          },
        ],
        max_tokens: 2500,
        temperature: 0.3,
      }),
    });

    if (!contentResponse.ok) {
      throw new Error('Failed to generate content');
    }

    const contentData = await contentResponse.json();
    const blogContent = contentData.choices[0]?.message?.content || '';

    // Generate metadata
    const metadataResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: 'You are an SEO expert. Generate metadata for blog posts including title, description, keywords, category, reading time estimate, and difficulty level. Return valid JSON only.',
          },
          {
            role: 'user',
            content: `Generate metadata for this blog post content:

Title: ${finalTopic}
Content: ${blogContent.substring(0, 500)}...

Return JSON with: title, description (max 160 chars), keywords (array of 5-8 terms), category, readingTime (minutes), difficulty (beginner/intermediate/advanced)`,
          },
        ],
        max_tokens: 300,
        temperature: 0.1,
      }),
    });

    let metadata: BlogMetadata = {
      title: finalTopic,
      description: `Learn about ${finalTopic.toLowerCase()} with expert insights from Jay Line Services.`,
      keywords: keywords.length > 0 ? keywords : ['HR', 'Kenya', 'business'],
      category: 'HR Insights',
      readingTime: Math.ceil(blogContent.split(' ').length / 200),
      difficulty: 'intermediate',
    };

    if (metadataResponse.ok) {
      try {
        const metadataData = await metadataResponse.json();
        const generatedMetadata = JSON.parse(metadataData.choices[0]?.message?.content || '{}');
        metadata = { ...metadata, ...generatedMetadata };
      } catch (error) {
        console.log('Using fallback metadata due to parsing error:', error);
      }
    }

    // Create draft post
    const { data: post, error: insertError } = await supabase
      .from('posts')
      .insert([
        {
          title: metadata.title,
          content: blogContent,
          status: 'draft',
          source_urls: ['AI Generated'],
          created_by: 'ai-agent',
          metadata: {
            description: metadata.description,
            keywords: metadata.keywords,
            category: metadata.category,
            readingTime: metadata.readingTime,
            difficulty: metadata.difficulty,
            scheduledFor: scheduledFor || null,
            generatedAt: new Date().toISOString(),
          },
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.error('Error creating draft post:', insertError);
      throw insertError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Blog draft created successfully',
        post: {
          id: post.id,
          title: post.title,
          slug: post.slug,
          status: post.status,
          metadata: post.metadata,
          createdAt: post.created_at,
        },
      }),
      {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('AI Blog Agent error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create blog draft' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});