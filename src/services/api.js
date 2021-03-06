import axios from "axios";
import { getToken } from "./auth";


const api = axios.create({
  baseURL: `http://tcc.daniel-amaral.com:8080/api/v1`,
  timeout: 1000,
  headers:{'Content-Type': 'application/json; charset=utf-8'}
});

api.interceptors.request.use(async config => {
  const token = getToken();

  if (token) {

    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;