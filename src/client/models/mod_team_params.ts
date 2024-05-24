/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type mod_team_params = {
    team: string;
    perm: mod_team_params.perm;
};
export namespace mod_team_params {
    export enum perm {
        USER = 'user',
        ADMIN = 'admin',
        OWNER = 'owner',
    }
}

