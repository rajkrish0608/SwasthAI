# SwasthAI MVP - Deployment Guide

This guide provides step-by-step instructions for deploying SwasthAI MVP to production.

## Pre-Deployment Checklist

Before deploying, ensure:

- [ ] All features tested locally
- [ ] Production build works: `npm run build && npm start`
- [ ] Environment variables documented in `.env.example`
- [ ] Database migrations are up to date
- [ ] README.md is complete
- [ ] No sensitive data in code
- [ ] `.gitignore` includes `.env` and sensitive files
- [ ] All console.logs reviewed (remove or keep intentional ones)
- [ ] Error handling is in place
- [ ] Loading states are implemented
- [ ] Mobile responsiveness verified

## Deployment Platforms

### Option 1: Vercel (Recommended)

Vercel is the recommended platform for Next.js applications.

#### Step 1: Prepare Repository
```bash
# Ensure code is committed
git add .
git commit -m "Prepare for deployment"
git push origin main
```

#### Step 2: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Authorize Vercel to access your repositories

#### Step 3: Import Project
1. Click "Add New Project"
2. Select your SwasthAI repository
3. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next
   - **Install Command**: `npm install`

#### Step 4: Configure Environment Variables
Add the following in Vercel dashboard:

```env
# Database (PostgreSQL)
DATABASE_URL=postgresql://user:password@host:5432/database

# Environment
NODE_ENV=production

# OCR Configuration
USE_MOCK_OCR=true

# LLM Integration (if using)
LLM_PROVIDER=rule_based
LLM_API_KEY=your-api-key-here
```

#### Step 5: Deploy
1. Click "Deploy"
2. Wait for build to complete (2-5 minutes)
3. Visit your deployment URL

#### Step 6: Set Up Database
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Run migrations
vercel env pull .env.production
npx prisma migrate deploy
```

#### Step 7: Configure Custom Domain (Optional)
1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for SSL certificate (automatic)

---

### Option 2: Railway

Railway provides easy PostgreSQL integration.

#### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub

#### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your SwasthAI repository

#### Step 3: Add PostgreSQL Database
1. Click "New" > "Database" > "PostgreSQL"
2. Railway will create a database and provide connection string

#### Step 4: Configure Environment Variables
In Railway dashboard, add:

```env
DATABASE_URL=${{Postgres.DATABASE_URL}}  # Auto-filled
NODE_ENV=production
USE_MOCK_OCR=true
LLM_PROVIDER=rule_based
```

#### Step 5: Deploy
1. Railway automatically deploys on push
2. View logs to monitor deployment
3. Visit generated URL

#### Step 6: Run Migrations
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Run migrations
railway run npx prisma migrate deploy
```

---

### Option 3: Render

Render offers free tier with PostgreSQL.

#### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

#### Step 2: Create PostgreSQL Database
1. Click "New" > "PostgreSQL"
2. Name: `swasthai-db`
3. Select free tier
4. Create database
5. Copy "Internal Database URL"

#### Step 3: Create Web Service
1. Click "New" > "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: swasthai-mvp
   - **Environment**: Node
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm start`

#### Step 4: Add Environment Variables
```env
DATABASE_URL=<internal-database-url>
NODE_ENV=production
USE_MOCK_OCR=true
LLM_PROVIDER=rule_based
```

#### Step 5: Deploy
1. Click "Create Web Service"
2. Wait for build (5-10 minutes)
3. Visit generated URL

#### Step 6: Run Migrations
```bash
# SSH into Render shell
# Or use Render dashboard > Shell

npx prisma migrate deploy
```

---

## Database Setup

### PostgreSQL (Production)

#### Option A: Vercel Postgres
```bash
# Install Vercel Postgres
npm install @vercel/postgres

# Update DATABASE_URL in Vercel dashboard
# Format: postgres://user:pass@host:5432/db?sslmode=require
```

#### Option B: Supabase
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings > Database
4. Add to environment variables

#### Option C: Railway Postgres
- Automatically provisioned when you add PostgreSQL
- Connection string available in dashboard

#### Option D: Neon
1. Create account at [neon.tech](https://neon.tech)
2. Create new project
3. Get connection string
4. Add to environment variables

### Running Migrations

After setting up database:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Verify with Prisma Studio (optional)
npx prisma studio
```

---

## Environment Variables Reference

### Required Variables

```env
# Database connection string
DATABASE_URL="postgresql://user:password@host:5432/database"

# Application environment
NODE_ENV="production"
```

### Optional Variables

```env
# OCR Configuration
USE_MOCK_OCR="true"  # Set to false for real OCR

# LLM Integration
LLM_PROVIDER="rule_based"  # or "openai", "claude", "gemini"
LLM_API_KEY=""  # Required if using LLM

# Analytics (optional)
NEXT_PUBLIC_GA_ID=""  # Google Analytics

# Error Tracking (optional)
SENTRY_DSN=""  # Sentry error tracking
```

---

## Post-Deployment

### 1. Verify Deployment

Visit your deployment URL and test:
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Prescription scanner works
- [ ] Health profile works
- [ ] Symptom checker works
- [ ] Waitlist form works
- [ ] No console errors

### 2. Test Database Connection

```bash
# Check if database is accessible
npx prisma studio
```

### 3. Monitor Logs

#### Vercel
```bash
vercel logs
```

#### Railway
```bash
railway logs
```

#### Render
- View logs in Render dashboard

### 4. Set Up Monitoring

#### Vercel Analytics
1. Enable in Vercel dashboard
2. View real-time analytics

#### Sentry (Error Tracking)
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

#### Google Analytics
```tsx
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### 5. Configure Custom Domain

#### Vercel
1. Project Settings > Domains
2. Add domain
3. Configure DNS:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

#### Railway
1. Project Settings > Domains
2. Add custom domain
3. Configure DNS as instructed

#### Render
1. Settings > Custom Domain
2. Add domain
3. Configure DNS:
   ```
   Type: CNAME
   Name: @
   Value: <your-app>.onrender.com
   ```

---

## Continuous Deployment

### Automatic Deployments

All platforms support automatic deployments:

1. **Push to main branch** → Automatic deployment
2. **Pull request** → Preview deployment (Vercel)
3. **Merge PR** → Production deployment

### Manual Deployments

#### Vercel
```bash
vercel --prod
```

#### Railway
```bash
railway up
```

#### Render
- Push to GitHub (auto-deploys)
- Or use "Manual Deploy" in dashboard

---

## Rollback

### Vercel
1. Go to Deployments
2. Find previous successful deployment
3. Click "Promote to Production"

### Railway
1. Go to Deployments
2. Click on previous deployment
3. Click "Redeploy"

### Render
1. Go to Events
2. Find previous deployment
3. Click "Rollback"

---

## Performance Optimization

### Enable Caching

```typescript
// app/api/route.ts
export async function GET() {
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
    }
  })
}
```

### Enable Compression

Vercel automatically enables compression. For other platforms:

```javascript
// next.config.js
module.exports = {
  compress: true,
}
```

### Optimize Images

```tsx
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Description"
  width={500}
  height={300}
  priority  // For above-the-fold images
/>
```

---

## Security

### Environment Variables
- Never commit `.env` to git
- Use platform's secret management
- Rotate API keys regularly

### HTTPS
- All platforms provide free SSL
- Enforce HTTPS in production

### Headers
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}
```

---

## Troubleshooting

### Build Fails

**Error: "Module not found"**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

**Error: "Prisma Client not generated"**
```bash
npx prisma generate
npm run build
```

### Database Connection Fails

**Error: "Can't reach database server"**
- Check DATABASE_URL is correct
- Ensure database is running
- Check firewall rules
- Verify SSL mode: `?sslmode=require`

### Deployment Succeeds but Site Doesn't Work

1. Check logs for errors
2. Verify environment variables
3. Test database connection
4. Check API routes return 200

---

## Maintenance

### Regular Tasks

**Weekly:**
- [ ] Check error logs
- [ ] Monitor performance metrics
- [ ] Review user feedback

**Monthly:**
- [ ] Update dependencies: `npm update`
- [ ] Review security advisories: `npm audit`
- [ ] Backup database
- [ ] Review analytics

**Quarterly:**
- [ ] Major dependency updates
- [ ] Performance audit
- [ ] Security audit
- [ ] User testing

---

## Backup and Recovery

### Database Backups

#### Automated (Recommended)
- Vercel Postgres: Automatic daily backups
- Railway: Automatic backups on paid plans
- Render: Automatic backups on paid plans

#### Manual Backup
```bash
# Export database
pg_dump $DATABASE_URL > backup.sql

# Restore database
psql $DATABASE_URL < backup.sql
```

### Code Backups
- Git repository (GitHub/GitLab)
- Multiple deployment environments
- Tagged releases

---

## Support

For deployment issues:
- Vercel: [vercel.com/support](https://vercel.com/support)
- Railway: [railway.app/help](https://railway.app/help)
- Render: [render.com/docs](https://render.com/docs)

---

## Deployment Checklist

Before going live:
- [ ] Production build tested locally
- [ ] All environment variables set
- [ ] Database migrations run
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Monitoring set up
- [ ] Error tracking configured
- [ ] Analytics enabled
- [ ] Backup strategy in place
- [ ] Team has access to deployment platform
- [ ] Documentation updated
- [ ] Stakeholders notified

**Deployed by:** _______________  
**Date:** _______________  
**Platform:** _______________  
**URL:** _______________  

---

Congratulations on deploying SwasthAI MVP! 🎉
