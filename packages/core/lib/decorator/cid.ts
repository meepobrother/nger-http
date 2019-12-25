import { createParameterDecorator } from "@nger/decorator";
export const RequestIdMetadataKey = `RequestIdMetadataKey`
export const RequestId = createParameterDecorator<string>(RequestIdMetadataKey);
