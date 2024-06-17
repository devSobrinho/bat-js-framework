export const BODY_PREFIX_KEY = Symbol("express:body:");

// Decorator para injetar o objeto Body
export function Body() {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    // Manipula a injeção de res no método
    const metadataKey = `${BODY_PREFIX_KEY.toString()}${propertyKey.toString()}`;
    Reflect.defineMetadata(metadataKey, parameterIndex, target);
  };
}
