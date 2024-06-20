/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { team } from './team';
import type { user } from './user';
/**
 * Model to represent user team
 */
export type user_team = {
    user_id: string;
    readonly user?: user;
    team_id: string;
    readonly team?: team;
    perm?: user_team.perm;
    readonly created_at?: string;
    readonly updated_at?: string;
};
export namespace user_team {
    export enum perm {
        USER = 'user',
        ADMIN = 'admin',
        OWNER = 'owner',
    }
}

