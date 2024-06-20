/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { auth_login } from "../models/auth_login";
import type { auth_token } from "../models/auth_token";
import type { auth_verify } from "../models/auth_verify";
import type { notification } from "../models/notification";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";
export class AuthService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Initialize the external authentication
   * @param provider An identifier for the auth provider
   * @param state Auth state
   * @returns notification Some error unrelated to the handler
   * @throws ApiError
   */
  public externalInitialize(
    provider: string,
    state?: string,
  ): CancelablePromise<notification> {
    return this.httpRequest.request({
      method: "GET",
      url: "/auth/{provider}/initialize",
      path: {
        provider: provider,
      },
      query: {
        state: state,
      },
      errors: {
        307: `Redirect to external auth provider`,
        404: `Provider identifier is unknown`,
        412: `Failed to initialze the provider`,
      },
    });
  }
  /**
   * Callback for external authentication
   * @param provider An identifier for the auth provider
   * @param state Auth state
   * @param code Auth code
   * @returns notification Some error unrelated to the handler
   * @throws ApiError
   */
  public externalCallback(
    provider: string,
    state?: string,
    code?: string,
  ): CancelablePromise<notification> {
    return this.httpRequest.request({
      method: "GET",
      url: "/auth/{provider}/callback",
      path: {
        provider: provider,
      },
      query: {
        state: state,
        code: code,
      },
      errors: {
        307: `Redirect to root of the application`,
        404: `Provider identifier is unknown`,
        412: `Failed to initialize provider`,
      },
    });
  }
  /**
   * Authenticate an user by credentials
   * @param requestBody The credentials to authenticate
   * @returns auth_token Generated token with expire date
   * @returns notification Some error unrelated to the handler
   * @throws ApiError
   */
  public loginAuth(
    requestBody: auth_login,
  ): CancelablePromise<auth_token | notification> {
    return this.httpRequest.request({
      method: "POST",
      url: "/auth/login",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        401: `Unauthorized with wrong credentials`,
        500: `Some internal server error`,
      },
    });
  }
  /**
   * Refresh an auth token before it expires
   * @returns auth_token Refreshed token with expire date
   * @returns notification Some error unrelated to the handler
   * @throws ApiError
   */
  public refreshAuth(): CancelablePromise<auth_token | notification> {
    return this.httpRequest.request({
      method: "GET",
      url: "/auth/refresh",
      errors: {
        401: `Failed to generate valid token`,
        500: `Some internal server error`,
      },
    });
  }
  /**
   * Verify validity for an authentication token
   * @returns auth_verify Metadata of the auth token
   * @returns notification Some error unrelated to the handler
   * @throws ApiError
   */
  public verifyAuth(): CancelablePromise<auth_verify | notification> {
    return this.httpRequest.request({
      method: "GET",
      url: "/auth/verify",
      errors: {
        401: `Unauthorized invalid token`,
        500: `Some internal server error`,
      },
    });
  }
}
