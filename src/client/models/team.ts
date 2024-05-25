/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { member } from "./member";
import type { team_mod } from "./team_mod";
import type { team_pack } from "./team_pack";
export type team = {
  readonly id?: string;
  slug?: string | null;
  name: string | null;
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly users?: Array<member> | null;
  readonly packs?: Array<team_pack> | null;
  readonly mods?: Array<team_mod> | null;
};
