import axios from "axios";

export const ApiBackend = axios.create({
  baseURL: 'http://localhost:3000'
});

export const ApiMl = axios.create({
  baseURL: 'http://localhost:8000'
});

export default { ApiBackend, ApiMl };