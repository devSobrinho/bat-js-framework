import "reflect-metadata";

import { dependencyContainerInstance } from "core/dependencies/container.dependency";

export function Injectable() {
  console.info(`@Injectable() INIT`);
  return function (target: any) {
    // initDependenciesMapper(target);
    dependencyContainerInstance.register(target, target);
  };
}
