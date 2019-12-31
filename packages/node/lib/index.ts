import { Module, Injector, Config } from "@nger/core";
import { HTTP_INTERCEPTORS, HttpBackend } from "@nger/http";
import { NodeClientHttpInterceptor } from "./node-client-http-interceptor";
import { NodeHttpBackend } from "./node-http-backend";
import { NodeHttpRequest } from "./node-http-request";
import { CookieService } from "./cookie-service";
import { corsHandler } from "./cors";
export class EnvConfig extends Config {
  get<T>(key: string, def: T): T {
    return Reflect.get(process.env, key) || def;
  }
}
@Module({
  providers: [
    NodeHttpRequest,
    CookieService,
    corsHandler,
    {
      provide: Config,
      useClass: EnvConfig
    },
    {
      provide: HttpBackend,
      useFactory: (injector: Injector) => new NodeHttpBackend(injector),
      deps: [Injector]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NodeClientHttpInterceptor,
      multi: true
    }
  ]
})
export class HttpNodeModule { }
