# SwasthAI MVP Web Application - Design Document

## Overview

The SwasthAI MVP is a production-quality web application built with Next.js, TypeScript, and Tailwind CSS. It provides three core features: prescription OCR with medicine scheduling, health profile management with Indian diet suggestions, and AI-powered symptom checking. The architecture is designed for scalability and extensibility, allowing future expansion into teleconsultation and rural healthcare features.

### Design Principles

1. **Mobile-First**: Design for mobile devices first, then scale up to desktop
2. **Type-Safe**: Use TypeScript throughout for compile-time error detection
3. **Modular**: Separate concerns with clear boundaries between UI, logic, and data
4. **Extensible**: Build abstractions that allow easy feature additions
5. **Performance**: Optimize for low-end devices and slow connections
6. **Safety**: Include disclaimers and warnings for medical content

## Architecture

### High-Level System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Browser                         │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Next.js Frontend (React + TS)            │  │
│  │  - Pages (App Router)                            │  │
│  │  - Components (Tailwind CSS)                     │  │
│  │  - Client-side State                             │  │
│  └────────────────┬─────────────────────────────────┘  │
└───────────────────┼─────────────────────────────────────┘
                    │ HTTP/API Calls
┌───────────────────▼─────────────────────────────────────┐
│              Next.js Server (API Routes)                │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐  │
│  │ OCR Service  │  │Triage Engine │  │Diet Engine  │  │
│  │ (Abstraction)│  │(Rule-based)  │  │(Rule-based) │  │
│  └──────────────┘  └──────────────┘  └─────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │           Prisma ORM Layer                       │  │
│  └────────────────┬─────────────────────────────────┘  │
└───────────────────┼─────────────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────────────┐
│              Database (SQLite/PostgreSQL)               │
│  - Users                                                │
│  - HealthProfiles                                       │
│  - Prescriptions                                        │
│  - Medicines                                            │
│  - SymptomSessions                                      │
│  - ConsultWaitlist                                      │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend:**
- Next.js 14+ (App Router)
- React 18+
- TypeScript 5+
- Tailwind CSS 3+

**Backend:**
- Next.js API Routes
- TypeScript

**Database:**
- Prisma ORM
- SQLite (development) or PostgreSQL (production)

**OCR:**
- Tesseract.js (optional) or Mocked implementation
- Abstraction layer for easy swapping

**AI/ML:**
- Rule-based triage engine (no ML required for MVP)
- LLM placeholder for future integration

## Components and Interfaces

### Folder Structure

```
swasthai-mvp/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with navbar/footer
│   ├── page.tsx                 # Landing page (/)
│   ├── prescription/
│   │   ├── page.tsx            # Prescription scanner
│   │   └── history/
│   │       └── page.tsx        # Prescription history
│   ├── health/
│   │   └── page.tsx            # Health profile & diet
│   ├── symptoms/
│   │   └── page.tsx            # Symptom checker
│   ├── consult/
│   │   └── page.tsx            # Teleconsult placeholder
│   ├── legal/
│   │   └── disclaimer/
│   │       └── page.tsx        # Legal disclaimer
│   └── api/                     # API routes
│       ├── prescription/
│       │   ├── extract/
│       │   │   └── route.ts    # OCR extraction endpoint
│       │   └── save/
│       │       └── route.ts    # Save prescription endpoint
│       ├── health/
│       │   └── save/
│       │       └── route.ts    # Save health profile endpoint
│       ├── triage/
│       │   └── route.ts        # Symptom triage endpoint
│       └── waitlist/
│           └── route.ts        # Consult waitlist endpoint
├── components/                   # Reusable UI components
│   ├── ui/                      # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── Badge.tsx
│   ├── layout/                  # Layout components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   ├── prescription/            # Prescription-specific components
│   │   ├── FileUpload.tsx
│   │   ├── MedicineSchedule.tsx
│   │   └── PrescriptionCard.tsx
│   ├── health/                  # Health-specific components
│   │   ├── BMICard.tsx
│   │   ├── DietPlan.tsx
│   │   └── HealthForm.tsx
│   └── symptoms/                # Symptom-specific components
│       ├── ChatInterface.tsx
│       ├── MessageBubble.tsx
│       └── RiskBadge.tsx
├── lib/                         # Business logic and utilities
│   ├── ocr/
│   │   ├── ocrService.ts       # OCR abstraction layer
│   │   ├── tesseractOCR.ts     # Tesseract implementation
│   │   └── mockOCR.ts          # Mock implementation
│   ├── triage/
│   │   ├── triageEngine.ts     # Rule-based triage logic
│   │   └── llmPlaceholder.ts   # LLM integration placeholder
│   ├── diet/
│   │   ├── dietEngine.ts       # Diet suggestion logic
│   │   ├── mealPlans.ts        # Meal plan data
│   │   └── nutritionRules.ts   # Nutrition rules
│   ├── utils/
│   │   ├── bmiCalculator.ts    # BMI calculation
│   │   ├── validators.ts       # Input validation
│   │   └── formatters.ts       # Data formatting
│   └── db/
│       └── prisma.ts           # Prisma client singleton
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/             # Database migrations
├── public/                      # Static assets
│   ├── images/
│   └── icons/
├── types/                       # TypeScript type definitions
│   ├── prescription.ts
│   ├── health.ts
│   ├── symptom.ts
│   └── index.ts
├── .env.example                 # Environment variables template
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## Data Models

### Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"  // or "postgresql" for production
  url      = env("DATABASE_URL")
}

model User {
  id            String          @id @default(cuid())
  name          String?
  email         String?         @unique
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
  
  healthProfile HealthProfile?
  prescriptions Prescription[]
  symptomSessions SymptomSession[]
}

model HealthProfile {
  id              String   @id @default(cuid())
  userId          String   @unique
  age             Int?
  gender          String?
  heightCm        Float?
  weightKg        Float?
  bmi             Float?
  bmiCategory     String?
  bpSystolic      Int?
  bpDiastolic     Int?
  bloodSugar      Int?
  activityLevel   String?
  foodPreference  String?
  region          String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Prescription {
  id           String    @id @default(cuid())
  userId       String?
  doctorName   String?
  prescribedAt DateTime?
  notes        String?
  createdAt    DateTime  @default(now())
  
  user      User?      @relation(fields: [userId], references: [id], onDelete: SetNull)
  medicines Medicine[]
}

model Medicine {
  id             String  @id @default(cuid())
  prescriptionId String
  name           String
  dosagePattern  String  // e.g., "1-0-1"
  durationDays   Int?
  notes          String?
  
  prescription Prescription @relation(fields: [prescriptionId], references: [id], onDelete: Cascade)
}

model SymptomSession {
  id          String   @id @default(cuid())
  userId      String?
  description String
  riskLevel   String
  resultJson  String   // Store full triage result as JSON
  createdAt   DateTime @default(now())
  
  user User? @relation(fields: [userId], references: [id], onDelete: SetNull)
}

model ConsultWaitlist {
  id        String   @id @default(cuid())
  name      String
  phone     String
  city      String?
  concern   String?
  createdAt DateTime @default(now())
}
```

### TypeScript Types

```typescript
// types/prescription.ts
export interface Medicine {
  id?: string;
  name: string;
  dosagePattern: string;
  durationDays?: number;
  notes?: string;
}

export interface Prescription {
  id?: string;
  doctorName?: string;
  prescribedAt?: Date;
  notes?: string;
  medicines: Medicine[];
}

export interface ExtractedPrescriptionData {
  doctorName?: string;
  date?: string;
  medicines: Medicine[];
}

// types/health.ts
export interface HealthProfile {
  age?: number;
  gender?: string;
  heightCm?: number;
  weightKg?: number;
  bmi?: number;
  bmiCategory?: string;
  bpSystolic?: number;
  bpDiastolic?: number;
  bloodSugar?: number;
  activityLevel?: string;
  foodPreference?: string;
  region?: string;
}

export interface BMIResult {
  value: number;
  category: 'Underweight' | 'Normal' | 'Overweight' | 'Obese';
  riskHint: string;
}

export interface DietPlan {
  breakfast: string[];
  lunch: string[];
  snacks: string[];
  dinner: string[];
  goodToInclude: string[];
  limitAvoid: string[];
}

// types/symptom.ts
export interface SymptomInput {
  description: string;
  age?: number;
  gender?: string;
}

export interface TriageResult {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  summary: string;
  homeCareTips: string[];
  doctorRecommendation: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  triageResult?: TriageResult;
}
```

## Feature Specifications

### 1. Landing Page (/)

**Purpose:** Introduce SwasthAI and guide users to main features

**Components:**
- Hero section with title, subtitle, and CTA buttons
- Feature cards (3-4) explaining core functionality
- "Built for India" section
- Footer with legal links

**Design:**
- Clean, clinical aesthetic
- White background with subtle green (#10B981) and blue (#3B82F6) accents
- Large, readable typography
- Mobile-first responsive layout

**Implementation:**
```typescript
// app/page.tsx
export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeatureCards />
      <BuiltForIndiaSection />
    </div>
  );
}
```

### 2. Prescription Scanner (/prescription)

**Purpose:** Upload and parse prescriptions, display medicine schedules

**Flow:**
1. User uploads image/PDF
2. Show loading state
3. Extract data using OCR service
4. Display parsed medicines in editable table
5. Show medicine schedule (Morning/Afternoon/Night)
6. Allow manual editing
7. Save to database

**Components:**
- FileUpload (drag-and-drop + file picker)
- MedicineSchedule (table view)
- EditableMedicineRow
- SaveButton
- Disclaimer banner

**API Endpoint:**
```typescript
// app/api/prescription/extract/route.ts
export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file');
  
  const extractedData = await extractPrescriptionFromImage(file);
  
  return Response.json(extractedData);
}
```

**OCR Service Abstraction:**
```typescript
// lib/ocr/ocrService.ts
export async function extractPrescriptionFromImage(
  file: File
): Promise<ExtractedPrescriptionData> {
  // Use Tesseract or mock implementation
  if (process.env.USE_MOCK_OCR === 'true') {
    return mockOCR(file);
  } else {
    return tesseractOCR(file);
  }
}
```

### 3. Prescription History (/prescription/history)

**Purpose:** Display saved prescriptions

**Components:**
- PrescriptionList
- PrescriptionCard (date, doctor, medicine count)
- ViewButton (opens modal or navigates to detail)
- EmptyState

**Data Fetching:**
```typescript
// app/prescription/history/page.tsx
export default async function PrescriptionHistoryPage() {
  const prescriptions = await prisma.prescription.findMany({
    include: { medicines: true },
    orderBy: { createdAt: 'desc' }
  });
  
  return <PrescriptionList prescriptions={prescriptions} />;
}
```

### 4. Health Profile & Diet (/health)

**Purpose:** Collect health data, calculate BMI, generate diet suggestions

**Flow:**
1. User fills health form
2. Calculate BMI on submit
3. Display BMI card with category
4. Generate diet plan based on profile
5. Display meal suggestions
6. Save to database

**Components:**
- HealthForm (multi-field form)
- BMICard (displays BMI, category, risk hint)
- DietPlan (meal suggestions + lists)
- Disclaimer

**BMI Calculation:**
```typescript
// lib/utils/bmiCalculator.ts
export function calculateBMI(heightCm: number, weightKg: number): BMIResult {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  
  let category: BMIResult['category'];
  let riskHint: string;
  
  if (bmi < 18.5) {
    category = 'Underweight';
    riskHint = 'May need to gain weight for optimal health';
  } else if (bmi < 25) {
    category = 'Normal';
    riskHint = 'Healthy weight range';
  } else if (bmi < 30) {
    category = 'Overweight';
    riskHint = 'Consider lifestyle changes to reduce health risks';
  } else {
    category = 'Obese';
    riskHint = 'Consult a doctor for weight management plan';
  }
  
  return {
    value: Math.round(bmi * 10) / 10,
    category,
    riskHint
  };
}
```

**Diet Engine:**
```typescript
// lib/diet/dietEngine.ts
export function generateDietPlan(profile: HealthProfile): DietPlan {
  const { bmiCategory, foodPreference, region, age } = profile;
  
  // Rule-based logic
  const breakfast = getBreakfastSuggestions(region, foodPreference);
  const lunch = getLunchSuggestions(region, foodPreference, bmiCategory);
  const snacks = getSnackSuggestions(bmiCategory);
  const dinner = getDinnerSuggestions(region, foodPreference, bmiCategory);
  
  const goodToInclude = getGoodFoods(bmiCategory, profile);
  const limitAvoid = getAvoidFoods(bmiCategory, profile);
  
  return { breakfast, lunch, snacks, dinner, goodToInclude, limitAvoid };
}
```

### 5. Symptom Checker (/symptoms)

**Purpose:** Assess symptoms and provide triage recommendations

**Flow:**
1. User describes symptoms in chat interface
2. Send to triage API
3. Receive risk assessment
4. Display with color-coded badge
5. Show home care tips and doctor recommendations
6. Save session to database

**Components:**
- ChatInterface (message list + input)
- MessageBubble (user and assistant messages)
- RiskBadge (color-coded: green/amber/red)
- DisclaimerBanner

**Triage Engine:**
```typescript
// lib/triage/triageEngine.ts
export function assessSymptoms(input: SymptomInput): TriageResult {
  const description = input.description.toLowerCase();
  
  // HIGH RISK keywords
  const highRiskKeywords = [
    'chest pain', 'difficulty breathing', 'severe headache',
    'confusion', 'loss of consciousness', 'severe bleeding',
    'stroke', 'heart attack', 'can\'t breathe'
  ];
  
  // MEDIUM RISK patterns
  const mediumRiskPatterns = [
    'fever.*3 days', 'chronic pain', 'blood in stool',
    'blood in urine', 'persistent vomiting', 'severe pain'
  ];
  
  // Check HIGH RISK
  for (const keyword of highRiskKeywords) {
    if (description.includes(keyword)) {
      return {
        riskLevel: 'HIGH',
        summary: 'Your symptoms may indicate a serious condition.',
        homeCareTips: ['Call emergency services immediately', 'Do not drive yourself'],
        doctorRecommendation: 'Go to the nearest emergency room immediately or call an ambulance.'
      };
    }
  }
  
  // Check MEDIUM RISK
  for (const pattern of mediumRiskPatterns) {
    if (new RegExp(pattern).test(description)) {
      return {
        riskLevel: 'MEDIUM',
        summary: 'Your symptoms should be evaluated by a doctor soon.',
        homeCareTips: ['Monitor symptoms closely', 'Rest and stay hydrated'],
        doctorRecommendation: 'Please see a doctor within 24 hours.'
      };
    }
  }
  
  // LOW RISK (default)
  return {
    riskLevel: 'LOW',
    summary: 'Your symptoms appear to be mild.',
    homeCareTips: [
      'Rest and stay hydrated',
      'Monitor symptoms for changes',
      'Take over-the-counter medication if needed'
    ],
    doctorRecommendation: 'If symptoms persist for more than 3 days or worsen, consult a doctor.'
  };
}
```

**LLM Placeholder:**
```typescript
// lib/triage/llmPlaceholder.ts
export async function callLLMForSymptomAdvice(
  input: SymptomInput
): Promise<TriageResult> {
  // TODO: Integrate with OpenAI or other LLM provider
  // const apiKey = process.env.LLM_API_KEY;
  // const response = await fetch('https://api.openai.com/v1/chat/completions', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${apiKey}`,
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     model: 'gpt-4',
  //     messages: [{ role: 'user', content: input.description }]
  //   })
  // });
  
  // For now, use rule-based engine
  return assessSymptoms(input);
}
```

### 6. Teleconsult Placeholder (/consult)

**Purpose:** Show future feature and collect waitlist

**Components:**
- FeatureExplanation
- WaitlistForm (name, phone, city, concern)
- SuccessMessage

**API Endpoint:**
```typescript
// app/api/waitlist/route.ts
export async function POST(request: Request) {
  const data = await request.json();
  
  const entry = await prisma.consultWaitlist.create({
    data: {
      name: data.name,
      phone: data.phone,
      city: data.city,
      concern: data.concern
    }
  });
  
  return Response.json({ success: true, id: entry.id });
}
```

## UI/UX Design Guidelines

### Color Palette

```css
/* Primary Colors */
--primary-green: #10B981;    /* Success, health */
--primary-blue: #3B82F6;     /* Trust, medical */
--primary-teal: #14B8A6;     /* Accent */

/* Risk Colors */
--risk-low: #10B981;         /* Green */
--risk-medium: #F59E0B;      /* Amber */
--risk-high: #EF4444;        /* Red */

/* Neutrals */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-600: #4B5563;
--gray-900: #111827;

/* Background */
--bg-primary: #FFFFFF;
--bg-secondary: #F9FAFB;
```

### Typography

```css
/* Font Family */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### Spacing

```css
/* Use Tailwind's spacing scale */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
```

### Component Patterns

**Button:**
```tsx
<button className="
  px-6 py-3 
  bg-primary-green text-white 
  rounded-lg 
  font-medium 
  hover:bg-green-600 
  active:bg-green-700
  transition-colors
  min-h-[44px]
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Button Text
</button>
```

**Card:**
```tsx
<div className="
  bg-white 
  rounded-xl 
  shadow-sm 
  border border-gray-200 
  p-6
">
  Card Content
</div>
```

**Input:**
```tsx
<input className="
  w-full 
  px-4 py-3 
  border border-gray-300 
  rounded-lg 
  focus:ring-2 focus:ring-primary-blue focus:border-transparent
  text-base
" />
```

## Error Handling

### Client-Side Error Handling

```typescript
// components/ErrorBoundary.tsx
'use client';

export class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Something went wrong
          </h2>
          <p className="mt-2 text-gray-600">
            Please refresh the page and try again.
          </p>
        </div>
      );
    }
    
    return this.props.children;
  }
}
```

### API Error Handling

```typescript
// lib/utils/apiError.ts
export class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
  }
}

export function handleAPIError(error: unknown) {
  if (error instanceof APIError) {
    return Response.json(
      { error: error.message },
      { status: error.statusCode }
    );
  }
  
  console.error('Unexpected error:', error);
  return Response.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
```

## Testing Strategy

### Manual Testing Checklist

**Prescription Scanner:**
- [ ] Upload image file
- [ ] Upload PDF file
- [ ] Drag and drop file
- [ ] View extracted medicines
- [ ] Edit medicine details
- [ ] Save prescription
- [ ] View in history

**Health Profile:**
- [ ] Fill all required fields
- [ ] Submit form
- [ ] View BMI calculation
- [ ] View diet suggestions
- [ ] Test with different BMI categories
- [ ] Test with different regions

**Symptom Checker:**
- [ ] Enter low-risk symptoms
- [ ] Enter medium-risk symptoms
- [ ] Enter high-risk symptoms
- [ ] View appropriate responses
- [ ] Check color-coded badges

**Responsive Design:**
- [ ] Test on mobile (320px-480px)
- [ ] Test on tablet (768px-1024px)
- [ ] Test on desktop (1280px+)

**Browser Compatibility:**
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

## Deployment

### Environment Variables

```bash
# .env.example
DATABASE_URL="file:./dev.db"  # SQLite for development
# DATABASE_URL="postgresql://user:password@localhost:5432/swasthai"  # PostgreSQL for production

NODE_ENV="development"
LLM_API_KEY=""  # Placeholder for future LLM integration
USE_MOCK_OCR="true"  # Set to false to use real OCR
```

### Build and Deploy

```bash
# Install dependencies
npm install

# Run database migrations
npx prisma migrate dev

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Deployment Platforms

**Vercel (Recommended):**
1. Connect GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

**Other Options:**
- Railway
- Render
- DigitalOcean App Platform
- AWS Amplify

## Security Considerations

1. **Input Validation:** Validate all user inputs on both client and server
2. **SQL Injection:** Use Prisma ORM (parameterized queries)
3. **XSS Prevention:** React automatically escapes content
4. **File Upload:** Validate file types and sizes
5. **Environment Variables:** Never commit .env to version control
6. **HTTPS:** Use HTTPS in production
7. **Rate Limiting:** Implement rate limiting on API routes (future enhancement)

## Performance Optimization

1. **Image Optimization:** Use Next.js Image component
2. **Code Splitting:** Automatic with Next.js App Router
3. **Lazy Loading:** Load components on demand
4. **Database Indexing:** Add indexes on frequently queried fields
5. **Caching:** Use Next.js caching for static content
6. **Bundle Size:** Monitor and optimize bundle size

## Accessibility

1. **Semantic HTML:** Use proper HTML elements
2. **ARIA Labels:** Add labels for screen readers
3. **Keyboard Navigation:** Ensure all interactive elements are keyboard accessible
4. **Color Contrast:** Maintain WCAG AA contrast ratios
5. **Focus Indicators:** Visible focus states for all interactive elements
6. **Alt Text:** Provide alt text for all images

## Future Enhancements

1. **Real OCR Integration:** Replace mock with Tesseract.js or cloud OCR service
2. **LLM Integration:** Add OpenAI or similar for advanced symptom analysis
3. **User Authentication:** Implement proper auth with NextAuth.js
4. **Multi-language Support:** Add Hindi, Tamil, Telugu, etc.
5. **Teleconsultation:** Build video/audio consultation feature
6. **ASHA Integration:** Add rural health worker workflows
7. **Offline Support:** Add PWA capabilities
8. **Push Notifications:** Medication reminders
9. **Analytics:** Track user behavior and feature usage
10. **Admin Dashboard:** Manage users, prescriptions, and waitlist

---

This design document provides a comprehensive blueprint for building the SwasthAI MVP. All components are designed to be modular, extensible, and production-ready.
