import {
  generationArgControllerKeyMetadata,
  setArgControllerMetadata,
} from "@/metadatas/controller-arg.metadata";

export const RES_PREFIX_KEY = Symbol("express:res:");

// Decorator para injetar o objeto Response (res)
export function Res() {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    const metadataKey = generationArgControllerKeyMetadata(
      RES_PREFIX_KEY,
      propertyKey,
      target
    );
    setArgControllerMetadata(metadataKey, parameterIndex, target);
  };
}
