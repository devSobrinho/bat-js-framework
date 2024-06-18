import "reflect-metadata";

export function Inject(dependency?: any) {
  console.info(`@Inject() INIT`);
  return function (target: any, propertyKey: any, parameterIndex: number) {
    // setDependencyTargetMapper(target);
    if (!target.constructor.inject) {
      target.constructor.inject = {};
    }
    target.constructor.inject[parameterIndex] = dependency;
  };
}
