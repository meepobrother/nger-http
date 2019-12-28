import { ROUTES, LOGGER_METHOD_NAME, LOGGER_MODULE_CHAIN } from "./../../token";
import { Injector, isCanLoad } from "@nger/core";
import { IMethodDecorator } from "@nger/decorator";
import { GuardError } from "./error";
import { } from "../../token";
export function createHandler(
  injector: Injector,
  item: IMethodDecorator,
  path: string
) {

  return (method: string) => {
    const options = item.options;
    if (options) {
      const platformInjector = injector.getInjector("platform");
      platformInjector.setStatic([
        {
          provide: LOGGER_METHOD_NAME,
          useValue: item.property
        },
        {
          provide: LOGGER_MODULE_CHAIN,
          useValue: getNameChain(injector)
        },
        {
          provide: ROUTES,
          useFactory: () => {
            const instance = injector.get(item.type);
            const methodHandler = Reflect.get(instance, item.property);
            return {
              method: method,
              path: `${path}${options.path}`,
              factory: () => {
                const pass = (options.useGuards || [])
                  .map((it: any) => injector.get(it))
                  .every((it: any) => {
                    if (isCanLoad(it)) {
                      return it.canLoad(injector);
                    }
                    return true;
                  });
                // const req = injector.get(REQUEST);
                if (pass) return methodHandler();
                throw new GuardError();
              }
            };
          },
          deps: [],
          multi: true,
          noCache: true
        }
      ]);
    }
  };
}


export function getNameChain(injector: Injector) {
  if (injector.scope === "root") {
    return ``;
  }
  let chain: string = ``;
  if (injector.parent && injector.parent.scope !== "root") {
    chain += getNameChain(injector.parent) + ".";
  }
  chain +=
    typeof injector.scope === "string"
      ? injector.scope
      : (injector.scope as any).name;
  return chain;
}
