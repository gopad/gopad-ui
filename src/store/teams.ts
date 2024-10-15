import { defineStore } from "pinia";

import { useConfigStore } from "./config";
import { pick } from "./helpers";

import type { notification } from "../client/models/notification";
import type { teams } from "../client/models/teams";
import type { team } from "../client/models/team";

export const useTeamStore = defineStore("team", {
  state: () => ({
    currentTeam: {} as team,
    teams: [] as team[],
  }),
  actions: {
    async fetchTeams() {
      return useConfigStore()
        .client.team.listTeams()
        .then((resp: notification | teams) => {
          const val = <teams>resp;
          this.teams = <team[]>val.teams;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async fetchTeam(teamId: string) {
      return useConfigStore()
        .client.team.showTeam(teamId)
        .then((resp: notification | team) => {
          const val = <team>resp;
          this.currentTeam = val;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deleteTeam(teamId: string) {
      return useConfigStore()
        .client.team.deleteTeam(teamId)
        .catch((error) => {
          console.log(error);
        });
    },
    async createTeam(data: team) {
      return useConfigStore()
        .client.team.createTeam(pick(data, "slug", "name"))
        .catch((error) => {
          console.log(error);
        });
    },
    async updateTeam(teamId: string, data: team) {
      return useConfigStore()
        .client.team.updateTeam(teamId, pick(data, "slug", "name"))
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
