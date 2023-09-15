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

export interface CurrentUser {
  UUID: string;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  roles: string[];
  permissions: string[];
  scopes: string[];
  accounts: any[];
  accountName: string;
  accountCode: string;
  subscriptionPackage: string;
  hasChangeRequest: boolean;
  isForceUpdate: boolean;
  auth: string;
  domain: string;
  keycloakId: string;
  currency: string;
}

type AlertTypes = "warning" | "error" | "success";

type Alert = {
  alertType: AlertTypes;
  alertMessage: string;
}[];

export interface AuthState {
  isLoggedIn: boolean;
  user: null | User;
  currentUser: null | CurrentUser;
  loading: Boolean;
  authPrompt: Boolean;
  alerts: Alert;
}
export const useAuthStore = defineStore("auth-store", {
  state: (): AuthState => ({
    isLoggedIn: false,
    user: null,
    currentUser: null,
    loading: false,
    authPrompt: false,
    alerts: [],
  }),
  getters: {
    getLoggedInState(state) {
      return state.isLoggedIn;
    },
    getAuthPrompt(state) {
      return state.authPrompt;
    },
    showAlerts(state) {
      return state.alerts.length > 0;
    },
    getAlerts(state): Alert {
      return state.alerts;
    },
    getLoggedInUser(state): null | User {
      return state.user;
    },
    getCurrentUser(state): null | CurrentUser {
      return state.currentUser;
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
    async fetchCurrentUser(): Promise<void> {
      const url = `${import.meta.env.VITE_CURRENT_USER}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 200) {
          this.currentUser = await response.json()
        }
      } catch (e: any) {
        console.log(e.message);
      }
    },
    async initialize(): Promise<any> {
      const url = `${import.meta.env.VITE_APP_USER}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });

        await this.fetchCurrentUser()

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
    addAlerts(type: AlertTypes, message: string) {
      const withoutDuplicates: Set<{
        alertType: AlertTypes;
        alertMessage: string;
      }> = new Set();
      withoutDuplicates.add({
        alertType: type,
        alertMessage: message,
      });

      this.alerts = [...withoutDuplicates];

      // .shift()
      setInterval(() => {
        // this.alerts.shift();
      }, 2000);
    },
  },
});
