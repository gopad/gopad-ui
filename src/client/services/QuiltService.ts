/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { general_error } from "../models/general_error";
import type { quilt_build_params } from "../models/quilt_build_params";
import type { quilt_builds } from "../models/quilt_builds";
import type { quilts } from "../models/quilts";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";
export class QuiltService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Fetch the available quilt versions
   * @returns quilts A collection of quilt versions
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public listQuilts(): CancelablePromise<quilts | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/quilt",
      errors: {
        403: `User is not authorized`,
      },
    });
  }
  /**
   * Update the available quilt versions
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public updateQuilt(): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/quilt",
      errors: {
        403: `User is not authorized`,
        503: `If remote source is not available`,
      },
    });
  }
  /**
   * Search for available quilt versions
   * @param quiltId A search token to search quilt versions
   * @returns quilts A collection of quilt versions
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public searchQuilts(
    quiltId: string,
  ): CancelablePromise<quilts | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/quilt/{quilt_id}",
      path: {
        quilt_id: quiltId,
      },
      errors: {
        403: `User is not authorized`,
      },
    });
  }
  /**
   * Fetch the builds assigned to a Quilt version
   * @param quiltId A quilt UUID or slug
   * @returns quilt_builds A collection of assigned builds
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public listQuiltBuilds(
    quiltId: string,
  ): CancelablePromise<quilt_builds | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/quilt/{quilt_id}/builds",
      path: {
        quilt_id: quiltId,
      },
      errors: {
        403: `User is not authorized`,
        404: `Quilt or build not found`,
      },
    });
  }
  /**
   * Assign a build to a Quilt version
   * @param quiltId A quilt UUID or slug
   * @param quiltBuild The build data to append
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public appendQuiltToBuild(
    quiltId: string,
    quiltBuild: quilt_build_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "POST",
      url: "/quilt/{quilt_id}/builds",
      path: {
        quilt_id: quiltId,
      },
      body: quiltBuild,
      errors: {
        403: `User is not authorized`,
        404: `Quilt or build not found`,
        406: `Failed to update build`,
        412: `Build is already assigned`,
      },
    });
  }
  /**
   * Unlink a build from a Quilt version
   * @param quiltId A quilt UUID or slug
   * @param quiltBuild The build data to unlink
   * @returns general_error Plain success message
   * @throws ApiError
   */
  public deleteQuiltFromBuild(
    quiltId: string,
    quiltBuild: quilt_build_params,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/quilt/{quilt_id}/builds",
      path: {
        quilt_id: quiltId,
      },
      body: quiltBuild,
      errors: {
        403: `User is not authorized`,
        404: `Quilt or build not found`,
        406: `Failed to update build`,
        412: `Build is not assigned`,
      },
    });
  }
}
