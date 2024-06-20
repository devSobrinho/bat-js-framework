import {
  generationArgControllerKeyMetadata,
  setArgControllerMetadata,
} from "@/metadatas/controller-arg.metadata";

export const PARAM_PREFIX_KEY = Symbol("express:param:");

// Decorator para injetar parametros da requisição
export function Param(name?: string) {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    const metadataKey = generationArgControllerKeyMetadata(
      PARAM_PREFIX_KEY,
      propertyKey.toString(),
      target
    );
    setArgControllerMetadata(metadataKey, parameterIndex, target, { name });
  };
}
