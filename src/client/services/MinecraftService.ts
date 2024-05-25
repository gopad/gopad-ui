/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { general_error } from "../models/general_error";
import type { minecraft_build_params } from "../models/minecraft_build_params";
import type { minecraft_builds } from "../models/minecraft_builds";
import type { minecrafts } from "../models/minecrafts";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";
export class MinecraftService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Fetch the available Minecraft versions
   * @returns minecrafts A collection of Minecraft versions
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public listMinecrafts(): CancelablePromise<minecrafts | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/minecraft",
      errors: {
        403: `User is not authorized`,
      },
    });
  }
  /**
   * Update the available Minecraft versions
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public updateMinecraft(): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/minecraft",
      errors: {
        403: `User is not authorized`,
        503: `If remote source is not available`,
      },
    });
  }
  /**
   * Search for available Minecraft versions
   * @param minecraftId A search token to search Minecraft versions
   * @returns minecrafts A collection of Minecraft versions
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public searchMinecrafts(
    minecraftId: string,
  ): CancelablePromise<minecrafts | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/minecraft/{minecraft_id}",
      path: {
        minecraft_id: minecraftId,
      },
      errors: {
        403: `User is not authorized`,
      },
    });
  }
  /**
   * Fetch the builds assigned to a Minecraft version
   * @param minecraftId A minecraft UUID or slug
   * @returns minecraft_builds A collection of assigned builds
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public listMinecraftBuilds(
    minecraftId: string,
  ): CancelablePromise<minecraft_builds | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/minecraft/{minecraft_id}/builds",
      path: {
        minecraft_id: minecraftId,
      },
      errors: {
        403: `User is not authorized`,
        404: `Minecraft or build not found`,
      },
    });
  }
  /**
   * Assign a build to a Minecraft version
   * @param minecraftId A minecraft UUID or slug
   * @param minecraftBuild The build data to append
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public appendMinecraftToBuild(
    minecraftId: string,
    minecraftBuild: minecraft_build_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "POST",
      url: "/minecraft/{minecraft_id}/builds",
      path: {
        minecraft_id: minecraftId,
      },
      body: minecraftBuild,
      errors: {
        403: `User is not authorized`,
        404: `Minecraft or build not found`,
        406: `Failed to update build`,
        412: `Build is already assigned`,
      },
    });
  }
  /**
   * Unlink a build from a Minecraft version
   * @param minecraftId A minecraft UUID or slug
   * @param minecraftBuild The build data to unlink
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public deleteMinecraftFromBuild(
    minecraftId: string,
    minecraftBuild: minecraft_build_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/minecraft/{minecraft_id}/builds",
      path: {
        minecraft_id: minecraftId,
      },
      body: minecraftBuild,
      errors: {
        403: `User is not authorized`,
        404: `Minecraft or build not found`,
        406: `Failed to update build`,
        412: `Build is not assigned`,
      },
    });
  }
}
