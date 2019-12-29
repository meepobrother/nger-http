import { Layer } from '../../layer';
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
          useValue: new Layer(method,`${path}${options.path}`, {}, item.call.bind(item)),
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
