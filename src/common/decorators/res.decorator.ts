export const RES_PREFIX_KEY = Symbol("express:res:");

// Decorator para injetar o objeto Response (res)
export function Res() {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    // Manipula a injeção de res no método
    const metadataKey = `${RES_PREFIX_KEY.toString()}${propertyKey.toString()}`;
    Reflect.defineMetadata(metadataKey, parameterIndex, target);
  };
}
