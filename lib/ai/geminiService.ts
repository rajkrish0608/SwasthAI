import { GoogleGenerativeAI } from '@google/generative-ai'
import { TriageResult } from '@/types/symptom'

// Get API key dynamically
function getApiKey(): string {
    return process.env.GEMINI_API_KEY || ''
}

// Get Gemini AI instance
function getGenAI(): GoogleGenerativeAI | null {
    const apiKey = getApiKey()
    if (apiKey.length > 20 && !apiKey.includes('YxYxYx')) {
        return new GoogleGenerativeAI(apiKey)
    }
    return null
}

// Check if API key is valid
export function isGeminiConfigured(): boolean {
    const apiKey = getApiKey()
    const isValid = apiKey.length > 20 && !apiKey.includes('YxYxYx')
    console.log(`🔑 Gemini API Key check: ${isValid ? 'VALID ✅' : 'INVALID ❌'} (length: ${apiKey.length})`)
    return isValid
}

/**
 * Multilingual AI Symptom Checker using Google Gemini
 * Supports Hindi, English, and other Indian languages
 */
export async function analyzeSymptoms(
    description: string,
    language?: string
): Promise<TriageResult & { detectedLanguage: string; originalResponse: string }> {
    const genAI = getGenAI()
    if (!genAI) {
        throw new Error('Gemini API not configured. Please add GEMINI_API_KEY to .env file.')
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        const prompt = `You are a medical triage assistant for Indian patients. Analyze symptoms and respond in the SAME LANGUAGE as input.

Symptoms: "${description}"

Respond with ONLY this JSON (no other text):
{
  "riskLevel": "LOW",
  "summary": "Brief assessment in same language",
  "homeCareTips": ["tip1", "tip2", "tip3"],
  "homeMedicines": ["Indian remedy1", "remedy2"],
  "dietSuggestions": ["Indian food1", "food2"],
  "doctorRecommendation": "When to see doctor",
  "detectedLanguage": "hindi"
}

Rules:
- Chest pain/breathing issues = HIGH risk
- Fever >3 days/persistent pain = MEDIUM risk  
- Mild symptoms = LOW risk
- Use Indian remedies: turmeric, ginger, tulsi, honey
- Use Indian foods: khichdi, dal, curd, fruits
- Respond in SAME language as input (Hindi/English/Tamil etc)
- Be culturally appropriate for India

RESPOND ONLY WITH JSON, NO OTHER TEXT.`

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        console.log('📝 Gemini AI raw response:', text.substring(0, 200))

        // Parse JSON response
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (!jsonMatch) {
            console.error('❌ No JSON found in response:', text)
            throw new Error('Invalid AI response format - no JSON found')
        }

        const aiResponse = JSON.parse(jsonMatch[0])

        return {
            riskLevel: aiResponse.riskLevel || 'MEDIUM',
            summary: aiResponse.summary || 'Unable to assess symptoms',
            homeCareTips: aiResponse.homeCareTips || [],
            homeMedicines: aiResponse.homeMedicines || [],
            dietSuggestions: aiResponse.dietSuggestions || [],
            doctorRecommendation: aiResponse.doctorRecommendation || 'Please consult a doctor',
            detectedLanguage: aiResponse.detectedLanguage || 'english',
            originalResponse: text,
        }
    } catch (error) {
        console.error('❌ Gemini AI Error:', error)
        if (error instanceof Error) {
            console.error('Error details:', error.message)
        }
        throw new Error(`Failed to analyze symptoms with AI: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
}

/**
 * Get AI-powered home remedies for common ailments
 */
export async function getHomeRemedies(
    symptom: string,
    language: string = 'english'
): Promise<{
    remedies: string[]
    diet: string[]
    precautions: string[]
}> {
    const genAI = getGenAI()
    if (!genAI) {
        throw new Error('Gemini API not configured')
    }

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

        const languageInstruction = language === 'hindi'
            ? 'Respond in Hindi (Devanagari script)'
            : language === 'tamil'
                ? 'Respond in Tamil'
                : 'Respond in English'

        const prompt = `${languageInstruction}

Provide Indian home remedies for: ${symptom}

Give response in JSON format:
{
  "remedies": ["remedy1", "remedy2", "remedy3"],
  "diet": ["food1", "food2", "food3"],
  "precautions": ["precaution1", "precaution2"]
}

Focus on:
- Traditional Indian home remedies (turmeric, ginger, tulsi, honey, ajwain, etc.)
- Indian foods and diet (dal, khichdi, curd, fruits, herbal teas)
- Practical precautions for Indian households

IMPORTANT: Respond ONLY with valid JSON.`

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (!jsonMatch) {
            throw new Error('Invalid AI response format')
        }

        return JSON.parse(jsonMatch[0])
    } catch (error) {
        console.error('Home remedies AI Error:', error)
        return {
            remedies: ['Drink warm water', 'Rest well', 'Eat light food'],
            diet: ['Khichdi', 'Curd', 'Fruits'],
            precautions: ['Avoid cold drinks', 'Get adequate sleep'],
        }
    }
}
