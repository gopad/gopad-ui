/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Validation error which shows failed fields
 */
export type validation_error = {
  status: number;
  message: string;
  errors?: Array<{
    field?: string;
    message?: string;
  }>;
};
