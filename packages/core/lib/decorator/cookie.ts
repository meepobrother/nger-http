import { InjectionToken } from "@nger/core";
import {
  createParameterDecorator,
  IParameterDecorator,
  IConstructorDecorator
} from "@nger/decorator";
export const CookiesMetadataKey = `CookiesMetadataKey`;
export interface CookiesOptions {
  path: string | InjectionToken<string>;
}
export const Cookies = createParameterDecorator<
  CookiesOptions | string | InjectionToken<string>
>(
  CookiesMetadataKey,
  (
    it:
      | IConstructorDecorator<
          any,
          CookiesOptions | string | InjectionToken<string>
        >
      | IParameterDecorator<
          any,
          CookiesOptions | string | InjectionToken<string>
        >
  ) => {
    const options = it.options;
    if (typeof options === "string" || options instanceof InjectionToken) {
      it.options = {
        path: options
      };
    } else if (options) {
      it.options = {
        ...options
      };
    }
  }
);
