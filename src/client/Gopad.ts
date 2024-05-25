/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from "./core/BaseHttpRequest";
import type { OpenAPIConfig } from "./core/OpenAPI";
import { AxiosHttpRequest } from "./core/AxiosHttpRequest";
import { AuthService } from "./services/AuthService";
import { FabricService } from "./services/FabricService";
import { ForgeService } from "./services/ForgeService";
import { MinecraftService } from "./services/MinecraftService";
import { ModService } from "./services/ModService";
import { NeoforgeService } from "./services/NeoforgeService";
import { PackService } from "./services/PackService";
import { ProfileService } from "./services/ProfileService";
import { QuiltService } from "./services/QuiltService";
import { TeamService } from "./services/TeamService";
import { UserService } from "./services/UserService";
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class Gopad {
  public readonly auth: AuthService;
  public readonly fabric: FabricService;
  public readonly forge: ForgeService;
  public readonly minecraft: MinecraftService;
  public readonly mod: ModService;
  public readonly neoforge: NeoforgeService;
  public readonly pack: PackService;
  public readonly profile: ProfileService;
  public readonly quilt: QuiltService;
  public readonly team: TeamService;
  public readonly user: UserService;
  public readonly request: BaseHttpRequest;
  constructor(
    config?: Partial<OpenAPIConfig>,
    HttpRequest: HttpRequestConstructor = AxiosHttpRequest,
  ) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? "http://try.gopad.eu/api/v1",
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
    this.fabric = new FabricService(this.request);
    this.forge = new ForgeService(this.request);
    this.minecraft = new MinecraftService(this.request);
    this.mod = new ModService(this.request);
    this.neoforge = new NeoforgeService(this.request);
    this.pack = new PackService(this.request);
    this.profile = new ProfileService(this.request);
    this.quilt = new QuiltService(this.request);
    this.team = new TeamService(this.request);
    this.user = new UserService(this.request);
  }
}
