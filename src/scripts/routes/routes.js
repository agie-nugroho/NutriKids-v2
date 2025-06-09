import Home from "../pages/home/home-page";
import About from "../pages/about/about-page";
import Features from "../pages/features/features-page"; // ← Ganti ini
import Contact from "../pages/contact/contact-page";
import FoodInput from "../pages/food-input/food-input-page";
import LoginPage from "../pages/auth/login-page";
import RegisterPage from "../pages/auth/register-page";

const Routes = {
  "/": Home,
  "/home": Home,
  "/food-input": FoodInput,
  "/about": About,
  "/features": Features, // ← Route baru
  "/contact": Contact,
  "/login": LoginPage,
  "/register": RegisterPage,
};

export default Routes;
