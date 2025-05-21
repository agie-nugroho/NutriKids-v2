// src/scripts/app.js

import Routes from "./routes/routes";
import UrlParser from "./routes/url-parser";

const App = {
  async init() {
    // Initialize the app
    await this._initialRender();

    // Add event listener for route changes
    window.addEventListener("hashchange", () => {
      this._initialRender();
    });
  },

  async _initialRender() {
    const url = UrlParser.parseActiveUrl();
    const page = Routes[url] || Routes["/"];
    const content = document.querySelector("#main-content");

    if (!content) return;

    content.innerHTML = await page.render();

    // Execute any JavaScript after rendering the page
    if (page.afterRender) {
      await page.afterRender();
    }

    // Initialize UI components after every page render
    this._initScrollEvents();
    this._initHamburgerMenu();

    // Re-initialize AOS after page render for animations
    if (window.AOS) {
      window.AOS.refresh();
    }
  },

  _initScrollEvents() {
    const header = document.querySelector("header");
    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      });
    }
  },

  _initHamburgerMenu() {
    const hamburger = document.getElementById("hamburger");
    const navbar = document.getElementById("navbar");

    // Create overlay element for mobile menu if it doesn't exist
    let overlay = document.querySelector(".menu-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "menu-overlay";
      document.body.appendChild(overlay);
    }

    if (hamburger && navbar) {
      // Clean up old event listeners to prevent duplicates
      const newHamburger = hamburger.cloneNode(true);
      hamburger.parentNode.replaceChild(newHamburger, hamburger);

      // Toggle menu when hamburger is clicked
      newHamburger.addEventListener("click", (event) => {
        event.preventDefault();
        navbar.classList.toggle("active");
        overlay.classList.toggle("active");
        document.body.classList.toggle("overlay-active");
        console.log("Hamburger clicked, navbar toggled");
      });

      // Close menu when overlay is clicked
      overlay.addEventListener("click", () => {
        navbar.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("overlay-active");
      });

      // Close menu when a nav item is clicked
      const navLinks = navbar.querySelectorAll("a");
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          navbar.classList.remove("active");
          overlay.classList.remove("active");
          document.body.classList.remove("overlay-active");
        });
      });
    } else {
      console.warn("Hamburger menu or navbar not found in the DOM");
    }
  },
};

export default App;
