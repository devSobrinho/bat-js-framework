import { RouteHandlerConfigurator } from "../../configs/route-handler-configurator.config";

export function Delete(pathArgs: string = "/") {
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
      "delete"
    ).exec();
  };
}
