export const generationArgControllerKeyMetadata = (
  prefix: symbol,
  propertyKey: string | symbol,
  target: any
) => {
  const controllerName = target.constructor.name;

  return `${prefix.toString()}${controllerName}${propertyKey.toString()}`;
};

export const getArgControllerMetadata = (metadataKey: string, target: any) => {
  return Reflect.getMetadata(metadataKey, target);
};

export const setArgControllerMetadata = (
  metadataKey: string,
  parameterIndex: number,
  target: any
) => {
  Reflect.defineMetadata(metadataKey, parameterIndex, target);
};
