# Performance Optimization Guide

This document outlines the performance optimizations implemented in SwasthAI MVP and recommendations for future improvements.

## Implemented Optimizations

### 1. Next.js App Router Benefits
- **Automatic Code Splitting**: Each route is automatically code-split
- **Server Components**: Most components are server components by default, reducing client-side JavaScript
- **Streaming**: Pages can stream content as it becomes available

### 2. Database Query Optimization
- **Selective Includes**: Prisma queries use `include` only when needed
- **Proper Indexing**: Database schema includes indexes on frequently queried fields (userId, createdAt)
- **Efficient Queries**: Using `findMany`, `upsert`, and `create` appropriately

### 3. Client-Side Optimization
- **Minimal Client Components**: Only components with interactivity are marked 'use client'
- **Lazy Loading**: Images use native lazy loading where appropriate
- **Optimized Bundle**: TypeScript and tree-shaking reduce bundle size

### 4. Image Optimization
- **Preview Images**: File upload previews use data URLs (no network requests)
- **No External Images**: MVP uses emoji icons instead of image files
- **Future**: Use Next.js Image component when adding actual images

## Performance Metrics (Target)

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Load Times
- **Time to Interactive**: < 3s on 3G
- **First Contentful Paint**: < 1.5s

## Testing Performance

### Local Testing
```bash
# Build production bundle
npm run build

# Check bundle size
npm run build -- --analyze  # (requires @next/bundle-analyzer)

# Run production server
npm start
```

### Chrome DevTools
1. Open DevTools > Lighthouse
2. Run audit for Performance, Accessibility, Best Practices
3. Test on "Slow 3G" network throttling
4. Check Coverage tab to identify unused code

### Real Device Testing
- Test on actual mobile devices (Android/iOS)
- Test on slow networks (3G/4G)
- Test with limited CPU (6x slowdown in DevTools)

## Future Optimizations

### 1. Image Optimization
When adding images:
```tsx
import Image from 'next/image'

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={500}
  height={300}
  loading="lazy"
  placeholder="blur"
/>
```

### 2. Font Optimization
Already using next/font/google for Inter font, which:
- Self-hosts fonts
- Eliminates external network requests
- Optimizes font loading

### 3. API Route Optimization
```typescript
// Add caching headers
export async function GET() {
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
    }
  })
}
```

### 4. Database Connection Pooling
For production with PostgreSQL:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // Add connection pooling
  relationMode = "prisma"
}
```

### 5. Static Generation
For pages that don't change often:
```typescript
// Generate static pages at build time
export const dynamic = 'force-static'
```

### 6. Prefetching
```tsx
import Link from 'next/link'

// Next.js automatically prefetches links in viewport
<Link href="/prescription" prefetch={true}>
  Scan Prescription
</Link>
```

### 7. Service Worker (PWA)
For offline support:
- Add next-pwa package
- Configure service worker
- Cache static assets
- Enable offline mode

### 8. Bundle Analysis
Install and configure:
```bash
npm install @next/bundle-analyzer
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // your config
})
```

Run with:
```bash
ANALYZE=true npm run build
```

## Monitoring

### Production Monitoring
Consider adding:
- **Vercel Analytics**: Built-in performance monitoring
- **Google Analytics**: User behavior tracking
- **Sentry**: Error tracking and performance monitoring
- **LogRocket**: Session replay and performance insights

### Key Metrics to Track
- Page load times
- API response times
- Database query performance
- Error rates
- User engagement metrics

## Best Practices

### 1. Avoid Large Dependencies
- Check bundle size before adding new packages
- Use tree-shakeable libraries
- Consider alternatives (e.g., date-fns instead of moment.js)

### 2. Optimize API Calls
- Batch requests when possible
- Use pagination for large datasets
- Implement caching strategies
- Add loading states

### 3. Minimize Client-Side JavaScript
- Use Server Components by default
- Only use 'use client' when necessary
- Defer non-critical JavaScript

### 4. Database Best Practices
- Use indexes on frequently queried fields
- Avoid N+1 queries (use include/select)
- Implement pagination for large result sets
- Use connection pooling in production

### 5. Mobile Performance
- Test on real devices
- Optimize for touch interactions
- Minimize layout shifts
- Use appropriate input types

## Current Bundle Size

Run `npm run build` to see current bundle sizes:
- First Load JS: Target < 200KB
- Route bundles: Target < 50KB each

## Conclusion

The SwasthAI MVP is built with performance in mind, using Next.js 14's latest features and best practices. As the application grows, continue monitoring performance metrics and implementing the optimizations outlined above.
