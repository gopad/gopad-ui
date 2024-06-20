/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { notification } from "../models/notification";
import type { team } from "../models/team";
import type { team_user_params } from "../models/team_user_params";
import type { team_users } from "../models/team_users";
import type { teams } from "../models/teams";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";
export class TeamService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Fetch all available teams
   * @param search Search query
   * @param sort Sorting column
   * @param order Sorting order
   * @param limit Paging limit
   * @param offset Paging offset
   * @returns teams A collection of teams
   * @returns notification Some error unrelated to the handler
   * @throws ApiError
   */
  public listTeams(
    search?: string,
    sort: "slug" | "name" = "name",
    order: "asc" | "desc" = "asc",
    limit: number = 100,
    offset?: number,
  ): CancelablePromise<teams | notification> {
    return this.httpRequest.request({
      method: "GET",
      url: "/teams",
      query: {
        search: search,
        sort: sort,
        order: order,
        limit: limit,
        offset: offset,
      },
      errors: {
        403: `User is not authorized`,
        500: `Some internal server error`,
      },
    });
  }
  /**
   * Create a new team
   * @param requestBody The team data to create
   * @returns team The created team data
   * @returns notification Some error unrelated to the handler
   * @throws ApiError
   */
  public createTeam(requestBody: team): CancelablePromise<team | notification> {
    return this.httpRequest.request({
      method: "POST",
      url: "/teams",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `User is not authorized`,
        422: `Failed to validate request`,
        500: `Some internal server error`,
      },
    });
  }
  /**
   * Fetch a specific team
   * @param teamId A team identifier or slug
   * @returns team The fetched team details
   * @returns notification Some error unrelated to the handler
   * @throws ApiError
   */
  public showTeam(teamId: string): CancelablePromise<team | notification> {
    return this.httpRequest.request({
      method: "GET",
      url: "/teams/{team_id}",
      path: {
        team_id: teamId,
      },
      errors: {
        403: `User is not authorized`,
        404: `Team not found`,
        500: `Some internal server error`,
      },
    });
  }
  /**
   * Update a specific team
   * @param teamId A team identifier or slug
   * @param requestBody The team data to update
   * @returns team The updated team details
   * @returns notification Some error unrelated to the handler
   * @throws ApiError
   */
  public updateTeam(
    teamId: string,
    requestBody: team,
  ): CancelablePromise<team | notification> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/teams/{team_id}",
      path: {
        team_id: teamId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `User is not authorized`,
        404: `Team not found`,
        422: `Failed to validate request`,
        500: `Some internal server error`,
      },
    });
  }
  /**
   * Delete a specific team
   * @param teamId A team identifier or slug
   * @returns notification Plain success message
   * @throws ApiError
   */
  public deleteTeam(teamId: string): CancelablePromise<notification> {
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
        500: `Some internal server error`,
      },
    });
  }
  /**
   * Fetch all users attached to team
   * @param teamId A team identifier or slug
   * @param search Search query
   * @param sort Sorting column
   * @param order Sorting order
   * @param limit Paging limit
   * @param offset Paging offset
   * @returns team_users A collection of team users
   * @returns notification Some error unrelated to the handler
   * @throws ApiError
   */
  public listTeamUsers(
    teamId: string,
    search?: string,
    sort: "username" | "email" | "fullname" | "admin" | "active" = "username",
    order: "asc" | "desc" = "asc",
    limit: number = 100,
    offset?: number,
  ): CancelablePromise<team_users | notification> {
    return this.httpRequest.request({
      method: "GET",
      url: "/teams/{team_id}/users",
      path: {
        team_id: teamId,
      },
      query: {
        search: search,
        sort: sort,
        order: order,
        limit: limit,
        offset: offset,
      },
      errors: {
        403: `User is not authorized`,
        404: `Team not found`,
        500: `Some internal server error`,
      },
    });
  }
  /**
   * Attach a user to team
   * @param teamId A team identifier or slug
   * @param requestBody The team user data to attach
   * @returns notification Plain success message
   * @throws ApiError
   */
  public attachTeamToUser(
    teamId: string,
    requestBody: team_user_params,
  ): CancelablePromise<notification> {
    return this.httpRequest.request({
      method: "POST",
      url: "/teams/{team_id}/users",
      path: {
        team_id: teamId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `User is not authorized`,
        404: `Team or user not found`,
        412: `User is already attached`,
        422: `Failed to validate request`,
        500: `Some internal server error`,
      },
    });
  }
  /**
   * Update user perms for team
   * @param teamId A team identifier or slug
   * @param requestBody The team user data to update
   * @returns notification Plain success message
   * @throws ApiError
   */
  public permitTeamUser(
    teamId: string,
    requestBody: team_user_params,
  ): CancelablePromise<notification> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/teams/{team_id}/users",
      path: {
        team_id: teamId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `User is not authorized`,
        404: `Team or user not found`,
        412: `User is not attached`,
        422: `Failed to validate request`,
        500: `Some internal server error`,
      },
    });
  }
  /**
   * Unlink a user from team
   * @param teamId A team identifier or slug
   * @param requestBody The team user data to unlink
   * @returns notification Plain success message
   * @throws ApiError
   */
  public deleteTeamFromUser(
    teamId: string,
    requestBody: team_user_params,
  ): CancelablePromise<notification> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/teams/{team_id}/users",
      path: {
        team_id: teamId,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        403: `User is not authorized`,
        404: `Team or user not found`,
        412: `User is not attached`,
        500: `Some internal server error`,
      },
    });
  }
}
