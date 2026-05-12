import { api } from "@/lib/api";
import type { UserDTO } from "@/types/api";

export const usersApi = {
  async getMe(): Promise<UserDTO> {
    const { data } = await api.get<UserDTO>("/users/me");
    return data;
  },

  async updateMe(payload: Partial<UserDTO>): Promise<UserDTO> {
    const { data } = await api.patch<UserDTO>("/users/me", payload);
    return data;
  },

  async getById(userId: string): Promise<UserDTO> {
    const { data } = await api.get<UserDTO>(`/users/${userId}`);
    return data;
  },
};