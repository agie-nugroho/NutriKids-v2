// src/pages/home/home-page.js
import Swal from "sweetalert2";
import anakImage from "../../../public/images/anak.png";

const HomePage = {
  async render() {
    return `
      <section class="hero-section">
        <div class="hero-content">
          <h1>Healthy Meals Tailored for Your Child</h1>
          <p>NutriKids uses artificial intelligence to create personalized meal plans for children from 0 months to 12 years, ensuring optimal nutrition based on their age, preferences, and your budget.</p>
          <button class="cta-button" id="get-started-btn">Get Started</button>
          <a href="#/features" class="cta-button secondary">Learn More</a>
        </div>
        <div class="hero-image">
         <img src="${anakImage}" alt="Happy children eating healthy food" />
        </div>
      </section>
      <section class="features-section">
        <h2>Amazing Features</h2>
        <p>Discover how NutriKids can help your child grow healthy and strong with our advanced features.</p>
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
    const getStartBtn = document.getElementById("get-started-btn");
    getStartBtn.addEventListener("click", () => {
      const token = localStorage.getItem("authToken")

      if (token) {
        window.location.href = "#/food-input";
      }else {
        Swal.fire({
          icon: 'info',
          title: 'Login Required',
          text: 'Please login to access the food input page.',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then(() => {
          window.location.href = "#/login";
        });
      }
    })
  },
};

export default HomePage;
