# 🚀 Quick Deployment Guide

Your SwasthAI MVP is ready to deploy! Follow these steps:

## ✅ Pre-Deployment Checklist (COMPLETED)

- [x] Production build successful
- [x] Git repository initialized
- [x] Code committed
- [x] Vercel CLI installed

## 🎯 Deploy to Vercel (Recommended - 5 minutes)

### Step 1: Login to Vercel
```bash
vercel login
```
This will open your browser. Sign in with:
- GitHub (recommended)
- GitLab
- Bitbucket
- Email

### Step 2: Deploy
```bash
vercel
```

Follow the prompts:
1. **Set up and deploy?** → Yes
2. **Which scope?** → Select your account
3. **Link to existing project?** → No
4. **Project name?** → swasthai-mvp (or your choice)
5. **Directory?** → ./ (press Enter)
6. **Override settings?** → No

Vercel will:
- Upload your code
- Build the application
- Deploy to a URL like: `swasthai-mvp-xxx.vercel.app`

### Step 3: Set Environment Variables

After deployment, set these in Vercel dashboard:

```bash
# Go to: https://vercel.com/your-username/swasthai-mvp/settings/environment-variables

DATABASE_URL=file:./dev.db
NODE_ENV=production
USE_MOCK_OCR=true
LLM_PROVIDER=rule_based
```

**Note:** For production, you should use PostgreSQL instead of SQLite.

### Step 4: Redeploy with Environment Variables
```bash
vercel --prod
```

## 🎉 Your App is Live!

Visit your deployment URL to test the application.

---

## 🗄️ Set Up Production Database (Optional but Recommended)

### Option A: Vercel Postgres (Easiest)
1. Go to your project in Vercel dashboard
2. Click "Storage" tab
3. Click "Create Database" → "Postgres"
4. Copy the connection string
5. Add to environment variables as `DATABASE_URL`

### Option B: Supabase (Free Tier)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy connection string (Transaction mode)
5. Add to Vercel environment variables

### Option C: Railway (Easy PostgreSQL)
1. Go to [railway.app](https://railway.app)
2. Create new project → Add PostgreSQL
3. Copy connection string
4. Add to Vercel environment variables

### After Adding Database:
```bash
# Run migrations
npx prisma migrate deploy

# Or if using Vercel Postgres
vercel env pull .env.production
npx prisma migrate deploy
```

---

## 🧪 Test Your Deployment

Visit your deployment URL and test:
- [ ] Homepage loads
- [ ] Prescription scanner works
- [ ] Health profile works
- [ ] Symptom checker works
- [ ] Waitlist form works

---

## 📊 Monitor Your App

### Vercel Dashboard
- View deployment logs
- Monitor performance
- Check analytics
- Manage environment variables

### Access Dashboard:
```bash
vercel dashboard
```

Or visit: https://vercel.com/dashboard

---

## 🔄 Update Your Deployment

After making changes:

```bash
# Commit changes
git add .
git commit -m "Your update message"

# Deploy to production
vercel --prod
```

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Test build locally first
npm run build

# Check logs
vercel logs
```

### Database Connection Issues
- Ensure DATABASE_URL is set correctly
- Check if database is accessible
- Verify SSL mode for PostgreSQL: `?sslmode=require`

### Environment Variables Not Working
- Redeploy after adding variables: `vercel --prod`
- Check variable names match exactly
- Ensure no typos in values

---

## 📱 Share Your App

Your app is now live at:
```
https://swasthai-mvp-xxx.vercel.app
```

Share this URL for testing!

---

## 🎯 Next Steps

1. **Test thoroughly** - Use the testing guide in `docs/TESTING.md`
2. **Set up monitoring** - Add Sentry for error tracking
3. **Add analytics** - Set up Google Analytics
4. **Custom domain** - Add your own domain in Vercel settings
5. **Production database** - Migrate from SQLite to PostgreSQL

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Full Deployment Guide](docs/DEPLOYMENT.md)
- [Testing Guide](docs/TESTING.md)
- [Performance Guide](docs/PERFORMANCE.md)

---

**Need Help?** Check the full deployment guide in `docs/DEPLOYMENT.md`

Good luck with your deployment! 🚀
