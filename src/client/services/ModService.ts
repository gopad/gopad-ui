/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { general_error } from "../models/general_error";
import type { mod } from "../models/mod";
import type { mod_team_params } from "../models/mod_team_params";
import type { mod_teams } from "../models/mod_teams";
import type { mod_user_params } from "../models/mod_user_params";
import type { mod_users } from "../models/mod_users";
import type { mods } from "../models/mods";
import type { version } from "../models/version";
import type { version_build_params } from "../models/version_build_params";
import type { version_builds } from "../models/version_builds";
import type { versions } from "../models/versions";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";
export class ModService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Fetch all available mods
   * @returns mods A collection of mods
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public listMods(): CancelablePromise<mods | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/mods",
      errors: {
        403: `User is not authorized`,
      },
    });
  }
  /**
   * Create a new mod
   * @param mod The mod data to create
   * @returns mod The created mod data
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public createMod(mod: mod): CancelablePromise<mod | general_error> {
    return this.httpRequest.request({
      method: "POST",
      url: "/mods",
      body: mod,
      errors: {
        403: `User is not authorized`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Fetch a specific mod
   * @param modId A mod UUID or slug
   * @returns mod The fetched mod details
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public showMod(modId: string): CancelablePromise<mod | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/mods/{mod_id}",
      path: {
        mod_id: modId,
      },
      errors: {
        403: `User is not authorized`,
        404: `Mod not found`,
      },
    });
  }
  /**
   * Update a specific mod
   * @param modId A mod UUID or slug
   * @param mod The mod data to update
   * @returns mod The updated mod details
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public updateMod(
    modId: string,
    mod: mod,
  ): CancelablePromise<mod | general_error> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/mods/{mod_id}",
      path: {
        mod_id: modId,
      },
      body: mod,
      errors: {
        403: `User is not authorized`,
        404: `Mod not found`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Delete a specific mod
   * @param modId A mod UUID or slug
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public deleteMod(modId: string): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/mods/{mod_id}",
      path: {
        mod_id: modId,
      },
      errors: {
        400: `Failed to delete the mod`,
        403: `User is not authorized`,
        404: `Mod not found`,
      },
    });
  }
  /**
   * Fetch all users attached to mod
   * @param modId A mod UUID or slug
   * @returns mod_users A collection of mod users
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public listModUsers(
    modId: string,
  ): CancelablePromise<mod_users | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/mods/{mod_id}/users",
      path: {
        mod_id: modId,
      },
      errors: {
        403: `User is not authorized`,
        404: `Mod not found`,
      },
    });
  }
  /**
   * Attach a user to mod
   * @param modId A mod UUID or slug
   * @param modUser The mod user data to attach
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public attachModToUser(
    modId: string,
    modUser: mod_user_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "POST",
      url: "/mods/{mod_id}/users",
      path: {
        mod_id: modId,
      },
      body: modUser,
      errors: {
        403: `User is not authorized`,
        404: `Mod or user not found`,
        412: `User is already attached`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Update user perms for mod
   * @param modId A mod UUID or slug
   * @param modUser The mod user data to update
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public permitModUser(
    modId: string,
    modUser: mod_user_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/mods/{mod_id}/users",
      path: {
        mod_id: modId,
      },
      body: modUser,
      errors: {
        403: `User is not authorized`,
        404: `Mod or user not found`,
        412: `User is not attached`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Remove a user from mod
   * @param modId A mod UUID or slug
   * @param modUser The mod user data to delete
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public deleteModFromUser(
    modId: string,
    modUser: mod_user_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/mods/{mod_id}/users",
      path: {
        mod_id: modId,
      },
      body: modUser,
      errors: {
        403: `User is not authorized`,
        404: `Mod or user not found`,
        412: `User is not attached`,
      },
    });
  }
  /**
   * Fetch all teams attached to mod
   * @param modId A mod UUID or slug
   * @returns mod_teams A collection of mod teams
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public listModTeams(
    modId: string,
  ): CancelablePromise<mod_teams | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/mods/{mod_id}/teams",
      path: {
        mod_id: modId,
      },
      errors: {
        403: `User is not authorized`,
        404: `Mod not found`,
      },
    });
  }
  /**
   * Attach a team to mod
   * @param modId A mod UUID or slug
   * @param modTeam The mod team data to attach
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public attachModToTeam(
    modId: string,
    modTeam: mod_team_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "POST",
      url: "/mods/{mod_id}/teams",
      path: {
        mod_id: modId,
      },
      body: modTeam,
      errors: {
        403: `User is not authorized`,
        404: `Mod or team not found`,
        412: `Team is already attached`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Update team perms for mod
   * @param modId A mod UUID or slug
   * @param modTeam The mod team data to update
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public permitModTeam(
    modId: string,
    modTeam: mod_team_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/mods/{mod_id}/teams",
      path: {
        mod_id: modId,
      },
      body: modTeam,
      errors: {
        403: `User is not authorized`,
        404: `Mod or team not found`,
        412: `Team is not attached`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Remove a team from mod
   * @param modId A mod UUID or slug
   * @param modTeam The mod team data to delete
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public deleteModFromTeam(
    modId: string,
    modTeam: mod_team_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/mods/{mod_id}/teams",
      path: {
        mod_id: modId,
      },
      body: modTeam,
      errors: {
        403: `User is not authorized`,
        404: `Mod or team not found`,
        412: `Team is not attached`,
      },
    });
  }
  /**
   * Fetch all available versions for a mod
   * @param modId A mod UUID or slug
   * @returns versions A collection of versions
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public listVersions(
    modId: string,
  ): CancelablePromise<versions | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/mods/{mod_id}/versions",
      path: {
        mod_id: modId,
      },
      errors: {
        403: `User is not authorized`,
        404: `Mod not found`,
      },
    });
  }
  /**
   * Create a new version for a mod
   * @param modId A mod UUID or slug
   * @param version The version data to create
   * @returns version The created version data
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public createVersion(
    modId: string,
    version: version,
  ): CancelablePromise<version | general_error> {
    return this.httpRequest.request({
      method: "POST",
      url: "/mods/{mod_id}/versions",
      path: {
        mod_id: modId,
      },
      body: version,
      errors: {
        403: `User is not authorized`,
        404: `Mod not found`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Fetch a specific version for a mod
   * @param modId A mod UUID or slug
   * @param versionId A version UUID or slug
   * @returns version The fetched version details
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public showVersion(
    modId: string,
    versionId: string,
  ): CancelablePromise<version | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/mods/{mod_id}/versions/{version_id}",
      path: {
        mod_id: modId,
        version_id: versionId,
      },
      errors: {
        403: `User is not authorized`,
        404: `Version or mod not found`,
      },
    });
  }
  /**
   * Update a specific version for a mod
   * @param modId A mod UUID or slug
   * @param versionId A version UUID or slug
   * @param version The version data to update
   * @returns version The updated version details
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public updateVersion(
    modId: string,
    versionId: string,
    version: version,
  ): CancelablePromise<version | general_error> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/mods/{mod_id}/versions/{version_id}",
      path: {
        mod_id: modId,
        version_id: versionId,
      },
      body: version,
      errors: {
        403: `User is not authorized`,
        404: `Version or mod not found`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Delete a specific version for a mod
   * @param modId A mod UUID or slug
   * @param versionId A version UUID or slug
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public deleteVersion(
    modId: string,
    versionId: string,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/mods/{mod_id}/versions/{version_id}",
      path: {
        mod_id: modId,
        version_id: versionId,
      },
      errors: {
        400: `Failed to delete the version`,
        403: `User is not authorized`,
        404: `Version or mod not found`,
      },
    });
  }
  /**
   * Fetch all builds assigned to version
   * @param modId A mod UUID or slug
   * @param versionId A version UUID or slug
   * @returns version_builds A collection of version builds
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public listVersionBuilds(
    modId: string,
    versionId: string,
  ): CancelablePromise<version_builds | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/mods/{mod_id}/versions/{version_id}/builds",
      path: {
        mod_id: modId,
        version_id: versionId,
      },
      errors: {
        403: `User is not authorized`,
        404: `Version or mod not found`,
      },
    });
  }
  /**
   * Assign a build to a version
   * @param modId A mod UUID or slug
   * @param versionId A version UUID or slug
   * @param versionBuild The build data to append to version
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public appendVersionToBuild(
    modId: string,
    versionId: string,
    versionBuild: version_build_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "POST",
      url: "/mods/{mod_id}/versions/{version_id}/builds",
      path: {
        mod_id: modId,
        version_id: versionId,
      },
      body: versionBuild,
      errors: {
        403: `User is not authorized`,
        404: `Build, version or mod not found`,
        412: `Build is already assigned`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Unlink a build from a version
   * @param modId A mod UUID or slug
   * @param versionId A version UUID or slug
   * @param versionBuild The build data to unlink from version
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public deleteVersionFromBuild(
    modId: string,
    versionId: string,
    versionBuild: version_build_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/mods/{mod_id}/versions/{version_id}/builds",
      path: {
        mod_id: modId,
        version_id: versionId,
      },
      body: versionBuild,
      errors: {
        400: `Failed to unlink build`,
        403: `User is not authorized`,
        404: `Version or mod not found`,
        412: `Build is not assigned`,
      },
    });
  }
}
