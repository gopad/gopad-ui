import { defineStore } from "pinia";

import { pick } from "./helpers";
import { Gopad } from "../client";

import type { general_error } from "../client/models/general_error";
import type { teams } from "../client/models/teams";
import type { team } from "../client/models/team";

const client = new Gopad({
  BASE: "/api/v1",
});

export const useTeamStore = defineStore("team", {
  state: () => ({
    currentTeam: {} as team,
    teams: [] as team[],
  }),
  actions: {
    async fetchTeams() {
      return client.team
        .listTeams()
        .then((resp: general_error | teams) => {
          const val = <teams>resp;
          this.teams = <team[]>val.teams;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async fetchTeam(teamId: string) {
      return client.team
        .showTeam(teamId)
        .then((resp: general_error | team) => {
          const val = <team>resp;
          this.currentTeam = val;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deleteTeam(teamId: string) {
      return client.team.deleteTeam(teamId).catch((error) => {
        console.log(error);
      });
    },
    async createTeam(data: team) {
      return client.team
        .createTeam(pick(data, "slug", "name"))
        .catch((error) => {
          console.log(error);
        });
    },
    async updateTeam(teamId: string, data: team) {
      return client.team
        .updateTeam(teamId, pick(data, "slug", "name"))
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
