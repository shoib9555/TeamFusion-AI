import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const authStorage = localStorage.getItem("teamfusion-auth");

    if (authStorage) {
      const parsedStorage = JSON.parse(authStorage);

      const token = parsedStorage?.state?.token;

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);