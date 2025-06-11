import axios from "axios";

const isLocal = window.location.hostname === "localhost";

// Ganti URL ini dengan URL Railway backend & ML API kamu
const BACKEND_URL = isLocal
  ? "http://localhost:3000"
  : "https://nutrikids-backend-production.up.railway.app"; 

const ML_URL = isLocal
  ? "http://localhost:8000"
  : "https://nutrikids-ml-production.up.railway.app"; 

export const ApiBackend = axios.create({
  baseURL: BACKEND_URL,
});

export const ApiMl = axios.create({
  baseURL: ML_URL,
});
