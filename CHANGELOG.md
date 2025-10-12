# Changelog

## [Phase 2.1] - Enhanced Services UI and AI System

### Added
- **Responsive Carousel Component**: New reusable carousel with auto-play, navigation arrows, and responsive breakpoints
- **Training & Development Service**: Added fourth service card to Home page Core Services section
- **AI Blog Agent**: Automated blog draft generation with metadata and scheduling (`/functions/v1/ai-blog-agent`)
- **Blog Drafts Admin Interface**: New admin page at `/admin/blog-drafts` for managing AI-generated content
- **Enhanced FAQ Chatbot**: Improved AI chat widget with FAQ-first approach and live support escalation
- **Hover Effects**: Applied consistent grow hover effects to all service cards across the site

### Changed
- **Home Core Services**: Converted static grid to responsive carousel with 4 service cards
- **About Testimonials**: Converted static grid to auto-playing carousel for better UX
- **AI Chat Widget**: Enhanced with confidence-based responses and live support escalation
- **Services Page**: Added hover scale effects to all service cards for consistency

### Technical Improvements
- **Carousel Component**: Fully accessible with keyboard navigation, ARIA labels, and responsive design
- **Performance**: Optimized carousel animations with reduced motion support
- **TypeScript**: Full type safety for all new components and API endpoints
- **Accessibility**: WCAG 2.1 AA compliance maintained across all new features

### API Endpoints
- `POST /functions/v1/ai-blog-agent` - Generate AI blog drafts with metadata
- Enhanced existing endpoints with better error handling and validation

### UI/UX Enhancements
- Consistent hover animations across all service cards
- Improved mobile responsiveness for carousels
- Better visual hierarchy in admin interfaces
- Enhanced loading states and error handling

### Safety & Security
- All AI-generated content requires human review before publishing
- FAQ-first approach prevents inappropriate AI responses
- Proper input validation and sanitization
- Rate limiting and error boundaries