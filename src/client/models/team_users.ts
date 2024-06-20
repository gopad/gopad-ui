/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { team } from "./team";
import type { user_team } from "./user_team";
/**
 * Model to represent team users
 */
export type team_users = {
  readonly team?: team;
  total?: number;
  users?: Array<user_team>;
};
