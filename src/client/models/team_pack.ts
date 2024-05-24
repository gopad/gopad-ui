/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { pack } from './pack';
import type { team } from './team';
export type team_pack = {
    team_id: string;
    readonly team?: team;
    pack_id: string;
    readonly pack?: pack;
    perm: team_pack.perm;
    readonly created_at?: string;
    readonly updated_at?: string;
};
export namespace team_pack {
    export enum perm {
        USER = 'user',
        ADMIN = 'admin',
        OWNER = 'owner',
    }
}

