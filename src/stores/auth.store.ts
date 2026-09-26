import { authApi } from "@/features/auth/api/auth.api";
import type { LoginRequest } from "@/features/auth/types/auth.types";
import { tokenStorage } from "@/lib/storage/toke-storage";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login(credentials: LoginRequest): Promise<void>;
  logout(): Promise<void>;
  hydrate(): void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: tokenStorage.getAccessToken() !== null,
  isLoading: false,
  error: null,

  async login(credentials) {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const result = await authApi.login(credentials);
      tokenStorage.setTokens(result.accessToken, result.refreshToken);
      set({
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch {
      tokenStorage.clear();
      set({
        isAuthenticated: false,
        isLoading: false,
        error: "Credenciales invalidad",
      });

      throw new Error("Invalid credentials");
    }
  },

  async logout() {
    try {
      await authApi.logout();
    } finally {
      tokenStorage.clear();
      set({
        isAuthenticated: false,
        error: null,
      });
    }
  },

  hydrate() {
    const accessToken = tokenStorage.getAccessToken();

    set({
      isAuthenticated: accessToken !== null,
    });
  },
}));
