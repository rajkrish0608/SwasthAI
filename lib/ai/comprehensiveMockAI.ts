import { TriageResult } from '@/types/symptom'

/**
 * Comprehensive Mock AI with responses for many diseases
 * Supports Hindi and English
 */

// Detect language
function detectLanguage(text: string): 'hindi' | 'english' {
    return /[\u0900-\u097F]/.test(text) ? 'hindi' : 'english'
}

// Detect symptoms
function detectSymptoms(text: string): string[] {
    const lower = text.toLowerCase()
    const symptoms: string[] = []

    // Fever
    if (lower.match(/fever|बुखार|ताप|temperature/)) symptoms.push('fever')

    // Headache
    if (lower.match(/headache|सिरदर्द|सिर|head.*pain/)) symptoms.push('headache')

    // Cough
    if (lower.match(/cough|खांसी|khansi/)) symptoms.push('cough')

    // Cold
    if (lower.match(/cold|सर्दी|जुकाम|runny.*nose/)) symptoms.push('cold')

    // Stomach
    if (lower.match(/stomach|पेट|pet|diarrhea|दस्त|vomit|उल्टी|acidity|gas/)) symptoms.push('stomach')

    // Body pain
    if (lower.match(/body.*pain|बदन.*दर्द|ache/)) symptoms.push('bodyache')

    // Weakness
    if (lower.match(/weak|कमजोर|tired|थकान/)) symptoms.push('weakness')

    return symptoms.length > 0 ? symptoms : ['general']
}

// Get response based on symptoms
export function getComprehensiveMockAI(description: string): TriageResult & { detectedLanguage: string } {
    const language = detectLanguage(description)
    const symptoms = detectSymptoms(description)
    const primarySymptom = symptoms[0]

    if (language === 'hindi') {
        return getHindiResponse(primarySymptom, symptoms)
    } else {
        return getEnglishResponse(primarySymptom, symptoms)
    }
}

function getHindiResponse(primary: string, symptoms: string[]): TriageResult & { detectedLanguage: string } {
    const responses: Record<string, any> = {
        fever: {
            riskLevel: 'MEDIUM',
            summary: 'आपको बुखार है जो वायरल संक्रमण, फ्लू, या अन्य बीमारी का संकेत हो सकता है।',
            homeCareTips: [
                'पूरा आराम करें और 8-10 गिलास पानी पिएं',
                'हल्का और पौष्टिक भोजन करें',
                'माथे पर ठंडे पानी की पट्टी रखें',
                'कमरे को ठंडा और हवादार रखें',
            ],
            homeMedicines: [
                'हल्दी वाला दूध (सोने से पहले)',
                'अदरक और तुलसी की चाय',
                'शहद के साथ गर्म पानी',
                'धनिया का पानी (बुखार कम करने के लिए)',
                'गिलोय का रस',
            ],
            dietSuggestions: [
                'खिचड़ी (मूंग दाल और चावल)',
                'दही या छाछ',
                'ताजे फल (संतरा, सेब, अनार)',
                'नारियल पानी',
                'हल्का सूप',
                'बचें: तला-भुना, मसालेदार खाना',
            ],
            doctorRecommendation: 'अगर बुखार 3 दिन से ज्यादा रहे, 102°F से ऊपर हो, या सांस लेने में तकलीफ हो तो तुरंत डॉक्टर से मिलें।',
        },
        headache: {
            riskLevel: 'LOW',
            summary: 'आपको सिरदर्द है जो तनाव, नींद की कमी, या डिहाइड्रेशन से हो सकता है।',
            homeCareTips: [
                'अंधेरे और शांत कमरे में आराम करें',
                'पर्याप्त पानी पिएं (8-10 गिलास)',
                'गर्दन और कंधों की हल्की मालिश करें',
                'स्क्रीन टाइम कम करें',
            ],
            homeMedicines: [
                'अदरक का पेस्ट माथे पर लगाएं',
                'पुदीने का तेल (temples पर)',
                'लौंग की चाय',
                'दालचीनी पाउडर पानी के साथ',
            ],
            dietSuggestions: [
                'पर्याप्त पानी',
                'ताजे फल',
                'हरी सब्जियां',
                'मेवे (बादाम, अखरोट)',
                'बचें: कैफीन, शराब',
            ],
            doctorRecommendation: 'अगर सिरदर्द बहुत तेज हो, बार-बार हो, या देखने में परेशानी हो तो डॉक्टर से सलाह लें।',
        },
        cough: {
            riskLevel: 'LOW',
            summary: 'आपको खांसी है जो सर्दी-जुकाम, एलर्जी, या गले की खराश से हो सकती है।',
            homeCareTips: [
                'गर्म पानी पिएं',
                'दिन में 2-3 बार भाप लें',
                'गले को गर्म रखें (मफलर पहनें)',
                'धूम्रपान और धुएं से बचें',
            ],
            homeMedicines: [
                'शहद और अदरक (दिन में 3 बार)',
                'तुलसी के पत्ते की चाय',
                'हल्दी दूध',
                'काली मिर्च और शहद',
                'मुलेठी (licorice) चूसें',
            ],
            dietSuggestions: [
                'गर्म सूप',
                'हर्बल चाय (अदरक, तुलसी)',
                'शहद',
                'गर्म पानी',
                'बचें: ठंडी चीजें, आइसक्रीम',
            ],
            doctorRecommendation: 'अगर खांसी 2 हफ्ते से ज्यादा रहे, खून आए, या सांस लेने में तकलीफ हो तो डॉक्टर से मिलें।',
        },
        stomach: {
            riskLevel: 'MEDIUM',
            summary: 'आपको पेट में दर्द या पाचन की समस्या है जो खराब खाना, गैस, या इंफेक्शन से हो सकती है।',
            homeCareTips: [
                'हल्का और सुपाच्य भोजन करें',
                'पर्याप्त पानी पिएं (ORS घोल)',
                'तला-भुना और मसालेदार खाना न खाएं',
                'आराम करें',
            ],
            homeMedicines: [
                'अजवाइन का पानी (गैस के लिए)',
                'जीरा पानी',
                'पुदीने की चाय',
                'हींग और नमक के साथ गर्म पानी',
                'सौंफ चबाएं',
            ],
            dietSuggestions: [
                'दही-चावल',
                'मूंग दाल की खिचड़ी',
                'केला',
                'नारियल पानी',
                'ORS घोल',
                'बचें: मसालेदार, तला हुआ खाना',
            ],
            doctorRecommendation: 'अगर दर्द बहुत तेज हो, खून की उल्टी या दस्त हो, या बुखार हो तो तुरंत डॉक्टर से मिलें।',
        },
        cold: {
            riskLevel: 'LOW',
            summary: 'आपको सर्दी-जुकाम है जो आम वायरल संक्रमण है।',
            homeCareTips: [
                'गर्म पानी पिएं',
                'भाप लें (दिन में 2-3 बार)',
                'गर्म कपड़े पहनें',
                'पर्याप्त आराम करें',
            ],
            homeMedicines: [
                'अदरक और शहद की चाय',
                'तुलसी के पत्ते',
                'काली मिर्च और शहद',
                'हल्दी वाला दूध',
                'लहसुन का सूप',
            ],
            dietSuggestions: [
                'गर्म सूप',
                'खिचड़ी',
                'हर्बल चाय',
                'विटामिन C (संतरा, नींबू)',
                'बचें: ठंडी चीजें, आइसक्रीम',
            ],
            doctorRecommendation: 'अगर 5-7 दिन में ठीक न हो, बुखार हो, या सांस लेने में तकलीफ हो तो डॉक्टर से मिलें।',
        },
        bodyache: {
            riskLevel: 'LOW',
            summary: 'आपको बदन दर्द है जो थकान, वायरल इंफेक्शन, या मांसपेशियों में खिंचाव से हो सकता है।',
            homeCareTips: [
                'पूरा आराम करें',
                'गर्म पानी से नहाएं',
                'हल्की मालिश करें',
                'पर्याप्त नींद लें (8 घंटे)',
            ],
            homeMedicines: [
                'हल्दी दूध',
                'अदरक की चाय',
                'सरसों के तेल से मालिश',
                'लहसुन का सेवन',
            ],
            dietSuggestions: [
                'प्रोटीन युक्त भोजन',
                'दूध, दही',
                'मेवे',
                'हरी सब्जियां',
            ],
            doctorRecommendation: 'अगर दर्द बहुत तेज हो, बुखार हो, या 3 दिन से ज्यादा रहे तो डॉक्टर से मिलें।',
        },
        general: {
            riskLevel: 'LOW',
            summary: 'आपके लक्षणों के आधार पर, यह सामान्य स्वास्थ्य समस्या हो सकती है।',
            homeCareTips: [
                'पर्याप्त आराम करें',
                'खूब पानी पिएं',
                'स्वस्थ भोजन करें',
                'तनाव कम करें',
            ],
            homeMedicines: [
                'हल्दी दूध',
                'अदरक की चाय',
                'तुलसी के पत्ते',
                'शहद',
            ],
            dietSuggestions: [
                'संतुलित आहार',
                'ताजे फल और सब्जियां',
                'पर्याप्त पानी',
                'हल्का भोजन',
            ],
            doctorRecommendation: 'अगर लक्षण बिगड़ें या 3 दिन से ज्यादा रहें तो डॉक्टर से सलाह लें।',
        },
    }

    const response = responses[primary] || responses.general
    return { ...response, detectedLanguage: 'hindi' }
}

function getEnglishResponse(primary: string, symptoms: string[]): TriageResult & { detectedLanguage: string } {
    const responses: Record<string, any> = {
        fever: {
            riskLevel: 'MEDIUM',
            summary: 'You have a fever which may indicate viral infection, flu, or other illness.',
            homeCareTips: [
                'Get complete rest and drink 8-10 glasses of water',
                'Eat light, nutritious meals',
                'Apply cold compress on forehead',
                'Keep room cool and well-ventilated',
            ],
            homeMedicines: [
                'Turmeric milk (before bed)',
                'Ginger and tulsi tea',
                'Honey with warm water',
                'Coriander water (to reduce fever)',
                'Giloy juice',
            ],
            dietSuggestions: [
                'Khichdi (moong dal and rice)',
                'Curd or buttermilk',
                'Fresh fruits (orange, apple, pomegranate)',
                'Coconut water',
                'Light soup',
                'Avoid: Fried, spicy food',
            ],
            doctorRecommendation: 'See a doctor immediately if fever persists >3 days, goes above 102°F, or you have breathing difficulty.',
        },
        headache: {
            riskLevel: 'LOW',
            summary: 'You have a headache which may be due to stress, lack of sleep, or dehydration.',
            homeCareTips: [
                'Rest in a dark, quiet room',
                'Drink plenty of water (8-10 glasses)',
                'Gently massage neck and shoulders',
                'Reduce screen time',
            ],
            homeMedicines: [
                'Ginger paste on forehead',
                'Peppermint oil (on temples)',
                'Clove tea',
                'Cinnamon powder with water',
            ],
            dietSuggestions: [
                'Adequate water',
                'Fresh fruits',
                'Green vegetables',
                'Nuts (almonds, walnuts)',
                'Avoid: Caffeine, alcohol',
            ],
            doctorRecommendation: 'Consult a doctor if headache is severe, frequent, or you have vision problems.',
        },
        cough: {
            riskLevel: 'LOW',
            summary: 'You have a cough which may be from cold, allergy, or throat irritation.',
            homeCareTips: [
                'Drink warm water',
                'Take steam 2-3 times daily',
                'Keep throat warm (wear scarf)',
                'Avoid smoking and smoke',
            ],
            homeMedicines: [
                'Honey and ginger (3 times daily)',
                'Tulsi leaf tea',
                'Turmeric milk',
                'Black pepper and honey',
                'Suck on licorice (mulethi)',
            ],
            dietSuggestions: [
                'Warm soup',
                'Herbal tea (ginger, tulsi)',
                'Honey',
                'Warm water',
                'Avoid: Cold items, ice cream',
            ],
            doctorRecommendation: 'See a doctor if cough persists >2 weeks, you cough up blood, or have breathing difficulty.',
        },
        stomach: {
            riskLevel: 'MEDIUM',
            summary: 'You have stomach pain or digestive issues which may be from bad food, gas, or infection.',
            homeCareTips: [
                'Eat light, easily digestible food',
                'Drink plenty of water (ORS solution)',
                'Avoid fried and spicy food',
                'Rest',
            ],
            homeMedicines: [
                'Ajwain (carom seeds) water (for gas)',
                'Jeera (cumin) water',
                'Peppermint tea',
                'Hing (asafoetida) with warm water',
                'Chew fennel seeds',
            ],
            dietSuggestions: [
                'Curd rice',
                'Moong dal khichdi',
                'Banana',
                'Coconut water',
                'ORS solution',
                'Avoid: Spicy, fried food',
            ],
            doctorRecommendation: 'See a doctor immediately if pain is severe, you have bloody vomit/stool, or fever.',
        },
        cold: {
            riskLevel: 'LOW',
            summary: 'You have a common cold which is a viral infection.',
            homeCareTips: [
                'Drink warm water',
                'Take steam (2-3 times daily)',
                'Wear warm clothes',
                'Get adequate rest',
            ],
            homeMedicines: [
                'Ginger and honey tea',
                'Tulsi (holy basil) leaves',
                'Black pepper and honey',
                'Turmeric milk',
                'Garlic soup',
            ],
            dietSuggestions: [
                'Warm soup',
                'Khichdi',
                'Herbal tea',
                'Vitamin C (orange, lemon)',
                'Avoid: Cold items, ice cream',
            ],
            doctorRecommendation: 'See a doctor if not better in 5-7 days, you have fever, or breathing difficulty.',
        },
        bodyache: {
            riskLevel: 'LOW',
            summary: 'You have body ache which may be from fatigue, viral infection, or muscle strain.',
            homeCareTips: [
                'Get complete rest',
                'Take warm water bath',
                'Gentle massage',
                'Get adequate sleep (8 hours)',
            ],
            homeMedicines: [
                'Turmeric milk',
                'Ginger tea',
                'Massage with mustard oil',
                'Garlic consumption',
            ],
            dietSuggestions: [
                'Protein-rich food',
                'Milk, curd',
                'Nuts',
                'Green vegetables',
            ],
            doctorRecommendation: 'See a doctor if pain is severe, you have fever, or it persists >3 days.',
        },
        general: {
            riskLevel: 'LOW',
            summary: 'Based on your symptoms, this appears to be a general health issue.',
            homeCareTips: [
                'Get adequate rest',
                'Drink plenty of water',
                'Eat healthy food',
                'Reduce stress',
            ],
            homeMedicines: [
                'Turmeric milk',
                'Ginger tea',
                'Tulsi leaves',
                'Honey',
            ],
            dietSuggestions: [
                'Balanced diet',
                'Fresh fruits and vegetables',
                'Adequate water',
                'Light meals',
            ],
            doctorRecommendation: 'Consult a doctor if symptoms worsen or persist >3 days.',
        },
    }

    const response = responses[primary] || responses.general
    return { ...response, detectedLanguage: 'english' }
}
