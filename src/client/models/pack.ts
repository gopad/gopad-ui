/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { build } from "./build";
import type { pack_back } from "./pack_back";
import type { pack_icon } from "./pack_icon";
import type { pack_logo } from "./pack_logo";
import type { team_pack } from "./team_pack";
import type { user_pack } from "./user_pack";
export type pack = {
  readonly id?: string;
  readonly icon?: pack_icon | null;
  readonly logo?: pack_logo | null;
  readonly back?: pack_back | null;
  recommended_id?: string | null;
  readonly recommended?: build | null;
  latest_id?: string | null;
  readonly latest?: build | null;
  slug?: string | null;
  name: string | null;
  website?: string | null;
  public?: boolean | null;
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly builds?: Array<build> | null;
  readonly users?: Array<user_pack> | null;
  readonly teams?: Array<team_pack> | null;
};
