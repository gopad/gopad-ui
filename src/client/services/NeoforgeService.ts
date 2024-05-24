/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { general_error } from '../models/general_error';
import type { neoforge_build_params } from '../models/neoforge_build_params';
import type { neoforge_builds } from '../models/neoforge_builds';
import type { neoforges } from '../models/neoforges';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class NeoforgeService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Fetch the available Neoforge versions
     * @returns neoforges A collection of Neoforge versions
     * @returns general_error Some error unrelated to the handler
     * @throws ApiError
     */
    public listNeoforges(): CancelablePromise<neoforges | general_error> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/neoforge',
            errors: {
                403: `User is not authorized`,
            },
        });
    }
    /**
     * Update the available Neoforge versions
     * @returns general_error Plain success message
     * @throws ApiError
     */
    public updateNeoforge(): CancelablePromise<general_error> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/neoforge',
            errors: {
                403: `User is not authorized`,
                503: `If remote source is not available`,
            },
        });
    }
    /**
     * Search for available Neoforge versions
     * @param neoforgeId A search token to search Neoforge versions
     * @returns neoforges A collection of Neoforge versions
     * @returns general_error Some error unrelated to the handler
     * @throws ApiError
     */
    public searchNeoforges(
        neoforgeId: string,
    ): CancelablePromise<neoforges | general_error> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/neoforge/{neoforge_id}',
            path: {
                'neoforge_id': neoforgeId,
            },
            errors: {
                403: `User is not authorized`,
            },
        });
    }
    /**
     * Fetch the builds assigned to a Neoforge version
     * @param neoforgeId A neoforge UUID or slug
     * @returns neoforge_builds A collection of assigned builds
     * @returns general_error Some error unrelated to the handler
     * @throws ApiError
     */
    public listNeoforgeBuilds(
        neoforgeId: string,
    ): CancelablePromise<neoforge_builds | general_error> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/neoforge/{neoforge_id}/builds',
            path: {
                'neoforge_id': neoforgeId,
            },
            errors: {
                403: `User is not authorized`,
                404: `Neoforge or build not found`,
            },
        });
    }
    /**
     * Assign a build to a Neoforge version
     * @param neoforgeId A neoforge UUID or slug
     * @param neoforgeBuild The build data to append
     * @returns general_error Plain success message
     * @throws ApiError
     */
    public appendNeoforgeToBuild(
        neoforgeId: string,
        neoforgeBuild: neoforge_build_params,
    ): CancelablePromise<general_error> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/neoforge/{neoforge_id}/builds',
            path: {
                'neoforge_id': neoforgeId,
            },
            body: neoforgeBuild,
            errors: {
                403: `User is not authorized`,
                404: `Neoforge or build not found`,
                406: `Failed to update build`,
                412: `Build is already assigned`,
            },
        });
    }
    /**
     * Unlink a build from a Neoforge version
     * @param neoforgeId A neoforge UUID or slug
     * @param neoforgeBuild The build data to unlink
     * @returns general_error Plain success message
     * @throws ApiError
     */
    public deleteNeoforgeFromBuild(
        neoforgeId: string,
        neoforgeBuild: neoforge_build_params,
    ): CancelablePromise<general_error> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/neoforge/{neoforge_id}/builds',
            path: {
                'neoforge_id': neoforgeId,
            },
            body: neoforgeBuild,
            errors: {
                403: `User is not authorized`,
                404: `Neoforge or build not found`,
                406: `Failed to update build`,
                412: `Build is not assigned`,
            },
        });
    }
}
