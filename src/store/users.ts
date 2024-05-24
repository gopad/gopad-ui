import { defineStore } from "pinia";

import { pick } from "./helpers";
import { Gopad } from "../client";

import type { general_error } from "../client/models/general_error";
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
        .then((resp: general_error | users) => {
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
        .then((resp: general_error | user) => {
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
            "slug",
            "email",
            "username",
            "password",
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
            "slug",
            "email",
            "username",
            "password",
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
