// src/pages/auth/login-page.js

import Swal from "sweetalert2";
import ApiUser from "../../../api";

const LoginPage = {
  async render() {
    return `
        <section class="auth-section">
          <div class="auth-container">
            <div class="auth-card">
              <div class="auth-header">
                <h2>Welcome Back!</h2>
                <p>Sign in to your NutriKidz account</p>
              </div>
              
              <form class="auth-form" id="loginForm">
                <div class="form-group">
                  <label for="email">Email Address</label>
                  <input type="email" id="email" name="email" required placeholder="Enter your email">
                  <span class="error-message" id="emailError"></span>
                </div>
                
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" id="password" name="password" required placeholder="Enter your password">
                  <span class="error-message" id="passwordError"></span>
                </div>
                
                <div class="form-options">
                  <label class="checkbox-container">
                    <input type="checkbox" id="rememberMe">
                    <span class="checkmark"></span>
                    Remember me
                  </label>
                  <a href="#/forgot-password" class="forgot-link">Forgot Password?</a>
                </div>
                
                <button type="submit" class="auth-button" id="loginButton">
                  <span class="button-text">Sign In</span>
                  <span class="loading-spinner" style="display: none;">
                    <i class="fas fa-spinner fa-spin"></i>
                  </span>
                </button>
                
                <div class="auth-divider">
                  <span>or</span>
                </div>
                
                <button type="button" class="auth-button google-button" id="googleLogin">
                  <i class="fab fa-google"></i>
                  Continue with Google
                </button>
              </form>
              
              <div class="auth-footer">
                <p>Don't have an account? <a href="#/register">Sign up here</a></p>
              </div>
            </div>
          </div>
        </section>
      `;
  },

  afterRender() {
    this.initializeEventListeners();
  },

  initializeEventListeners() {
    const loginForm = document.getElementById("loginForm");
    const loginButton = document.getElementById("loginButton");
    const googleLoginButton = document.getElementById("googleLogin");

    if (loginForm) {
      loginForm.addEventListener("submit", this.handleLogin.bind(this));
    }

    if (googleLoginButton) {
      googleLoginButton.addEventListener(
        "click",
        this.handleGoogleLogin.bind(this)
      );
    }
  },

  async handleLogin(event) {
  event.preventDefault();

  const loginButton = document.getElementById("loginButton");
  const buttonText = loginButton.querySelector(".button-text");
  const loadingSpinner = loginButton.querySelector(".loading-spinner");

  buttonText.style.display = "none";
  loadingSpinner.style.display = "inline-block";
  loginButton.disabled = true;

  Swal.fire({
    title: "Logging in...",
    text: "Please wait while we log you in",
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    }
  })

  try {
    const formData = new FormData(event.target);
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
      rememberMe: formData.get("rememberMe") === "on",
    };

    this.clearErrors();

    // VALIDASI DULU
    if (!this.validateForm(loginData)) {
      Swal.close();
      buttonText.style.display = "inline-block";
      loadingSpinner.style.display = "none";
      loginButton.disabled = false;
      return;
    }

    const response = await ApiUser.post('/login', {
      email: loginData.email,
      password: loginData.password,
      rememberMe: loginData.rememberMe
    });

    const result = response.data;

    localStorage.setItem("authToken", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "Redirecting to your dashboard...",
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 1500
    }).then(() => {
      window.location.hash = "#/dashboard";
      window.location.reload()
    })
  } catch (error) {
    Swal.close();

    let msg = "Network error. Please check your connection.";
    if (error.response && error.response.data && error.response.data.message) {
      msg = error.response.data.message;
    }

    Swal.fire({
      icon: "error",
      title: "Login failed",
      text: msg
    });
  } finally {
    buttonText.style.display = "inline-block";
    loadingSpinner.style.display = "none";
    loginButton.disabled = false;
  }
},


  handleGoogleLogin() {
    this.showMessage("Google login will be implemented soon!", "info");
  },

  validateForm(data) {
  let isValid = true;

  if (!data.email) {
    this.showError("emailError", "Email is required");
    isValid = false;
  } else if (!this.isValidEmail(data.email)) {
    this.showError("emailError", "Please enter a valid email address");
    isValid = false;
  }

  // Password validation
  if (!data.password) {
    this.showError("passwordError", "Password is required");
    isValid = false;
  } else if (data.password.length < 6) {
    this.showError("passwordError", "Password must be at least 6 characters");
    isValid = false;
  }

  return isValid;
},

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = "block";
    }
  },

  clearErrors() {
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach((element) => {
      element.textContent = "";
      element.style.display = "none";
    });
  },

  showMessage(message, type) {
    // Create toast notification
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => toast.classList.add("show"), 100);

    // Hide toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
  },
};

export default LoginPage;
