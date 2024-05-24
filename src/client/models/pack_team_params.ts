/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type pack_team_params = {
  team: string;
  perm: pack_team_params.perm;
};
export namespace pack_team_params {
  export enum perm {
    USER = "user",
    ADMIN = "admin",
    OWNER = "owner",
  }
}
