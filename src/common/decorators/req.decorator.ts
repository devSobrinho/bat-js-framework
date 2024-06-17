export const REQ_PREFIX_KEY = Symbol("express:req:");

// Decorator para injetar o objeto Request (req)
export function Req() {
  return function (
    target: any,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    // Manipula a injeção de req no método
    const metadataKey = `${REQ_PREFIX_KEY.toString()}${propertyKey.toString()}`;
    Reflect.defineMetadata(metadataKey, parameterIndex, target);
  };
}
