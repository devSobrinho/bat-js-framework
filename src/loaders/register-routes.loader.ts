import { Express } from "express";
import "reflect-metadata";
import { TExecAppMethods } from "../configs/route-handler-configurator.config";
import {
  CONTROLLER_ROOT_KEY,
  getRouterMapper,
} from "../metadatas/router.metada";

// TODO: REFATORAR
// Array para armazenar informações sobre as rotas
export const routeMetadata: {
  path: string;
  target: any;
  propertyKey: string;
  type: TExecAppMethods;
}[] = [];

// Função para registrar todas as rotas no aplicativo Express
export function registerRoutes(app: Express) {
  getRouterMapper().forEach((controllerData, key) => {
    console.log(`Init [CONTROLLER]: ${key.name}`);
    const controllerRoot = controllerData.get(CONTROLLER_ROOT_KEY);

    if (!controllerRoot) return;
    controllerData.forEach((data) => {
      const { path, target, propertyKey, type } = data;
      if (propertyKey === CONTROLLER_ROOT_KEY) return;
      const originalMethod = target[propertyKey];
      const pathRoot = controllerRoot.path;
      const fullPath = pathRoot + path;
      app[type](fullPath, (req, res) => {
        // Obtém os índices dos parâmetros req e res a partir dos metadados
        const reqIndex = Reflect.getMetadata(
          `express:req:${propertyKey}`,
          target
        );
        const resIndex = Reflect.getMetadata(
          `express:res:${propertyKey}`,
          target
        );

        // Cria uma instância do target (classe) para acessar a propriedade ou método
        const instance = new target.constructor();
        originalMethod.call(
          instance,
          reqIndex !== undefined ? req : req,
          resIndex !== undefined ? res : res
        );
      });

      console.log(
        `Register-Router [CREATE]: ${type.toLocaleUpperCase()} ${fullPath}`
      );
    });
  });
}
