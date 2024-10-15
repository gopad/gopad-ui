import { defineStore } from "pinia";

import { useConfigStore } from "./config";
import { pick } from "./helpers";

import type { notification } from "../client/models/notification";
import type { users } from "../client/models/users";
import type { user } from "../client/models/user";

export const useUserStore = defineStore("user", {
  state: () => ({
    currentUser: {} as user,
    users: [] as user[],
  }),
  actions: {
    async fetchUsers() {
      return useConfigStore()
        .client.user.listUsers()
        .then((resp: notification | users) => {
          const val = <users>resp;
          this.users = <user[]>val.users;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async fetchUser(userId: string) {
      return useConfigStore()
        .client.user.showUser(userId)
        .then((resp: notification | user) => {
          const val = <user>resp;
          this.currentUser = val;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deleteUser(userId: string) {
      return useConfigStore()
        .client.user.deleteUser(userId)
        .catch((error) => {
          console.log(error);
        });
    },
    async createUser(data: user) {
      return useConfigStore()
        .client.user.createUser(
          pick(
            data,
            "username",
            "password",
            "email",
            "fullname",
            "admin",
            "active",
          ),
        )
        .catch((error) => {
          console.log(error);
        });
    },
    async updateUser(userId: string, data: user) {
      return useConfigStore()
        .client.user.updateUser(
          userId,
          pick(
            data,
            "username",
            "password",
            "email",
            "fullname",
            "admin",
            "active",
          ),
        )
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
