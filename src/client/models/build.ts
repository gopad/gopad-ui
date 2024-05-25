/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { build_version } from "./build_version";
import type { fabric } from "./fabric";
import type { forge } from "./forge";
import type { minecraft } from "./minecraft";
import type { neoforge } from "./neoforge";
import type { pack } from "./pack";
import type { quilt } from "./quilt";
export type build = {
  readonly id?: string;
  pack_id?: string;
  readonly pack?: pack;
  minecraft_id?: string | null;
  readonly minecraft?: minecraft | null;
  forge_id?: string | null;
  readonly forge?: forge | null;
  neoforge_id?: string | null;
  readonly neoforge?: neoforge | null;
  quilt_id?: string | null;
  readonly quilt?: quilt | null;
  fabric_id?: string | null;
  readonly fabric?: fabric | null;
  slug?: string | null;
  name: string | null;
  java?: string | null;
  memory?: string | null;
  public?: boolean | null;
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly versions?: Array<build_version> | null;
};
