# 🤖 AI-Powered Features Setup Guide

Your SwasthAI app now has advanced AI features! Here's how to set them up:

## ✨ New Features Added

### 1. **Multilingual AI Symptom Checker** 🌍
- Supports Hindi, English, Tamil, Telugu, and more
- Automatically detects language and responds in the same language
- Powered by Google Gemini AI (Free tier available)

### 2. **AI-Powered Home Remedies** 🌿
- Suggests Indian home remedies (turmeric, ginger, tulsi, honey, etc.)
- Provides diet suggestions (khichdi, curd, fruits, etc.)
- Culturally appropriate for Indian context

### 3. **Symptom History** 📊
- All conversations are saved to database
- View past symptom checks
- Track health over time

### 4. **Data Download** 📥
- Download all your health data
- GDPR compliant
- Includes prescriptions, symptoms, health profile

### 5. **Faster OCR** ⚡
- Optimized Tesseract settings
- Faster prescription scanning

---

## 🔑 Get Your Free Google Gemini API Key

### Step 1: Visit Google AI Studio
Go to: https://makersuite.google.com/app/apikey

### Step 2: Sign in with Google Account
Use your Gmail account to sign in

### Step 3: Create API Key
1. Click "Create API Key"
2. Select "Create API key in new project" or use existing project
3. Copy the API key (starts with "AIza...")

### Step 4: Add to .env File
Open your `.env` file and replace the placeholder:

```env
GEMINI_API_KEY="AIzaSyBpZ8vK9xQxJ7YxYxYxYxYxYxYxYxYxYxY"
```

With your actual API key:

```env
GEMINI_API_KEY="AIzaSyC_your_actual_key_here"
```

### Step 5: Restart Server
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## 🧪 Test the AI Features

### Test Multilingual Symptom Checker

#### In English:
```
"I have a headache and fever for 2 days"
```

#### In Hindi:
```
"मुझे 2 दिन से सिरदर्द और बुखार है"
```

#### In Tamil:
```
"எனக்கு 2 நாட்களாக தலைவலி மற்றும் காய்ச்சல் உள்ளது"
```

The AI will:
- Detect the language
- Respond in the same language
- Provide home remedies
- Suggest diet
- Give doctor recommendations

---

## 📊 Features Breakdown

### 1. Multilingual Support

**Supported Languages:**
- English
- Hindi (हिंदी)
- Tamil (தமிழ்)
- Telugu (తెలుగు)
- Bengali (বাংলা)
- Marathi (मराठी)
- Gujarati (ગુજરાતી)
- Kannada (ಕನ್ನಡ)
- Malayalam (മലയാളം)
- Punjabi (ਪੰਜਾਬੀ)

**How it works:**
1. User types symptoms in any language
2. AI detects the language automatically
3. AI responds in the same language
4. All suggestions are culturally appropriate

### 2. Home Remedies

**Examples of suggestions:**
- **For Cold/Cough:**
  - Turmeric milk (हल्दी दूध)
  - Ginger tea (अदरक की चाय)
  - Tulsi leaves (तुलसी के पत्ते)
  - Honey with warm water

- **For Fever:**
  - Tulsi and black pepper tea
  - Coriander water
  - Rest and hydration
  - Light diet (khichdi)

- **For Headache:**
  - Ginger paste on forehead
  - Peppermint oil
  - Adequate sleep
  - Avoid screen time

### 3. Diet Suggestions

**Examples:**
- **For Fever:** Khichdi, curd, fruits, coconut water
- **For Cold:** Warm soups, ginger tea, avoid cold drinks
- **For Stomach Issues:** Buttermilk, curd rice, avoid spicy food
- **General:** Dal, vegetables, fruits, adequate water

### 4. Symptom History

**Access your history:**
```javascript
// API endpoint
GET /api/symptoms/history?userId=YOUR_USER_ID
```

**Features:**
- Last 50 symptom checks
- Risk level tracking
- Date and time stamps
- Full conversation history

### 5. Download Your Data

**What's included:**
- Health profile (BMI, age, gender, etc.)
- All prescriptions with medicines
- All symptom checks with AI responses
- Statistics (total checks, account created date)

**How to download:**
1. Go to Symptoms page
2. Click "Download Data" button
3. JSON file will be downloaded
4. Open with any text editor

---

## 🎯 API Endpoints

### Symptom Checker (with AI)
```
POST /api/triage
Body: {
  "description": "I have fever and headache",
  "language": "english",  // optional
  "userId": "user-id"
}

Response: {
  "riskLevel": "MEDIUM",
  "summary": "You may have a viral infection...",
  "homeCareTips": ["Rest well", "Drink fluids"],
  "homeMedicines": ["Turmeric milk", "Ginger tea"],
  "dietSuggestions": ["Khichdi", "Curd", "Fruits"],
  "doctorRecommendation": "See doctor if fever persists >3 days",
  "language": "english",
  "provider": "gemini-ai"
}
```

### Get Symptom History
```
GET /api/symptoms/history?userId=USER_ID

Response: {
  "history": [
    {
      "id": "...",
      "description": "...",
      "riskLevel": "...",
      "result": {...},
      "createdAt": "..."
    }
  ]
}
```

### Download User Data
```
GET /api/user/download-data?userId=USER_ID

Response: JSON file download
```

---

## 💰 Pricing (Google Gemini)

### Free Tier:
- **60 requests per minute**
- **1,500 requests per day**
- **1 million tokens per month**
- Perfect for MVP and testing!

### Paid Tier (if needed):
- $0.00025 per 1K characters (input)
- $0.0005 per 1K characters (output)
- Very affordable for production

---

## 🔧 Troubleshooting

### AI not responding?
1. Check if GEMINI_API_KEY is set in `.env`
2. Verify API key is valid (starts with "AIza")
3. Check console for errors
4. Restart server after adding API key

### Wrong language response?
- AI auto-detects language
- Try being more explicit: "मुझे बुखार है (Hindi)"
- Check if input is clear and grammatically correct

### Slow responses?
- First request may take 2-3 seconds (AI initialization)
- Subsequent requests are faster (1-2 seconds)
- Free tier has rate limits (60 req/min)

### OCR still slow?
- Tesseract takes 5-10 seconds (normal)
- For faster OCR, consider Google Cloud Vision API
- See `docs/FUTURE_ENHANCEMENTS.md` for cloud OCR setup

---

## 🚀 Next Steps

### 1. Test All Features
- Try symptom checker in different languages
- Check home remedies suggestions
- Download your data
- View symptom history

### 2. Optimize for Production
- Add rate limiting
- Implement caching
- Add error retry logic
- Monitor API usage

### 3. Add More Features
- Voice input (speech-to-text)
- Image-based symptom detection
- Medication reminders
- Doctor appointment booking

---

## 📚 Resources

- [Google Gemini API Docs](https://ai.google.dev/docs)
- [Gemini Pricing](https://ai.google.dev/pricing)
- [API Key Management](https://makersuite.google.com/app/apikey)
- [Rate Limits](https://ai.google.dev/docs/rate_limits)

---

## 🎉 You're All Set!

Your SwasthAI app now has:
- ✅ Multilingual AI symptom checker
- ✅ Home remedies and diet suggestions
- ✅ Symptom history tracking
- ✅ Data download feature
- ✅ Faster OCR processing

**Start testing at:** http://localhost:3000/symptoms

Try asking in Hindi: "मुझे बुखार है" and see the magic! 🪄
