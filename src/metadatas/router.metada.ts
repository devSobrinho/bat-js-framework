import { TExecAppMethods } from "../utils/exec-single-dep.util";

type ControllerData = {
  path: string;
  target: any;
  propertyKey: string;
  type: TExecAppMethods;
};

type TRouterMetaData = Map<any, Map<any, ControllerData>>;

const routerMapperKey = Symbol("routerMapper");
// const globalRouterData = Symbol("globalRouterData");
const globalRouterData = {};
const routerMetadata: TRouterMetaData = new Map();

Reflect.defineMetadata(routerMapperKey, routerMetadata, globalRouterData);

export const getRouterMapper = (): TRouterMetaData => {
  return Reflect.getMetadata(routerMapperKey, globalRouterData);
};

export const getDataControllerMapper = (target: any) => {
  const mapperRouter: TRouterMetaData = Reflect.getMetadata(
    routerMapperKey,
    globalRouterData
  );
  if (!mapperRouter.get(target))
    mapperRouter.set(target, new Map<any, ControllerData>());
  return mapperRouter.get(target)!;
};

export const setDataControllerMapper = (
  target: any,
  data: ControllerData
): void => {
  const controllerMetadata = getDataControllerMapper(target);
  controllerMetadata.set(data.propertyKey, data);
};
