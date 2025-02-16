import { defineStore } from "pinia";
import { AxiosError } from "axios";

import { pick, isAxiosError } from "./helpers";

import {
  listUsers,
  showUser,
  deleteUser,
  createUser,
  updateUser,
} from "../client/sdk.gen";

import type {
  users,
  user,
  notification,
  ListUsersResponse,
  ListUsersError,
  ShowUserResponse,
  ShowUserError,
  DeleteUserResponse,
  DeleteUserError,
  CreateUserResponse,
  CreateUserError,
  UpdateUserResponse,
  UpdateUserError,
} from "../client/types.gen";

interface UserState {
  currentUser: user | null;
  users: users;
  loading: boolean;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    currentUser: null,
    users: {
      total: 0,
      users: [],
    },
    loading: false,
  }),
  getters: {
    getUsers(state) {
      return state.users;
    },
  },
  actions: {
    async fetchUsers(): Promise<ListUsersResponse | ListUsersError> {
      this.loading = true;

      try {
        const response = await listUsers();

        if (isAxiosError(response)) {
          throw response;
        }

        this.users = response.data;
        return this.users as users;
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError<ListUsersError>;

          if (axiosError.response) {
            return error.response as ListUsersError;
          }

          throw new Error("A network error occurred");
        }

        throw new Error("An unexpected error occurred");
      } finally {
        this.loading = false;
      }
    },
    async fetchUser(userId: string): Promise<ShowUserResponse | ShowUserError> {
      this.loading = true;

      try {
        const response = await showUser({
          path: {
            user_id: userId,
          },
        });

        if (isAxiosError(response)) {
          throw response;
        }

        this.currentUser = response.data;
        return this.currentUser as user;
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError<ShowUserError>;

          if (axiosError.response) {
            return error.response as ShowUserError;
          }

          throw new Error("A network error occurred");
        }

        throw new Error("An unexpected error occurred");
      } finally {
        this.loading = false;
      }
    },
    async deleteUser(
      userId: string,
    ): Promise<DeleteUserResponse | DeleteUserError> {
      this.loading = true;

      try {
        const response = await deleteUser({
          path: {
            user_id: userId,
          },
        });

        if (isAxiosError(response)) {
          throw response;
        }

        return response.data as notification;
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError<DeleteUserError>;

          if (axiosError.response) {
            return error.response as DeleteUserError;
          }

          throw new Error("A network error occurred");
        }

        throw new Error("An unexpected error occurred");
      } finally {
        this.loading = false;
      }
    },
    async createUser(
      data: user,
    ): Promise<CreateUserResponse | CreateUserError> {
      this.loading = true;

      try {
        const response = await createUser({
          body: pick(
            data,
            "username",
            "password",
            "email",
            "fullname",
            "admin",
            "active",
          ),
        });

        if (isAxiosError(response)) {
          throw response;
        }

        return response.data as user;
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError<CreateUserError>;

          if (axiosError.response) {
            return error.response as CreateUserError;
          }

          throw new Error("A network error occurred");
        }

        throw new Error("An unexpected error occurred");
      } finally {
        this.loading = false;
      }
    },
    async updateUser(
      userId: string,
      data: user,
    ): Promise<UpdateUserResponse | UpdateUserError> {
      this.loading = true;

      try {
        const response = await updateUser({
          path: {
            user_id: userId,
          },
          body: pick(
            data,
            "username",
            "password",
            "email",
            "fullname",
            "admin",
            "active",
          ),
        });

        if (isAxiosError(response)) {
          throw response;
        }

        return response.data as user;
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError<UpdateUserError>;

          if (axiosError.response) {
            return error.response as UpdateUserError;
          }

          throw new Error("A network error occurred");
        }

        throw new Error("An unexpected error occurred");
      } finally {
        this.loading = false;
      }
    },
  },
});
