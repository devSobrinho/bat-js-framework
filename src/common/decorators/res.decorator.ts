// Decorator para injetar o objeto Response (res)
export function Res() {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    // Manipula a injeção de res no método
    const metadataKey = `express:res:${propertyKey.toString()}`;
    Reflect.defineMetadata(metadataKey, parameterIndex, target);
  };
}
