/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from "./core/BaseHttpRequest";
import type { OpenAPIConfig } from "./core/OpenAPI";
import { AxiosHttpRequest } from "./core/AxiosHttpRequest";
import { AuthService } from "./services/AuthService";
import { ProfileService } from "./services/ProfileService";
import { TeamService } from "./services/TeamService";
import { UserService } from "./services/UserService";
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class Gopad {
  public readonly auth: AuthService;
  public readonly profile: ProfileService;
  public readonly team: TeamService;
  public readonly user: UserService;
  public readonly request: BaseHttpRequest;
  constructor(
    config?: Partial<OpenAPIConfig>,
    HttpRequest: HttpRequestConstructor = AxiosHttpRequest,
  ) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? "https://try.gopad.eu/api/v1",
      VERSION: config?.VERSION ?? "1.0.0-alpha1",
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? "include",
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
    });
    this.auth = new AuthService(this.request);
    this.profile = new ProfileService(this.request);
    this.team = new TeamService(this.request);
    this.user = new UserService(this.request);
  }
}
