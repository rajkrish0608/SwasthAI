/**
 * Indian meal plans organized by region and food preference
 */

export const mealData = {
    north: {
        veg: {
            breakfast: ['Paratha with curd', 'Poha', 'Upma', 'Aloo paratha', 'Besan chilla'],
            lunch: ['Roti with dal and sabzi', 'Rajma chawal', 'Chole with rice', 'Paneer curry with roti'],
            snacks: ['Samosa', 'Pakora', 'Fruit chaat', 'Roasted chana', 'Sprouts'],
            dinner: ['Roti with dal', 'Khichdi', 'Vegetable pulao', 'Paneer tikka with roti'],
        },
        nonveg: {
            breakfast: ['Paratha with curd', 'Poha', 'Egg paratha', 'Omelette with bread'],
            lunch: ['Chicken curry with roti', 'Mutton curry with rice', 'Egg curry with roti', 'Fish curry with rice'],
            snacks: ['Chicken tikka', 'Egg roll', 'Fruit', 'Roasted chana'],
            dinner: ['Butter chicken with roti', 'Keema with roti', 'Grilled chicken with salad'],
        },
        eggetarian: {
            breakfast: ['Egg paratha', 'Boiled eggs with bread', 'Omelette', 'Egg bhurji'],
            lunch: ['Egg curry with roti', 'Roti with dal and sabzi', 'Egg biryani'],
            snacks: ['Boiled eggs', 'Egg sandwich', 'Fruit', 'Sprouts'],
            dinner: ['Egg curry with roti', 'Khichdi with egg', 'Vegetable pulao with egg'],
        },
    },
    south: {
        veg: {
            breakfast: ['Idli with sambar', 'Dosa with chutney', 'Upma', 'Pongal', 'Uttapam'],
            lunch: ['Rice with sambar and rasam', 'Curd rice', 'Lemon rice', 'Vegetable biryani'],
            snacks: ['Vada', 'Murukku', 'Banana', 'Coconut water', 'Sundal'],
            dinner: ['Dosa with sambar', 'Rice with dal', 'Vegetable curry with rice', 'Idli'],
        },
        nonveg: {
            breakfast: ['Idli with sambar', 'Dosa with chutney', 'Egg dosa', 'Upma'],
            lunch: ['Fish curry with rice', 'Chicken curry with rice', 'Prawn curry with rice', 'Egg curry with rice'],
            snacks: ['Fish fry', 'Chicken 65', 'Banana', 'Coconut water'],
            dinner: ['Fish curry with rice', 'Chicken biryani', 'Egg curry with rice'],
        },
        eggetarian: {
            breakfast: ['Egg dosa', 'Egg idli', 'Omelette with bread', 'Egg upma'],
            lunch: ['Egg curry with rice', 'Rice with sambar', 'Egg biryani'],
            snacks: ['Boiled eggs', 'Egg bonda', 'Banana', 'Coconut water'],
            dinner: ['Egg curry with rice', 'Dosa with egg', 'Rice with egg'],
        },
    },
    east: {
        veg: {
            breakfast: ['Luchi with aloo dum', 'Poha', 'Paratha', 'Idli'],
            lunch: ['Rice with dal and sabzi', 'Khichuri', 'Vegetable curry with rice'],
            snacks: ['Jhalmuri', 'Singara', 'Banana', 'Coconut'],
            dinner: ['Rice with dal', 'Khichdi', 'Vegetable curry with rice'],
        },
        nonveg: {
            breakfast: ['Luchi with aloo dum', 'Egg curry with luchi', 'Paratha'],
            lunch: ['Fish curry with rice', 'Chicken curry with rice', 'Egg curry with rice', 'Mutton curry with rice'],
            snacks: ['Fish fry', 'Egg chop', 'Banana'],
            dinner: ['Fish curry with rice', 'Chicken curry with rice', 'Egg curry with rice'],
        },
        eggetarian: {
            breakfast: ['Egg curry with luchi', 'Omelette with bread', 'Egg paratha'],
            lunch: ['Egg curry with rice', 'Rice with dal', 'Egg biryani'],
            snacks: ['Boiled eggs', 'Egg chop', 'Banana'],
            dinner: ['Egg curry with rice', 'Rice with dal and egg'],
        },
    },
    west: {
        veg: {
            breakfast: ['Poha', 'Upma', 'Thepla', 'Dhokla', 'Idli'],
            lunch: ['Roti with dal and sabzi', 'Khichdi', 'Vegetable pulao', 'Pav bhaji'],
            snacks: ['Vada pav', 'Bhel puri', 'Dhokla', 'Fruit', 'Roasted chana'],
            dinner: ['Roti with dal', 'Khichdi', 'Vegetable curry with roti'],
        },
        nonveg: {
            breakfast: ['Poha', 'Upma', 'Egg bhurji with pav', 'Omelette'],
            lunch: ['Chicken curry with roti', 'Fish curry with rice', 'Egg curry with roti', 'Mutton curry with rice'],
            snacks: ['Chicken kebab', 'Egg pav', 'Fruit'],
            dinner: ['Chicken curry with roti', 'Fish curry with rice', 'Egg curry with roti'],
        },
        eggetarian: {
            breakfast: ['Egg bhurji with pav', 'Omelette', 'Egg paratha'],
            lunch: ['Egg curry with roti', 'Roti with dal', 'Egg biryani'],
            snacks: ['Boiled eggs', 'Egg pav', 'Fruit'],
            dinner: ['Egg curry with roti', 'Rice with dal and egg'],
        },
    },
}
