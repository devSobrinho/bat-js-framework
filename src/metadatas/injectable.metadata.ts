type TDependenciesMetadata = Map<any, any>;

const DEPENDENCIES_MAPPER_KEY = Symbol("dependenciesMapper");
const globalDependenciesTarget = {};
const dependenciesMetadata: TDependenciesMetadata = new Map();

Reflect.defineMetadata(
  DEPENDENCIES_MAPPER_KEY,
  dependenciesMetadata,
  globalDependenciesTarget
);

export const getDependenciesMapper = (): TDependenciesMetadata => {
  return Reflect.getMetadata(DEPENDENCIES_MAPPER_KEY, globalDependenciesTarget);
};

export const initDependenciesMapper = (target: any) => {
  const paramtypes = Reflect.getMetadata("design:paramtypes", target);

  const mapperDependencies: TDependenciesMetadata = Reflect.getMetadata(
    DEPENDENCIES_MAPPER_KEY,
    globalDependenciesTarget
  );
  const mapper = new Map();
  mapper.set("#ROOT", {
    target,
    paramtypes,
  });
  mapperDependencies.set(target, mapper);
};

export const getDependenciesTargetMapper = (target: any) => {
  const mapperDependencies: TDependenciesMetadata = Reflect.getMetadata(
    DEPENDENCIES_MAPPER_KEY,
    globalDependenciesTarget
  );

  if (!mapperDependencies) {
    throw new Error(`@Injectable No found for ${target.name}`);
  }

  return mapperDependencies.get(target);
};

export const setDependencyTargetMapper = (target: any): void => {
  const mapperDependenciesTarget = getDependenciesTargetMapper(target);
  mapperDependenciesTarget.set(target.constructor.name, target);
};
