import { ROUTES } from "./../../token";
import { Injector, ControllerOptions, MethodRef } from "@nger/core";
export function createHandler(
  item: MethodRef<any, any>,
  options: ControllerOptions
) {
  const path = options.path;
  return (method: string) => {
    const options = item.metadata.options;
    if (options) {
      item.injector.getInjector('root').setStatic([
        {
          provide: ROUTES,
          useFactory: () => {
            return {
              method: method,
              path: `${path}${options.path}`,
              factory: item.call.bind(item)
            };
          },
          deps: [],
          multi: true
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
