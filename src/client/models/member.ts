/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { team } from './team';
import type { user } from './user';
export type member = {
    team_id: string;
    readonly team?: team;
    user_id: string;
    readonly user?: user;
    perm: member.perm;
    readonly created_at?: string;
    readonly updated_at?: string;
};
export namespace member {
    export enum perm {
        USER = 'user',
        ADMIN = 'admin',
        OWNER = 'owner',
    }
}

