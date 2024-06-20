/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { validation } from './validation';
/**
 * Generic response for errors and validations
 */
export type notification = {
    status?: number;
    message?: string;
    errors?: Array<validation>;
};

