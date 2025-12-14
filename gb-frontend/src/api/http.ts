import axios from "axios";

export const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL || import.meta.env.VITE_API_WEB || "http://localhost:8080",
    timeout: 10000,
    headers: {"Content-Type": "application/json"}
})

http.interceptors.response.use(
    (response) => response,
    (error) => {return Promise.reject(error)}
);