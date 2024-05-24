/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { mod } from "./mod";
import type { team } from "./team";
export type team_mod = {
  team_id: string;
  readonly team?: team;
  mod_id: string;
  readonly mod?: mod;
  perm: team_mod.perm;
  readonly created_at?: string;
  readonly updated_at?: string;
};
export namespace team_mod {
  export enum perm {
    USER = "user",
    ADMIN = "admin",
    OWNER = "owner",
  }
}
