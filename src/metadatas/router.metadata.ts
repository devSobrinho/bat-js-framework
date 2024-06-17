import { TExecAppMethods } from "../configs/route-handler-configurator.config";

type ControllerData = {
  path: string;
  target: any;
  propertyKey: string;
  type: TExecAppMethods;
};

type TRouterMetaData = Map<any, Map<any, ControllerData>>;

export const CONTROLLER_ROOT_KEY = "#ROOT";
const ROUTER_MAPPER_KEY = Symbol("routerMapper");
const globalRouterData = {};
const routerMetadata: TRouterMetaData = new Map();

Reflect.defineMetadata(ROUTER_MAPPER_KEY, routerMetadata, globalRouterData);

export const getRouterMapper = (): TRouterMetaData => {
  return Reflect.getMetadata(ROUTER_MAPPER_KEY, globalRouterData);
};

export const initControllerMapper = (target: any, basePath: string) => {
  const mapperRouter: TRouterMetaData = Reflect.getMetadata(
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
    });
  }
};

export const getDataControllerMapper = (target: any) => {
  const mapperRouter: TRouterMetaData = Reflect.getMetadata(
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
