# SwasthAI MVP - Your Indian Health Companion

A production-quality, scalable web application that provides AI-powered health assistance tailored for Indian users.

## 🚀 Features

- **Prescription Scanner**: Upload prescription images, extract medicines using OCR, and get automated medication schedules
- **Health Profile & Indian Diet**: Track BMI, get personalized Indian diet suggestions based on region and preferences
- **Symptom Checker**: AI-powered symptom triage with risk assessment and care recommendations
- **Teleconsult Waitlist**: Join the waitlist for future video/audio consultations with doctors

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+ (App Router), React 18+, TypeScript 5+
- **Styling**: Tailwind CSS 3+
- **Database**: Prisma ORM with SQLite (dev) / PostgreSQL (production)
- **OCR**: Abstraction layer supporting Tesseract.js or mock implementation
- **AI**: Rule-based triage engine with LLM placeholder for future integration

## 📋 Prerequisites

- Node.js 18+ and npm
- Git

## 🏁 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd swasthai-mvp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and configure:

```env
# Database (SQLite for development)
DATABASE_URL="file:./dev.db"

# Environment
NODE_ENV="development"

# OCR Configuration (use mock for MVP)
USE_MOCK_OCR="true"

# LLM Integration (add API key when ready)
LLM_API_KEY=""
```

### 4. Set up the database

Run Prisma migrations to create the database:

```bash
npm run db:migrate
```

Generate Prisma client:

```bash
npm run db:generate
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build for production (optimized bundle)
- `npm start` - Start production server (run build first)
- `npm run lint` - Run ESLint to check code quality
- `npm run db:push` - Push schema changes to database (quick sync)
- `npm run db:migrate` - Create and run migrations (production-ready)
- `npm run db:studio` - Open Prisma Studio (database GUI at http://localhost:5555)
- `npm run db:generate` - Generate Prisma client after schema changes
- `npm run db:seed` - Seed database with sample data (if seed script exists)

## 🗂️ Project Structure

```
swasthai-mvp/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   ├── prescription/        # Prescription scanner
│   ├── health/              # Health profile & diet
│   ├── symptoms/            # Symptom checker
│   ├── consult/             # Teleconsult placeholder
│   ├── legal/               # Legal pages
│   └── api/                 # API routes
├── components/              # Reusable UI components
│   ├── ui/                  # Base components
│   ├── layout/              # Layout components
│   ├── prescription/        # Prescription components
│   ├── health/              # Health components
│   └── symptoms/            # Symptom components
├── lib/                     # Business logic
│   ├── ocr/                 # OCR service
│   ├── triage/              # Triage engine
│   ├── diet/                # Diet engine
│   ├── utils/               # Utilities
│   └── db/                  # Database client
├── prisma/                  # Database schema
│   └── schema.prisma
├── types/                   # TypeScript types
└── public/                  # Static assets
```

## 🔧 Configuration

### Switching Between Mock and Real OCR

The application uses an OCR abstraction layer that allows easy switching between implementations.

**Using Mock OCR (default for MVP):**
```env
USE_MOCK_OCR="true"
```

**Using Real Tesseract.js OCR:**
```env
USE_MOCK_OCR="false"
```

Note: Real OCR requires Tesseract.js to be properly configured in `lib/ocr/tesseractOCR.ts`.

### Integrating LLM for Symptom Checking

The symptom checker currently uses a rule-based triage engine. To integrate an LLM:

1. Add your API key to `.env`:
```env
LLM_API_KEY="your-openai-api-key"
```

2. Implement the LLM integration in `lib/triage/llmPlaceholder.ts`

3. Update the triage API route to use the LLM function

## 🗄️ Database

### Development (SQLite)

The default configuration uses SQLite for easy local development:

```env
DATABASE_URL="file:./dev.db"
```

### Production (PostgreSQL)

For production, use PostgreSQL:

```env
DATABASE_URL="postgresql://user:password@host:5432/database"
```

### Viewing Data

Use Prisma Studio to view and edit database data:

```bash
npm run db:studio
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Set environment variables in Vercel dashboard:
   - `DATABASE_URL` (PostgreSQL connection string)
   - `NODE_ENV=production`
   - `USE_MOCK_OCR=true` (or false if using real OCR)
   - `LLM_API_KEY` (if using LLM)
4. Vercel will automatically build and deploy

### Railway

1. Create new project from GitHub repo
2. Add PostgreSQL database
3. Set environment variables
4. Deploy

### Render

1. Create new Web Service
2. Connect GitHub repository
3. Add PostgreSQL database
4. Set environment variables
5. Deploy

### Other Platforms

The application can be deployed to:
- DigitalOcean App Platform
- AWS Amplify
- Heroku
- Fly.io

### Important Deployment Steps

Make sure to:
1. Set all environment variables (see `.env.example`)
2. Use PostgreSQL for production database (not SQLite)
3. Run database migrations: `npx prisma migrate deploy`
4. Set `NODE_ENV=production`
5. Configure proper domain and SSL certificate

## 🔐 Security

- All environment variables are stored in `.env` (not committed to git)
- User inputs are validated on both client and server
- Prisma ORM prevents SQL injection
- File uploads are validated for type and size
- Medical disclaimers are prominently displayed

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels for screen readers
- Keyboard navigation support
- WCAG AA color contrast ratios
- Mobile-friendly touch targets (min 44x44px)

## 📱 Mobile Support

The application is built mobile-first and works on:
- Mobile phones (320px+)
- Tablets (768px+)
- Desktops (1280px+)

## 🔮 Future Enhancements

- [ ] Real OCR integration (Tesseract.js or cloud service)
- [ ] LLM integration for advanced symptom analysis
- [ ] User authentication (NextAuth.js)
- [ ] Multi-language support (Hindi, Tamil, Telugu, etc.)
- [ ] Teleconsultation feature (video/audio)
- [ ] ASHA worker workflows for rural healthcare
- [ ] Offline support (PWA)
- [ ] Push notifications for medication reminders
- [ ] Analytics and usage tracking
- [ ] Admin dashboard

## 📄 License

This project is proprietary and confidential.

## 🤝 Contributing

This is a private project. For questions or contributions, please contact the development team.

## ⚠️ Medical Disclaimer

SwasthAI is not a medical device and is not a replacement for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. In case of emergency, contact a doctor or hospital immediately.

## 📞 Support

For support, please contact: support@swasthai.com

## 🐛 Troubleshooting

### Database Issues

**Error: "Can't reach database server"**
- Check your `DATABASE_URL` in `.env`
- Ensure PostgreSQL is running (if using PostgreSQL)
- Run `npx prisma generate` to regenerate client

**Error: "Migration failed"**
- Delete `prisma/dev.db` and run `npm run db:migrate` again
- Or use `npm run db:push` for quick schema sync in development

### Build Issues

**Error: "Module not found"**
- Run `npm install` to ensure all dependencies are installed
- Delete `node_modules` and `.next` folders, then reinstall

**Error: "Type errors"**
- Run `npx prisma generate` to regenerate Prisma types
- Check TypeScript version: `npx tsc --version`

### Environment Issues

**Error: "Environment variable not found"**
- Ensure `.env` file exists (copy from `.env.example`)
- Restart development server after changing `.env`
- Check that variable names match exactly

## 📚 Additional Documentation

- [Performance Optimization Guide](docs/PERFORMANCE.md)
- [API Documentation](docs/API.md) (coming soon)
- [Component Library](docs/COMPONENTS.md) (coming soon)
- [Deployment Guide](docs/DEPLOYMENT.md) (coming soon)

---

Built with ❤️ for India's healthcare needs
