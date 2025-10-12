# Testing Guide - Phase 2.1

## Overview
This document outlines testing procedures for the enhanced services UI and AI system features.

## Manual Testing Checklist

### 🎠 Carousel Components

#### Home Page - Core Services Carousel
- [ ] **Desktop (1024px+)**: Shows 3 items per view
- [ ] **Tablet (768-1023px)**: Shows 2 items per view  
- [ ] **Mobile (<768px)**: Shows 1 item per view
- [ ] **Auto-play**: Advances every 6 seconds
- [ ] **Navigation**: Left/right arrows work correctly
- [ ] **Dots**: Clicking dots navigates to correct slide
- [ ] **Hover**: Pauses auto-play on hover
- [ ] **Keyboard**: Arrow keys navigate slides
- [ ] **Accessibility**: Screen reader announces slide changes

#### About Page - Testimonials Carousel
- [ ] **Auto-play**: Advances every 7 seconds
- [ ] **Responsive**: Correct items per view at all breakpoints
- [ ] **Content**: All 6 testimonials display correctly
- [ ] **Hover Effects**: Cards lift on hover
- [ ] **Navigation**: All controls functional

### 🎓 Training & Development Service
- [ ] **Home Page**: Fourth service card displays correctly
- [ ] **Content**: Shows training-related services
- [ ] **Navigation**: Links to correct Services page section
- [ ] **Hover**: Consistent grow effect with other cards
- [ ] **Icon**: GraduationCap icon displays properly

### 🤖 AI Blog Agent

#### Blog Draft Generation
```bash
# Test AI blog agent endpoint
curl -X POST "https://your-project.supabase.co/functions/v1/ai-blog-agent" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Remote Work HR Policies in Kenya",
    "keywords": ["remote work", "HR policies", "Kenya"],
    "contentType": "guide"
  }'
```

**Expected Response:**
- [ ] **Status**: 201 Created
- [ ] **Content**: Generated blog post with proper structure
- [ ] **Metadata**: Title, description, keywords, reading time
- [ ] **Database**: Draft saved with status="draft"

#### Admin Blog Drafts Interface
- [ ] **Access**: `/admin/blog-drafts` loads correctly
- [ ] **Stats**: Shows correct counts for drafts, AI-generated, scheduled
- [ ] **Generate**: "Generate AI Draft" button creates new content
- [ ] **Expand**: Content preview expands/collapses
- [ ] **Keywords**: Metadata displays correctly
- [ ] **Actions**: Review & Publish, Edit buttons present

### 💬 Enhanced AI Chat Widget

#### FAQ-First Behavior
Test queries with different confidence levels:

**High Confidence Query** (should get direct answer):
```
"What HR services does Jay Line Services offer?"
```
- [ ] **Response**: Detailed answer with sources
- [ ] **Confidence**: >0.6
- [ ] **Button**: "Suggest Article Update" shown

**Low Confidence Query** (should escalate):
```
"How do I handle a complex employment dispute with international law implications?"
```
- [ ] **Response**: Suggests live support contact
- [ ] **Confidence**: <0.6  
- [ ] **Button**: "Call Live Support" shown
- [ ] **Contact Info**: Phone and email provided

#### Chat Widget Functionality
- [ ] **Placeholder**: Updated to mention FAQ focus
- [ ] **Escalation**: Low confidence queries show support info
- [ ] **Phone Link**: "Call Live Support" button works
- [ ] **Suggestion Modal**: Only shows for confident responses

### 🎨 Hover Effects

#### Services Page
- [ ] **All Cards**: Consistent scale(1.05) hover effect
- [ ] **Smooth Transition**: 300ms duration
- [ ] **Shadow**: Enhanced shadow on hover
- [ ] **Performance**: No layout shift or jank

#### Home Page Services
- [ ] **Carousel Items**: Hover effects work within carousel
- [ ] **Consistency**: Same effect as Services page
- [ ] **Mobile**: Touch interactions work properly

## Automated Testing

### Unit Tests
```bash
# Run component tests
npm test -- --testPathPattern="Carousel|AIChatWidget"

# Test specific components
npm test Carousel.test.tsx
npm test AIChatWidget.test.tsx
```

### Visual Regression Tests
```bash
# Capture screenshots for comparison
npm run test:visual

# Test responsive breakpoints
npm run test:responsive
```

### Accessibility Tests
```bash
# Run axe-core accessibility tests
npm run test:a11y

# Test keyboard navigation
npm run test:keyboard
```

## Performance Testing

### Lighthouse Scores
Target scores for all pages:
- [ ] **Performance**: >90
- [ ] **Accessibility**: >95
- [ ] **Best Practices**: >90
- [ ] **SEO**: >90

### Core Web Vitals
- [ ] **LCP**: <2.5s (Largest Contentful Paint)
- [ ] **FID**: <100ms (First Input Delay)  
- [ ] **CLS**: <0.1 (Cumulative Layout Shift)

### Carousel Performance
- [ ] **Smooth Animations**: 60fps during transitions
- [ ] **Memory Usage**: No memory leaks during auto-play
- [ ] **Bundle Size**: Carousel adds <5KB to bundle

## Browser Compatibility

### Desktop Browsers
- [ ] **Chrome 90+**: All features work
- [ ] **Firefox 88+**: All features work
- [ ] **Safari 14+**: All features work
- [ ] **Edge 90+**: All features work

### Mobile Browsers
- [ ] **iOS Safari**: Touch gestures work
- [ ] **Chrome Mobile**: All interactions functional
- [ ] **Samsung Internet**: No layout issues

## API Testing

### Supabase Functions
Test all endpoints with proper authentication:

```bash
# Test suggestion creation
curl -X POST "https://your-project.supabase.co/functions/v1/suggest" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"question":"Test","suggestedTitle":"Test","suggestedContent":"Test content","sourceUrls":[]}'

# Test AI blog generation  
curl -X POST "https://your-project.supabase.co/functions/v1/ai-blog-agent" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"contentType":"guide"}'
```

## Error Handling

### Network Failures
- [ ] **Offline**: Graceful degradation
- [ ] **Slow Connection**: Loading states shown
- [ ] **API Errors**: User-friendly error messages
- [ ] **Retry Logic**: Failed requests can be retried

### Edge Cases
- [ ] **Empty Data**: Handles no drafts/suggestions gracefully
- [ ] **Long Content**: Text truncation works properly
- [ ] **Special Characters**: Unicode content displays correctly
- [ ] **Large Images**: Lazy loading prevents performance issues

## Security Testing

### Input Validation
- [ ] **XSS Prevention**: User input properly sanitized
- [ ] **SQL Injection**: Parameterized queries used
- [ ] **CSRF Protection**: Proper token validation
- [ ] **Rate Limiting**: API endpoints protected

### Authentication
- [ ] **Admin Routes**: Require proper authentication
- [ ] **API Keys**: Not exposed in client code
- [ ] **Permissions**: RLS policies enforced

## Deployment Checklist

### Pre-deployment
- [ ] **All Tests Pass**: Unit, integration, e2e tests
- [ ] **Build Success**: No TypeScript errors
- [ ] **Bundle Analysis**: No unexpected size increases
- [ ] **Environment Variables**: All required vars set

### Post-deployment
- [ ] **Health Check**: All endpoints responding
- [ ] **Database**: Migrations applied successfully
- [ ] **Monitoring**: Error tracking configured
- [ ] **Analytics**: Event tracking working

## Rollback Plan

If issues are detected:
1. **Immediate**: Revert to previous deployment
2. **Database**: Rollback migrations if needed
3. **Monitoring**: Check error rates and user impact
4. **Communication**: Notify stakeholders of issues

## Success Criteria

✅ **All manual tests pass**
✅ **Automated tests have >95% pass rate**  
✅ **Performance metrics meet targets**
✅ **No accessibility regressions**
✅ **Cross-browser compatibility confirmed**
✅ **Security scan shows no critical issues**