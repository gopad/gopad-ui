/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { build } from "../models/build";
import type { build_version_params } from "../models/build_version_params";
import type { build_versions } from "../models/build_versions";
import type { builds } from "../models/builds";
import type { general_error } from "../models/general_error";
import type { pack } from "../models/pack";
import type { pack_team_params } from "../models/pack_team_params";
import type { pack_teams } from "../models/pack_teams";
import type { pack_user_params } from "../models/pack_user_params";
import type { pack_users } from "../models/pack_users";
import type { packs } from "../models/packs";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";
export class PackService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Fetch all available packs
   * @returns packs A collection of packs
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public listPacks(): CancelablePromise<packs | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/packs",
      errors: {
        403: `User is not authorized`,
      },
    });
  }
  /**
   * Create a new pack
   * @param pack The pack data to create
   * @returns pack The created pack data
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public createPack(pack: pack): CancelablePromise<pack | general_error> {
    return this.httpRequest.request({
      method: "POST",
      url: "/packs",
      body: pack,
      errors: {
        403: `User is not authorized`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Fetch a specific pack
   * @param packId A pack UUID or slug
   * @returns pack The fetched pack details
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public showPack(packId: string): CancelablePromise<pack | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/packs/{pack_id}",
      path: {
        pack_id: packId,
      },
      errors: {
        403: `User is not authorized`,
        404: `Pack not found`,
      },
    });
  }
  /**
   * Update a specific pack
   * @param packId A pack UUID or slug
   * @param pack The pack data to update
   * @returns pack The updated pack details
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public updatePack(
    packId: string,
    pack: pack,
  ): CancelablePromise<pack | general_error> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/packs/{pack_id}",
      path: {
        pack_id: packId,
      },
      body: pack,
      errors: {
        403: `User is not authorized`,
        404: `Pack not found`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Delete a specific pack
   * @param packId A pack UUID or slug
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public deletePack(packId: string): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/packs/{pack_id}",
      path: {
        pack_id: packId,
      },
      errors: {
        400: `Failed to delete the pack`,
        403: `User is not authorized`,
        404: `Pack not found`,
      },
    });
  }
  /**
   * Fetch all users attached to pack
   * @param packId A pack UUID or slug
   * @returns pack_users A collection of pack users
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public listPackUsers(
    packId: string,
  ): CancelablePromise<pack_users | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/packs/{pack_id}/users",
      path: {
        pack_id: packId,
      },
      errors: {
        403: `User is not authorized`,
        404: `Pack not found`,
      },
    });
  }
  /**
   * Attach a user to pack
   * @param packId A pack UUID or slug
   * @param packUser The pack user data to attach
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public attachPackToUser(
    packId: string,
    packUser: pack_user_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "POST",
      url: "/packs/{pack_id}/users",
      path: {
        pack_id: packId,
      },
      body: packUser,
      errors: {
        403: `User is not authorized`,
        404: `Pack or user not found`,
        412: `User is already attached`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Update user perms for pack
   * @param packId A pack UUID or slug
   * @param packUser The pack user data to update
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public permitPackUser(
    packId: string,
    packUser: pack_user_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/packs/{pack_id}/users",
      path: {
        pack_id: packId,
      },
      body: packUser,
      errors: {
        403: `User is not authorized`,
        404: `Pack or user not found`,
        412: `User is not attached`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Remove a user from pack
   * @param packId A pack UUID or slug
   * @param packUser The pack user data to delete
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public deletePackFromUser(
    packId: string,
    packUser: pack_user_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/packs/{pack_id}/users",
      path: {
        pack_id: packId,
      },
      body: packUser,
      errors: {
        403: `User is not authorized`,
        404: `Pack or user not found`,
        412: `User is not attached`,
      },
    });
  }
  /**
   * Fetch all teams attached to pack
   * @param packId A pack UUID or slug
   * @returns pack_teams A collection of pack teams
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public listPackTeams(
    packId: string,
  ): CancelablePromise<pack_teams | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/packs/{pack_id}/teams",
      path: {
        pack_id: packId,
      },
      errors: {
        403: `User is not authorized`,
        404: `Pack not found`,
      },
    });
  }
  /**
   * Attach a team to pack
   * @param packId A pack UUID or slug
   * @param packTeam The pack team data to attach
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public attachPackToTeam(
    packId: string,
    packTeam: pack_team_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "POST",
      url: "/packs/{pack_id}/teams",
      path: {
        pack_id: packId,
      },
      body: packTeam,
      errors: {
        403: `User is not authorized`,
        404: `Pack or team not found`,
        412: `Team is already attached`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Update team perms for pack
   * @param packId A pack UUID or slug
   * @param packTeam The pack team data to update
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public permitPackTeam(
    packId: string,
    packTeam: pack_team_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/packs/{pack_id}/teams",
      path: {
        pack_id: packId,
      },
      body: packTeam,
      errors: {
        403: `User is not authorized`,
        404: `Pack or team not found`,
        412: `Team is not attached`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Remove a team from pack
   * @param packId A pack UUID or slug
   * @param packTeam The pack team data to delete
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public deletePackFromTeam(
    packId: string,
    packTeam: pack_team_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/packs/{pack_id}/teams",
      path: {
        pack_id: packId,
      },
      body: packTeam,
      errors: {
        403: `User is not authorized`,
        404: `Pack or team not found`,
        412: `Team is not attached`,
      },
    });
  }
  /**
   * Fetch all available builds for a pack
   * @param packId A pack UUID or slug
   * @returns builds A collection of builds
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public listBuilds(packId: string): CancelablePromise<builds | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/packs/{pack_id}/builds",
      path: {
        pack_id: packId,
      },
      errors: {
        403: `User is not authorized`,
        404: `Pack not found`,
      },
    });
  }
  /**
   * Create a new build for a pack
   * @param packId A pack UUID or slug
   * @param build The build data to create
   * @returns build The created build data
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public createBuild(
    packId: string,
    build: build,
  ): CancelablePromise<build | general_error> {
    return this.httpRequest.request({
      method: "POST",
      url: "/packs/{pack_id}/builds",
      path: {
        pack_id: packId,
      },
      body: build,
      errors: {
        403: `User is not authorized`,
        404: `Pack not found`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Fetch a specific build for a pack
   * @param packId A pack UUID or slug
   * @param buildId A build UUID or slug
   * @returns build The fetched build details
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public showBuild(
    packId: string,
    buildId: string,
  ): CancelablePromise<build | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/packs/{pack_id}/builds/{build_id}",
      path: {
        pack_id: packId,
        build_id: buildId,
      },
      errors: {
        403: `User is not authorized`,
        404: `Build or pack not found`,
      },
    });
  }
  /**
   * Update a specific build for a pack
   * @param packId A pack UUID or slug
   * @param buildId A build UUID or slug
   * @param build The build data to update
   * @returns build The updated build details
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public updateBuild(
    packId: string,
    buildId: string,
    build: build,
  ): CancelablePromise<build | general_error> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/packs/{pack_id}/builds/{build_id}",
      path: {
        pack_id: packId,
        build_id: buildId,
      },
      body: build,
      errors: {
        403: `User is not authorized`,
        404: `Build or pack not found`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Delete a specific build for a pack
   * @param packId A pack UUID or slug
   * @param buildId A build UUID or slug
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public deleteBuild(
    packId: string,
    buildId: string,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/packs/{pack_id}/builds/{build_id}",
      path: {
        pack_id: packId,
        build_id: buildId,
      },
      errors: {
        400: `Failed to delete the build`,
        403: `User is not authorized`,
        404: `Build or pack not found`,
      },
    });
  }
  /**
   * Fetch all versions assigned to build
   * @param packId A pack UUID or slug
   * @param buildId A build UUID or slug
   * @returns build_versions A collection of build versions
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public listBuildVersions(
    packId: string,
    buildId: string,
  ): CancelablePromise<build_versions | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/packs/{pack_id}/builds/{build_id}/versions",
      path: {
        pack_id: packId,
        build_id: buildId,
      },
      errors: {
        403: `User is not authorized`,
        404: `Build or pack not found`,
      },
    });
  }
  /**
   * Assign a version to a build
   * @param packId A pack UUID or slug
   * @param buildId A build UUID or slug
   * @param buildVersion The version data to append to build
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public appendBuildToVersion(
    packId: string,
    buildId: string,
    buildVersion: build_version_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "POST",
      url: "/packs/{pack_id}/builds/{build_id}/versions",
      path: {
        pack_id: packId,
        build_id: buildId,
      },
      body: buildVersion,
      errors: {
        403: `User is not authorized`,
        404: `Build or pack not found`,
        412: `Version is already assigned`,
        422: `Failed to validate request`,
      },
    });
  }
  /**
   * Unlink a version from a build
   * @param packId A pack UUID or slug
   * @param buildId A build UUID or slug
   * @param buildVersion The version data to unlink from build
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public deleteBuildFromVersion(
    packId: string,
    buildId: string,
    buildVersion: build_version_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/packs/{pack_id}/builds/{build_id}/versions",
      path: {
        pack_id: packId,
        build_id: buildId,
      },
      body: buildVersion,
      errors: {
        400: `Failed to unlink build`,
        403: `User is not authorized`,
        404: `Build or pack not found`,
        412: `Version is not assigned`,
      },
    });
  }
}
