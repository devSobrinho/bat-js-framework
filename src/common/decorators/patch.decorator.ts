import { RouteHandlerConfigurator } from "@/configs/route-handler-configurator.config";

export function Patch(pathArgs: string = "/") {
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
      "patch"
    ).exec();
  };
}
