/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type user_mod_params = {
  mod: string;
  perm: user_mod_params.perm;
};
export namespace user_mod_params {
  export enum perm {
    USER = "user",
    ADMIN = "admin",
    OWNER = "owner",
  }
}
