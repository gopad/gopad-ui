/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Parameters to attach or unlink team user
 */
export type team_user_params = {
  user: string;
  perm?: team_user_params.perm;
};
export namespace team_user_params {
  export enum perm {
    USER = "user",
    ADMIN = "admin",
    OWNER = "owner",
  }
}
