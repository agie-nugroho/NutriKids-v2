import axios from "axios";

const isLocalhost = window.location.hostname === "localhost";

const BACKEND_URL = isLocalhost
  ? "http://localhost:3000"
  : "nutrikids-v2-production-a1c4.up.railway.app";

const ML_URL = isLocalhost
  ? "http://localhost:8000"
  : "https://nutrikids-v2-production-8168.up.railway.app";

// Backend untuk auth, save menu, dll
export const ApiBackend = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true, // kalau kamu pakai cookies atau session
});

// ML API untuk rekomendasi makanan
export const ApiMl = axios.create({
  baseURL: ML_URL,
});
