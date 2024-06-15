import { RouteHandlerConfigurator } from "../../configs/route-handler-configurator.config";

export function Put(pathArgs: string = "/") {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    new RouteHandlerConfigurator(
      target,
      propertyKey,
      descriptor,
      pathArgs,
      "put"
    ).exec();
  };
}
