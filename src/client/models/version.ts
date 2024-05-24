/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { build_version } from './build_version';
import type { mod } from './mod';
import type { version_file } from './version_file';
export type version = {
    readonly id?: string;
    readonly file?: version_file | null;
    mod_id?: string;
    readonly mod?: mod;
    slug?: string | null;
    name: string | null;
    public?: boolean | null;
    readonly created_at?: string;
    readonly updated_at?: string;
    readonly builds?: Array<build_version> | null;
};

