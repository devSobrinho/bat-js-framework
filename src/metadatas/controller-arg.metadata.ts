import "reflect-metadata";

type TMetadataValueItem = Map<number, Record<string, any> | undefined>;

export const generationArgControllerKeyMetadata = (
  prefix: symbol,
  propertyKey: string | symbol,
  target: any
) => {
  const controllerName = target.constructor.name;

  return `${prefix.toString()}${controllerName}${propertyKey.toString()}`;
};

export const getArgControllerMetadata = (
  metadataKey: string,
  target: any
): TMetadataValueItem => {
  return Reflect.getMetadata(metadataKey, target) || new Map();
};

export const setArgControllerMetadata = (
  metadataKey: string,
  parameterIndex: number,
  target: any,
  data?: Record<string, any>
) => {
  const metadataValue = getArgControllerMetadata(metadataKey, target);
  metadataValue?.set(parameterIndex, data);

  Reflect.defineMetadata(metadataKey, metadataValue, target);
};
