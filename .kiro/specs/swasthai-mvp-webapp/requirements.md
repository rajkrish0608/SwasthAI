# SwasthAI MVP Web Application - Requirements Document

## Introduction

SwasthAI MVP is a production-quality, scalable web application that serves as the digital health assistant for Indian users. The MVP focuses on core features: prescription OCR with medicine scheduling, health profile management with Indian diet suggestions, and AI-powered symptom checking. The application is built with extensibility in mind, allowing future expansion into teleconsultation and rural healthcare features.

This requirements document outlines the complete technical and functional specifications for building a runnable, high-quality MVP that can be extended into a full startup product.

## Glossary

- **MVP**: Minimum Viable Product - the initial version with core features
- **OCR**: Optical Character Recognition - technology to extract text from prescription images
- **Triage**: Medical assessment to determine urgency of care needed
- **BMI**: Body Mass Index - measure of body fat based on height and weight
- **Prisma**: TypeScript ORM (Object-Relational Mapping) for database operations
- **Next.js**: React framework with server-side rendering and API routes
- **App Router**: Next.js 13+ routing system using the app directory
- **API Route**: Server-side endpoint in Next.js for backend logic
- **LLM**: Large Language Model - AI system for natural language processing
- **Rule-Based Engine**: Logic system using predefined rules rather than machine learning
- **Session**: User interaction period with the application
- **Disclaimer**: Legal notice about limitations and proper use of the application

## Requirements

### Requirement 1: Project Setup and Technology Stack

**User Story:** As a developer, I want a properly configured Next.js project with TypeScript and Tailwind CSS, so that I can build a modern, type-safe, and responsive web application.

#### Acceptance Criteria

1. THE Project SHALL use Next.js with App Router and TypeScript for all code
2. THE Project SHALL use Tailwind CSS for styling with mobile-first responsive design
3. THE Project SHALL use Prisma ORM with SQLite or PostgreSQL for database operations
4. THE Project SHALL have a clear folder structure with app/, components/, lib/, and prisma/ directories
5. THE Project SHALL include a .env.example file documenting all required environment variables
6. THE Project SHALL include a comprehensive README.md with setup and run instructions

### Requirement 2: Landing Page Implementation

**User Story:** As a user, I want a clear landing page that explains SwasthAI and guides me to the main features, so that I can understand what the application offers and navigate easily.

#### Acceptance Criteria

1. THE Landing Page SHALL display a hero section with title "SwasthAI – Your Indian Health Companion" and descriptive subtitle
2. THE Landing Page SHALL provide navigation buttons to "Scan Prescription" and "Check Symptoms" features
3. THE Landing Page SHALL display 3-4 feature highlight cards explaining core functionality
4. THE Landing Page SHALL include a "Built for India" section highlighting multi-language support and Indian-specific features
5. THE Landing Page SHALL include a footer with links to About, Privacy, and Disclaimer pages
6. THE Landing Page SHALL use clean, clinical design with white background and subtle green/blue accents

### Requirement 3: Prescription Scanner Feature

**User Story:** As a user, I want to upload a prescription image and see the extracted medicines with dosage schedules, so that I can understand and track my medication regimen.

#### Acceptance Criteria

1. THE Prescription Scanner SHALL accept image uploads (JPEG, PNG) and PDF files via drag-and-drop or file picker
2. THE Prescription Scanner SHALL process uploaded files using an extractPrescriptionFromImage function
3. THE Prescription Scanner SHALL display extracted data including doctor name, date, and list of medicines with dosage patterns
4. THE Prescription Scanner SHALL render a medicine schedule table with Morning, Afternoon, and Night columns
5. THE Prescription Scanner SHALL allow users to manually edit medicine details, dosage patterns, and duration
6. THE Prescription Scanner SHALL provide a "Save prescription" button that persists data to the database
7. THE Prescription Scanner SHALL display loading states during processing and error states for parsing failures
8. THE Prescription Scanner SHALL include a visible safety disclaimer about following doctor's advice

### Requirement 4: Prescription History Management

**User Story:** As a user, I want to view my saved prescriptions with dates and doctor names, so that I can track my medication history over time.

#### Acceptance Criteria

1. THE Application SHALL provide a Prescription History page or section listing all saved prescriptions
2. THE Prescription History SHALL display prescription date, doctor name, and number of medicines for each entry
3. THE Prescription History SHALL provide a "View" button for each prescription to display the full medicine schedule
4. THE Prescription History SHALL order prescriptions by date with most recent first
5. THE Prescription History SHALL handle empty state when no prescriptions are saved

### Requirement 5: OCR Abstraction Layer

**User Story:** As a developer, I want an abstraction layer for OCR functionality, so that I can easily swap between mock data and real OCR implementations.

#### Acceptance Criteria

1. THE Application SHALL implement an extractPrescriptionFromImage function that accepts a file and returns structured data
2. THE OCR Abstraction SHALL support either Tesseract.js integration OR a mocked function returning sample data
3. THE OCR Abstraction SHALL return structured data with doctor name, date, and array of medicines
4. THE Medicine Data SHALL include name, dosage pattern, duration in days, and optional notes
5. THE OCR Implementation SHALL be modular to allow easy replacement with production OCR services

### Requirement 6: Health Profile Management

**User Story:** As a user, I want to enter my health information including age, height, weight, and dietary preferences, so that I can receive personalized health insights.

#### Acceptance Criteria

1. THE Health Profile Form SHALL collect name, age, gender, height (cm), and weight (kg)
2. THE Health Profile Form SHALL collect optional data: BP (systolic/diastolic), blood sugar, activity level
3. THE Health Profile Form SHALL collect food preference (Veg/Non-veg/Eggetarian) and region (North/South/East/West India)
4. THE Health Profile SHALL automatically calculate BMI from height and weight
5. THE Health Profile SHALL categorize BMI as Underweight, Normal, Overweight, or Obese
6. THE Health Profile SHALL persist data to the database via Prisma ORM

### Requirement 7: Indian Diet Suggestion Engine

**User Story:** As a user, I want to receive Indian diet suggestions based on my BMI, age, food preferences, and region, so that I can follow culturally appropriate nutrition guidance.

#### Acceptance Criteria

1. THE Diet Engine SHALL generate meal suggestions for Breakfast, Lunch, Snacks, and Dinner
2. THE Diet Engine SHALL base suggestions on BMI category, age group, food preference, and region
3. THE Diet Engine SHALL consider health conditions like high BP or high blood sugar when provided
4. THE Diet Engine SHALL provide a "Good to include" list and a "Limit/Avoid" list
5. THE Diet Engine SHALL be implemented in a separate dietEngine.ts utility with documented rules
6. THE Diet Suggestions SHALL include a disclaimer stating they are general wellness guidance, not medical advice

### Requirement 8: BMI Calculation and Display

**User Story:** As a user, I want to see my calculated BMI with category and risk hints, so that I can understand my weight status.

#### Acceptance Criteria

1. THE Application SHALL calculate BMI using the formula: weight(kg) / (height(m))²
2. THE Application SHALL display BMI value rounded to one decimal place
3. THE Application SHALL categorize BMI as: Underweight (<18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (≥30)
4. THE Application SHALL display a summary card with BMI value, category, and small risk hint
5. THE BMI Display SHALL use color coding: blue (underweight), green (normal), yellow (overweight), red (obese)

### Requirement 9: Symptom Checker with Chat Interface

**User Story:** As a user, I want to describe my symptoms in a chat interface and receive risk assessment with care recommendations, so that I can understand the urgency of my condition.

#### Acceptance Criteria

1. THE Symptom Checker SHALL provide a chat-style interface with AI messages on left and user messages on right
2. THE Symptom Checker SHALL include an input box at bottom with "Send" button
3. THE Symptom Checker SHALL accept symptom descriptions as text input
4. THE Symptom Checker SHALL optionally use age and gender from user profile for assessment
5. THE Symptom Checker SHALL display AI responses with risk level, summary, home care tips, and doctor recommendations

### Requirement 10: Rule-Based Triage Engine

**User Story:** As a developer, I want a rule-based triage engine that classifies symptoms by risk level, so that users receive appropriate care guidance without requiring machine learning models.

#### Acceptance Criteria

1. THE Triage Engine SHALL classify symptoms as LOW, MEDIUM, or HIGH risk
2. THE Triage Engine SHALL identify HIGH RISK keywords: chest pain, difficulty breathing, severe headache, confusion, loss of consciousness
3. THE Triage Engine SHALL identify MEDIUM RISK patterns: fever >3 days, chronic pain, blood in stool/urine
4. THE Triage Engine SHALL classify all other symptoms as LOW RISK
5. THE Triage Engine SHALL return structured data with riskLevel, summary, homeCareTips array, and doctorRecommendation
6. THE Triage Engine SHALL be implemented as a separate API route at /api/triage

### Requirement 11: LLM Integration Placeholder

**User Story:** As a developer, I want a placeholder function for LLM integration, so that I can easily add AI-powered symptom analysis in the future.

#### Acceptance Criteria

1. THE Application SHALL include a callLLMForSymptomAdvice function stub
2. THE LLM Function SHALL accept SymptomInput with description, age, and gender
3. THE LLM Function SHALL return a Promise<TriageResult> with risk level and recommendations
4. THE LLM Function SHALL read API key from process.env.LLM_API_KEY
5. THE LLM Function SHALL currently return rule-based results with TODO comment for future integration
6. THE Application SHALL NOT hardcode any API keys in source code

### Requirement 12: Symptom Checker Safety Features

**User Story:** As a user, I want clear safety disclaimers on the symptom checker, so that I understand its limitations and know when to seek professional help.

#### Acceptance Criteria

1. THE Symptom Checker SHALL display a disclaimer at page top stating it does not provide diagnosis or prescriptions
2. THE Symptom Checker SHALL include emergency warning: "For emergencies, contact a doctor or hospital immediately"
3. THE Symptom Checker SHALL display risk badges with color coding: Green (LOW), Amber (MEDIUM), Red (HIGH)
4. THE Symptom Checker SHALL provide clear "Please see a doctor if..." text for MEDIUM and HIGH risk results
5. THE Symptom Checker SHALL include bulleted home-care tips for all risk levels

### Requirement 13: Database Schema with Prisma

**User Story:** As a developer, I want a well-designed database schema using Prisma ORM, so that I can store and retrieve user data, prescriptions, and health profiles efficiently.

#### Acceptance Criteria

1. THE Database Schema SHALL include User model with id, name, email, timestamps, and relations
2. THE Database Schema SHALL include HealthProfile model with user health data and BMI calculations
3. THE Database Schema SHALL include Prescription model with doctor name, date, notes, and medicine relations
4. THE Database Schema SHALL include Medicine model with name, dosage pattern, duration, and prescription relation
5. THE Database Schema SHALL include SymptomSession model to track symptom checker usage
6. THE Database Schema SHALL include ConsultWaitlist model for future teleconsult feature
7. THE Database Schema SHALL use appropriate field types, constraints, and indexes

### Requirement 14: Teleconsult Placeholder Page

**User Story:** As a user, I want to see a placeholder for future teleconsultation features, so that I understand the product roadmap and can join a waitlist.

#### Acceptance Criteria

1. THE Teleconsult Page SHALL explain the future feature: video/audio consultations with doctors
2. THE Teleconsult Page SHALL provide a "Join waitlist" form collecting name, phone, city, and health concern
3. THE Teleconsult Page SHALL store waitlist submissions in the ConsultWaitlist database table
4. THE Teleconsult Page SHALL display a success message after form submission
5. THE Teleconsult Page SHALL indicate this is a planned feature, not currently available

### Requirement 15: Mobile-First Responsive Design

**User Story:** As a user on a mobile device, I want the application to work smoothly on my phone with large buttons and clear typography, so that I can use it easily on low-end devices.

#### Acceptance Criteria

1. THE Application SHALL use mobile-first responsive design principles
2. THE Application SHALL have large, touch-friendly buttons (minimum 44x44px)
3. THE Application SHALL use clear typography with minimum 16px font size for body text
4. THE Application SHALL work well on screen sizes from 320px to 1920px width
5. THE Application SHALL optimize performance for low-end phones
6. THE Application SHALL test layouts on mobile, tablet, and desktop breakpoints

### Requirement 16: Error Handling and Validation

**User Story:** As a user, I want clear error messages when something goes wrong, so that I understand what happened and how to fix it.

#### Acceptance Criteria

1. THE Application SHALL handle file upload errors with user-friendly messages
2. THE Application SHALL validate form inputs and display field-specific error messages
3. THE Application SHALL handle OCR parsing failures gracefully with retry options
4. THE Application SHALL handle database errors without exposing technical details to users
5. THE Application SHALL handle network errors with appropriate retry mechanisms
6. THE Application SHALL log errors to console for debugging while showing user-friendly messages

### Requirement 17: Configuration and Environment Variables

**User Story:** As a developer, I want all configuration in environment variables, so that I can deploy the application securely without hardcoded secrets.

#### Acceptance Criteria

1. THE Application SHALL use .env file for all configuration and secrets
2. THE Application SHALL provide .env.example file documenting all required variables
3. THE Application SHALL include DATABASE_URL for database connection
4. THE Application SHALL include LLM_API_KEY placeholder for future AI integration
5. THE Application SHALL include NODE_ENV for environment-specific behavior
6. THE Application SHALL NOT commit .env file to version control

### Requirement 18: Legal and Safety Pages

**User Story:** As a user, I want to access legal disclaimers and privacy information, so that I understand how the application should be used and how my data is handled.

#### Acceptance Criteria

1. THE Application SHALL provide a /legal/disclaimer page
2. THE Disclaimer Page SHALL state the application is not a medical device
3. THE Disclaimer Page SHALL state the application is not a replacement for a doctor
4. THE Disclaimer Page SHALL include emergency warning to contact healthcare professionals
5. THE Application SHALL link to disclaimer from footer and relevant feature pages

### Requirement 19: Code Quality and Documentation

**User Story:** As a developer, I want clean, well-documented code with TypeScript types, so that I can maintain and extend the application easily.

#### Acceptance Criteria

1. THE Application SHALL use TypeScript for all code with proper type definitions
2. THE Application SHALL have clear folder structure: app/ for pages, components/ for UI, lib/ for logic
3. THE Application SHALL include JSDoc comments for complex functions
4. THE Application SHALL use consistent naming conventions throughout
5. THE Application SHALL include README.md with setup instructions, tech stack, and feature list
6. THE Application SHALL document how to run locally, set up .env, and run database migrations

### Requirement 20: Data Persistence and User Sessions

**User Story:** As a user, I want my data to be saved so that I can access my prescriptions and health profile across sessions.

#### Acceptance Criteria

1. THE Application SHALL persist user data to database using Prisma ORM
2. THE Application SHALL support session-less operation using localStorage for MVP
3. THE Application SHALL optionally support email-only or OTP-mock login for future enhancement
4. THE Application SHALL associate prescriptions and health profiles with user identifiers
5. THE Application SHALL handle data migration when moving from localStorage to authenticated sessions

### Requirement 21: Navigation and Layout

**User Story:** As a user, I want consistent navigation across all pages, so that I can easily move between features.

#### Acceptance Criteria

1. THE Application SHALL provide a navbar with links to Home, Scan Prescription, Health Profile, and Symptoms
2. THE Application SHALL provide a footer with links to About, Privacy, Disclaimer, and Contact
3. THE Application SHALL highlight the current page in navigation
4. THE Application SHALL use consistent layout wrapper for all pages
5. THE Application SHALL include mobile-friendly hamburger menu for small screens

### Requirement 22: Performance and Optimization

**User Story:** As a user on a slow connection, I want the application to load quickly and work smoothly, so that I can use it without frustration.

#### Acceptance Criteria

1. THE Application SHALL optimize images and assets for web delivery
2. THE Application SHALL use Next.js Image component for automatic optimization
3. THE Application SHALL implement code splitting for faster initial load
4. THE Application SHALL show loading states for async operations
5. THE Application SHALL work on 3G connections with acceptable performance

### Requirement 23: Accessibility

**User Story:** As a user with accessibility needs, I want the application to be usable with screen readers and keyboard navigation, so that I can access all features.

#### Acceptance Criteria

1. THE Application SHALL use semantic HTML elements
2. THE Application SHALL provide alt text for all images
3. THE Application SHALL support keyboard navigation for all interactive elements
4. THE Application SHALL use ARIA labels where appropriate
5. THE Application SHALL maintain sufficient color contrast ratios (WCAG AA)

### Requirement 24: Testing and Quality Assurance

**User Story:** As a developer, I want to ensure the application works correctly, so that users have a reliable experience.

#### Acceptance Criteria

1. THE Application SHALL be manually tested on Chrome, Firefox, and Safari
2. THE Application SHALL be tested on mobile devices (iOS and Android)
3. THE Application SHALL handle edge cases: empty states, invalid inputs, network failures
4. THE Application SHALL validate all user inputs before processing
5. THE Application SHALL provide clear feedback for all user actions

### Requirement 25: Deployment Readiness

**User Story:** As a developer, I want the application to be ready for deployment, so that I can launch it to production quickly.

#### Acceptance Criteria

1. THE Application SHALL run successfully with npm run dev for local development
2. THE Application SHALL build successfully with npm run build for production
3. THE Application SHALL include instructions for deploying to Vercel or similar platforms
4. THE Application SHALL use environment variables for all environment-specific configuration
5. THE Application SHALL include database migration commands in README
