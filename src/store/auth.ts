import { defineStore } from "pinia";
import { InternalAxiosRequestConfig, AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";

import { isAxiosError } from "./helpers";
import {
  client,
  callbackProvider,
  listProvider,
  loginAuth,
  refreshAuth,
} from "../client/services.gen";
import type {
  auth_token,
  providers,
  ListProviderResponse,
  ListProviderError,
  CallbackProviderResponse,
  CallbackProviderError,
  LoginAuthResponse,
  LoginAuthError,
  RefreshAuthResponse,
  RefreshAuthError,
} from "../client/types.gen";

interface Claims {
  login: string;
  email: string;
  name: string;
  admin: boolean;
  exp: number;
  iat: number;
  iss: string;
}

interface AuthState {
  token: string | null;
  claims: Claims;
  loading: boolean;
  refreshing: boolean;
  interval: number | null;
  providers: providers;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: localStorage.getItem("token") || null,
    claims: {
      login: "",
      email: "",
      name: "",
      admin: false,
      exp: 0,
      iat: 0,
      iss: "",
    },
    loading: false,
    refreshing: false,
    interval: null,
    providers: {
      total: 0,
      listing: [],
    },
  }),
  getters: {
    isExpired(state): boolean {
      return state.claims.exp < new Date().getTime() ? true : false;
    },
    isAuthed(state): boolean {
      return !!state.token;
    },
    isAdmin(state): boolean {
      return !!state.claims.admin;
    },
    getClaims(state) {
      return state.claims;
    },
    getProviders(state) {
      return state.providers;
    },
  },
  actions: {
    async refreshToken(): Promise<RefreshAuthResponse | RefreshAuthError> {
      this.refreshing = true;

      try {
        const response = await refreshAuth();

        if (isAxiosError(response)) {
          throw response;
        }

        this.token = response.data.token;
        localStorage.setItem("token", response.data.token);

        return response;
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError<RefreshAuthError>;

          if (axiosError.response) {
            return error.response as RefreshAuthError;
          }

          throw new Error("A network error occurred");
        }

        throw new Error("An unexpected error occurred");
      } finally {
        this.refreshing = false;
      }
    },
    async fetchProviders(): Promise<ListProviderResponse | ListProviderError> {
      this.loading = true;

      try {
        const response = await listProvider();

        if (isAxiosError(response)) {
          throw response;
        }

        this.providers = response.data;
        return this.providers as providers;
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError<ListProviderError>;

          if (axiosError.response) {
            return error.response as ListProviderError;
          }

          throw new Error("A network error occurred");
        }

        throw new Error("An unexpected error occurred");
      } finally {
        this.loading = false;
      }
    },
    async fetchCallback(
      provider: string,
      params: URLSearchParams,
    ): Promise<CallbackProviderResponse | CallbackProviderError> {
      this.loading = true;

      try {
        const response = await callbackProvider({
          path: {
            provider: provider,
          },
          query: {
            code: params.get("code") || "",
            state: params.get("state") || "",
          },
        });

        if (isAxiosError(response)) {
          throw response;
        }

        this.token = response.data.token;
        localStorage.setItem("token", response.data.token);

        client.instance.interceptors.request.use(
          (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            config.headers.set("X-Api-Key", response.data.token);
            return config;
          },
          (error: AxiosError): Promise<never> => {
            return Promise.reject(error);
          },
        );

        this.claims = jwtDecode<Claims>(this.token);
        localStorage.setItem("claims", JSON.stringify(this.claims));

        return response.data as auth_token;
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError<CallbackProviderError>;

          if (axiosError.response) {
            return error.response as CallbackProviderError;
          }

          throw new Error("A network error occurred");
        }

        throw new Error("An unexpected error occurred");
      } finally {
        this.loading = false;
      }
    },
    async login(
      username: string,
      password: string,
    ): Promise<LoginAuthResponse | LoginAuthError> {
      this.loading = true;

      try {
        const response = await loginAuth({
          body: {
            username,
            password,
          },
        });

        if (isAxiosError(response)) {
          throw response;
        }

        this.token = response.data.token;
        localStorage.setItem("token", response.data.token);

        client.instance.interceptors.request.use(
          (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            config.headers.set("X-Api-Key", response.data.token);
            return config;
          },
          (error: AxiosError): Promise<never> => {
            return Promise.reject(error);
          },
        );

        this.claims = jwtDecode<Claims>(this.token);
        localStorage.setItem("claims", JSON.stringify(this.claims));

        return response.data as auth_token;
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError<LoginAuthError>;

          if (axiosError.response) {
            return error.response as LoginAuthError;
          }

          throw new Error("A network error occurred");
        }

        throw new Error("An unexpected error occurred");
      } finally {
        this.loading = false;
      }
    },
    logout(): void {
      this.token = null;
      localStorage.removeItem("token");
    },
    startInterval(): void {
      if (this.interval) {
        clearInterval(this.interval);
      }

      this.interval = setInterval(() => {
        if (this.claims.exp - new Date().getTime() < 5 * 60 * 1000) {
          this.refreshToken();
        }
      }, 60 * 1000);
    },
    stopInterval(): void {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    initialize(): void {
      const token = localStorage.getItem("token");
      if (token) {
        client.instance.interceptors.request.use(
          (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            config.headers.set("X-Api-Key", token);
            return config;
          },
          (error: AxiosError): Promise<never> => {
            return Promise.reject(error);
          },
        );

        this.startInterval();
      }

      const claims = localStorage.getItem("claims");
      if (claims) {
        this.claims = JSON.parse(claims);
      }
    },
  },
});
