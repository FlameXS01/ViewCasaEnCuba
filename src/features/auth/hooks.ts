import { useEffect } from "react";
import { useAuthStore } from "./store";
import type { LoginRequest, RegisterRequest } from "./types";

export function useAuth() {
  const { user, isAuthenticated, isLoading, login, register, logout, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login: (credentials: LoginRequest) => login(credentials),
    register: (data: RegisterRequest) => register(data),
    logout,
  };
}

export function useRequireAuth() {
  const { isAuthenticated, isLoading, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { isAuthenticated, isLoading };
}

export function useIsAdmin() {
  const { user } = useAuthStore();
  return user?.role === "admin";
}

export function useIsSeller() {
  const { user } = useAuthStore();
  return user?.role === "seller" || user?.role === "admin";
}