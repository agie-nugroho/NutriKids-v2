// Configuration settings 

const CONFIG = {
  // API endpoints
  API_BASE_URL: "http://localhost:5000/api",

  // Age groups and their nutrition requirements
  AGE_GROUPS: {
    "0-6months": {
      name: "0-6 months",
      calorie_range: [400, 600],
      key_nutrients: ["Iron", "Calcium", "Vitamin D"],
      prohibited: ["Salt", "Sugar", "Honey", "Cow Milk"],
    },
    "6-12months": {
      name: "6-12 months",
      calorie_range: [600, 900],
      key_nutrients: ["Iron", "Zinc", "Protein", "Vitamin D"],
      prohibited: ["Honey", "Excess Salt", "Excess Sugar"],
    },
    "1-2years": {
      name: "1-2 years",
      calorie_range: [900, 1200],
      key_nutrients: ["Calcium", "Iron", "Protein", "Vitamin A", "Vitamin C"],
      prohibited: [],
    },
    "3-5years": {
      name: "3-5 years",
      calorie_range: [1200, 1600],
      key_nutrients: ["Calcium", "Iron", "Zinc", "Vitamin C", "Fiber"],
      prohibited: [],
    },
    "6-8years": {
      name: "6-8 years",
      calorie_range: [1400, 1800],
      key_nutrients: ["Calcium", "Iron", "Protein", "Vitamin D", "Fiber"],
      prohibited: [],
    },
    "9-12years": {
      name: "9-12 years",
      calorie_range: [1600, 2200],
      key_nutrients: ["Calcium", "Iron", "Protein", "B Vitamins", "Fiber"],
      prohibited: [],
    },
  },

  // Meal times and typical calorie distribution
  MEAL_TIMES: {
    breakfast: {
      name: "Breakfast",
      calorie_percent: 25,
      description: "Start the day with energy",
    },
    lunch: {
      name: "Lunch",
      calorie_percent: 30,
      description: "Main meal of the day",
    },
    dinner: {
      name: "Dinner",
      calorie_percent: 25,
      description: "Evening meal",
    },
    snack: {
      name: "Snack",
      calorie_percent: 10,
      description: "In-between meal",
    },
  },

  // Default 
  DEFAULTS: {
    budget_max: 50000, 
    results_limit: 5, 
  },
};

export default CONFIG;
