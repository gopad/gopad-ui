/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { general_error } from '../models/general_error';
import type { user } from '../models/user';
import type { user_mod_params } from '../models/user_mod_params';
import type { user_mods } from '../models/user_mods';
import type { user_pack_params } from '../models/user_pack_params';
import type { user_packs } from '../models/user_packs';
import type { user_team_params } from '../models/user_team_params';
import type { user_teams } from '../models/user_teams';
import type { users } from '../models/users';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UserService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Fetch all available users
     * @returns users A collection of users
     * @returns general_error Some error unrelated to the handler
     * @throws ApiError
     */
    public listUsers(): CancelablePromise<users | general_error> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users',
            errors: {
                403: `User is not authorized`,
            },
        });
    }
    /**
     * Create a new user
     * @param user The user data to create
     * @returns user The created user data
     * @returns general_error Some error unrelated to the handler
     * @throws ApiError
     */
    public createUser(
        user: user,
    ): CancelablePromise<user | general_error> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/users',
            body: user,
            errors: {
                403: `User is not authorized`,
                422: `Failed to validate request`,
            },
        });
    }
    /**
     * Fetch a specific user
     * @param userId A user UUID or slug
     * @returns user The fetched user details
     * @returns general_error Some error unrelated to the handler
     * @throws ApiError
     */
    public showUser(
        userId: string,
    ): CancelablePromise<user | general_error> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/{user_id}',
            path: {
                'user_id': userId,
            },
            errors: {
                403: `User is not authorized`,
                404: `User not found`,
            },
        });
    }
    /**
     * Update a specific user
     * @param userId A user UUID or slug
     * @param user The user data to update
     * @returns user The updated user details
     * @returns general_error Some error unrelated to the handler
     * @throws ApiError
     */
    public updateUser(
        userId: string,
        user: user,
    ): CancelablePromise<user | general_error> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/users/{user_id}',
            path: {
                'user_id': userId,
            },
            body: user,
            errors: {
                403: `User is not authorized`,
                404: `User not found`,
                422: `Failed to validate request`,
            },
        });
    }
    /**
     * Delete a specific user
     * @param userId A user UUID or slug
     * @returns general_error Plain success message
     * @throws ApiError
     */
    public deleteUser(
        userId: string,
    ): CancelablePromise<general_error> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/users/{user_id}',
            path: {
                'user_id': userId,
            },
            errors: {
                400: `Failed to delete the user`,
                403: `User is not authorized`,
                404: `User not found`,
            },
        });
    }
    /**
     * Fetch all teams attached to user
     * @param userId A user UUID or slug
     * @returns user_teams A collection of user teams
     * @returns general_error Some error unrelated to the handler
     * @throws ApiError
     */
    public listUserTeams(
        userId: string,
    ): CancelablePromise<user_teams | general_error> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/{user_id}/teams',
            path: {
                'user_id': userId,
            },
            errors: {
                403: `User is not authorized`,
                404: `User not found`,
            },
        });
    }
    /**
     * Attach a team to user
     * @param userId A user UUID or slug
     * @param userTeam The user team data to attach
     * @returns general_error Plain success message
     * @throws ApiError
     */
    public attachUserToTeam(
        userId: string,
        userTeam: user_team_params,
    ): CancelablePromise<general_error> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/users/{user_id}/teams',
            path: {
                'user_id': userId,
            },
            body: userTeam,
            errors: {
                403: `User is not authorized`,
                404: `User or team not found`,
                412: `Team is already attached`,
                422: `Failed to validate request`,
            },
        });
    }
    /**
     * Update team perms for user
     * @param userId A user UUID or slug
     * @param userTeam The user team data to update
     * @returns general_error Plain success message
     * @throws ApiError
     */
    public permitUserTeam(
        userId: string,
        userTeam: user_team_params,
    ): CancelablePromise<general_error> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/users/{user_id}/teams',
            path: {
                'user_id': userId,
            },
            body: userTeam,
            errors: {
                403: `User is not authorized`,
                404: `User or team not found`,
                412: `Team is not attached`,
                422: `Failed to validate request`,
            },
        });
    }
    /**
     * Remove a team from user
     * @param userId A user UUID or slug
     * @param userTeam The user team data to delete
     * @returns general_error Plain success message
     * @throws ApiError
     */
    public deleteUserFromTeam(
        userId: string,
        userTeam: user_team_params,
    ): CancelablePromise<general_error> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/users/{user_id}/teams',
            path: {
                'user_id': userId,
            },
            body: userTeam,
            errors: {
                403: `User is not authorized`,
                404: `User or team not found`,
                412: `Team is not attached`,
            },
        });
    }
    /**
     * Fetch all mods assigned to user
     * @param userId A user UUID or slug
     * @returns user_mods A collection of user mods
     * @returns general_error Some error unrelated to the handler
     * @throws ApiError
     */
    public listUserMods(
        userId: string,
    ): CancelablePromise<user_mods | general_error> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/{user_id}/mods',
            path: {
                'user_id': userId,
            },
            errors: {
                403: `User is not authorized`,
                404: `User not found`,
            },
        });
    }
    /**
     * Assign a mod to user
     * @param userId A user UUID or slug
     * @param userMod The user mod data to assign
     * @returns general_error Plain success message
     * @throws ApiError
     */
    public attachUserToMod(
        userId: string,
        userMod: user_mod_params,
    ): CancelablePromise<general_error> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/users/{user_id}/mods',
            path: {
                'user_id': userId,
            },
            body: userMod,
            errors: {
                403: `User is not authorized`,
                404: `User or mod not found`,
                412: `Mod is already assigned`,
                422: `Failed to validate request`,
            },
        });
    }
    /**
     * Update mod perms for user
     * @param userId A user UUID or slug
     * @param userMod The user mod data to update
     * @returns general_error Plain success message
     * @throws ApiError
     */
    public permitUserMod(
        userId: string,
        userMod: user_mod_params,
    ): CancelablePromise<general_error> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/users/{user_id}/mods',
            path: {
                'user_id': userId,
            },
            body: userMod,
            errors: {
                403: `User is not authorized`,
                404: `User or mod not found`,
                412: `Mod is not assigned`,
                422: `Failed to validate request`,
            },
        });
    }
    /**
     * Remove a mod from user
     * @param userId A user UUID or slug
     * @param userMod The user mod data to delete
     * @returns general_error Plain success message
     * @throws ApiError
     */
    public deleteUserFromMod(
        userId: string,
        userMod: user_mod_params,
    ): CancelablePromise<general_error> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/users/{user_id}/mods',
            path: {
                'user_id': userId,
            },
            body: userMod,
            errors: {
                403: `User is not authorized`,
                404: `User or mod not found`,
                412: `Mod is not assigned`,
            },
        });
    }
    /**
     * Fetch all packs assigned to user
     * @param userId A user UUID or slug
     * @returns user_packs A collection of team packs
     * @returns general_error Some error unrelated to the handler
     * @throws ApiError
     */
    public listUserPacks(
        userId: string,
    ): CancelablePromise<user_packs | general_error> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/users/{user_id}/packs',
            path: {
                'user_id': userId,
            },
            errors: {
                403: `User is not authorized`,
                404: `User not found`,
            },
        });
    }
    /**
     * Assign a pack to user
     * @param userId A user UUID or slug
     * @param userPack The user pack data to assign
     * @returns general_error Plain success message
     * @throws ApiError
     */
    public attachUserToPack(
        userId: string,
        userPack: user_pack_params,
    ): CancelablePromise<general_error> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/users/{user_id}/packs',
            path: {
                'user_id': userId,
            },
            body: userPack,
            errors: {
                403: `User is not authorized`,
                404: `User or pack not found`,
                412: `Pack is already assigned`,
                422: `Failed to validate request`,
            },
        });
    }
    /**
     * Update pack perms for user
     * @param userId A user UUID or slug
     * @param userPack The user pack data to update
     * @returns general_error Plain success message
     * @throws ApiError
     */
    public permitUserPack(
        userId: string,
        userPack: user_pack_params,
    ): CancelablePromise<general_error> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/users/{user_id}/packs',
            path: {
                'user_id': userId,
            },
            body: userPack,
            errors: {
                403: `User is not authorized`,
                404: `User or pack not found`,
                412: `Pack is not assigned`,
                422: `Failed to validate request`,
            },
        });
    }
    /**
     * Remove a pack from user
     * @param userId A user UUID or slug
     * @param userPack The user pack data to delete
     * @returns general_error Plain success message
     * @throws ApiError
     */
    public deleteUserFromPack(
        userId: string,
        userPack: user_pack_params,
    ): CancelablePromise<general_error> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/users/{user_id}/packs',
            path: {
                'user_id': userId,
            },
            body: userPack,
            errors: {
                403: `User is not authorized`,
                404: `User or pack not found`,
                412: `Pack is not assigned`,
            },
        });
    }
}
