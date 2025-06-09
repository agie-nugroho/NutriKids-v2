import Home from "../pages/home/home-page";
import About from "../pages/about/about-page";
import Features from "../pages/features/features-page"; // ← Ganti ini
import Contact from "../pages/contact/contact-page";
import FoodInput from "../pages/food-input/food-input-page";

const Routes = {
  "/": Home,
  "/home": Home,
  "/food-input": FoodInput,
  "/about": About,
  "/features": Features, // ← Route baru
  "/contact": Contact,
};

export default Routes;
