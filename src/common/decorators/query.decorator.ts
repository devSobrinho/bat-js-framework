export const QUERY_PREFIX_KEY = Symbol("express:query:");

// Decorator para injetar o objeto Query
export function Query() {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    // Manipula a injeção de res no método
    const metadataKey = `${QUERY_PREFIX_KEY.toString()}${propertyKey.toString()}`;
    Reflect.defineMetadata(metadataKey, parameterIndex, target);
  };
}
