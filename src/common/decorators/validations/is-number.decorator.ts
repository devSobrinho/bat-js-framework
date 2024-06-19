import "reflect-metadata";

import { ValidatorHandlerConfigurator } from "configs/validator-handler-configurator.config";
import { ValidationUtil } from "utils/validations.utils";

export function IsNumber() {
  return function (target: any, propertyKey: string) {
    new ValidatorHandlerConfigurator(
      target,
      propertyKey,
      ValidationUtil.isNumber
    ).exec();
  };
}
