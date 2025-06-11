import { ApiBackend } from "../../../api";

const foodDetail = {
  async render() {
    return `
      <div class="food-detail">
        <div class="food-detail-header">
          <h1>🍽️ Menu Tersimpan</h1>
          <p class="subtitle">Koleksi rekomendasi makanan pilihan Anda</p>
        </div>
        <div id="food-info" class="food-container">
          <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>Memuat menu tersimpan...</p>
          </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    await this.loadUserMenus();
  },

  async loadUserMenus() {
    const container = document.getElementById("food-info");

    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const userId = userData?.id_user || userData?.id || userData?.userId;

      if (!userId) {
        this.renderEmptyState(container, "login");
        return;
      }

      const response = await ApiBackend.get(`/save-menu/${userId}`);

      if (response.status === 200) {
        const menus = response.data.data;

        if (menus.length === 0) {
          this.renderEmptyState(container, "empty");
          return;
        }

        this.renderMenus(container, menus);
        this.initializeEventListeners();
      } else {
        this.renderEmptyState(container, "error", response.status);
      }
    } catch (error) {
      console.error("❌ Error loading menus:", error);
      this.renderEmptyState(container, "error");
    }
  },

  renderEmptyState(container, type, status = null) {
    const emptyStates = {
      login: {
        icon: "🔐",
        title: "Silakan Login",
        message: "Anda perlu login untuk melihat menu tersimpan",
        action: `<button class="primary-btn" onclick="window.location.hash='#/login'">Login Sekarang</button>`,
      },
      empty: {
        icon: "📭",
        title: "Belum Ada Menu",
        message:
          "Anda belum menyimpan menu apapun. Mulai jelajahi dan simpan menu favorit Anda!",
        action: `<button class="primary-btn" onclick="window.location.hash='#/recommendation'">Cari Menu</button>`,
      },
      error: {
        icon: "⚠️",
        title: "Gagal Memuat Data",
        message: status
          ? `Terjadi kesalahan (Status: ${status})`
          : "Terjadi kesalahan saat memuat menu",
        action: `<button class="secondary-btn" onclick="location.reload()">Coba Lagi</button>`,
      },
    };

    const state = emptyStates[type];
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">${state.icon}</div>
        <h3 class="empty-title">${state.title}</h3>
        <p class="empty-message">${state.message}</p>
        <div class="empty-actions">${state.action}</div>
      </div>
    `;
  },

  renderMenus(container, menus) {
    container.innerHTML = `
      <div class="menus-stats">
        <div class="stats-card">
          <span class="stats-number">${menus.length}</span>
          <span class="stats-label">Menu Tersimpan</span>
        </div>
        <div class="stats-card">
          <span class="stats-number">${this.calculateTotalCalories(
            menus
          )}</span>
          <span class="stats-label">Total Kalori</span>
        </div>
      </div>
      <div class="menus-grid">
        ${menus.map((menu) => this.renderMenuCard(menu)).join("")}
      </div>
    `;
  },

  renderMenuCard(menu) {
    const nutritionItems = this.getNutritionItems(menu);

    return `
      <div class="menu-card" data-id="${menu.id}">
        <div class="menu-card-header">
          <h3 class="menu-title">${menu.menuName}</h3>
          <div class="menu-price">Rp ${Number(menu.price).toLocaleString(
            "id-ID"
          )}</div>
        </div>
        
        <div class="menu-ingredients">
          <span class="ingredients-label">🥗 Bahan:</span>
          <p class="ingredients-text">${menu.ingredients}</p>
        </div>

        <div class="nutrition-section">
          <div class="nutrition-header" data-menu-id="${menu.id}">
            <div class="nutrition-title">
              <span class="nutrition-icon">🍽️</span>
              <span>Informasi Nutrisi</span>
            </div>
            <button class="toggle-btn" data-menu-id="${menu.id}">
              <span class="toggle-text">Lihat Detail</span>
              <span class="toggle-arrow">▼</span>
            </button>
          </div>
          
          <div class="nutrition-content" id="nutrition-${
            menu.id
          }" style="display: none;">
            <div class="nutrition-highlights">
              <div class="highlight-item">
                <span class="highlight-value">${menu.energi}</span>
                <span class="highlight-label">Kalori</span>
              </div>
              <div class="highlight-item">
                <span class="highlight-value">${menu.protein}</span>
                <span class="highlight-label">Protein (mg)</span>
              </div>
              <div class="highlight-item">
                <span class="highlight-value">${menu.karbohidrat}</span>
                <span class="highlight-label">Karbo (mg)</span>
              </div>
            </div>
            
            <div class="nutrition-grid">
              ${nutritionItems
                .map(
                  (item) => `
                <div class="nutrition-item">
                  <span class="nutrition-name">${item.name}</span>
                  <span class="nutrition-value">${item.value} ${item.unit}</span>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </div>

        <div class="menu-actions">
          <button class="delete-btn" data-id="${menu.id}">
            <span class="delete-icon">🗑️</span>
            <span>Hapus Menu</span>
          </button>
        </div>
      </div>
    `;
  },

  getNutritionItems(menu) {
    return [
      { name: "Serat", value: menu.serat, unit: "mg" },
      { name: "Kalsium", value: menu.kalsium, unit: "mg" },
      { name: "Fosfor", value: menu.fosfor, unit: "mg" },
      { name: "Zat Besi", value: menu.zat_besi, unit: "mg" },
      { name: "Natrium", value: menu.natrium, unit: "mg" },
      { name: "Kalium", value: menu.kalium, unit: "mg" },
      { name: "Tembaga", value: menu.tembaga, unit: "mg" },
      { name: "Seng", value: menu.seng, unit: "mg" },
      { name: "Vitamin C", value: menu.vit_c, unit: "mg" },
      { name: "Air", value: menu.air, unit: "ml" },
      { name: "Lemak Total", value: menu.lemak_total, unit: "mg" },
    ];
  },

  calculateTotalCalories(menus) {
    return menus
      .reduce((total, menu) => total + parseInt(menu.energi || 0), 0)
      .toLocaleString("id-ID");
  },

  initializeEventListeners() {
    // Nutrition toggle functionality - Fixed to use event delegation
    document.addEventListener("click", (e) => {
      // Handle nutrition toggle
      if (e.target.closest(".toggle-btn")) {
        const button = e.target.closest(".toggle-btn");
        const menuId = button.dataset.menuId;
        this.toggleNutrition(menuId);
      }

      // Handle delete functionality
      if (e.target.closest(".delete-btn")) {
        const button = e.target.closest(".delete-btn");
        const menuId = button.dataset.id;
        this.deleteMenu(menuId, button);
      }
    });
  },

  toggleNutrition(menuId) {
    const content = document.getElementById(`nutrition-${menuId}`);
    const button = document.querySelector(
      `.toggle-btn[data-menu-id="${menuId}"]`
    );
    const toggleText = button.querySelector(".toggle-text");
    const toggleArrow = button.querySelector(".toggle-arrow");

    if (!content || !button) return;

    const isHidden = content.style.display === "none";

    if (isHidden) {
      // Show content
      content.style.display = "block";
      toggleText.textContent = "Sembunyikan";
      toggleArrow.style.transform = "rotate(180deg)";
      button.classList.add("expanded");
    } else {
      // Hide content
      content.style.display = "none";
      toggleText.textContent = "Lihat Detail";
      toggleArrow.style.transform = "rotate(0deg)";
      button.classList.remove("expanded");
    }
  },

  async deleteMenu(menuId, buttonElement) {
    const confirmDelete = confirm(
      "🗑️ Yakin ingin menghapus menu ini dari koleksi Anda?"
    );
    if (!confirmDelete) return;

    const menuCard = buttonElement.closest(".menu-card");
    const originalText = buttonElement.innerHTML;

    // Show loading state
    buttonElement.innerHTML = `
      <div class="loading-spinner small"></div>
      <span>Menghapus...</span>
    `;
    buttonElement.disabled = true;

    try {
      const response = await ApiBackend.delete(`/save-menu/${menuId}`);

      if (response.status === 200) {
        // Success animation
        menuCard.classList.add("removing");

        setTimeout(() => {
          menuCard.remove();
          this.updateStats();
          this.showNotification("✅ Menu berhasil dihapus!", "success");
        }, 500);
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      console.error("❌ Delete error:", error);

      // Restore button state
      buttonElement.innerHTML = originalText;
      buttonElement.disabled = false;

      this.showNotification(
        "❌ Gagal menghapus menu. Silakan coba lagi.",
        "error"
      );
    }
  },

  updateStats() {
    const remainingCards = document.querySelectorAll(
      ".menu-card:not(.removing)"
    );
    const statsCards = document.querySelectorAll(".stats-number");

    if (statsCards.length >= 1) {
      statsCards[0].textContent = remainingCards.length;
    }

    // If no menus left, show empty state
    if (remainingCards.length === 0) {
      setTimeout(() => {
        const container = document.getElementById("food-info");
        this.renderEmptyState(container, "empty");
      }, 600);
    }
  },

  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span class="notification-message">${message}</span>
      <button class="notification-close">×</button>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add("show"), 100);

    // Auto hide after 4 seconds
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 4000);

    // Close button functionality
    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 300);
      });
  },
};

export default foodDetail;
