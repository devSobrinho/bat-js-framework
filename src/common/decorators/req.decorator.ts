// Decorator para injetar o objeto Request (req)
export function Req() {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    // Manipula a injeção de req no método
    const metadataKey = `express:req:${propertyKey.toString()}`;
    Reflect.defineMetadata(metadataKey, parameterIndex, target);
  };
}
