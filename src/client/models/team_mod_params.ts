/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type team_mod_params = {
    mod: string;
    perm: team_mod_params.perm;
};
export namespace team_mod_params {
    export enum perm {
        USER = 'user',
        ADMIN = 'admin',
        OWNER = 'owner',
    }
}

