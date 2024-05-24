/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { forge_build_params } from '../models/forge_build_params';
import type { forge_builds } from '../models/forge_builds';
import type { forges } from '../models/forges';
import type { general_error } from '../models/general_error';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ForgeService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Fetch the available Forge versions
     * @returns forges A collection of Forge versions
     * @returns general_error Some error unrelated to the handler
     * @throws ApiError
     */
    public listForges(): CancelablePromise<forges | general_error> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/forge',
            errors: {
                403: `User is not authorized`,
            },
        });
    }
    /**
     * Update the available Forge versions
     * @returns general_error Plain success message
     * @throws ApiError
     */
    public updateForge(): CancelablePromise<general_error> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/forge',
            errors: {
                403: `User is not authorized`,
                503: `If remote source is not available`,
            },
        });
    }
    /**
     * Search for available Forge versions
     * @param forgeId A search token to search Forge versions
     * @returns forges A collection of Forge versions
     * @returns general_error Some error unrelated to the handler
     * @throws ApiError
     */
    public searchForges(
        forgeId: string,
    ): CancelablePromise<forges | general_error> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/forge/{forge_id}',
            path: {
                'forge_id': forgeId,
            },
            errors: {
                403: `User is not authorized`,
            },
        });
    }
    /**
     * Fetch the builds assigned to a Forge version
     * @param forgeId A forge UUID or slug
     * @returns forge_builds A collection of assigned builds
     * @returns general_error Some error unrelated to the handler
     * @throws ApiError
     */
    public listForgeBuilds(
        forgeId: string,
    ): CancelablePromise<forge_builds | general_error> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/forge/{forge_id}/builds',
            path: {
                'forge_id': forgeId,
            },
            errors: {
                403: `User is not authorized`,
                404: `Forge or build not found`,
            },
        });
    }
    /**
     * Assign a build to a Forge version
     * @param forgeId A forge UUID or slug
     * @param forgeBuild The build data to append
     * @returns general_error Plain success message
     * @throws ApiError
     */
    public appendForgeToBuild(
        forgeId: string,
        forgeBuild: forge_build_params,
    ): CancelablePromise<general_error> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/forge/{forge_id}/builds',
            path: {
                'forge_id': forgeId,
            },
            body: forgeBuild,
            errors: {
                403: `User is not authorized`,
                404: `Forge or build not found`,
                406: `Failed to update build`,
                412: `Build is already assigned`,
            },
        });
    }
    /**
     * Unlink a build from a Forge version
     * @param forgeId A forge UUID or slug
     * @param forgeBuild The build data to unlink
     * @returns general_error Plain success message
     * @throws ApiError
     */
    public deleteForgeFromBuild(
        forgeId: string,
        forgeBuild: forge_build_params,
    ): CancelablePromise<general_error> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/forge/{forge_id}/builds',
            path: {
                'forge_id': forgeId,
            },
            body: forgeBuild,
            errors: {
                403: `User is not authorized`,
                404: `Forge or build not found`,
                406: `Failed to update build`,
                412: `Build is not assigned`,
            },
        });
    }
}
