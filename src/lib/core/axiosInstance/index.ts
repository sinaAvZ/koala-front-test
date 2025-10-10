import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BINANCE_API_URL || "https://fapi.binance.com",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      throw error;
    }
    const errorMessage =
      error.response?.data?.msg ||
      error.message ||
      "An error occurred";
    toast.error(errorMessage, { position: "bottom-right", duration: 5000 });
    throw new Error(errorMessage);
  }
);

export default api;