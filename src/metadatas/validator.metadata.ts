import "reflect-metadata";

const validatorTypeKey = Symbol("validator::type");

export function setValidatorType(type: string) {
  return Reflect.metadata(validatorTypeKey, type);
}

export function getValidatorType(target: any) {
  return Reflect.getMetadata(validatorTypeKey, target);
}

const validatorKey = Symbol("validator");

type TObjectValidator = Record<
  string,
  {
    validate: Function;
    config?: Record<string, any>;
  }
>;

export function validation(target: any) {
  const objectValidation = getObjectValidatorRecord(target);
  Object.entries(objectValidation || {}).forEach(([propertyKey, value]) => {
    const { validate, config } = value;

    validate(target[propertyKey]);
  });
}

export function getObjectValidatorRecord(target: any): TObjectValidator {
  return Reflect.getMetadata(validatorKey, target);
}

export function setObjectValidatorRecord(
  target: any,
  validations: TObjectValidator
) {
  Reflect.defineMetadata(validatorKey, validations, target);
}
