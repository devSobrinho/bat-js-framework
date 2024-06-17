import "reflect-metadata";

import { Express } from "express";

import { TExecAppMethods } from "../configs/route-handler-configurator.config";
import {
  CONTROLLER_ROOT_KEY,
  getRouterMapper,
} from "../metadatas/router.metadata";
import { QUERY_PREFIX_KEY } from "@Common/decorators/query.decorator";
import { BODY_PREFIX_KEY } from "@Common/decorators/body.decorator";
import { REQ_PREFIX_KEY } from "@Common/decorators/req.decorator";
import { RES_PREFIX_KEY } from "@Common/decorators/res.decorator";

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
      const fullPath =
        "/" + (pathRoot + path).split("/").filter(Boolean).join("/");
      app[type](fullPath, (req, res) => {
        // Obtém os índices dos parâmetros req e res a partir dos metadados
        const reqIndex = Reflect.getMetadata(
          `${REQ_PREFIX_KEY.toString()}${propertyKey}`,
          target
        );
        const resIndex = Reflect.getMetadata(
          `${RES_PREFIX_KEY.toString()}${propertyKey}`,
          target
        );
        const queryIndex = Reflect.getMetadata(
          `${QUERY_PREFIX_KEY.toString()}${propertyKey}`,
          target
        );
        const bodyIndex = Reflect.getMetadata(
          `${BODY_PREFIX_KEY.toString()}${propertyKey}`,
          target
        );

        const args = [];
        if (reqIndex !== undefined) args[reqIndex] = req;
        if (resIndex !== undefined) args[resIndex] = res;
        if (queryIndex !== undefined) args[queryIndex] = req.query;
        if (bodyIndex !== undefined) args[bodyIndex] = req.body;

        // Cria uma instância do target (classe) para acessar a propriedade ou método
        const instance = new target.constructor();
        const result = originalMethod.call(instance, ...args);

        if (res !== undefined && result) {
          if (typeof result === "string") {
            // Verifica o tipo do resultado e envia a resposta adequada
            res.send(result); // Envia como string
          } else if (typeof result === "object") {
            res.json(result); // Envia como JSON
          } else {
            // Se o tipo não for suportado, envia um erro 500
            // res.status(500).send("Internal Server Error");
          }
        }
      });

      console.log(
        `Register-Router [CREATE]: ${type.toLocaleUpperCase()} ${fullPath}`
      );
    });
  });
}
