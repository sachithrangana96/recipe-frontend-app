import { api } from "./apiClient";

export interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ Shared response structure
export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

// ✅ Requests
export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// ✅ APIs
export const login = (data: LoginRequest) =>
  api.post<AuthResponse, LoginRequest>("/auth/login", data);

export const register = (data: RegisterRequest) =>
  api.post<AuthResponse, RegisterRequest>("/auth/register", data);

// ✅ Protected
// export const getDashboardData = () =>
//   api.get<DashboardResponse>("/dashboard");
