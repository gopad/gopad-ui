import { defineStore } from "pinia";

import { pick } from "./helpers";
import { Gopad } from "../client";

import type { notification } from "../client/models/notification";
import type { users } from "../client/models/users";
import type { user } from "../client/models/user";

const client = new Gopad({
  BASE: "/api/v1",
});

export const useUserStore = defineStore("user", {
  state: () => ({
    currentUser: {} as user,
    users: [] as user[],
  }),
  actions: {
    async fetchUsers() {
      return client.user
        .listUsers()
        .then((resp: notification | users) => {
          const val = <users>resp;
          this.users = <user[]>val.users;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async fetchUser(userId: string) {
      return client.user
        .showUser(userId)
        .then((resp: notification | user) => {
          const val = <user>resp;
          this.currentUser = val;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deleteUser(userId: string) {
      return client.user.deleteUser(userId).catch((error) => {
        console.log(error);
      });
    },
    async createUser(data: user) {
      return client.user
        .createUser(
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
      return client.user
        .updateUser(
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
