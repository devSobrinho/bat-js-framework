import {
  generationArgControllerKeyMetadata,
  setArgControllerMetadata,
} from "metadatas/controller-arg.metadata";

export const QUERY_PREFIX_KEY = Symbol("express:query:");

// Decorator para injetar o objeto Query
export function Query() {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    const metadataKey = generationArgControllerKeyMetadata(
      QUERY_PREFIX_KEY,
      propertyKey,
      target
    );
    setArgControllerMetadata(metadataKey, parameterIndex, target);
  };
}
