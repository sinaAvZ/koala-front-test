import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
  withCredentials: true,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => config, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      throw error; // لغو درخواست‌ها نیازی به نمایش toast ندارند
    }
    const errorMessage = error.response?.data?.message || error.message || "خطایی غیرمنتظره رخ داد";
    toast.error(errorMessage, { position: "top-right", duration: 5000 });
    throw new Error(errorMessage);
  }
);

export default api;