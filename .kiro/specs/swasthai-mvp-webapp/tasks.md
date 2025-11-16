# SwasthAI MVP Web Application - Implementation Tasks

This task list breaks down the implementation of the SwasthAI MVP web application into discrete, manageable steps following the order specified in the requirements.

- [x] 1. Scaffold Next.js project with TypeScript and Tailwind CSS
  - Initialize Next.js 14+ project with App Router using `npx create-next-app@latest`
  - Select TypeScript, Tailwind CSS, App Router, and src directory options
  - Configure `tsconfig.json` with strict mode and path aliases
  - Configure `tailwind.config.js` with custom colors (primary-green, primary-blue, risk colors)
  - Set up folder structure: app/, components/, lib/, prisma/, types/, public/
  - Create `.env.example` file with DATABASE_URL, NODE_ENV, LLM_API_KEY, USE_MOCK_OCR
  - Create `.gitignore` to exclude .env, node_modules, .next, prisma/dev.db
  - Install additional dependencies: @prisma/client, prisma, tesseract.js (optional)
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [x] 2. Set up Prisma ORM and database schema
  - Initialize Prisma with `npx prisma init`
  - Configure `prisma/schema.prisma` with SQLite provider (or PostgreSQL)
  - Define User model with id, name, email, timestamps, and relations
  - Define HealthProfile model with all health data fields and user relation
  - Define Prescription model with doctorName, prescribedAt, notes, and relations
  - Define Medicine model with name, dosagePattern, durationDays, notes, and prescription relation
  - Define SymptomSession model with description, riskLevel, resultJson, and user relation
  - Define ConsultWaitlist model with name, phone, city, concern, and timestamp
  - Run `npx prisma migrate dev --name init` to create initial migration
  - Generate Prisma client with `npx prisma generate`
  - Create `lib/db/prisma.ts` with Prisma client singleton pattern
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7_

- [x] 3. Create base layout with navbar and footer
  - Create `app/layout.tsx` as root layout with HTML structure
  - Add Inter font from next/font/google
  - Include Tailwind CSS globals
  - Create `components/layout/Navbar.tsx` with logo and navigation links (Home, Scan Prescription, Health Profile, Symptoms)
  - Create `components/layout/Footer.tsx` with links to About, Privacy, Disclaimer, Contact
  - Create `components/layout/Container.tsx` as reusable container component with max-width and padding
  - Style navbar with mobile-responsive hamburger menu
  - Add active link highlighting in navbar
  - Ensure navbar is sticky on scroll
  - _Requirements: 21.1, 21.2, 21.3, 21.4, 21.5_

- [x] 4. Create reusable UI components
  - Create `components/ui/Button.tsx` with variants (primary, secondary, danger) and sizes
  - Create `components/ui/Card.tsx` with white background, rounded corners, and shadow
  - Create `components/ui/Input.tsx` with label, error state, and validation styling
  - Create `components/ui/Select.tsx` for dropdown selections
  - Create `components/ui/Badge.tsx` with color variants for risk levels (green, amber, red)
  - Create `components/ui/LoadingSpinner.tsx` for loading states
  - Create `components/ui/ErrorMessage.tsx` for displaying errors
  - Ensure all components are TypeScript-typed with proper interfaces
  - Make all components mobile-friendly with touch-friendly sizes (min 44x44px)
  - _Requirements: 15.2, 15.3, 16.2_

- [x] 5. Implement landing page (/)
  - Create `app/page.tsx` as landing page component
  - Create `components/landing/HeroSection.tsx` with title, subtitle, and CTA buttons
  - Add "Scan Prescription" button linking to /prescription
  - Add "Check Symptoms" button linking to /symptoms
  - Create `components/landing/FeatureCards.tsx` with 3-4 feature highlights
  - Feature cards: Prescription Scanner, BMI & Diet, Symptom Checker, Built for India
  - Create `components/landing/BuiltForIndiaSection.tsx` highlighting multi-language, Indian diets, elder-friendly
  - Style with clean, clinical design using white background and green/blue accents
  - Ensure mobile-first responsive layout
  - Add meta tags for SEO
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

- [x] 6. Create OCR abstraction layer
  - Create `types/prescription.ts` with Medicine, Prescription, and ExtractedPrescriptionData interfaces
  - Create `lib/ocr/ocrService.ts` with extractPrescriptionFromImage function
  - Create `lib/ocr/mockOCR.ts` with mock implementation returning sample prescription data
  - Mock data should include 2-3 medicines with realistic Indian drug names (Metformin, Amlodipine, etc.)
  - Mock data should include dosage patterns like "1-0-1", "0-0-1", "1/2-0-1/2"
  - Create `lib/ocr/tesseractOCR.ts` with Tesseract.js implementation (optional)
  - Add logic in ocrService to switch between mock and real OCR based on USE_MOCK_OCR env variable
  - Document how to integrate production OCR service in comments
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 7. Implement prescription scanner page - file upload
  - Create `app/prescription/page.tsx` as prescription scanner page
  - Create `components/prescription/FileUpload.tsx` with drag-and-drop and file picker
  - Accept image files (JPEG, PNG) and PDF files
  - Validate file type and size (max 10MB)
  - Show file preview after selection
  - Display loading spinner during upload
  - Handle file upload errors with user-friendly messages
  - Style with large drop zone and clear instructions
  - _Requirements: 3.1, 16.1_

- [x] 8. Create prescription extraction API endpoint
  - Create `app/api/prescription/extract/route.ts` as POST endpoint
  - Accept multipart/form-data with file upload
  - Call extractPrescriptionFromImage function from OCR service
  - Return extracted data as JSON: { doctorName, date, medicines[] }
  - Handle errors gracefully and return appropriate HTTP status codes
  - Add error logging for debugging
  - Test with both mock and real OCR (if implemented)
  - _Requirements: 3.2, 16.3, 16.4_

- [x] 9. Implement prescription scanner page - display and edit
  - Create `components/prescription/MedicineSchedule.tsx` to display medicine schedule table
  - Table columns: Medicine Name, Morning, Afternoon, Night, Duration, Notes
  - Parse dosage patterns (e.g., "1-0-1" means 1 morning, 0 afternoon, 1 night)
  - Create `components/prescription/EditableMedicineRow.tsx` for inline editing
  - Allow editing medicine name, dosage pattern, duration, and notes
  - Add "Add Medicine" button to manually add medicines
  - Add "Remove" button for each medicine
  - Display doctor name and date at top (editable)
  - _Requirements: 3.3, 3.4, 3.5_

- [x] 10. Implement prescription save functionality
  - Create `app/api/prescription/save/route.ts` as POST endpoint
  - Accept prescription data: { doctorName, prescribedAt, notes, medicines[] }
  - Use Prisma to create Prescription and related Medicine records
  - Associate with user (use mock user ID for MVP, or localStorage-based ID)
  - Return saved prescription with generated ID
  - Add "Save Prescription" button in prescription scanner page
  - Show success message after save
  - Redirect to prescription history after save
  - _Requirements: 3.6, 20.1, 20.4_

- [x] 11. Add safety disclaimer to prescription scanner
  - Create `components/prescription/DisclaimerBanner.tsx` component
  - Display at top of prescription scanner page
  - Text: "This tool only helps you understand your prescription. Always follow your doctor's advice."
  - Style with yellow/amber background and warning icon
  - Make it prominent but not intrusive
  - _Requirements: 3.8_

- [x] 12. Implement prescription history page
  - Create `app/prescription/history/page.tsx` as prescription history page
  - Fetch all prescriptions from database using Prisma (include medicines)
  - Create `components/prescription/PrescriptionCard.tsx` to display each prescription
  - Show date, doctor name, number of medicines
  - Add "View" button to open prescription details
  - Order prescriptions by date (most recent first)
  - Handle empty state with message and link to scan new prescription
  - Add pagination if more than 20 prescriptions (future enhancement)
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 13. Create BMI calculator utility
  - Create `lib/utils/bmiCalculator.ts` with calculateBMI function
  - Accept heightCm and weightKg as parameters
  - Calculate BMI using formula: weight(kg) / (height(m))²
  - Categorize BMI: Underweight (<18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (≥30)
  - Return BMIResult object with value, category, and riskHint
  - Add unit tests or manual testing for edge cases
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [x] 14. Implement health profile form
  - Create `app/health/page.tsx` as health profile page
  - Create `components/health/HealthForm.tsx` with all form fields
  - Required fields: name, age, gender, height (cm), weight (kg)
  - Optional fields: BP (systolic/diastolic), blood sugar, activity level
  - Food preference dropdown: Veg, Non-veg, Eggetarian
  - Region dropdown: North India, South India, East India, West India
  - Add form validation: age 1-120, height 50-250cm, weight 20-300kg, BP 60-250, sugar 50-500
  - Display validation errors inline
  - Style with clear labels and helpful placeholders
  - _Requirements: 6.1, 6.2, 6.3, 16.2_

- [x] 15. Implement BMI display component
  - Create `components/health/BMICard.tsx` to display BMI results
  - Show BMI value (rounded to 1 decimal)
  - Show category with color coding: blue (underweight), green (normal), yellow (overweight), red (obese)
  - Show risk hint text
  - Add visual indicator (progress bar or gauge)
  - Style as prominent card with large text
  - _Requirements: 8.5_

- [x] 16. Create diet suggestion engine
  - Create `lib/diet/dietEngine.ts` with generateDietPlan function
  - Create `lib/diet/mealPlans.ts` with meal data organized by region and food preference
  - Create `lib/diet/nutritionRules.ts` with rules for different BMI categories and health conditions
  - Implement logic to select appropriate meals based on: BMI category, age, food preference, region
  - Consider health conditions: high BP (low sodium), high sugar (low carb)
  - Generate breakfast, lunch, snacks, dinner suggestions (3-4 items each)
  - Generate "Good to include" list (5-7 items)
  - Generate "Limit/Avoid" list (5-7 items)
  - Document rules and how to extend with real nutrition data
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 17. Implement diet plan display component
  - Create `components/health/DietPlan.tsx` to display diet suggestions
  - Show meal suggestions in organized sections: Breakfast, Lunch, Snacks, Dinner
  - Display "Good to include" list with green checkmarks
  - Display "Limit/Avoid" list with red X marks
  - Add disclaimer: "General wellness guidance only, not a substitute for a doctor or dietician"
  - Style with cards and clear typography
  - Make it printable or downloadable (future enhancement)
  - _Requirements: 7.6_

- [x] 18. Create health profile save API endpoint
  - Create `app/api/health/save/route.ts` as POST endpoint
  - Accept health profile data from form
  - Calculate BMI using bmiCalculator utility
  - Use Prisma to create or update HealthProfile record
  - Associate with user (use mock user ID or localStorage-based ID)
  - Return saved profile with BMI calculation
  - Handle errors and return appropriate status codes
  - _Requirements: 6.6, 20.1, 20.4_

- [x] 19. Integrate health profile form with BMI and diet display
  - On form submit, call health profile save API
  - Display BMI card with calculated results
  - Call generateDietPlan with saved profile data
  - Display diet plan component with suggestions
  - Add loading state during save and calculation
  - Handle errors with user-friendly messages
  - Allow editing profile after save
  - _Requirements: 6.4, 6.5_

- [x] 20. Create rule-based triage engine
  - Create `types/symptom.ts` with SymptomInput, TriageResult, and ChatMessage interfaces
  - Create `lib/triage/triageEngine.ts` with assessSymptoms function
  - Define HIGH RISK keywords array: chest pain, difficulty breathing, severe headache, confusion, loss of consciousness, severe bleeding
  - Define MEDIUM RISK patterns array: fever >3 days, chronic pain, blood in stool/urine, persistent vomiting
  - Implement logic to check description against keywords and patterns
  - Return TriageResult with riskLevel (LOW/MEDIUM/HIGH), summary, homeCareTips array, doctorRecommendation
  - Add specific recommendations for each risk level
  - Document how to extend with more sophisticated rules
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 21. Create LLM integration placeholder
  - Create `lib/triage/llmPlaceholder.ts` with callLLMForSymptomAdvice function
  - Function signature: async (input: SymptomInput) => Promise<TriageResult>
  - Add TODO comment with OpenAI integration example
  - Read LLM_API_KEY from process.env (don't hardcode)
  - For now, call assessSymptoms from triageEngine
  - Document how to integrate with OpenAI, Anthropic, or other LLM providers
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_

- [x] 22. Create symptom triage API endpoint
  - Create `app/api/triage/route.ts` as POST endpoint
  - Accept symptom input: { description, age?, gender? }
  - Call assessSymptoms function from triageEngine
  - Optionally call callLLMForSymptomAdvice if LLM is configured
  - Save SymptomSession to database with Prisma
  - Return TriageResult as JSON
  - Handle errors gracefully
  - _Requirements: 10.6_

- [x] 23. Implement symptom checker chat interface
  - Create `app/symptoms/page.tsx` as symptom checker page
  - Create `components/symptoms/ChatInterface.tsx` with message list and input box
  - Create `components/symptoms/MessageBubble.tsx` for user and assistant messages
  - Style user messages on right (blue), assistant messages on left (gray)
  - Add input box at bottom with "Send" button
  - Handle message submission: add user message, call triage API, add assistant response
  - Maintain chat history in component state
  - Auto-scroll to bottom on new messages
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [x] 24. Implement symptom checker response display
  - Create `components/symptoms/RiskBadge.tsx` with color-coded badges
  - Green badge for LOW risk, amber for MEDIUM, red for HIGH
  - Display risk level prominently in assistant message
  - Show summary text
  - Display home care tips as bulleted list
  - Display doctor recommendation with emphasis
  - Add icons for visual clarity (checkmark, warning, alert)
  - _Requirements: 9.5, 12.3, 12.4_

- [x] 25. Add safety disclaimers to symptom checker
  - Create disclaimer banner at top of symptom checker page
  - Text: "This tool does NOT provide diagnosis or prescriptions. For emergencies, contact a doctor or hospital immediately."
  - Style with red/orange background and alert icon
  - Make it always visible (sticky or prominent)
  - Add disclaimer in footer of each assistant response
  - _Requirements: 12.1, 12.2, 12.5_

- [x] 26. Implement teleconsult placeholder page
  - Create `app/consult/page.tsx` as teleconsult placeholder page
  - Add heading: "Future Feature: Teleconsultation"
  - Add explanation text about video/audio consultations with doctors
  - Create waitlist form with fields: name, phone, city, primary health concern
  - Add form validation
  - Style as coming-soon page with illustration or icon
  - _Requirements: 14.1, 14.2_

- [x] 27. Create consult waitlist API endpoint
  - Create `app/api/waitlist/route.ts` as POST endpoint
  - Accept waitlist data: { name, phone, city, concern }
  - Validate required fields (name, phone)
  - Use Prisma to create ConsultWaitlist record
  - Return success response with entry ID
  - Handle errors appropriately
  - _Requirements: 14.3_

- [x] 28. Integrate waitlist form with API
  - On form submit, call waitlist API endpoint
  - Show loading state during submission
  - Display success message after submission: "Thank you! We'll contact you when teleconsultation is available."
  - Clear form after successful submission
  - Handle errors with user-friendly messages
  - _Requirements: 14.4, 14.5_

- [x] 29. Create legal disclaimer page
  - Create `app/legal/disclaimer/page.tsx` as disclaimer page
  - Add heading: "Medical Disclaimer"
  - State: "SwasthAI is not a medical device"
  - State: "SwasthAI is not a replacement for a doctor"
  - Add emergency warning: "In case of emergency, contact a doctor or hospital immediately"
  - Add sections: Intended Use, Limitations, No Medical Advice, User Responsibility
  - Style as legal document with clear sections
  - Link from footer and relevant pages
  - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5_

- [x] 30. Implement mobile-responsive design across all pages
  - Test all pages on mobile viewport (320px-480px)
  - Ensure buttons are touch-friendly (min 44x44px)
  - Use responsive Tailwind classes (sm:, md:, lg:, xl:)
  - Test forms on mobile (proper input types, no zoom on focus)
  - Ensure tables are scrollable or stack on mobile
  - Test navigation menu on mobile (hamburger menu)
  - Verify text is readable without zooming (min 16px)
  - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6_

- [x] 31. Add loading states and error handling
  - Add loading spinners for all async operations (file upload, API calls, form submissions)
  - Create `components/ui/LoadingState.tsx` for consistent loading UI
  - Create `components/ui/ErrorState.tsx` for consistent error UI
  - Handle file upload errors with specific messages (file too large, invalid type)
  - Handle network errors with retry options
  - Handle form validation errors with inline messages
  - Log errors to console for debugging
  - Never expose technical error details to users
  - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6_

- [x] 32. Implement data persistence with Prisma
  - Ensure all forms save data to database via Prisma
  - Test prescription save and retrieval
  - Test health profile save and retrieval
  - Test symptom session save
  - Test waitlist entry save
  - Handle database connection errors gracefully
  - Add database indexes for frequently queried fields (userId, createdAt)
  - _Requirements: 20.1, 20.4_

- [x] 33. Add user identification system (simple)
  - For MVP, use localStorage to generate and store a unique user ID
  - Create `lib/utils/userIdentification.ts` with getUserId function
  - Generate UUID on first visit and store in localStorage
  - Use this ID to associate prescriptions, health profiles, and symptom sessions
  - Document how to migrate to proper authentication later
  - _Requirements: 20.2, 20.3, 20.5_

- [x] 34. Implement accessibility features
  - Add semantic HTML elements (header, nav, main, footer, article, section)
  - Add alt text to all images and icons
  - Ensure all interactive elements are keyboard accessible (tab navigation)
  - Add ARIA labels where needed (form inputs, buttons, navigation)
  - Test color contrast ratios (use WebAIM contrast checker)
  - Add visible focus indicators for keyboard navigation
  - Test with screen reader (VoiceOver on Mac or NVDA on Windows)
  - _Requirements: 23.1, 23.2, 23.3, 23.4, 23.5_

- [x] 35. Optimize performance
  - Use Next.js Image component for all images
  - Optimize images in public/ folder (compress, use WebP)
  - Implement code splitting (automatic with App Router)
  - Add loading="lazy" to images below the fold
  - Minimize bundle size (check with `npm run build`)
  - Test performance on slow 3G connection (Chrome DevTools)
  - Optimize database queries (use Prisma's include and select)
  - _Requirements: 22.1, 22.2, 22.3, 22.4, 22.5_

- [x] 36. Add environment variable configuration
  - Create `.env.example` with all required variables and descriptions
  - Document DATABASE_URL for SQLite and PostgreSQL
  - Document NODE_ENV (development, production)
  - Document LLM_API_KEY (placeholder for future)
  - Document USE_MOCK_OCR (true/false)
  - Add validation for required environment variables on startup
  - Ensure .env is in .gitignore
  - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5, 17.6_

- [x] 37. Write comprehensive README.md
  - Add project title and description
  - List tech stack: Next.js, TypeScript, Tailwind CSS, Prisma, SQLite/PostgreSQL
  - Add features list: Prescription Scanner, Health Profile & Diet, Symptom Checker, Teleconsult Waitlist
  - Add setup instructions: clone repo, install dependencies, set up .env, run migrations
  - Add commands: `npm run dev`, `npm run build`, `npm start`, `npx prisma studio`
  - Document how to switch between mock and real OCR
  - Document how to integrate LLM for symptom checking
  - Add screenshots or demo GIF (optional)
  - Add license and contribution guidelines
  - _Requirements: 1.6, 19.5, 19.6_

- [x] 38. Test all features end-to-end
  - Test complete prescription scanner flow: upload → extract → edit → save → view history
  - Test complete health profile flow: fill form → calculate BMI → view diet suggestions
  - Test complete symptom checker flow: enter symptoms → receive triage → view recommendations
  - Test teleconsult waitlist: fill form → submit → see success message
  - Test on multiple browsers: Chrome, Firefox, Safari
  - Test on multiple devices: mobile, tablet, desktop
  - Test edge cases: empty states, invalid inputs, network failures
  - _Requirements: 24.1, 24.2, 24.3, 24.4, 24.5_

- [x] 39. Add final UI polish and consistency
  - Ensure consistent spacing across all pages (use Tailwind spacing scale)
  - Ensure consistent typography (font sizes, weights, line heights)
  - Ensure consistent colors (use defined color palette)
  - Ensure consistent button styles and hover states
  - Ensure consistent card styles and shadows
  - Ensure consistent form input styles
  - Add smooth transitions and animations where appropriate
  - Review and fix any visual bugs or inconsistencies
  - _Requirements: 19.4_

- [x] 40. Prepare for deployment
  - Test production build locally: `npm run build && npm start`
  - Verify all environment variables are documented
  - Verify database migrations work correctly
  - Create deployment guide for Vercel (or chosen platform)
  - Document how to set environment variables in deployment platform
  - Document how to connect production database (PostgreSQL)
  - Test deployed application on production URL
  - _Requirements: 25.1, 25.2, 25.3, 25.4, 25.5_

- [x] 41. Create TODO list for future enhancements
  - Document how to integrate real OCR (Tesseract.js or cloud service)
  - Document how to integrate LLM (OpenAI, Anthropic, etc.)
  - Document how to add user authentication (NextAuth.js)
  - Document how to add multi-language support (i18n)
  - Document how to build teleconsultation feature
  - Document how to add ASHA worker workflows
  - Document how to add offline support (PWA)
  - Document how to add push notifications
  - Document how to add analytics
  - Document how to add admin dashboard
  - _Requirements: Design document - Future Enhancements section_
