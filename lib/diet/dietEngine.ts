import { HealthProfile, DietPlan } from '@/types/health'
import { mealData } from './mealPlans'
import { nutritionRules, healthConditionRules } from './nutritionRules'

/**
 * Generate personalized diet plan based on health profile
 */
export function generateDietPlan(profile: HealthProfile): DietPlan {
    const {
        bmiCategory = 'normal',
        foodPreference = 'veg',
        region = 'north',
        bpSystolic,
        bloodSugar,
    } = profile

    // Get base meals for region and food preference
    const regionKey = region.toLowerCase() as keyof typeof mealData
    const prefKey = foodPreference.toLowerCase() as keyof typeof mealData.north

    const baseMeals = mealData[regionKey]?.[prefKey] || mealData.north.veg

    // Get nutrition rules based on BMI category
    const bmiKey = bmiCategory.toLowerCase() as keyof typeof nutritionRules
    const rules = nutritionRules[bmiKey] || nutritionRules.normal

    let goodToInclude = [...rules.goodToInclude]
    let limitAvoid = [...rules.limitAvoid]

    // Add health condition-specific rules
    if (bpSystolic && bpSystolic > 140) {
        goodToInclude = [...goodToInclude, ...healthConditionRules.highBP.goodToInclude]
        limitAvoid = [...limitAvoid, ...healthConditionRules.highBP.limitAvoid]
    }

    if (bloodSugar && bloodSugar > 125) {
        goodToInclude = [...goodToInclude, ...healthConditionRules.highSugar.goodToInclude]
        limitAvoid = [...limitAvoid, ...healthConditionRules.highSugar.limitAvoid]
    }

    // Customize meals based on BMI category
    let breakfast = [...baseMeals.breakfast]
    let lunch = [...baseMeals.lunch]
    let snacks = [...baseMeals.snacks]
    let dinner = [...baseMeals.dinner]

    // For overweight/obese, add healthier alternatives
    if (bmiCategory === 'Overweight' || bmiCategory === 'Obese') {
        breakfast = breakfast.map(item =>
            item.includes('paratha') ? item + ' (use less oil)' : item
        )
        snacks = snacks.filter(item =>
            !item.toLowerCase().includes('samosa') &&
            !item.toLowerCase().includes('pakora') &&
            !item.toLowerCase().includes('vada')
        )
        snacks.push('Fruit', 'Roasted chana', 'Sprouts', 'Buttermilk')
    }

    // For underweight, add calorie-dense options
    if (bmiCategory === 'Underweight') {
        snacks.push('Banana shake', 'Dry fruits', 'Peanut butter sandwich')
    }

    return {
        breakfast: breakfast.slice(0, 4),
        lunch: lunch.slice(0, 4),
        snacks: snacks.slice(0, 4),
        dinner: dinner.slice(0, 4),
        goodToInclude: Array.from(new Set(goodToInclude)), // Remove duplicates
        limitAvoid: Array.from(new Set(limitAvoid)),
    }
}

/**
 * Get meal plan summary text
 */
export function getMealPlanSummary(bmiCategory: string): string {
    const summaries = {
        Underweight: 'Focus on calorie-dense, nutritious foods to gain healthy weight.',
        Normal: 'Maintain your healthy weight with a balanced, varied diet.',
        Overweight: 'Reduce portion sizes and choose low-calorie, high-fiber foods.',
        Obese: 'Significant dietary changes needed. Consider consulting a nutritionist.',
    }

    return summaries[bmiCategory as keyof typeof summaries] || summaries.Normal
}
