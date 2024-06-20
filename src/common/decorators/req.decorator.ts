import {
  generationArgControllerKeyMetadata,
  setArgControllerMetadata,
} from "@/metadatas/controller-arg.metadata";

export const REQ_PREFIX_KEY = Symbol("express:req:");

// Decorator para injetar o objeto Request (req)
export function Req() {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    const metadataKey = generationArgControllerKeyMetadata(
      REQ_PREFIX_KEY,
      propertyKey,
      target
    );
    setArgControllerMetadata(metadataKey, parameterIndex, target);
  };
}
