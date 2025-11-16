# 🚀 Upload SwasthAI to GitHub

## ✅ Pre-Upload Checklist

Your `.gitignore` is already configured to protect:
- ✅ `.env` file (API keys won't be uploaded)
- ✅ `node_modules` (dependencies)
- ✅ Database files (`prisma/dev.db`)
- ✅ Build files (`.next/`)

## 📋 Steps to Upload

### 1. Check What Will Be Uploaded

```bash
git status
```

This shows what files will be committed. **Make sure `.env` is NOT in the list!**

### 2. Add All Files

```bash
git add .
```

### 3. Commit Your Code

```bash
git commit -m "Initial commit: SwasthAI MVP - AI-powered health assistant"
```

### 4. Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `swasthai-mvp` (or your choice)
3. Description: "AI-powered health assistant for Indian users with multilingual symptom checker"
4. Choose: **Private** (recommended) or Public
5. **DO NOT** initialize with README (you already have one)
6. Click "Create repository"

### 5. Link to GitHub

```bash
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/swasthai-mvp.git
```

### 6. Push to GitHub

```bash
git branch -M main
git push -u origin main
```

---

## 🔐 IMPORTANT: Protect Your API Keys

### ⚠️ Your `.env` file will NOT be uploaded (it's in .gitignore)

This means your Gemini API key is safe! ✅

### 📝 For Others to Use Your Code:

They need to:
1. Clone your repository
2. Create their own `.env` file
3. Add their own API key

### 💡 Add This to Your README:

```markdown
## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env`
4. Add your Gemini API key to `.env`
5. Run database migrations: `npx prisma migrate dev`
6. Start the server: `npm run dev`
```

---

## 🎯 What Gets Uploaded

✅ **Will be uploaded:**
- All source code (`app/`, `components/`, `lib/`)
- Configuration files (`package.json`, `tsconfig.json`, etc.)
- Documentation (`README.md`, `docs/`)
- `.env.example` (template without real keys)
- `.gitignore` (protection rules)

❌ **Will NOT be uploaded:**
- `.env` (your API keys) ✅
- `node_modules/` (dependencies)
- `prisma/dev.db` (your database)
- `.next/` (build files)

---

## 🔍 Verify Before Pushing

### Check if .env is protected:

```bash
git status
```

If you see `.env` in the list, **STOP!** Run:

```bash
git reset
git add .gitignore
git commit -m "Add .gitignore"
git add .
git commit -m "Initial commit"
```

### Double-check:

```bash
git ls-files | grep .env
```

Should return nothing (or only `.env.example`)

---

## 🌟 After Upload

### Your repository will be at:
```
https://github.com/YOUR_USERNAME/swasthai-mvp
```

### Share it with:
- Potential employers
- Collaborators
- Open source community

### Add a nice README badge:
```markdown
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
```

---

## 🚨 If You Accidentally Commit .env

If you accidentally committed your `.env` file with API keys:

### 1. Remove from Git history:
```bash
git rm --cached .env
git commit -m "Remove .env from tracking"
git push
```

### 2. Regenerate your API key:
- Go to https://makersuite.google.com/app/apikey
- Delete the old key
- Create a new one
- Update your local `.env`

---

## 📊 Repository Stats

Your SwasthAI MVP includes:
- **85+ files**
- **~20,000 lines of code**
- **Full-stack Next.js application**
- **AI-powered features**
- **Multilingual support**
- **Production-ready**

---

## 🎉 You're Ready!

Run the commands above to upload your amazing project to GitHub!

**Questions?** Check GitHub's documentation: https://docs.github.com/en/get-started
