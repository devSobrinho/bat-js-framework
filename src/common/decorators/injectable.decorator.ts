import { dependencyContainerInstance } from "core/dependencies/container.dependency";
import { Jurandir } from "examples/services/example.service";
import { initDependenciesMapper } from "metadatas/injectable.metadata";
import "reflect-metadata";

export function Injectable() {
  console.info(`@Injectable() INIT`);
  return function (target: any) {
    // initDependenciesMapper(target);
    dependencyContainerInstance.register(target, target);
  };
}
