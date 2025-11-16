# SwasthAI MVP - Testing Guide

This document provides comprehensive testing instructions for all features of the SwasthAI MVP application.

## Testing Checklist

Use this checklist to ensure all features are working correctly before deployment.

### ✅ Prescription Scanner Flow

#### Upload & Extract
- [ ] Navigate to `/prescription`
- [ ] Verify disclaimer banner is visible at top
- [ ] Click "Choose File" button
- [ ] Select a valid image file (JPEG/PNG)
- [ ] Verify file preview appears
- [ ] Verify loading spinner shows during extraction
- [ ] Verify extracted medicines appear in table
- [ ] Verify doctor name and date are displayed

#### Edit Medicines
- [ ] Click on medicine name to edit
- [ ] Modify medicine name, dosage, duration
- [ ] Verify changes are saved inline
- [ ] Click "Add Medicine" button
- [ ] Add a new medicine manually
- [ ] Verify new medicine appears in table
- [ ] Click "Remove" on a medicine
- [ ] Verify medicine is removed from table

#### Save Prescription
- [ ] Click "Save Prescription" button
- [ ] Verify success message appears
- [ ] Verify redirect to prescription history

#### View History
- [ ] Navigate to `/prescription/history`
- [ ] Verify saved prescription appears in list
- [ ] Verify date, doctor name, medicine count are correct
- [ ] Click "View" on a prescription
- [ ] Verify prescription details are displayed correctly

#### Error Handling
- [ ] Try uploading a file > 10MB
- [ ] Verify error message: "File too large"
- [ ] Try uploading an invalid file type (e.g., .txt)
- [ ] Verify error message: "Invalid file type"
- [ ] Try saving without any medicines
- [ ] Verify appropriate error handling

---

### ✅ Health Profile & Diet Flow

#### Fill Health Form
- [ ] Navigate to `/health`
- [ ] Fill in all required fields:
  - Name
  - Age (valid: 1-120)
  - Gender
  - Height in cm (valid: 50-250)
  - Weight in kg (valid: 20-300)
- [ ] Fill in optional fields:
  - Blood Pressure (systolic/diastolic)
  - Blood Sugar
  - Activity Level
  - Food Preference (Veg/Non-veg/Eggetarian)
  - Region (North/South/East/West India)

#### Form Validation
- [ ] Try submitting with empty required fields
- [ ] Verify validation errors appear
- [ ] Try entering age < 1 or > 120
- [ ] Verify validation error
- [ ] Try entering height < 50 or > 250
- [ ] Verify validation error
- [ ] Try entering weight < 20 or > 300
- [ ] Verify validation error

#### BMI Calculation
- [ ] Submit valid form
- [ ] Verify BMI card appears
- [ ] Verify BMI value is calculated correctly
- [ ] Verify BMI category is displayed (Underweight/Normal/Overweight/Obese)
- [ ] Verify color coding matches category:
  - Blue for Underweight
  - Green for Normal
  - Yellow for Overweight
  - Red for Obese

#### Diet Suggestions
- [ ] Verify diet plan appears after form submission
- [ ] Verify meal suggestions are displayed:
  - Breakfast
  - Lunch
  - Snacks
  - Dinner
- [ ] Verify "Good to include" list appears
- [ ] Verify "Limit/Avoid" list appears
- [ ] Verify suggestions match selected region and food preference
- [ ] Verify disclaimer is displayed

#### Edit Profile
- [ ] Modify form fields
- [ ] Submit again
- [ ] Verify BMI and diet suggestions update accordingly

---

### ✅ Symptom Checker Flow

#### Chat Interface
- [ ] Navigate to `/symptoms`
- [ ] Verify emergency disclaimer is prominently displayed
- [ ] Verify medical disclaimer is visible
- [ ] Verify safety information section is present
- [ ] Verify chat interface loads with greeting message

#### Enter Symptoms
- [ ] Type symptoms in input box (e.g., "I have a headache and fever for 2 days")
- [ ] Click "Send" button
- [ ] Verify user message appears on right (blue)
- [ ] Verify loading indicator appears
- [ ] Verify assistant response appears on left (gray)

#### Triage Results
- [ ] Verify risk level badge is displayed (LOW/MEDIUM/HIGH)
- [ ] Verify badge color matches risk level:
  - Green for LOW
  - Amber for MEDIUM
  - Red for HIGH
- [ ] Verify assessment summary is displayed
- [ ] Verify home care tips are listed
- [ ] Verify doctor recommendation is displayed
- [ ] Verify recommendation urgency matches risk level

#### Multiple Conversations
- [ ] Enter another symptom description
- [ ] Verify new message and response appear
- [ ] Click "New Chat" button
- [ ] Verify chat history is cleared
- [ ] Verify greeting message appears again

#### High-Risk Symptoms
- [ ] Test with high-risk keywords:
  - "chest pain"
  - "difficulty breathing"
  - "severe bleeding"
- [ ] Verify HIGH risk level is assigned
- [ ] Verify urgent doctor recommendation

#### Edge Cases
- [ ] Try sending empty message
- [ ] Verify send button is disabled
- [ ] Try very long symptom description (500+ characters)
- [ ] Verify it's handled correctly

---

### ✅ Teleconsult Waitlist Flow

#### Waitlist Form
- [ ] Navigate to `/consult`
- [ ] Verify "Coming Soon" messaging is clear
- [ ] Verify feature description is displayed
- [ ] Verify timeline is shown
- [ ] Fill in waitlist form:
  - Name (required)
  - Phone (required)
  - City (optional)
  - Health Concern (optional)

#### Form Validation
- [ ] Try submitting without name
- [ ] Verify error message
- [ ] Try submitting without phone
- [ ] Verify error message
- [ ] Try submitting with invalid phone format
- [ ] Verify error message

#### Successful Submission
- [ ] Submit valid form
- [ ] Verify loading state during submission
- [ ] Verify success message appears
- [ ] Verify form is cleared or success screen is shown
- [ ] Try submitting same phone number again
- [ ] Verify duplicate error message

---

### ✅ Navigation & Layout

#### Navbar
- [ ] Verify logo is visible and clickable
- [ ] Verify all navigation links are present:
  - Home
  - Scan Prescription
  - Health Profile
  - Symptoms
- [ ] Click each link and verify correct page loads
- [ ] Verify active link is highlighted
- [ ] On mobile (< 768px):
  - Verify hamburger menu appears
  - Click hamburger menu
  - Verify mobile menu opens
  - Click a link
  - Verify menu closes

#### Footer
- [ ] Scroll to bottom of any page
- [ ] Verify footer is visible
- [ ] Verify footer links are present:
  - About
  - Privacy
  - Disclaimer
  - Contact
- [ ] Click "Disclaimer" link
- [ ] Verify disclaimer page loads

#### Legal Pages
- [ ] Navigate to `/legal/disclaimer`
- [ ] Verify all disclaimer sections are present:
  - Emergency warning
  - Not a medical device
  - Not a replacement for doctor
  - Intended use
  - Limitations
  - User responsibility
  - Emergency situations
  - Liability disclaimer

---

### ✅ Cross-Browser Testing

Test on the following browsers:

#### Chrome/Chromium
- [ ] All features work correctly
- [ ] No console errors
- [ ] Responsive design works

#### Firefox
- [ ] All features work correctly
- [ ] No console errors
- [ ] Responsive design works

#### Safari (macOS/iOS)
- [ ] All features work correctly
- [ ] No console errors
- [ ] Responsive design works
- [ ] Touch interactions work on iOS

#### Edge
- [ ] All features work correctly
- [ ] No console errors
- [ ] Responsive design works

---

### ✅ Device Testing

Test on the following device sizes:

#### Mobile (320px - 480px)
- [ ] All pages are readable without horizontal scroll
- [ ] Buttons are touch-friendly (min 44x44px)
- [ ] Forms are easy to fill on mobile
- [ ] Navigation menu works (hamburger)
- [ ] Images and cards scale appropriately
- [ ] Text is readable (min 16px)

#### Tablet (768px - 1024px)
- [ ] Layout adapts appropriately
- [ ] All features work correctly
- [ ] Touch interactions work

#### Desktop (1280px+)
- [ ] Layout uses available space well
- [ ] All features work correctly
- [ ] Hover states work on interactive elements

---

### ✅ Accessibility Testing

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Verify focus indicators are visible
- [ ] Verify tab order is logical
- [ ] Press Enter/Space on buttons
- [ ] Verify buttons activate correctly

#### Screen Reader Testing
- [ ] Test with VoiceOver (Mac) or NVDA (Windows)
- [ ] Verify all images have alt text
- [ ] Verify form labels are announced
- [ ] Verify error messages are announced
- [ ] Verify page structure is logical

#### Color Contrast
- [ ] Use WebAIM Contrast Checker
- [ ] Verify all text meets WCAG AA standards (4.5:1 for normal text)
- [ ] Verify interactive elements are distinguishable

---

### ✅ Performance Testing

#### Load Time
- [ ] Open Chrome DevTools > Network tab
- [ ] Hard refresh page (Cmd+Shift+R / Ctrl+Shift+R)
- [ ] Verify page loads in < 3 seconds on 3G
- [ ] Verify First Contentful Paint < 1.5s

#### Lighthouse Audit
- [ ] Open Chrome DevTools > Lighthouse
- [ ] Run audit for:
  - Performance (target: > 90)
  - Accessibility (target: > 90)
  - Best Practices (target: > 90)
  - SEO (target: > 90)

#### Bundle Size
- [ ] Run `npm run build`
- [ ] Check output for bundle sizes
- [ ] Verify First Load JS < 200KB

---

### ✅ Error Handling

#### Network Errors
- [ ] Open DevTools > Network tab
- [ ] Set throttling to "Offline"
- [ ] Try submitting a form
- [ ] Verify error message appears
- [ ] Verify user can retry

#### Invalid Data
- [ ] Try entering special characters in text fields
- [ ] Try entering SQL injection attempts
- [ ] Verify input is sanitized
- [ ] Verify no errors occur

#### Database Errors
- [ ] Stop database (if using PostgreSQL)
- [ ] Try saving data
- [ ] Verify graceful error handling
- [ ] Verify error is logged (check console)

---

### ✅ Edge Cases

#### Empty States
- [ ] Visit `/prescription/history` with no prescriptions
- [ ] Verify empty state message appears
- [ ] Verify link to scan new prescription

#### Long Content
- [ ] Enter very long medicine name (100+ characters)
- [ ] Verify it displays correctly (truncated or wrapped)
- [ ] Enter very long symptom description (1000+ characters)
- [ ] Verify it's handled correctly

#### Special Characters
- [ ] Enter medicine name with special characters: "Paracetamol (500mg)"
- [ ] Verify it saves and displays correctly
- [ ] Enter name with emojis: "John 😊"
- [ ] Verify it's handled correctly

---

## Automated Testing (Future)

For future development, consider adding:

### Unit Tests
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

Test files to create:
- `lib/utils/bmiCalculator.test.ts`
- `lib/triage/triageEngine.test.ts`
- `lib/diet/dietEngine.test.ts`

### Integration Tests
```bash
npm install --save-dev @playwright/test
```

Test scenarios:
- Complete prescription scanner flow
- Complete health profile flow
- Complete symptom checker flow

### API Tests
```bash
npm install --save-dev supertest
```

Test all API endpoints:
- `/api/prescription/extract`
- `/api/prescription/save`
- `/api/health/save`
- `/api/triage`
- `/api/waitlist`

---

## Bug Reporting

When you find a bug, document:
1. **Steps to reproduce**
2. **Expected behavior**
3. **Actual behavior**
4. **Browser and device**
5. **Screenshots or video**
6. **Console errors** (if any)

---

## Testing Sign-Off

Before deploying to production, ensure:
- [ ] All features tested and working
- [ ] All browsers tested
- [ ] All devices tested
- [ ] Accessibility verified
- [ ] Performance verified
- [ ] Error handling verified
- [ ] Edge cases handled
- [ ] No console errors
- [ ] README is up to date
- [ ] Environment variables documented

**Tested by:** _______________  
**Date:** _______________  
**Version:** _______________  

---

## Continuous Testing

After deployment:
- Monitor error logs (Sentry, LogRocket)
- Track performance metrics (Vercel Analytics)
- Collect user feedback
- Fix bugs promptly
- Add regression tests for fixed bugs
