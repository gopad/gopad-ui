/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { member } from "./member";
import type { user_mod } from "./user_mod";
import type { user_pack } from "./user_pack";
export type profile = {
  readonly id?: string;
  slug?: string | null;
  email?: string | null;
  username?: string | null;
  password?: string | null;
  fullname?: string | null;
  avatar?: string | null;
  readonly admin?: boolean;
  readonly active?: boolean;
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly teams?: Array<member> | null;
  readonly packs?: Array<user_pack> | null;
  readonly mods?: Array<user_mod> | null;
};
