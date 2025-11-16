import { BMIResult } from '@/types/health'

/**
 * Calculate BMI and categorize based on WHO standards
 * BMI = weight (kg) / height (m)²
 */
export function calculateBMI(heightCm: number, weightKg: number): BMIResult {
    // Convert height to meters
    const heightM = heightCm / 100

    // Calculate BMI
    const bmi = weightKg / (heightM * heightM)

    // Round to 1 decimal place
    const value = Math.round(bmi * 10) / 10

    // Categorize BMI
    let category: BMIResult['category']
    let riskHint: string
    let color: string

    if (bmi < 18.5) {
        category = 'Underweight'
        riskHint = 'May need to gain weight for optimal health. Consider consulting a nutritionist.'
        color = 'blue'
    } else if (bmi < 25) {
        category = 'Normal'
        riskHint = 'Healthy weight range. Maintain with balanced diet and regular exercise.'
        color = 'green'
    } else if (bmi < 30) {
        category = 'Overweight'
        riskHint = 'Consider lifestyle changes to reduce health risks. Focus on diet and exercise.'
        color = 'yellow'
    } else {
        category = 'Obese'
        riskHint = 'Consult a doctor for a weight management plan. Increased risk of health issues.'
        color = 'red'
    }

    return {
        value,
        category,
        riskHint,
        color,
    }
}

/**
 * Validate height and weight inputs
 */
export function validateHealthInputs(heightCm?: number, weightKg?: number): string | null {
    if (!heightCm || !weightKg) {
        return 'Height and weight are required'
    }

    if (heightCm < 50 || heightCm > 250) {
        return 'Height must be between 50 and 250 cm'
    }

    if (weightKg < 20 || weightKg > 300) {
        return 'Weight must be between 20 and 300 kg'
    }

    return null
}
