/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { auth_token } from '../models/auth_token';
import type { general_error } from '../models/general_error';
import type { profile } from '../models/profile';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ProfileService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Retrieve an unlimited auth token
     * @returns auth_token The unlimited auth token
     * @returns general_error Some error unrelated to the handler
     * @throws ApiError
     */
    public tokenProfile(): CancelablePromise<auth_token | general_error> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/profile/token',
            errors: {
                403: `User is not authorized`,
                500: `Failed to generate a token`,
            },
        });
    }
    /**
     * Fetch profile details of the personal account
     * @returns profile The current profile data
     * @returns general_error Some error unrelated to the handler
     * @throws ApiError
     */
    public showProfile(): CancelablePromise<profile | general_error> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/profile/self',
            errors: {
                403: `User is not authorized`,
            },
        });
    }
    /**
     * Update profile details of the personal account
     * @param profile The profile data to update
     * @returns profile The updated profile data
     * @returns general_error Some error unrelated to the handler
     * @throws ApiError
     */
    public updateProfile(
        profile: profile,
    ): CancelablePromise<profile | general_error> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/profile/self',
            body: profile,
            errors: {
                403: `User is not authorized`,
                422: `Failed to validate request`,
            },
        });
    }
}
