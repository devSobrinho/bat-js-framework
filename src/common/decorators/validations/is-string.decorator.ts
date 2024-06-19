import "reflect-metadata";

import { ValidatorHandlerConfigurator } from "configs/validator-handler-configurator.config";
import { ValidationUtil } from "utils/validations.utils";

export function IsString() {
  return function (target: any, propertyKey: string) {
    new ValidatorHandlerConfigurator(
      target,
      propertyKey,
      ValidationUtil.isString
    ).exec();
  };
}
