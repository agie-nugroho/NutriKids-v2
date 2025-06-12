const API_BASE_URL = "http://localhost:5000/api";

const getRecommendations = async (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        recommendations: [
          {
            id: 1,
            name: "Vegetable Rice Porridge",
            imageUrl: "./public/images/logo.png",
            nutritionScore: 85,
            ingredients: ["Rice", "Carrots", "Spinach", "Chicken broth"],
            cost: 15000,
          },
          {
            id: 2,
            name: "Egg Fried Rice",
            imageUrl: "./public/images/logo.png",
            nutritionScore: 75,
            ingredients: ["Rice", "Eggs", "Peas", "Carrots"],
            cost: 12000,
          },
          {
            id: 3,
            name: "Chicken & Vegetable Soup",
            imageUrl: "./public/images/logo.png",
            nutritionScore: 90,
            ingredients: ["Chicken", "Carrots", "Potatoes", "Celery"],
            cost: 20000,
          },
        ],
        nutritionAlerts: [
          {
            type: "warning",
            message:
              "This meal plan is slightly low in Vitamin C. Consider adding orange slices as a side.",
          },
        ],
      });
    }, 1000);
  });
};

const getIngredients = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Rice" },
        { id: 2, name: "Chicken" },
        { id: 3, name: "Eggs" },
        { id: 4, name: "Milk" },
        { id: 5, name: "Carrots" },
        { id: 6, name: "Potatoes" },
        { id: 7, name: "Fish" },
        { id: 8, name: "Spinach" },
        { id: 9, name: "Apples" },
        { id: 10, name: "Bananas" },
      ]);
    }, 500);
  });
};

export { getRecommendations, getIngredients };
