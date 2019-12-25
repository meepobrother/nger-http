import { createParameterDecorator } from "@nger/decorator";
export const RequestIdMetadataKey = `@nger/http RequestIdMetadataKey`
export const RequestId = createParameterDecorator<string>(RequestIdMetadataKey);
