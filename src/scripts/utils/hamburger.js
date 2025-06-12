const HamburgerInitializer = {
  init() {
    this._initHamburgerMenu();
    console.log("Hamburger menu initialized");
  },

  _initHamburgerMenu() {
    const hamburger = document.getElementById("hamburger");
    const navbar = document.getElementById("navbar");

    let overlay = document.querySelector(".menu-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "menu-overlay";
      document.body.appendChild(overlay);
      console.log("Overlay element created");
    }

    if (hamburger && navbar) {
      console.log("Hamburger and navbar elements found");

      hamburger.addEventListener("click", (event) => {
        event.preventDefault();
        navbar.classList.toggle("active");
        overlay.classList.toggle("active");
        document.body.classList.toggle("overlay-active");
        console.log("Hamburger clicked - menu toggled");
      });

      overlay.addEventListener("click", () => {
        navbar.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("overlay-active");
        console.log("Overlay clicked - menu closed");
      });

      const navLinks = navbar.querySelectorAll("a");
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          navbar.classList.remove("active");
          overlay.classList.remove("active");
          document.body.classList.remove("overlay-active");
        });
      });
    } else {
      console.warn("Hamburger or navbar not found in DOM");
    }
  },
};

export default HamburgerInitializer;
