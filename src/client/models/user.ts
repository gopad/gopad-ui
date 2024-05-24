/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { member } from "./member";
import type { user_mod } from "./user_mod";
import type { user_pack } from "./user_pack";
export type user = {
  readonly id?: string;
  slug?: string | null;
  email?: string | null;
  username: string | null;
  password?: string | null;
  fullname?: string | null;
  admin?: boolean | null;
  active?: boolean | null;
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly teams?: Array<member> | null;
  readonly packs?: Array<user_pack> | null;
  readonly mods?: Array<user_mod> | null;
};
