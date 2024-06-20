/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { user_team } from "./user_team";
/**
 * Model to represent team
 */
export type team = {
  readonly id?: string;
  slug?: string;
  name?: string;
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly users?: Array<user_team>;
};
