/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { auth_login } from "../models/auth_login";
import type { auth_token } from "../models/auth_token";
import type { auth_verify } from "../models/auth_verify";
import type { general_error } from "../models/general_error";
import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";
export class AuthService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}
  /**
   * Authenticate an user by credentials
   * @param authLogin The credentials to authenticate
   * @returns auth_token A generated token with expire
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public loginUser(
    authLogin: auth_login,
  ): CancelablePromise<auth_token | general_error> {
    return this.httpRequest.request({
      method: "POST",
      url: "/auth/login",
      body: authLogin,
      errors: {
        401: `Unauthorized if wrong credentials`,
      },
    });
  }
  /**
   * Refresh an auth token before it expires
   * @returns auth_token A refreshed token with expire
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public refreshAuth(): CancelablePromise<auth_token | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/auth/refresh",
      errors: {
        401: `Unauthorized if failed to generate`,
      },
    });
  }
  /**
   * Verify validity for an authentication token
   * @returns auth_verify Meta data of the provided token
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public verifyAuth(): CancelablePromise<auth_verify | general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/auth/verify",
      errors: {
        401: `Unauthorized if token is invalid`,
      },
    });
  }
  /**
   * Logout an user authenticated by cookie
   * @returns general_error Successfully logout of the user
   * @throws ApiError
   */
  public logoutUser(): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/auth/logout",
      errors: {
        401: `User is not even authenticated`,
      },
    });
  }
  /**
   * Initialize the external authentication
   * @param provider An identifier for the auth provider
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public externalInitialize(
    provider: string,
  ): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/auth/{provider}/initialize",
      path: {
        provider: provider,
      },
      errors: {
        307: `Redirect to external auth provider`,
        404: `Provider identifier is unknown`,
        500: `Failed to initialze the provider`,
      },
    });
  }
  /**
   * Callback for external authentication
   * @param provider An identifier for the auth provider
   * @returns general_error Some error unrelated to the handler
   * @throws ApiError
   */
  public externalCallback(provider: string): CancelablePromise<general_error> {
    return this.httpRequest.request({
      method: "GET",
      url: "/auth/{provider}/callback",
      path: {
        provider: provider,
      },
      errors: {
        307: `Redirect to root of the application`,
        404: `Provider identifier is unknown`,
        412: `Failed to initialize account`,
      },
    });
  }
}
