import "reflect-metadata";

import { dependencyContainerInstance } from "@Core/dependencies/container.dependency";

import { initControllerMapper } from "../../metadatas/router.metadata";

// Decorator para definir o prefixo do controlador
export function Controller(path: string = "/") {
  if (!path.endsWith("/")) path += "/";
  console.info(`@Controller('${path}')`);
  // Armazena informações sobre o controlador usando Reflect.defineMetadata
  return function (target: any) {
    initControllerMapper(target, path);
    dependencyContainerInstance.register(target, target);
  };
}
