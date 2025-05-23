// src/pages/food-input/food-input-page.js

const FoodInputPage = {
  async render() {
    return `
      <section class="meal-planner-section">
        <div class="container">
          <h1>Dapatkan Rekomendasi Khusus</h1>
          <div class="subtitle">Isi formulir untuk menerima saran makanan yang disesuaikan untuk anak Anda</div>
          
          <div class="meal-planner-card">
            <h2>NutriKidz - Perencana Makanan</h2>
            
            <div id="step-1" class="form-step active">
              <div class="form-group">
                <label for="childName">Nama Anak</label>
                <input type="text" id="childName" name="name" placeholder="Masukkan nama anak" required />
              </div>
              
              <div class="form-group">
                <label for="childGender">Jenis Kelamin</label>
                <select id="childGender" name="gender">
                  <option value="laki-laki">Laki-laki</option>
                  <option value="perempuan">Perempuan</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="childAge">Umur Anak</label>
                <select id="childAge" name="age">
                  <option value="0">0 tahun</option>
                  <option value="1">1 tahun</option>
                  <option value="2">2 tahun</option>
                  <option value="3">3 tahun</option>
                  <option value="4">4 tahun</option>
                  <option value="5">5 tahun</option>
                  <option value="6">6 tahun</option>
                  <option value="7">7 tahun</option>
                  <option value="8">8 tahun</option>
                  <option value="9">9 tahun</option>
                  <option value="10">10 tahun</option>
                  <option value="11">11 tahun</option>
                  <option value="12">12 tahun</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="dailyBudget">Anggaran Harian (untuk 3 kali makan)</label>
                <div class="budget-input-container">
                  <span class="currency-prefix">Rp</span>
                  <input type="number" id="dailyBudget" name="dailyBudget" min="30000" max="90000" step="1000" value="45000" placeholder="Masukkan anggaran" />
                </div>
                <small class="budget-note">Anggaran akan dibagi secara otomatis untuk sarapan, makan siang, dan makan malam</small>
              </div>
              
              <div class="button-container">
                <button id="next-step" class="primary-button">Langkah Berikutnya</button>
              </div>
            </div>
            
            <div id="step-2" class="form-step">
              <div class="meal-selection-info">
                <h3>Pilih Bahan Makanan untuk Setiap Jam Makan</h3>
                <p>Semua jam makan wajib diisi dengan minimal 1 bahan makanan</p>
                <div class="budget-breakdown">
                  <span id="budget-per-meal">Anggaran per jam makan: Rp <span id="budget-amount">15,000</span></span>
                </div>
              </div>
              
              <div id="meal-tabs" class="meal-tabs">
                <button class="meal-tab-button active" data-meal="breakfast">
                  <span class="meal-time">6-9 Pagi</span>
                  <span class="meal-name">Sarapan</span>
                  <span class="required-indicator" id="breakfast-status">*</span>
                </button>
                <button class="meal-tab-button" data-meal="lunch">
                  <span class="meal-time">11-14</span>
                  <span class="meal-name">Makan Siang</span>
                  <span class="required-indicator" id="lunch-status">*</span>
                </button>
                <button class="meal-tab-button" data-meal="dinner">
                  <span class="meal-time">17-20</span>
                  <span class="meal-name">Makan Malam</span>
                  <span class="required-indicator" id="dinner-status">*</span>
                </button>
              </div>
              
              <div id="meal-tab-content" class="meal-tab-content">
                <div id="breakfast-content" class="meal-content active">
                  <h3>Pengaturan Sarapan (6:00 - 9:00)</h3>
                  
                  <div class="form-group">
                    <label for="breakfastTaste">Preferensi Rasa</label>
                    <select id="breakfastTaste" name="breakfastTaste">
                      <option value="sweet">Manis</option>
                      <option value="savory">Gurih</option>
                      <option value="neutral">Netral</option>
                      <option value="sour">Asam</option>
                    </select>
                  </div>
                  
                  <h4>Pilih Bahan Sarapan <span class="required-text">(Wajib pilih minimal 1)</span></h4>
                  <div class="ingredients-grid breakfast-ingredients">
                    <div class="ingredient-item" data-meal="breakfast" data-ingredient="eggs">
                      <div class="ingredient-icon">🥚</div>
                      <div class="ingredient-name">Telur</div>
                    </div>
                    <div class="ingredient-item" data-meal="breakfast" data-ingredient="bread">
                      <div class="ingredient-icon">🍞</div>
                      <div class="ingredient-name">Roti</div>
                    </div>
                    <div class="ingredient-item" data-meal="breakfast" data-ingredient="oats">
                      <div class="ingredient-icon">🥣</div>
                      <div class="ingredient-name">Oatmeal</div>
                    </div>
                    <div class="ingredient-item" data-meal="breakfast" data-ingredient="banana">
                      <div class="ingredient-icon">🍌</div>
                      <div class="ingredient-name">Pisang</div>
                    </div>
                    <div class="ingredient-item" data-meal="breakfast" data-ingredient="apple">
                      <div class="ingredient-icon">🍎</div>
                      <div class="ingredient-name">Apel</div>
                    </div>
                    <div class="ingredient-item" data-meal="breakfast" data-ingredient="orange">
                      <div class="ingredient-icon">🍊</div>
                      <div class="ingredient-name">Jeruk</div>
                    </div>
                    <div class="ingredient-item" data-meal="breakfast" data-ingredient="strawberry">
                      <div class="ingredient-icon">🍓</div>
                      <div class="ingredient-name">Stroberi</div>
                    </div>
                    <div class="ingredient-item" data-meal="breakfast" data-ingredient="rice">
                      <div class="ingredient-icon">🍚</div>
                      <div class="ingredient-name">Nasi</div>
                    </div>
                    <div class="ingredient-item" data-meal="breakfast" data-ingredient="milk">
                      <div class="ingredient-icon">🥛</div>
                      <div class="ingredient-name">Susu</div>
                    </div>
                    <div class="ingredient-item" data-meal="breakfast" data-ingredient="cereal">
                      <div class="ingredient-icon">🥄</div>
                      <div class="ingredient-name">Sereal</div>
                    </div>
                  </div>
                  
                  <div class="selected-ingredients-container">
                    <h4>Bahan Sarapan yang Dipilih:</h4>
                    <div id="selected-breakfast-ingredients" class="selected-items"></div>
                  </div>
                </div>
                
                <div id="lunch-content" class="meal-content">
                  <h3>Pengaturan Makan Siang (11:00 - 14:00)</h3>
                  
                  <div class="form-group">
                    <label for="lunchTaste">Preferensi Rasa</label>
                    <select id="lunchTaste" name="lunchTaste">
                      <option value="sweet">Manis</option>
                      <option value="savory">Gurih</option>
                      <option value="neutral" selected>Netral</option>
                      <option value="sour">Asam</option>
                    </select>
                  </div>
                  
                  <h4>Pilih Bahan Makan Siang <span class="required-text">(Wajib pilih minimal 1)</span></h4>
                  <div class="ingredients-grid lunch-ingredients">
                    <div class="ingredient-item" data-meal="lunch" data-ingredient="chicken">
                      <div class="ingredient-icon">🍗</div>
                      <div class="ingredient-name">Ayam</div>
                    </div>
                    <div class="ingredient-item" data-meal="lunch" data-ingredient="beef">
                      <div class="ingredient-icon">🥩</div>
                      <div class="ingredient-name">Daging Sapi</div>
                    </div>
                    <div class="ingredient-item" data-meal="lunch" data-ingredient="fish">
                      <div class="ingredient-icon">🐟</div>
                      <div class="ingredient-name">Ikan</div>
                    </div>
                    <div class="ingredient-item" data-meal="lunch" data-ingredient="tofu">
                      <div class="ingredient-icon">🟡</div>
                      <div class="ingredient-name">Tahu</div>
                    </div>
                    <div class="ingredient-item" data-meal="lunch" data-ingredient="tempeh">
                      <div class="ingredient-icon">🟤</div>
                      <div class="ingredient-name">Tempe</div>
                    </div>
                    <div class="ingredient-item" data-meal="lunch" data-ingredient="carrot">
                      <div class="ingredient-icon">🥕</div>
                      <div class="ingredient-name">Wortel</div>
                    </div>
                    <div class="ingredient-item" data-meal="lunch" data-ingredient="broccoli">
                      <div class="ingredient-icon">🥦</div>
                      <div class="ingredient-name">Brokoli</div>
                    </div>
                    <div class="ingredient-item" data-meal="lunch" data-ingredient="potato">
                      <div class="ingredient-icon">🥔</div>
                      <div class="ingredient-name">Kentang</div>
                    </div>
                    <div class="ingredient-item" data-meal="lunch" data-ingredient="rice">
                      <div class="ingredient-icon">🍚</div>
                      <div class="ingredient-name">Nasi</div>
                    </div>
                    <div class="ingredient-item" data-meal="lunch" data-ingredient="noodles">
                      <div class="ingredient-icon">🍜</div>
                      <div class="ingredient-name">Mie</div>
                    </div>
                  </div>
                  
                  <div class="selected-ingredients-container">
                    <h4>Bahan Makan Siang yang Dipilih:</h4>
                    <div id="selected-lunch-ingredients" class="selected-items"></div>
                  </div>
                </div>
                
                <div id="dinner-content" class="meal-content">
                  <h3>Pengaturan Makan Malam (17:00 - 20:00)</h3>
                  
                  <div class="form-group">
                    <label for="dinnerTaste">Preferensi Rasa</label>
                    <select id="dinnerTaste" name="dinnerTaste">
                      <option value="sweet">Manis</option>
                      <option value="savory" selected>Gurih</option>
                      <option value="neutral">Netral</option>
                      <option value="sour">Asam</option>
                    </select>
                  </div>
                  
                  <h4>Pilih Bahan Makan Malam <span class="required-text">(Wajib pilih minimal 1)</span></h4>
                  <div class="ingredients-grid dinner-ingredients">
                    <div class="ingredient-item" data-meal="dinner" data-ingredient="chicken">
                      <div class="ingredient-icon">🍗</div>
                      <div class="ingredient-name">Ayam</div>
                    </div>
                    <div class="ingredient-item" data-meal="dinner" data-ingredient="beef">
                      <div class="ingredient-icon">🥩</div>
                      <div class="ingredient-name">Daging Sapi</div>
                    </div>
                    <div class="ingredient-item" data-meal="dinner" data-ingredient="fish">
                      <div class="ingredient-icon">🐟</div>
                      <div class="ingredient-name">Ikan</div>
                    </div>
                    <div class="ingredient-item" data-meal="dinner" data-ingredient="egg">
                      <div class="ingredient-icon">🥚</div>
                      <div class="ingredient-name">Telur</div>
                    </div>
                    <div class="ingredient-item" data-meal="dinner" data-ingredient="spinach">
                      <div class="ingredient-icon">🥬</div>
                      <div class="ingredient-name">Bayam</div>
                    </div>
                    <div class="ingredient-item" data-meal="dinner" data-ingredient="broccoli">
                      <div class="ingredient-icon">🥦</div>
                      <div class="ingredient-name">Brokoli</div>
                    </div>
                    <div class="ingredient-item" data-meal="dinner" data-ingredient="peas">
                      <div class="ingredient-icon">🟢</div>
                      <div class="ingredient-name">Kacang Polong</div>
                    </div>
                    <div class="ingredient-item" data-meal="dinner" data-ingredient="pasta">
                      <div class="ingredient-icon">🍝</div>
                      <div class="ingredient-name">Pasta</div>
                    </div>
                    <div class="ingredient-item" data-meal="dinner" data-ingredient="quinoa">
                      <div class="ingredient-icon">🌾</div>
                      <div class="ingredient-name">Quinoa</div>
                    </div>
                    <div class="ingredient-item" data-meal="dinner" data-ingredient="sweet-potato">
                      <div class="ingredient-icon">🍠</div>
                      <div class="ingredient-name">Ubi</div>
                    </div>
                  </div>
                  
                  <div class="selected-ingredients-container">
                    <h4>Bahan Makan Malam yang Dipilih:</h4>
                    <div id="selected-dinner-ingredients" class="selected-items"></div>
                  </div>
                </div>
              </div>
              
              <div class="validation-summary" id="validation-summary">
                <h4>Status Kelengkapan:</h4>
                <div class="meal-status-list">
                  <div class="meal-status" id="breakfast-validation">
                    <span class="meal-label">Sarapan:</span>
                    <span class="status-indicator incomplete">Belum lengkap</span>
                  </div>
                  <div class="meal-status" id="lunch-validation">
                    <span class="meal-label">Makan Siang:</span>
                    <span class="status-indicator incomplete">Belum lengkap</span>
                  </div>
                  <div class="meal-status" id="dinner-validation">
                    <span class="meal-label">Makan Malam:</span>
                    <span class="status-indicator incomplete">Belum lengkap</span>
                  </div>
                </div>
              </div>
              
              <div class="button-container">
                <button id="previous-step" class="secondary-button">Sebelumnya</button>
                <button id="submit-form" class="primary-button" disabled>Dapatkan Rekomendasi</button>
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
    const resultContainer = document.getElementById("recommendation-result");
    const budgetAmountSpan = document.getElementById("budget-amount");

    // Budget input element
    const dailyBudget = document.getElementById("dailyBudget");

    // Meal tab elements
    const mealTabs = document.querySelectorAll(".meal-tab-button");
    const mealContents = document.querySelectorAll(".meal-content");

    // Form data storage - All meals are required
    const formData = {
      name: "",
      gender: "laki-laki",
      age: "",
      dailyBudget: "45000",
      meals: {
        breakfast: {
          taste: "sweet",
          ingredients: [],
        },
        lunch: {
          taste: "neutral",
          ingredients: [],
        },
        dinner: {
          taste: "savory",
          ingredients: [],
        },
      },
    };

    // Update budget display when input changes
    if (dailyBudget) {
      dailyBudget.addEventListener("input", () => {
        formData.dailyBudget = dailyBudget.value;
        updateBudgetDisplay();
      });
    }

    function updateBudgetDisplay() {
      const totalBudget = parseInt(formData.dailyBudget) || 45000;
      const perMealBudget = Math.floor(totalBudget / 3);
      budgetAmountSpan.textContent = perMealBudget.toLocaleString("id-ID");
    }

    // Initialize budget display
    updateBudgetDisplay();

    // Handle navigation between steps
    if (nextStepBtn) {
      nextStepBtn.addEventListener("click", () => {
        // Get step 1 data
        formData.name = document.getElementById("childName").value;
        formData.gender = document.getElementById("childGender").value;
        formData.age = document.getElementById("childAge").value;

        // Validate step 1
        if (!formData.name.trim()) {
          alert("Mohon masukkan nama anak Anda");
          return;
        }

        // Validate budget input
        const budgetValue = parseInt(dailyBudget.value);
        if (isNaN(budgetValue) || budgetValue < 30000 || budgetValue > 90000) {
          alert("Mohon masukkan anggaran antara Rp 30.000 hingga Rp 90.000");
          return;
        }

        // Move to step 2
        step1.classList.remove("active");
        step2.classList.add("active");

        // Update validation status
        updateValidationStatus();
      });
    }

    if (prevStepBtn) {
      prevStepBtn.addEventListener("click", () => {
        step2.classList.remove("active");
        step1.classList.add("active");
      });
    }

    // Tab navigation
    mealTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const mealType = tab.dataset.meal;
        activateTab(mealType);
      });
    });

    function activateTab(mealType) {
      // Deactivate all tabs and contents
      mealTabs.forEach((t) => t.classList.remove("active"));
      mealContents.forEach((c) => c.classList.remove("active"));

      // Activate selected tab and content
      document
        .querySelector(`.meal-tab-button[data-meal="${mealType}"]`)
        ?.classList.add("active");
      document.getElementById(`${mealType}-content`)?.classList.add("active");
    }

    // Handle ingredient selection for each meal type
    const allIngredientItems = document.querySelectorAll(".ingredient-item");
    allIngredientItems.forEach((item) => {
      item.addEventListener("click", () => {
        const mealType = item.dataset.meal;
        const ingredient = item.dataset.ingredient;

        if (item.classList.contains("selected")) {
          // Remove ingredient
          item.classList.remove("selected");
          formData.meals[mealType].ingredients = formData.meals[
            mealType
          ].ingredients.filter((ing) => ing !== ingredient);
        } else {
          // Add ingredient
          item.classList.add("selected");
          formData.meals[mealType].ingredients.push(ingredient);
        }

        updateSelectedIngredientsDisplay(mealType);
        updateValidationStatus();
        updateTabStatus(mealType);
      });
    });

    // Setup taste preference change handlers
    document
      .getElementById("breakfastTaste")
      .addEventListener("change", (e) => {
        formData.meals.breakfast.taste = e.target.value;
      });

    document.getElementById("lunchTaste").addEventListener("change", (e) => {
      formData.meals.lunch.taste = e.target.value;
    });

    document.getElementById("dinnerTaste").addEventListener("change", (e) => {
      formData.meals.dinner.taste = e.target.value;
    });

    function updateSelectedIngredientsDisplay(mealType) {
      // Get the container for the specific meal
      const container = document.getElementById(
        `selected-${mealType}-ingredients`
      );
      if (!container) return;

      // Clear current display
      container.innerHTML = "";

      // Add each selected ingredient as a pill
      formData.meals[mealType].ingredients.forEach((ingredient) => {
        const pill = document.createElement("div");
        pill.className = "ingredient-pill";
        pill.innerHTML = `${ingredient} <span class="remove-ingredient" data-meal="${mealType}" data-ingredient="${ingredient}">✕</span>`;
        container.appendChild(pill);
      });

      // Add event listeners to remove buttons
      document
        .querySelectorAll(`.remove-ingredient[data-meal="${mealType}"]`)
        .forEach((btn) => {
          btn.addEventListener("click", (e) => {
            const ingredientToRemove = e.target.dataset.ingredient;
            const mealTypeToUpdate = e.target.dataset.meal;

            // Remove from data
            formData.meals[mealTypeToUpdate].ingredients = formData.meals[
              mealTypeToUpdate
            ].ingredients.filter((ing) => ing !== ingredientToRemove);

            // Deselect in grid
            document
              .querySelector(
                `.ingredient-item[data-meal="${mealTypeToUpdate}"][data-ingredient="${ingredientToRemove}"]`
              )
              .classList.remove("selected");

            // Update display
            updateSelectedIngredientsDisplay(mealTypeToUpdate);
            updateValidationStatus();
            updateTabStatus(mealTypeToUpdate);
          });
        });
    }

    function updateTabStatus(mealType) {
      const tabButton = document.querySelector(`.meal-tab-button[data-meal="${mealType}"]`);
      const statusIndicator = document.getElementById(`${mealType}-status`);
      
      if (formData.meals[mealType].ingredients.length > 0) {
        tabButton.classList.add("completed");
        statusIndicator.textContent = "✓";
        statusIndicator.style.color = "#4CAF50";
      } else {
        tabButton.classList.remove("completed");
        statusIndicator.textContent = "*";
        statusIndicator.style.color = "#f44336";
      }
    }

    function updateValidationStatus() {
      const meals = ["breakfast", "lunch", "dinner"];
      let allComplete = true;

      meals.forEach((mealType) => {
        const validationElement = document.getElementById(`${mealType}-validation`);
        const statusElement = validationElement.querySelector(".status-indicator");
        
        if (formData.meals[mealType].ingredients.length > 0) {
          statusElement.textContent = "Lengkap ✓";
          statusElement.className = "status-indicator complete";
        } else {
          statusElement.textContent = "Belum lengkap";
          statusElement.className = "status-indicator incomplete";
          allComplete = false;
        }
      });

      // Enable/disable submit button
      submitFormBtn.disabled = !allComplete;
      
      if (allComplete) {
        submitFormBtn.textContent = "Dapatkan Rekomendasi";
        submitFormBtn.classList.remove("disabled");
      } else {
        submitFormBtn.textContent = "Lengkapi Semua Jam Makan";
        submitFormBtn.classList.add("disabled");
      }
    }

    // Handle form submission
    if (submitFormBtn) {
      submitFormBtn.addEventListener("click", async () => {
        // Final validation
        const allMealsComplete = Object.values(formData.meals).every(
          meal => meal.ingredients.length > 0
        );

        if (!allMealsComplete) {
          alert("Mohon lengkapi bahan makanan untuk semua jam makan (sarapan, makan siang, dan makan malam)");
          return;
        }

        resultContainer.innerHTML = `<div class="loading">🔍 Sedang mencari rekomendasi untuk semua jam makan...</div>`;

        // Calculate per-meal budget (divided equally among 3 meals)
        const perMealBudget = Math.floor(parseInt(formData.dailyBudget) / 3);

        // Prepare API requests for all meal types
        const mealTypes = ["breakfast", "lunch", "dinner"];
        const requests = mealTypes.map(async (mealType) => {
          let mealName;
          switch (mealType) {
            case "breakfast":
              mealName = "sarapan";
              break;
            case "lunch":
              mealName = "makan siang";
              break;
            case "dinner":
              mealName = "makan malam";
              break;
            default:
              mealName = mealType;
          }

          let tasteName;
          switch (formData.meals[mealType].taste) {
            case "sweet":
              tasteName = "manis";
              break;
            case "savory":
              tasteName = "gurih";
              break;
            case "neutral":
              tasteName = "netral";
              break;
            case "sour":
              tasteName = "asam";
              break;
            default:
              tasteName = formData.meals[mealType].taste;
          }

          const payload = {
            name: formData.name,
            gender: formData.gender,
            age: formData.age,
            "meal-time": mealName,
            budget: perMealBudget.toString(),
            taste: tasteName,
            ingredients: formData.meals[mealType].ingredients.join(", "),
          };

          try {
            const response = await fetch(
              "http://127.0.0.1:5000/api/recommend",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              }
            );

            return {
              mealType: mealType,
              result: await response.json(),
              success: response.ok,
            };
          } catch (error) {
            return {
              mealType: mealType,
              error: error,
              success: false,
            };
          }
        });

        // Wait for all requests to complete
        try {
          const results = await Promise.all(requests);

          // Build result HTML for all meals
          let resultHTML = "";
          let hasAnyResults = false;

          // Process results in the order: breakfast, lunch, dinner
          const orderedMealTypes = ["breakfast", "lunch", "dinner"];
          
          for (const mealType of orderedMealTypes) {
            const result = results.find(r => r.mealType === mealType);
            
            if (
              result.success &&
              result.result.recommendations &&
              result.result.recommendations.length > 0
            ) {
              hasAnyResults = true;

              const menus = result.result.recommendations
                .map(
                  (menu) => `
                  <div class="menu-card" data-aos="fade-up">
                    <img src="${menu.image}" alt="${menu.name}" />
                    <div class="menu-info">
                      <p class="menu-name">${menu.name}</p>
                    </div>
                  </div>
                `
                )
                .join("");

              let mealTitle, mealTime;
              switch (result.mealType) {
                case "breakfast":
                  mealTitle = "Sarapan";
                  mealTime = "6:00 - 9:00";
                  break;
                case "lunch":
                  mealTitle = "Makan Siang";
                  mealTime = "11:00 - 14:00";
                  break;
                case "dinner":
                  mealTitle = "Makan Malam";
                  mealTime = "17:00 - 20:00";
                  break;
                default:
                  mealTitle = result.mealType;
                  mealTime = "";
              }

              const selectedIngredients = formData.meals[mealType].ingredients.join(", ");

              resultHTML += `
                <div class="meal-recommendation">
                  <div class="meal-header">
                    <h4>${mealTitle}</h4>
                    <div class="meal-details">
                      <span class="meal-time-badge">${mealTime}</span>
                      <span class="meal-budget">Anggaran: Rp ${perMealBudget.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                  <div class="meal-ingredients">
                    <strong>Bahan yang dipilih:</strong> ${selectedIngredients}
                  </div>
                  <div class="menu-grid">${menus}</div>
                </div>
              `;
            } else {
              let mealTitle, mealTime;
              switch (result.mealType) {
                case "breakfast":
                  mealTitle = "Sarapan";
                  mealTime = "6:00 - 9:00";
                  break;
                case "lunch":
                  mealTitle = "Makan Siang";
                  mealTime = "11:00 - 14:00";
                  break;
                case "dinner":
                  mealTitle = "Makan Malam";
                  mealTime = "17:00 - 20:00";
                  break;
                default:
                  mealTitle = result.mealType;
                  mealTime = "";
              }

              const selectedIngredients = formData.meals[mealType].ingredients.join(", ");

              resultHTML += `
                <div class="meal-recommendation">
                  <div class="meal-header">
                    <h4>${mealTitle}</h4>
                    <div class="meal-details">
                      <span class="meal-time-badge">${mealTime}</span>
                      <span class="meal-budget">Anggaran: Rp ${perMealBudget.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                  <div class="meal-ingredients">
                    <strong>Bahan yang dipilih:</strong> ${selectedIngredients}
                  </div>
                  <div class="no-results">
                    <p>Tidak ada rekomendasi yang ditemukan untuk ${mealTitle}.</p>
                    <p>Coba pilih bahan yang berbeda atau ubah preferensi Anda.</p>
                  </div>
                </div>
              `;
            }
          }

          if (hasAnyResults) {
            resultContainer.innerHTML = `
              <div class="recommendation-header">
                <h3>🍽️ Rencana Makanan Harian untuk ${formData.name}</h3>
                <div class="daily-summary">
                  <div class="budget-summary">
                    <span class="total-budget">Total Anggaran: Rp ${parseInt(formData.dailyBudget).toLocaleString("id-ID")}</span>
                    <span class="per-meal-budget">Per Jam Makan: Rp ${perMealBudget.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </div>
              <div class="meals-timeline">
                ${resultHTML}
              </div>
              <div class="recommendation-footer">
                <p class="footer-note">💡 Rekomendasi ini disesuaikan dengan usia ${formData.age} tahun dan anggaran harian Anda</p>
              </div>
            `;
          } else {
            resultContainer.innerHTML = `
              <div class="no-results-container">
                <h3>Tidak Ada Rekomendasi Ditemukan</h3>
                <div class="no-results">
                  <p>Maaf, tidak ada rekomendasi yang sesuai dengan kriteria Anda untuk semua jam makan.</p>
                  <p>Silakan coba:</p>
                  <ul>
                    <li>Pilih bahan makanan yang berbeda</li>
                    <li>Ubah preferensi rasa</li>
                    <li>Sesuaikan anggaran harian</li>
                  </ul>
                </div>
              </div>
            `;
          }

          // Smooth scroll to results
          resultContainer.scrollIntoView({ behavior: "smooth" });
        } catch (error) {
          console.error("Error fetching recommendations:", error);
          resultContainer.innerHTML = `
            <div class="error-message">
              <h3>Terjadi Kesalahan</h3>
              <p>Gagal memuat rekomendasi. Silakan periksa koneksi internet Anda dan coba lagi.</p>
              <button onclick="location.reload()" class="retry-button">Coba Lagi</button>
            </div>
          `;
        }
      });
    }

    // Initialize validation status on page load
    updateValidationStatus();
  },
};

export default FoodInputPage;