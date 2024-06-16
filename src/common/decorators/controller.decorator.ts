import "reflect-metadata";

import { initControllerMapper } from "../../metadatas/router.metada";

// Decorator para definir o prefixo do controlador
export function Controller(path: string = "/") {
  if (!path.endsWith("/")) path += "/";
  console.info(`@Controller('${path}')`);
  // Armazena informações sobre o controlador usando Reflect.defineMetadata
  return function (target: any) {
    // target.path = path;
    initControllerMapper(target, path);
  };
}
