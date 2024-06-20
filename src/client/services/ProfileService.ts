/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { auth_token } from '../models/auth_token';
import type { notification } from '../models/notification';
import type { profile } from '../models/profile';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ProfileService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Retrieve an unlimited auth token
     * @returns auth_token Generated token never expiring
     * @returns notification Some error unrelated to the handler
     * @throws ApiError
     */
    public tokenProfile(): CancelablePromise<auth_token | notification> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/profile/token',
            errors: {
                403: `User is not authorized`,
                500: `Some internal server error`,
            },
        });
    }
    /**
     * Fetch profile details of the personal account
     * @returns profile The current profile details
     * @returns notification Some error unrelated to the handler
     * @throws ApiError
     */
    public showProfile(): CancelablePromise<profile | notification> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/profile/self',
            errors: {
                403: `User is not authorized`,
                500: `Some internal server error`,
            },
        });
    }
    /**
     * Update your own profile information
     * @param requestBody The profile data to update
     * @returns profile The updated profile details
     * @returns notification Some error unrelated to the handler
     * @throws ApiError
     */
    public updateProfile(
        requestBody: profile,
    ): CancelablePromise<profile | notification> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/profile/self',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `User is not authorized`,
                422: `Failed to validate request`,
                500: `Some internal server error`,
            },
        });
    }
}
