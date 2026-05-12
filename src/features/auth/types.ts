import type { AuthResponse, LoginRequest, RegisterRequest, UserDTO } from "@/types/api";

export type { AuthResponse, LoginRequest, RegisterRequest, UserDTO };

export interface AuthState {
  user: UserDTO | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthActions {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  updateUser: (data: Partial<UserDTO>) => Promise<void>;
  setUser: (user: UserDTO | null) => void;
}

export type AuthStore = AuthState & AuthActions;