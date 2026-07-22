import { apiClient } from "../../../api/client";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export const login = async (data: LoginRequest) => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};

export const signup = async (data: SignupRequest) => {
  const response = await apiClient.post("/auth/signup", data);
  return response.data;
};

export const getProfile = async () => {
  const response = await apiClient.get("/auth/profile");
  return response.data;
};