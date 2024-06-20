import { RouteHandlerConfigurator } from "@/configs/route-handler-configurator.config";

export function Get(pathArgs: string = "/") {
  console.info("Get(): factory evaluated");
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
      "get"
    ).exec();
  };
}
