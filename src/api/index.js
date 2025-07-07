import axios from "axios";

const isLocalhost = window.location.hostname === "localhost";

const BACKEND_URL = isLocalhost
  ? "http://localhost:3000"
  : "http://nutrikids-v2-production-e9a1.up.railway.app";

const ML_URL = isLocalhost
  ? "http://localhost:8000"
  : "http://nutrikids-v2-production-c97c.up.railway.app";

export const ApiBackend = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

export const ApiMl = axios.create({
  baseURL: ML_URL,
});
