export interface HealthProfile {
    age?: number
    gender?: string
    heightCm?: number
    weightKg?: number
    bmi?: number
    bmiCategory?: string
    bpSystolic?: number
    bpDiastolic?: number
    bloodSugar?: number
    activityLevel?: string
    foodPreference?: string
    region?: string
}

export interface BMIResult {
    value: number
    category: 'Underweight' | 'Normal' | 'Overweight' | 'Obese'
    riskHint: string
    color: string
}

export interface DietPlan {
    breakfast: string[]
    lunch: string[]
    snacks: string[]
    dinner: string[]
    goodToInclude: string[]
    limitAvoid: string[]
}
