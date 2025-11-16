/**
 * Nutrition rules and recommendations based on BMI category and health conditions
 */

export const nutritionRules = {
    underweight: {
        goodToInclude: [
            'Nuts and dry fruits (almonds, cashews, dates)',
            'Full-fat dairy (milk, paneer, curd)',
            'Healthy fats (ghee, olive oil)',
            'Protein-rich foods (dal, eggs, chicken)',
            'Whole grains (wheat, rice, oats)',
            'Bananas and mangoes',
            'Peanut butter',
        ],
        limitAvoid: [
            'Excessive junk food',
            'Too much tea/coffee (affects appetite)',
            'Skipping meals',
        ],
    },
    normal: {
        goodToInclude: [
            'Variety of vegetables and fruits',
            'Whole grains (brown rice, whole wheat)',
            'Lean proteins (dal, chicken, fish)',
            'Low-fat dairy',
            'Nuts in moderation',
            'Plenty of water',
            'Green leafy vegetables',
        ],
        limitAvoid: [
            'Excessive sweets and desserts',
            'Fried foods',
            'Processed foods',
            'Sugary drinks',
        ],
    },
    overweight: {
        goodToInclude: [
            'High-fiber vegetables (broccoli, spinach, beans)',
            'Fruits (apples, oranges, berries)',
            'Whole grains in moderation',
            'Lean proteins (dal, fish, chicken breast)',
            'Low-fat dairy',
            'Plenty of water (8-10 glasses)',
            'Green tea',
        ],
        limitAvoid: [
            'White rice and refined flour',
            'Fried foods (pakoras, samosas)',
            'Sweets and desserts',
            'Full-fat dairy',
            'Sugary drinks and sodas',
            'Excessive oil and ghee',
            'Late-night eating',
        ],
    },
    obese: {
        goodToInclude: [
            'Non-starchy vegetables (unlimited)',
            'Salads with lemon dressing',
            'Whole grains (small portions)',
            'Lean proteins (dal, fish, egg whites)',
            'Buttermilk and low-fat curd',
            'Plenty of water',
            'Herbal teas',
        ],
        limitAvoid: [
            'White rice and maida products',
            'All fried foods',
            'Sweets, chocolates, ice cream',
            'Full-fat dairy products',
            'Sugary drinks',
            'Excessive oil, ghee, butter',
            'Processed and packaged foods',
            'Alcohol',
        ],
    },
}

export const healthConditionRules = {
    highBP: {
        goodToInclude: [
            'Potassium-rich foods (bananas, oranges, spinach)',
            'Low-fat dairy',
            'Whole grains',
            'Garlic and onions',
            'Beetroot',
        ],
        limitAvoid: [
            'Salt and salty foods (pickles, papad)',
            'Processed foods',
            'Canned foods',
            'Excessive tea/coffee',
        ],
    },
    highSugar: {
        goodToInclude: [
            'High-fiber vegetables',
            'Whole grains (brown rice, oats)',
            'Bitter gourd (karela)',
            'Fenugreek (methi)',
            'Cinnamon',
        ],
        limitAvoid: [
            'White rice and refined flour',
            'Sweets and desserts',
            'Sugary drinks',
            'Potatoes and sweet potatoes',
            'Ripe bananas and mangoes',
        ],
    },
}
