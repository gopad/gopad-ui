/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { fabric_build_params } from '../models/fabric_build_params';
import type { fabric_builds } from '../models/fabric_builds';
import type { fabrics } from '../models/fabrics';
import type { general_error } from '../models/general_error';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class FabricService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Fetch the available fabric versions
     * @returns fabrics A collection of fabric versions
     * @returns general_error Some error unrelated to the handler
     * @throws ApiError
     */
    public listFabrics(): CancelablePromise<fabrics | general_error> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/fabric',
            errors: {
                403: `User is not authorized`,
            },
        });
    }
    /**
     * Update the available fabric versions
     * @returns general_error Plain success message
     * @throws ApiError
     */
    public updateFabric(): CancelablePromise<general_error> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/fabric',
            errors: {
                403: `User is not authorized`,
                503: `If remote source is not available`,
            },
        });
    }
    /**
     * Search for available fabric versions
     * @param fabricId A search token to search fabric versions
     * @returns fabrics A collection of fabric versions
     * @returns general_error Some error unrelated to the handler
     * @throws ApiError
     */
    public searchFabrics(
        fabricId: string,
    ): CancelablePromise<fabrics | general_error> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/fabric/{fabric_id}',
            path: {
                'fabric_id': fabricId,
            },
            errors: {
                403: `User is not authorized`,
            },
        });
    }
    /**
     * Fetch the builds assigned to a Fabric version
     * @param fabricId A fabric UUID or slug
     * @returns fabric_builds A collection of assigned builds
     * @returns general_error Some error unrelated to the handler
     * @throws ApiError
     */
    public listFabricBuilds(
        fabricId: string,
    ): CancelablePromise<fabric_builds | general_error> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/fabric/{fabric_id}/builds',
            path: {
                'fabric_id': fabricId,
            },
            errors: {
                403: `User is not authorized`,
                404: `Fabric or build not found`,
            },
        });
    }
    /**
     * Assign a build to a Fabric version
     * @param fabricId A fabric UUID or slug
     * @param fabricBuild The build data to append
     * @returns general_error Plain success message
     * @throws ApiError
     */
    public appendFabricToBuild(
        fabricId: string,
        fabricBuild: fabric_build_params,
    ): CancelablePromise<general_error> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/fabric/{fabric_id}/builds',
            path: {
                'fabric_id': fabricId,
            },
            body: fabricBuild,
            errors: {
                403: `User is not authorized`,
                404: `Fabric or build not found`,
                406: `Failed to update build`,
                412: `Build is already assigned`,
            },
        });
    }
    /**
     * Unlink a build from a Fabric version
     * @param fabricId A fabric UUID or slug
     * @param fabricBuild The build data to unlink
     * @returns general_error Plain success message
     * @throws ApiError
     */
    public deleteFabricFromBuild(
        fabricId: string,
        fabricBuild: fabric_build_params,
    ): CancelablePromise<general_error> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/fabric/{fabric_id}/builds',
            path: {
                'fabric_id': fabricId,
            },
            body: fabricBuild,
            errors: {
                403: `User is not authorized`,
                404: `Fabric or build not found`,
                406: `Failed to update build`,
                412: `Build is not assigned`,
            },
        });
    }
}
