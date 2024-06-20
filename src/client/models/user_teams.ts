/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { user } from './user';
import type { user_team } from './user_team';
/**
 * Model to represent user teams
 */
export type user_teams = {
    readonly user?: user;
    total?: number;
    teams?: Array<user_team>;
};

