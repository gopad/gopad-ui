/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { team_mod } from "./team_mod";
import type { user_mod } from "./user_mod";
import type { version } from "./version";
export type mod = {
  readonly id?: string;
  slug?: string | null;
  name: string | null;
  side?: mod.side | null;
  description?: string | null;
  author?: string | null;
  website?: string | null;
  donate?: string | null;
  public?: boolean | null;
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly versions?: Array<version> | null;
  readonly users?: Array<user_mod> | null;
  readonly teams?: Array<team_mod> | null;
};
export namespace mod {
  export enum side {
    BOTH = "both",
    SERVER = "server",
    CLIENT = "client",
  }
}
