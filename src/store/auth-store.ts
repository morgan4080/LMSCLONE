// Utilities
import { defineStore } from "pinia";

export interface User {
  keycloakId: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  tenantId: string;
  companyName: string;
  roles: {};
}

export interface AuthState {
  isLoggedIn: boolean;
  user: null | User;
  loading: Boolean;
  authPrompt: Boolean;
}
export const useAuthStore = defineStore("auth-store", {
  state: (): AuthState => ({
    isLoggedIn: false,
    user: null,
    loading: false,
    authPrompt: false,
  }),
  getters: {
    getLoggedInState(state) {
      return state.isLoggedIn;
    },
    getAuthPrompt(state) {
      return state.authPrompt;
    },
    getLoggedInUser(state): null | User {
      return state.user;
    },
    getLoadingState(state) {
      return state.loading;
    },
  },
  actions: {
    setLoading(payload: boolean): void {
      this.loading = payload;
    },
    setAuthPrompt(payload: boolean): void {
      this.authPrompt = payload;
    },
    async initialize(): Promise<any> {
      const url = `${import.meta.env.VITE_APP_USER}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("User Auth Error " + response.status);
        }
      } catch (e: any) {
        return Promise.reject(e.message);
      }
    },
    setAuthState(data: any): void {
      this.user = data;
      this.isLoggedIn = true;
    },
  },
});
