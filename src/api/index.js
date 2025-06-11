const isLocal = window.location.hostname === "localhost";

// Ganti URL ini dengan URL Railway backend & ML API kamu
const BACKEND_URL = isLocal
  ? "http://localhost:3000"
  : "https://nutrikids-v2-production-a1b6.up.railway.app"; // <- backend Hapi

const ML_URL = isLocal
  ? "http://localhost:8000"
  : "https://nutrikids-ml-production.up.railway.app"; // <- FastAPI (ganti sesuai subdomain kamu)

export const ApiBackend = axios.create({
  baseURL: BACKEND_URL,
});

export const ApiMl = axios.create({
  baseURL: ML_URL,
});
