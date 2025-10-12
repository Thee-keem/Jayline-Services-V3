# Jayline-Services-V4

## PHASE 2: AI Blog Draft Creation & Review System

### Overview
This phase extends the AI FAQ agent with a comprehensive blog draft creation and review workflow. Users can suggest article improvements through the AI chat widget, and admins can review and promote suggestions to draft blog posts. Additionally, an AI blog agent automatically generates draft content.

### Features
- **AI-Powered Suggestions**: Users can suggest article updates via the AI chat widget
- **Admin Review Workflow**: Dedicated admin interface to review, accept, or reject suggestions
- **Draft Management**: Accepted suggestions become draft blog posts requiring human approval
- **Source Tracking**: All suggestions include source URLs and confidence scores
- **Safe by Design**: No auto-publishing - all AI content requires human review
- **Automated Blog Drafting**: AI agent generates topic-focused blog drafts with metadata
- **FAQ-First Chatbot**: Enhanced chatbot prioritizes FAQ responses and escalates complex queries
- **Responsive Carousels**: Core services and testimonials now use interactive carousels

### Database Schema

#### Suggestions Table
- `id` (uuid, PK) - Unique identifier
- `question` (text) - Original user question
- `suggested_title` (text) - AI-suggested article title
- `suggested_content` (text) - AI-suggested article content
- `source_urls` (text[]) - Source URLs used for generation
- `confidence` (float) - AI confidence score (0.0-1.0)
- `status` (text) - pending/accepted/rejected
- `created_by` (text) - User identifier
- `created_at` (timestamptz) - Creation timestamp

#### Posts Table
- `id` (uuid, PK) - Unique identifier
- `title` (text) - Article title
- `content` (text) - Article content
- `status` (text) - draft/published
- `source_urls` (text[]) - Source URLs
- `slug` (text, unique) - URL slug (auto-generated)
- `created_by` (text) - Creator identifier
- `created_at` (timestamptz) - Creation timestamp
- `updated_at` (timestamptz) - Last update timestamp

### API Endpoints

#### POST /functions/v1/ai-blog-agent
Generates AI blog drafts with metadata and scheduling.

**Request Body:**
```json
{
  "topic": "Optional specific topic",
  "keywords": ["keyword1", "keyword2"],
  "targetAudience": "HR professionals and business owners in Kenya",
  "contentType": "guide|news|analysis|howto",
  "scheduledFor": "2024-02-01T10:00:00Z"
}
```

#### POST /functions/v1/suggest
Creates a new article suggestion.

**Request Body:**
```json
{
  "question": "User's original question",
  "suggestedTitle": "AI-suggested article title",
  "suggestedContent": "AI-suggested article content",
  "sourceUrls": ["url1", "url2"],
  "confidence": 0.85,
  "createdBy": "user"
}
```

#### GET /functions/v1/get-suggestions
Fetches suggestions for admin review.

**Query Parameters:**
- `status` (optional) - Filter by status (default: "pending")
- `limit` (optional) - Number of results (default: 50)
- `offset` (optional) - Pagination offset (default: 0)

#### POST /functions/v1/accept-suggestion
Accepts or rejects a suggestion.

**Request Body:**
```json
{
  "suggestionId": "uuid",
  "action": "accept|reject",
  "reviewedBy": "admin"
}
```

### Admin Interface

**Suggestions Management** (`/admin/suggestions`):
- View all pending suggestions with confidence scores
- Preview suggested content and sources
- Accept suggestions to create draft blog posts
- Reject inappropriate or low-quality suggestions
- Track suggestion statistics

**Blog Drafts Management** (`/admin/blog-drafts`):
- View all AI-generated and manual draft posts
- Review content with metadata (keywords, reading time, difficulty)
- Schedule posts for future publication
- Generate new AI drafts on-demand
- Edit and publish approved content
### Setup Instructions

1. **Database Migration**
   ```bash
   # The migration will run automatically when you connect to Supabase
   # It creates the posts table and updates the suggestions table
   ```

2. **Environment Variables**
   Required variables (should already be configured):
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   OPENAI_API_KEY=your_openai_key
   ```

   Optional for GitHub PR mode:
   ```env
   USE_GITHUB_MODE=true
   GITHUB_TOKEN=your_github_token
   ```

3. **Testing the Workflow**
   1. Use the AI chat widget to ask a question
   2. Click "Suggest Article Update" in the response
   3. Fill out the suggestion form
   4. Visit `/admin/suggestions` to review
   5. Accept or reject the suggestion
   6. Accepted suggestions become draft posts

### Security Features
- Row Level Security (RLS) enabled on all tables
- Public can create and read suggestions
- Only authenticated users can manage posts and update suggestions
- All AI-generated content starts as "draft" status
- Human review required before any content goes live

### Key Safety Features
- All AI content starts as "draft" status - never auto-published
- Human review required for all suggestions
- Proper error handling and validation
- Source tracking for transparency
- FAQ-first approach with live support escalation for complex queries
- Confidence-based response filtering

### API Testing Examples

#### Create Suggestion
```bash
curl -X POST "https://your-project.supabase.co/functions/v1/suggest" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "How do I handle remote work policies?",
    "suggestedTitle": "Complete Guide to Remote Work HR Policies in Kenya",
    "suggestedContent": "Remote work has become...",
    "sourceUrls": ["https://example.com/source1"],
    "confidence": 0.85
  }'
```

#### Get Suggestions
```bash
curl "https://your-project.supabase.co/functions/v1/get-suggestions?status=pending&limit=10" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

#### Accept Suggestion
```bash
curl -X POST "https://your-project.supabase.co/functions/v1/accept-suggestion" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "suggestionId": "uuid-here",
    "action": "accept",
    "reviewedBy": "admin"
  }'
```

### Future Enhancements
- Email notifications for new suggestions
- Bulk actions for managing multiple suggestions
- Content quality scoring and auto-filtering
- Integration with external CMS platforms
- Advanced analytics and reporting