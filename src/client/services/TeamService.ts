/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { general_error } from "../models/general_error";
import type { team } from "../models/team";
import type { team_mod_params } from "../models/team_mod_params";
import type { team_mods } from "../models/team_mods";
import type { team_pack_params } from "../models/team_pack_params";
import type { team_packs } from "../models/team_packs";
import type { team_user_params } from "../models/team_user_params";
import type { team_users } from "../models/team_users";
import type { teams } from "../models/teams";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";
export class TeamService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Fetch all available teams
   * @returns teams A collection of teams
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public listTeams(): CancelablePromise<teams | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/teams",
      errors: {
        403: `User is not authorized`,
      },
    });
  }
  /**
   * Create a new team
   * @param team The team data to create
   * @returns team The created team data
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public createTeam(team: team): CancelablePromise<team | general_error> {
    return this.httpRequest.request({
      method: "POST",
      url: "/teams",
      body: team,
      errors: {
        403: `User is not authorized`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Fetch a specific team
   * @param teamId A team UUID or slug
   * @returns team The fetched team details
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public showTeam(teamId: string): CancelablePromise<team | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/teams/{team_id}",
      path: {
        team_id: teamId,
      },
      errors: {
        403: `User is not authorized`,
        404: `Team not found`,
      },
    });
  }
  /**
   * Update a specific team
   * @param teamId A team UUID or slug
   * @param team The team data to update
   * @returns team The updated team details
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public updateTeam(
    teamId: string,
    team: team,
  ): CancelablePromise<team | general_error> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/teams/{team_id}",
      path: {
        team_id: teamId,
      },
      body: team,
      errors: {
        403: `User is not authorized`,
        404: `Team not found`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Delete a specific team
   * @param teamId A team UUID or slug
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public deleteTeam(teamId: string): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/teams/{team_id}",
      path: {
        team_id: teamId,
      },
      errors: {
        400: `Failed to delete the team`,
        403: `User is not authorized`,
        404: `Team not found`,
      },
    });
  }
  /**
   * Fetch all users attached to team
   * @param teamId A team UUID or slug
   * @returns team_users A collection of members
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public listTeamUsers(
    teamId: string,
  ): CancelablePromise<team_users | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/teams/{team_id}/users",
      path: {
        team_id: teamId,
      },
      errors: {
        403: `User is not authorized`,
        404: `Team not found`,
      },
    });
  }
  /**
   * Attach a user to team
   * @param teamId A team UUID or slug
   * @param teamUser The team user data to attach
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public attachTeamToUser(
    teamId: string,
    teamUser: team_user_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "POST",
      url: "/teams/{team_id}/users",
      path: {
        team_id: teamId,
      },
      body: teamUser,
      errors: {
        403: `User is not authorized`,
        404: `Team or user not found`,
        412: `User is already attached`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Update user perms for team
   * @param teamId A team UUID or slug
   * @param teamUser The team user data to update
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public permitTeamUser(
    teamId: string,
    teamUser: team_user_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/teams/{team_id}/users",
      path: {
        team_id: teamId,
      },
      body: teamUser,
      errors: {
        403: `User is not authorized`,
        404: `Team or user not found`,
        412: `User is not attached`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Remove a user from team
   * @param teamId A team UUID or slug
   * @param teamUser The team user data to delete
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public deleteTeamFromUser(
    teamId: string,
    teamUser: team_user_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/teams/{team_id}/users",
      path: {
        team_id: teamId,
      },
      body: teamUser,
      errors: {
        403: `User is not authorized`,
        404: `Team or user not found`,
        412: `User is not attached`,
      },
    });
  }
  /**
   * Fetch all packs attached to team
   * @param teamId A team UUID or slug
   * @returns team_packs A collection of team packs
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public listTeamPacks(
    teamId: string,
  ): CancelablePromise<team_packs | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/teams/{team_id}/packs",
      path: {
        team_id: teamId,
      },
      errors: {
        403: `User is not authorized`,
        404: `Team not found`,
      },
    });
  }
  /**
   * Attach a pack to team
   * @param teamId A team UUID or slug
   * @param teamPack The team pack data to attach
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public attachTeamToPack(
    teamId: string,
    teamPack: team_pack_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "POST",
      url: "/teams/{team_id}/packs",
      path: {
        team_id: teamId,
      },
      body: teamPack,
      errors: {
        403: `User is not authorized`,
        404: `Team or pack not found`,
        412: `Pack is already attached`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Update pack perms for team
   * @param teamId A team UUID or slug
   * @param teamPack The team pack data to update
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public permitTeamPack(
    teamId: string,
    teamPack: team_pack_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/teams/{team_id}/packs",
      path: {
        team_id: teamId,
      },
      body: teamPack,
      errors: {
        403: `User is not authorized`,
        404: `Team or pack not found`,
        412: `Pack is not attached`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Remove a pack from team
   * @param teamId A team UUID or slug
   * @param teamPack The team pack data to delete
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public deleteTeamFromPack(
    teamId: string,
    teamPack: team_pack_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/teams/{team_id}/packs",
      path: {
        team_id: teamId,
      },
      body: teamPack,
      errors: {
        403: `User is not authorized`,
        404: `Team or pack not found`,
        412: `Pack is not attached`,
      },
    });
  }
  /**
   * Fetch all mods attached to team
   * @param teamId A team UUID or slug
   * @returns team_mods A collection of team mods
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public listTeamMods(
    teamId: string,
  ): CancelablePromise<team_mods | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/teams/{team_id}/mods",
      path: {
        team_id: teamId,
      },
      errors: {
        403: `User is not authorized`,
        404: `Team not found`,
      },
    });
  }
  /**
   * Attach a mod to team
   * @param teamId A team UUID or slug
   * @param teamMod The team mod data to attach
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public attachTeamToMod(
    teamId: string,
    teamMod: team_mod_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "POST",
      url: "/teams/{team_id}/mods",
      path: {
        team_id: teamId,
      },
      body: teamMod,
      errors: {
        403: `User is not authorized`,
        404: `Team or user not found`,
        412: `Mod is already attached`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Update mod perms for team
   * @param teamId A team UUID or slug
   * @param teamMod The team mod data to update
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public permitTeamMod(
    teamId: string,
    teamMod: team_mod_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/teams/{team_id}/mods",
      path: {
        team_id: teamId,
      },
      body: teamMod,
      errors: {
        403: `User is not authorized`,
        404: `Team or user not found`,
        412: `Mod is not attached`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Remove a mod from team
   * @param teamId A team UUID or slug
   * @param teamMod The team mod data to delete
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public deleteTeamFromMod(
    teamId: string,
    teamMod: team_mod_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/teams/{team_id}/mods",
      path: {
        team_id: teamId,
      },
      body: teamMod,
      errors: {
        403: `User is not authorized`,
        404: `Team or mod not found`,
        412: `Mod is not attached`,
      },
    });
  }
}
