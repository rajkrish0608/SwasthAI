import { SymptomInput, TriageResult } from '@/types/symptom'

/**
 * Rule-based symptom triage engine
 * Classifies symptoms as LOW, MEDIUM, or HIGH risk
 */
export function assessSymptoms(input: SymptomInput): TriageResult {
    const description = input.description.toLowerCase()

    // HIGH RISK keywords - immediate medical attention needed
    const highRiskKeywords = [
        'chest pain',
        'difficulty breathing',
        'can\'t breathe',
        'severe headache',
        'confusion',
        'loss of consciousness',
        'unconscious',
        'severe bleeding',
        'heavy bleeding',
        'stroke',
        'heart attack',
        'seizure',
        'severe abdominal pain',
        'coughing blood',
        'vomiting blood',
        'suicidal',
        'severe burn',
    ]

    // MEDIUM RISK patterns - see doctor within 24 hours
    const mediumRiskPatterns = [
        /fever.*\d+.*day/i, // fever for X days
        /fever.*(3|4|5|6|7|more) day/i,
        'chronic pain',
        'persistent pain',
        'blood in stool',
        'blood in urine',
        'persistent vomiting',
        'severe pain',
        'high fever',
        'difficulty swallowing',
        'unexplained weight loss',
        'persistent cough',
        'shortness of breath',
    ]

    // Check for HIGH RISK
    for (const keyword of highRiskKeywords) {
        if (description.includes(keyword)) {
            return {
                riskLevel: 'HIGH',
                summary: 'Your symptoms may indicate a serious medical emergency.',
                homeCareTips: [
                    'Call emergency services (108/102) immediately',
                    'Do not drive yourself to the hospital',
                    'Stay calm and sit or lie down',
                    'If someone is with you, have them stay until help arrives',
                ],
                doctorRecommendation: '🚨 EMERGENCY: Go to the nearest emergency room immediately or call an ambulance. Do not delay.',
            }
        }
    }

    // Check for MEDIUM RISK
    for (const pattern of mediumRiskPatterns) {
        if (typeof pattern === 'string') {
            if (description.includes(pattern)) {
                return getMediumRiskResult(description)
            }
        } else if (pattern.test(description)) {
            return getMediumRiskResult(description)
        }
    }

    // LOW RISK (default)
    return {
        riskLevel: 'LOW',
        summary: 'Your symptoms appear to be mild and may not require immediate medical attention.',
        homeCareTips: [
            'Rest and stay hydrated - drink plenty of water',
            'Monitor your symptoms for any changes',
            'Take over-the-counter medication if needed (paracetamol for fever/pain)',
            'Maintain good hygiene and wash hands frequently',
            'Get adequate sleep (7-8 hours)',
            'Eat light, nutritious meals',
        ],
        doctorRecommendation: 'If symptoms persist for more than 3 days, worsen, or you develop new symptoms, please consult a doctor.',
    }
}

function getMediumRiskResult(description: string): TriageResult {
    let specificTips: string[] = []
    let specificRecommendation = 'Please see a doctor within 24 hours for proper evaluation.'

    // Add specific tips based on symptoms
    if (description.includes('fever')) {
        specificTips = [
            'Take paracetamol to reduce fever',
            'Drink plenty of fluids',
            'Use cold compress on forehead',
            'Rest in a cool room',
            'Monitor temperature regularly',
        ]
    } else if (description.includes('pain')) {
        specificTips = [
            'Rest the affected area',
            'Apply ice pack for 15-20 minutes',
            'Take pain medication as needed',
            'Avoid strenuous activities',
            'Monitor for worsening symptoms',
        ]
    } else if (description.includes('cough')) {
        specificTips = [
            'Stay hydrated with warm liquids',
            'Use honey and ginger for relief',
            'Avoid cold drinks and ice cream',
            'Rest your voice',
            'Use steam inhalation',
        ]
    } else {
        specificTips = [
            'Monitor symptoms closely',
            'Rest and stay hydrated',
            'Avoid self-medication without consulting a doctor',
            'Keep a symptom diary',
        ]
    }

    return {
        riskLevel: 'MEDIUM',
        summary: 'Your symptoms should be evaluated by a doctor soon.',
        homeCareTips: specificTips,
        doctorRecommendation: specificRecommendation,
    }
}

/**
 * Get appropriate greeting message
 */
export function getGreetingMessage(): string {
    return 'Hello! I\'m here to help you understand your symptoms. Please describe what you\'re experiencing, and I\'ll provide guidance on what to do next. Remember, this is not a diagnosis - always consult a doctor for medical advice.'
}
