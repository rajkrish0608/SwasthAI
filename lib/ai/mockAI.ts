import { TriageResult } from '@/types/symptom'

/**
 * Mock AI responses for demo/testing without API key
 * Provides multilingual responses based on detected language
 */

const HINDI_RESPONSES = {
    fever: {
        riskLevel: 'MEDIUM' as const,
        summary: 'आपको बुखार है जो वायरल संक्रमण का संकेत हो सकता है।',
        homeCareTips: [
            'पर्याप्त आराम करें और खूब पानी पिएं',
            'हल्का और पौष्टिक भोजन करें',
            'ठंडे पानी की पट्टी माथे पर रखें',
        ],
        homeMedicines: [
            'हल्दी वाला दूध (सोने से पहले)',
            'अदरक और तुलसी की चाय',
            'शहद के साथ गर्म पानी',
            'धनिया का पानी',
        ],
        dietSuggestions: [
            'खिचड़ी',
            'दही',
            'ताजे फल (संतरा, सेब)',
            'नारियल पानी',
            'हल्का सूप',
        ],
        doctorRecommendation: 'अगर बुखार 3 दिन से ज्यादा रहे या 102°F से ऊपर हो तो डॉक्टर से मिलें।',
    },
    headache: {
        riskLevel: 'LOW' as const,
        summary: 'आपको सिरदर्द है जो तनाव या नींद की कमी से हो सकता है।',
        homeCareTips: [
            'अंधेरे कमरे में आराम करें',
            'पर्याप्त पानी पिएं',
            'गर्दन और कंधों की मालिश करें',
        ],
        homeMedicines: [
            'अदरक का पेस्ट माथे पर लगाएं',
            'पुदीने का तेल',
            'लौंग की चाय',
        ],
        dietSuggestions: [
            'पर्याप्त पानी',
            'ताजे फल',
            'हरी सब्जियां',
            'मेवे (बादाम, अखरोट)',
        ],
        doctorRecommendation: 'अगर सिरदर्द बहुत तेज हो या बार-बार हो तो डॉक्टर से सलाह लें।',
    },
    cold: {
        riskLevel: 'LOW' as const,
        summary: 'आपको सर्दी-जुकाम है जो आम वायरल संक्रमण है।',
        homeCareTips: [
            'गर्म पानी पिएं',
            'भाप लें',
            'गर्म कपड़े पहनें',
        ],
        homeMedicines: [
            'अदरक और शहद की चाय',
            'तुलसी के पत्ते',
            'काली मिर्च और शहद',
            'हल्दी वाला दूध',
        ],
        dietSuggestions: [
            'गर्म सूप',
            'खिचड़ी',
            'हर्बल चाय',
            'ठंडी चीजें न खाएं',
        ],
        doctorRecommendation: 'अगर 5-7 दिन में ठीक न हो तो डॉक्टर से मिलें।',
    },
}

const ENGLISH_RESPONSES = {
    fever: {
        riskLevel: 'MEDIUM' as const,
        summary: 'You have a fever which may indicate a viral infection.',
        homeCareTips: [
            'Get plenty of rest and stay hydrated',
            'Eat light, nutritious meals',
            'Apply cold compress on forehead',
        ],
        homeMedicines: [
            'Turmeric milk (before bed)',
            'Ginger and tulsi tea',
            'Honey with warm water',
            'Coriander water',
        ],
        dietSuggestions: [
            'Khichdi (rice and lentils)',
            'Curd/yogurt',
            'Fresh fruits (orange, apple)',
            'Coconut water',
            'Light soup',
        ],
        doctorRecommendation: 'See a doctor if fever persists >3 days or goes above 102°F.',
    },
    headache: {
        riskLevel: 'LOW' as const,
        summary: 'You have a headache which may be due to stress or lack of sleep.',
        homeCareTips: [
            'Rest in a dark room',
            'Drink plenty of water',
            'Massage neck and shoulders',
        ],
        homeMedicines: [
            'Ginger paste on forehead',
            'Peppermint oil',
            'Clove tea',
        ],
        dietSuggestions: [
            'Adequate water',
            'Fresh fruits',
            'Green vegetables',
            'Nuts (almonds, walnuts)',
        ],
        doctorRecommendation: 'Consult a doctor if headache is severe or frequent.',
    },
    cold: {
        riskLevel: 'LOW' as const,
        summary: 'You have a common cold which is a viral infection.',
        homeCareTips: [
            'Drink warm water',
            'Take steam inhalation',
            'Wear warm clothes',
        ],
        homeMedicines: [
            'Ginger and honey tea',
            'Tulsi (holy basil) leaves',
            'Black pepper and honey',
            'Turmeric milk',
        ],
        dietSuggestions: [
            'Warm soup',
            'Khichdi',
            'Herbal tea',
            'Avoid cold items',
        ],
        doctorRecommendation: 'See a doctor if not better in 5-7 days.',
    },
}

/**
 * Detect language from text
 */
function detectLanguage(text: string): 'hindi' | 'english' {
    // Check for Hindi (Devanagari) characters
    const hindiPattern = /[\u0900-\u097F]/
    return hindiPattern.test(text) ? 'hindi' : 'english'
}

/**
 * Detect symptom type from description
 */
function detectSymptom(description: string): 'fever' | 'headache' | 'cold' | 'general' {
    const lower = description.toLowerCase()

    if (lower.includes('fever') || lower.includes('बुखार') || lower.includes('ताप')) {
        return 'fever'
    }
    if (lower.includes('headache') || lower.includes('सिरदर्द') || lower.includes('सिर')) {
        return 'headache'
    }
    if (lower.includes('cold') || lower.includes('cough') || lower.includes('सर्दी') || lower.includes('जुकाम') || lower.includes('खांसी')) {
        return 'cold'
    }
    return 'general'
}

/**
 * Get mock AI response (for demo without API key)
 */
export function getMockAIResponse(description: string): TriageResult & { detectedLanguage: string } {
    const language = detectLanguage(description)
    const symptom = detectSymptom(description)

    const responses = language === 'hindi' ? HINDI_RESPONSES : ENGLISH_RESPONSES
    const response = responses[symptom] || responses.fever

    return {
        ...response,
        detectedLanguage: language,
    }
}
