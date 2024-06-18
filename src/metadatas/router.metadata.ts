import { TExecAppMethods } from "../configs/route-handler-configurator.config";

type ControllerData = {
  path: string;
  target: any;
  propertyKey: string;
  type: TExecAppMethods;
  paramtypes?: any[];
};

type TRouterMetadata = Map<any, Map<any, ControllerData>>;

export const CONTROLLER_ROOT_KEY = "#ROOT";
const ROUTER_MAPPER_KEY = Symbol("routerMapper");
const globalRouterData = {};
const routerMetadata: TRouterMetadata = new Map();

Reflect.defineMetadata(ROUTER_MAPPER_KEY, routerMetadata, globalRouterData);

export const getRouterMapper = (): TRouterMetadata => {
  return Reflect.getMetadata(ROUTER_MAPPER_KEY, globalRouterData);
};

export const initControllerMapper = (target: any, basePath: string) => {
  const paramtypes = Reflect.getMetadata("design:paramtypes", target);
  const mapperRouter: TRouterMetadata = Reflect.getMetadata(
    ROUTER_MAPPER_KEY,
    globalRouterData
  );
  const mapperController = mapperRouter.get(target);

  if (mapperController) {
    mapperController.set(CONTROLLER_ROOT_KEY, {
      path: basePath,
      target,
      propertyKey: CONTROLLER_ROOT_KEY,
      type: "get",
      paramtypes,
    });
  }
};

export const getDataControllerMapper = (target: any) => {
  const mapperRouter: TRouterMetadata = Reflect.getMetadata(
    ROUTER_MAPPER_KEY,
    globalRouterData
  );

  const controllerMetadata = mapperRouter.get(target);
  if (!controllerMetadata) {
    mapperRouter.set(target, new Map<any, ControllerData>());
    return mapperRouter.get(target)!;
  }

  return controllerMetadata;
};

export const setDataControllerMapper = (
  target: any,
  data: ControllerData
): void => {
  const controllerMetadata = getDataControllerMapper(target);
  controllerMetadata.set(data.propertyKey, data);
};
