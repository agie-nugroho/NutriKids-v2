// src/pages/food-input/food-input-page.js

const FoodInputPage = {
  async render() {
    return `
      <section class="meal-planner-section">
        <div class="container">
          <h1>Get Personalized Recommendations</h1>
          <div class="subtitle">Fill out the form to receive customized meal suggestions for your child</div>
          
          <div class="meal-planner-card">
            <h2>NutriKidz Meal Planner</h2>
            
            <div id="step-1" class="form-step active">
              <div class="form-group">
                <label for="childName">Child's Name</label>
                <input type="text" id="childName" name="name" placeholder="Enter child's name" required />
              </div>
              
              <div class="form-group">
                <label for="childAge">Child's Age</label>
                <select id="childAge" name="age">
                  <option value="0-3">0-3 months</option>
                  <option value="4-6">4-6 months</option>
                  <option value="7-12">7-12 months</option>
                  <option value="13-24">1-2 years</option>
                  <option value="25-60">2-5 years</option>
                  <option value="61-144">5-12 years</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="mealTime">Meal Time</label>
                <select id="mealTime" name="meal-time">
                  <option value="breakfast">Breakfast (6am - 9am)</option>
                  <option value="lunch">Lunch (11am - 2pm)</option>
                  <option value="dinner">Dinner (5pm - 8pm)</option>
                  <option value="snack">Snack</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="budget">Budget Range (per meal)</label>
                <div class="budget-slider-container">
                  <input type="range" id="budget" name="budget" min="10000" max="30000" step="1000" value="15000" />
                  <div class="budget-labels">
                    <span>Rp 10.000</span>
                    <span>Rp 30.000</span>
                  </div>
                </div>
              </div>
              
              <div class="form-group">
                <label for="taste">Taste Preference</label>
                <select id="taste" name="taste">
                  <option value="sweet">Sweet</option>
                  <option value="savory">Savory</option>
                  <option value="neutral">Neutral</option>
                  <option value="sour">Sour</option>
                </select>
              </div>
              
              <div class="button-container">
                <button id="next-step" class="primary-button">Next Step</button>
              </div>
            </div>
            
            <div id="step-2" class="form-step">
              <h3>Select Ingredients You Have</h3>
              
              <div class="ingredients-grid">
                <div class="ingredient-item" data-ingredient="chicken">
                  <div class="ingredient-icon">🍗</div>
                  <div class="ingredient-name">Chicken</div>
                </div>
                <div class="ingredient-item" data-ingredient="beef">
                  <div class="ingredient-icon">🥩</div>
                  <div class="ingredient-name">Beef</div>
                </div>
                <div class="ingredient-item" data-ingredient="fish">
                  <div class="ingredient-icon">🐟</div>
                  <div class="ingredient-name">Fish</div>
                </div>
                <div class="ingredient-item" data-ingredient="tofu">
                  <div class="ingredient-icon">◼️</div>
                  <div class="ingredient-name">Tofu</div>
                </div>
                
                <div class="ingredient-item" data-ingredient="eggs">
                  <div class="ingredient-icon">🥚</div>
                  <div class="ingredient-name">Eggs</div>
                </div>
                <div class="ingredient-item" data-ingredient="carrot">
                  <div class="ingredient-icon">🥕</div>
                  <div class="ingredient-name">Carrot</div>
                </div>
                <div class="ingredient-item" data-ingredient="broccoli">
                  <div class="ingredient-icon">🥦</div>
                  <div class="ingredient-name">Broccoli</div>
                </div>
                <div class="ingredient-item" data-ingredient="spinach">
                  <div class="ingredient-icon">🍃</div>
                  <div class="ingredient-name">Spinach</div>
                </div>
                
                <div class="ingredient-item" data-ingredient="potato">
                  <div class="ingredient-icon">🥔</div>
                  <div class="ingredient-name">Potato</div>
                </div>
                <div class="ingredient-item" data-ingredient="peas">
                  <div class="ingredient-icon">🌱</div>
                  <div class="ingredient-name">Peas</div>
                </div>
                <div class="ingredient-item" data-ingredient="apple">
                  <div class="ingredient-icon">🍎</div>
                  <div class="ingredient-name">Apple</div>
                </div>
                <div class="ingredient-item" data-ingredient="banana">
                  <div class="ingredient-icon">🍌</div>
                  <div class="ingredient-name">Banana</div>
                </div>
                
                <div class="ingredient-item" data-ingredient="orange">
                  <div class="ingredient-icon">🟠</div>
                  <div class="ingredient-name">Orange</div>
                </div>
                <div class="ingredient-item" data-ingredient="strawberry">
                  <div class="ingredient-icon">❤️</div>
                  <div class="ingredient-name">Strawberry</div>
                </div>
                <div class="ingredient-item" data-ingredient="mango">
                  <div class="ingredient-icon">🟧</div>
                  <div class="ingredient-name">Mango</div>
                </div>
                <div class="ingredient-item" data-ingredient="rice">
                  <div class="ingredient-icon">🟪</div>
                  <div class="ingredient-name">Rice</div>
                </div>
                
                <div class="ingredient-item" data-ingredient="pasta">
                  <div class="ingredient-icon">≡</div>
                  <div class="ingredient-name">Pasta</div>
                </div>
                <div class="ingredient-item" data-ingredient="bread">
                  <div class="ingredient-icon">🍞</div>
                  <div class="ingredient-name">Bread</div>
                </div>
                <div class="ingredient-item" data-ingredient="oats">
                  <div class="ingredient-icon">⚫</div>
                  <div class="ingredient-name">Oats</div>
                </div>
                <div class="ingredient-item" data-ingredient="quinoa">
                  <div class="ingredient-icon">⚫</div>
                  <div class="ingredient-name">Quinoa</div>
                </div>
              </div>
              
              <div class="selected-ingredients-container">
                <h4>Your Selected Ingredients:</h4>
                <div id="selected-ingredients" class="selected-items"></div>
              </div>
              
              <div class="button-container">
                <button id="previous-step" class="secondary-button">Previous</button>
                <button id="submit-form" class="primary-button">Get Recommendations</button>
              </div>
            </div>

            <div id="recommendation-result" class="result-box"></div>
          </div>
        </div>
      </section>
    `;
  },

  async afterRender() {
    // References to DOM elements
    const step1 = document.getElementById("step-1");
    const step2 = document.getElementById("step-2");
    const nextStepBtn = document.getElementById("next-step");
    const prevStepBtn = document.getElementById("previous-step");
    const submitFormBtn = document.getElementById("submit-form");
    const ingredientItems = document.querySelectorAll(".ingredient-item");
    const selectedIngredientsContainer = document.getElementById(
      "selected-ingredients"
    );
    const resultContainer = document.getElementById("recommendation-result");

    // Form data storage
    const formData = {
      name: "",
      age: "",
      "meal-time": "",
      budget: "15000",
      taste: "sweet",
      ingredients: [],
    };

    // Update budget display when slider changes
    const budgetSlider = document.getElementById("budget");
    if (budgetSlider) {
      budgetSlider.addEventListener("input", () => {
        formData.budget = budgetSlider.value;
      });
    }

    // Handle navigation between steps
    if (nextStepBtn) {
      nextStepBtn.addEventListener("click", () => {
        // Get step 1 data
        formData.name = document.getElementById("childName").value;
        formData.age = document.getElementById("childAge").value;
        formData["meal-time"] = document.getElementById("mealTime").value;
        formData.taste = document.getElementById("taste").value;

        // Validate step 1
        if (!formData.name) {
          alert("Please enter your child's name");
          return;
        }

        // Move to step 2
        step1.classList.remove("active");
        step2.classList.add("active");
      });
    }

    if (prevStepBtn) {
      prevStepBtn.addEventListener("click", () => {
        step2.classList.remove("active");
        step1.classList.add("active");
      });
    }

    // Handle ingredient selection
    ingredientItems.forEach((item) => {
      item.addEventListener("click", () => {
        const ingredient = item.dataset.ingredient;

        if (item.classList.contains("selected")) {
          // Remove ingredient
          item.classList.remove("selected");
          formData.ingredients = formData.ingredients.filter(
            (ing) => ing !== ingredient
          );
          updateSelectedIngredientsDisplay();
        } else {
          // Add ingredient
          item.classList.add("selected");
          formData.ingredients.push(ingredient);
          updateSelectedIngredientsDisplay();
        }
      });
    });

    function updateSelectedIngredientsDisplay() {
      // Clear current display
      selectedIngredientsContainer.innerHTML = "";

      // Add each selected ingredient as a pill
      formData.ingredients.forEach((ingredient) => {
        const pill = document.createElement("div");
        pill.className = "ingredient-pill";
        pill.innerHTML = `${ingredient} <span class="remove-ingredient" data-ingredient="${ingredient}">✕</span>`;
        selectedIngredientsContainer.appendChild(pill);
      });

      // Add event listeners to remove buttons
      document.querySelectorAll(".remove-ingredient").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const ingredientToRemove = e.target.dataset.ingredient;
          // Remove from data
          formData.ingredients = formData.ingredients.filter(
            (ing) => ing !== ingredientToRemove
          );
          // Deselect in grid
          document
            .querySelector(
              `.ingredient-item[data-ingredient="${ingredientToRemove}"]`
            )
            .classList.remove("selected");
          // Update display
          updateSelectedIngredientsDisplay();
        });
      });
    }

    // Handle form submission
    if (submitFormBtn) {
      submitFormBtn.addEventListener("click", async () => {
        if (formData.ingredients.length === 0) {
          alert("Please select at least one ingredient");
          return;
        }

        resultContainer.innerHTML = `<div class="loading">🔍 Sedang mencari rekomendasi...</div>`;

        const payload = {
          ...formData,
          ingredients: formData.ingredients.join(", "),
        };

        try {
          const response = await fetch("http://127.0.0.1:5000/api/recommend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          const result = await response.json();

          if (
            response.ok &&
            result.recommendations &&
            result.recommendations.length > 0
          ) {
            const menus = result.recommendations
              .map(
                (menu) => `
                <div class="menu-card" data-aos="fade-up">
                  <img src="${menu.image}" alt="${menu.name}" />
                  <p>${menu.name}</p>
                </div>
              `
              )
              .join("");

            resultContainer.innerHTML = `
              <h4>Rekomendasi Menu</h4>
              <div class="menu-grid">${menus}</div>
            `;

            // Smooth scroll to results
            resultContainer.scrollIntoView({ behavior: "smooth" });
          } else {
            resultContainer.innerHTML = `
              <div class="no-results">
                <p>Tidak ada rekomendasi ditemukan.</p>
                <p>Coba pilih bahan lain atau ubah preferensi Anda.</p>
              </div>
            `;
          }
        } catch (error) {
          console.error(error);
          resultContainer.innerHTML = `
            <div class="error-message">
              <p>Gagal memuat rekomendasi. Silakan coba lagi.</p>
            </div>
          `;
        }
      });
    }
  },
};

export default FoodInputPage;
