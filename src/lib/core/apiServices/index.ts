import api from "../axiosInstance";
import { toast } from "sonner";

export async function getData<T>(
  url: string,
  params?: Record<string, unknown>,
  config?: Record<string, unknown>,
  signal?: AbortSignal
): Promise<T> {
  const response = await api.get<T>(url, { params, ...config, signal });
  return response.data;
}

export async function postData<T, P>(
  url: string,
  data: P,
  config?: Record<string, unknown>,
  signal?: AbortSignal
): Promise<ApiResponse<T>> {
  const response = await api.post<ApiResponse<T>>(url, data, { ...config, signal });
  toast.success("request successfully sent", { position: "top-right", duration: 3000 });
  return response.data;
}
