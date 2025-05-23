// src/pages/home/home-page.js
import anakImage from "../../../public/images/anak.png";

const HomePage = {
  async render() {
    return `
      <section class="hero-section">
        <div class="hero-content">
          <h1>Healthy Meals Tailored for Your Child</h1>
          <p>NutriKidz uses artificial intelligence to create personalized meal plans for children from 0 months to 12 years, ensuring optimal nutrition based on their age, preferences, and your budget.</p>
          <a href="#/food-input" class="cta-button">Get Started</a>
          <a href="#/features" class="cta-button secondary">Learn More</a>
        </div>
        <div class="hero-image">
         <img src="${anakImage}" alt="Happy children eating healthy food" />
        </div>
      </section>
      <section class="features-section">
        <h2>Amazing Features</h2>
        <p>Discover how NutriKidz can help your child grow healthy and strong with our advanced features.</p>
        <div class="feature-cards">
          <div class="feature-card">
            <i class="fas fa-brain icon"></i>
            <h3>AI-Powered Recommendations</h3>
            <p>Personalized meal suggestions based on your child's age, preferences, and budget.</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-carrot icon"></i>
            <h3>Nutritional Balance</h3>
            <p>Ensure your child gets the right mix of nutrients for optimal growth.</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-wallet icon"></i>
            <h3>Budget-Friendly Options</h3>
            <p>Dapatkan menu lezat dengan anggaran harian yang sesuai.</p>
          </div>
        </div>
      </section>
    `;
  },
  afterRender() {
    // Tidak perlu logika JS tambahan di sini
  },
};

export default HomePage;
