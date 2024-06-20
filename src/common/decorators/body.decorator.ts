import {
  generationArgControllerKeyMetadata,
  setArgControllerMetadata,
} from "@/metadatas/controller-arg.metadata";

export const BODY_PREFIX_KEY = Symbol("express:body:");

// Decorator para injetar o objeto Body
export function Body(name?: string) {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    const metadataKey = generationArgControllerKeyMetadata(
      BODY_PREFIX_KEY,
      propertyKey,
      target
    );
    setArgControllerMetadata(metadataKey, parameterIndex, target, { name });
  };
}
