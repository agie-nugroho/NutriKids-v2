// src/pages/auth/register-page.js

import Swal from "sweetalert2";
import ApiUser from "../../../api";

const RegisterPage = {
  async render() {
    return `
       <section class="auth-section">
        <div class="auth-container">
          <div class="auth-card">
            <div class="auth-header">
              <h2>Join NutriKidz</h2>
              <p>Create your account to start your child's nutrition journey</p>
            </div>
              
              <form class="auth-form" id="registerForm">
                <div class="form-row">
                  <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" required placeholder="Enter first name">
                    <span class="error-message" id="firstNameError"></span>
                  </div>
                  
                  <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" required placeholder="Enter last name">
                    <span class="error-message" id="lastNameError"></span>
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="email">Email Address</label>
                  <input type="email" id="email" name="email" required placeholder="Enter your email">
                  <span class="error-message" id="emailError"></span>
                </div>
                
                <div class="form-group">
                  <label for="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" placeholder="Enter your phone number">
                  <span class="error-message" id="phoneError"></span>
                </div>
                
                <div class="form-group">
                  <label for="password">Password</label>
                  <input type="password" id="password" name="password" required placeholder="Create a password">
                  <span class="error-message" id="passwordError"></span>
                  <div class="password-strength" id="passwordStrength"></div>
                </div>
                
                <div class="form-group">
                  <label for="confirmPassword">Confirm Password</label>
                  <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="Confirm your password">
                  <span class="error-message" id="confirmPasswordError"></span>
                </div>
                
                <div class="form-group">
                  <label for="childAge">Child's Age (Optional)</label>
                  <select id="childAge" name="childAge">
                    <option value="">Select age range</option>
                    <option value="0-6months">0-6 months</option>
                    <option value="6-12months">6-12 months</option>
                    <option value="1-2years">1-2 years</option>
                    <option value="2-5years">2-5 years</option>
                    <option value="5-12years">5-12 years</option>
                  </select>
                </div>
                
                <div class="form-options">
                  <label class="checkbox-container">
                    <input type="checkbox" id="agreeTerms" name="agreeTerms" required>
                    <span class="checkmark"></span>
                    I agree to the <a href="#/terms" target="_blank">Terms of Service</a> and <a href="#/privacy" target="_blank">Privacy Policy</a>
                  </label>
                  <span class="error-message" id="termsError"></span>
                </div>
                
                <div class="form-options">
                  <label class="checkbox-container">
                    <input type="checkbox" id="subscribeNewsletter" name="subscribeNewsLetter">
                    <span class="checkmark"></span>
                    Subscribe to our newsletter for nutrition tips and updates
                  </label>
                </div>
                
                <button type="submit" class="auth-button" id="registerButton">
                  <span class="button-text">Create Account</span>
                  <span class="loading-spinner" style="display: none;">
                    <i class="fas fa-spinner fa-spin"></i>
                  </span>
                </button>
                
                <div class="auth-divider">
                  <span>or</span>
                </div>
                
                <button type="button" class="auth-button google-button" id="googleRegister">
                  <i class="fab fa-google"></i>
                  Sign up with Google
                </button>
              </form>
              
              <div class="auth-footer">
                <p>Already have an account? <a href="#/login">Sign in here</a></p>
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
    const registerForm = document.getElementById("registerForm");
    const passwordInput = document.getElementById("password");
    const googleRegisterButton = document.getElementById("googleRegister");

    if (registerForm) {
      registerForm.addEventListener("submit", this.handleRegister.bind(this));
    }

    if (passwordInput) {
      passwordInput.addEventListener(
        "input",
        this.checkPasswordStrength.bind(this)
      );
    }

    if (googleRegisterButton) {
      googleRegisterButton.addEventListener(
        "click",
        this.handleGoogleRegister.bind(this)
      );
    }
  },

  mapChildAgeToEnum(ageString) {
  switch (ageString) {
    case "0-6months":
      return "AGE_0_6_MONTHS";
    case "6-12months":
      return "AGE_6_12_MONTHS";
    case "1-2years":
      return "AGE_1_2_YEARS";
    case "2-5years":
      return "AGE_2_5_YEARS";
    case "5-12years":
      return "AGE_5_12_YEARS";
    default:
      return null;
  }
},

 async handleRegister(event) {
  event.preventDefault();

  const registerButton = document.getElementById("registerButton");
  const buttonText = registerButton.querySelector(".button-text");
  const loadingSpinner = registerButton.querySelector(".loading-spinner");

  buttonText.style.display = "none";
  loadingSpinner.style.display = "inline-block";
  registerButton.disabled = true;

  Swal.fire({
    title: 'Creating your account...',
    text: 'Please wait while we set up your account',
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    }
  })

  try {
    const formData = new FormData(event.target);
    const registerData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      phone: formData.get("phone"),
      childAge: formData.get("childAge"),
      agreeTerms: formData.has("agreeTerms"),
      subscribeNewsletter: formData.has("subscribeNewsletter"),
    };

    this.clearErrors();

    if (!this.validateForm(registerData)) {
      Swal.close();
      buttonText.style.display = "inline-block";
      loadingSpinner.style.display = "none";
      registerButton.disabled = false;
      return;
    }

    const mappedAge = registerData.childAge
      ? this.mapChildAgeToEnum(registerData.childAge)
      : null;

    if (registerData.childAge && !mappedAge) {
      this.showMessage("Please select a valid child age range.", "error");
      buttonText.style.display = "inline-block";
      loadingSpinner.style.display = "none";
      registerButton.disabled = false;
      return;
    }

 const response = await ApiUser.post("/register", {
  firstName: registerData.firstName,
  lastName: registerData.lastName,
  email: registerData.email,
  password: registerData.password,
  phone: registerData.phone,
  ageRange: mappedAge,
  agreeTerms: registerData.agreeTerms,
  subscribeNewsletter: registerData.subscribeNewsletter,
});

console.log("Sending register data:", registerData);
console.log("Server response:", response.data);

const result = response.data;

if (response.status === 201) {
  Swal.fire({
    icon: 'success',
    title: 'Registration Successful',
    text: 'Your account has been created successfully! Please check your email for verification.',
    showConfirmButton: false,
    allowEscapeKey: false,
    allowOutsideClick: false,
    timer: 2000
  }).then(() => {
    window.location.hash = "#/login";
    window.location.reload(); 
  })
} else {
  Swal.close();
  Swal.fire({
    icon: 'error',
    title: 'Registration Failed',
    text: result.message || "An error occurred during registration. Please try again.",
    showConfirmButton: true,
    allowEscapeKey: false,
    allowOutsideClick: false
  });
}
  } catch (error) {
    Swal.close();
    console.error("Registration error:", error);
    Swal.fire({
      icon: "error",
      title: "Registration Failed",
      text: error.response?.data?.message || "An unexpected error occurred. Please try again.",
      showConfirmButton: true,
      allowEscapeKey: false,
      allowOutsideClick: false
    });
  } finally {
    buttonText.style.display = "inline-block";
    loadingSpinner.style.display = "none";
    registerButton.disabled = false;
  }
},

  handleGoogleRegister() {
    this.showMessage("Google registration will be implemented soon!", "info");
  },

  validateForm(data) {
    let isValid = true;

    if (!data.firstName || data.firstName.trim().length < 2) {
      this.showError(
        "firstNameError",
        "First name must be at least 2 characters"
      );
      isValid = false;
    }

    // Last name validation
    if (!data.lastName || data.lastName.trim().length < 2) {
      this.showError(
        "lastNameError",
        "Last name must be at least 2 characters"
      );
      isValid = false;
    }

    // Email validation
    if (!data.email) {
      this.showError("emailError", "Email is required");
      isValid = false;
    } else if (!this.isValidEmail(data.email)) {
      this.showError("emailError", "Please enter a valid email address");
      isValid = false;
    }

    // Phone validation (optional but if provided should be valid)
    if (data.phone && !this.isValidPhone(data.phone)) {
      this.showError("phoneError", "Please enter a valid phone number");
      isValid = false;
    }

    // Password validation
    if (!data.password) {
      this.showError("passwordError", "Password is required");
      isValid = false;
    } else if (data.password.length < 8) {
      this.showError("passwordError", "Password must be at least 8 characters");
      isValid = false;
    } else if (!this.isStrongPassword(data.password)) {
      this.showError(
        "passwordError",
        "Password must contain uppercase, lowercase, number, and special character"
      );
      isValid = false;
    }

    // Confirm password validation
    if (data.password !== data.confirmPassword) {
      this.showError("confirmPasswordError", "Passwords do not match");
      isValid = false;
    }

    // Terms agreement validation
    if (!data.agreeTerms) {
      this.showError("termsError", "You must agree to the Terms of Service");
      isValid = false;
    }

    return isValid;
  },

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  },

  isStrongPassword(password) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
  },

  checkPasswordStrength() {
    const password = document.getElementById("password").value;
    const strengthIndicator = document.getElementById("passwordStrength");

    if (!password) {
      strengthIndicator.innerHTML = "";
      return;
    }

    let strength = 0;
    let requirements = [];

    if (password.length >= 8) strength++;
    else requirements.push("8+ characters");

    if (/[A-Z]/.test(password)) strength++;
    else requirements.push("uppercase letter");

    if (/[a-z]/.test(password)) strength++;
    else requirements.push("lowercase letter");

    if (/\d/.test(password)) strength++;
    else requirements.push("number");

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    else requirements.push("special character");

    const strengthLevels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const strengthColors = [
      "#ff4757",
      "#ff6b7a",
      "#ffa502",
      "#2ed573",
      "#20bf6b",
    ];

    strengthIndicator.innerHTML = `
        <div class="strength-bar">
          <div class="strength-fill" style="width: ${
            (strength / 5) * 100
          }%; background-color: ${
      strengthColors[strength - 1] || "#ff4757"
    }"></div>
        </div>
        <span class="strength-text" style="color: ${
          strengthColors[strength - 1] || "#ff4757"
        }">
          ${strengthLevels[strength - 1] || "Very Weak"}
        </span>
        ${
          requirements.length > 0
            ? `<div class="requirements">Missing: ${requirements.join(
                ", "
              )}</div>`
            : ""
        }
      `;
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
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  },
};

export default RegisterPage;
