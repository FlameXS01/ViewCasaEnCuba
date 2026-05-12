import { api } from "@/lib/api";
import type { AuthResponse, LoginRequest, RegisterRequest, UserDTO } from "./types";

export const authApi = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const formData = new URLSearchParams();
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    const { data } = await api.post<AuthResponse>("/auth/login", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return data;
  },

  async register(payload: RegisterRequest): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/register", payload);
    return data;
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout");
  },

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/refresh-token", {
      refresh_token: refreshToken,
    });
    return data;
  },

  async getMe(): Promise<UserDTO> {
    const { data } = await api.get<UserDTO>("/users/me");
    return data;
  },

  async updateMe(payload: Partial<UserDTO>): Promise<UserDTO> {
    const { data } = await api.patch<UserDTO>("/users/me", payload);
    return data;
  },

  async getUserById(userId: string): Promise<UserDTO> {
    const { data } = await api.get<UserDTO>(`/users/${userId}`);
    return data;
  },
};