import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

const API_BASE_URL: string =
  import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";


const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Axios v1 requires using `set` method on headers
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);





/**
 * Typed API request helpers
 * - T = response type
 * - D = request body type (for POST/PUT)
 * - P = query params type
 */
export const api = {
  get: async <T, P = any>(
    url: string,
    config?: AxiosRequestConfig<P>
  ): Promise<T> => {
    const res: AxiosResponse<T> = await apiClient.get(url, config);
    return res.data;
  },

  post: async <T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res: AxiosResponse<T> = await apiClient.post(url, data, config);
    return res.data;
  },

  put: async <T, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res: AxiosResponse<T> = await apiClient.put(url, data, config);
    return res.data;
  },

  delete: async <T, P = any>(
    url: string,
    config?: AxiosRequestConfig<P>
  ): Promise<T> => {
    const res: AxiosResponse<T> = await apiClient.delete(url, config);
    return res.data;
  },
};



export default apiClient;
