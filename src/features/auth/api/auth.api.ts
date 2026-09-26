import { api } from "@/lib/api/axios";
import type { LoginRequest, LoginResponse } from "../types/auth.types";
import { tokenStorage } from "@/lib/storage/toke-storage";

export const authApi = {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("auth/login", data);

    return response.data;
  },

  async logout(): Promise<void> {
    const refreshToken = tokenStorage.getRefreshToken();
    await api.post("auth/logout", {
      refreshToken,
    });
  },
};
