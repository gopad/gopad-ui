import { defineStore } from "pinia";
import { AxiosError } from "axios";

import { pick, isAxiosError } from "./helpers";

import {
  listTeams,
  showTeam,
  deleteTeam,
  createTeam,
  updateTeam,
} from "../client/sdk.gen";

import type {
  teams,
  team,
  notification,
  ListTeamsResponse,
  ListTeamsError,
  ShowTeamResponse,
  ShowTeamError,
  DeleteTeamResponse,
  DeleteTeamError,
  CreateTeamResponse,
  CreateTeamError,
  UpdateTeamResponse,
  UpdateTeamError,
} from "../client/types.gen";

interface TeamState {
  currentTeam: team | null;
  teams: teams;
  loading: boolean;
}

export const useTeamStore = defineStore("team", {
  state: (): TeamState => ({
    currentTeam: null,
    teams: {
      total: 0,
      teams: [],
    },
    loading: false,
  }),
  getters: {
    getTeams(state) {
      return state.teams;
    },
  },
  actions: {
    async fetchTeams(): Promise<ListTeamsResponse | ListTeamsError> {
      this.loading = true;

      try {
        const response = await listTeams();

        if (isAxiosError(response)) {
          throw response;
        }

        this.teams = response.data;
        return this.teams as teams;
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError<ListTeamsError>;

          if (axiosError.response) {
            return error.response as ListTeamsError;
          }

          throw new Error("A network error occurred");
        }

        throw new Error("An unexpected error occurred");
      } finally {
        this.loading = false;
      }
    },
    async fetchTeam(teamId: string): Promise<ShowTeamResponse | ShowTeamError> {
      this.loading = true;

      try {
        const response = await showTeam({
          path: {
            team_id: teamId,
          },
        });

        if (isAxiosError(response)) {
          throw response;
        }

        this.currentTeam = response.data;
        return this.currentTeam as team;
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError<ShowTeamError>;

          if (axiosError.response) {
            return error.response as ShowTeamError;
          }

          throw new Error("A network error occurred");
        }

        throw new Error("An unexpected error occurred");
      } finally {
        this.loading = false;
      }
    },
    async deleteTeam(
      teamId: string,
    ): Promise<DeleteTeamResponse | DeleteTeamError> {
      this.loading = true;

      try {
        const response = await deleteTeam({
          path: {
            team_id: teamId,
          },
        });

        if (isAxiosError(response)) {
          throw response;
        }

        return response.data as notification;
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError<DeleteTeamError>;

          if (axiosError.response) {
            return error.response as DeleteTeamError;
          }

          throw new Error("A network error occurred");
        }

        throw new Error("An unexpected error occurred");
      } finally {
        this.loading = false;
      }
    },
    async createTeam(
      data: team,
    ): Promise<CreateTeamResponse | CreateTeamError> {
      this.loading = true;

      try {
        const response = await createTeam({
          body: pick(data, "slug", "name"),
        });

        if (isAxiosError(response)) {
          throw response;
        }

        return response.data as team;
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError<CreateTeamError>;

          if (axiosError.response) {
            return error.response as CreateTeamError;
          }

          throw new Error("A network error occurred");
        }

        throw new Error("An unexpected error occurred");
      } finally {
        this.loading = false;
      }
    },
    async updateTeam(
      teamId: string,
      data: team,
    ): Promise<UpdateTeamResponse | UpdateTeamError> {
      this.loading = true;

      try {
        const response = await updateTeam({
          path: {
            team_id: teamId,
          },
          body: pick(data, "slug", "name"),
        });

        if (isAxiosError(response)) {
          throw response;
        }

        return response.data as team;
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          const axiosError = error as AxiosError<UpdateTeamError>;

          if (axiosError.response) {
            return error.response as UpdateTeamError;
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
