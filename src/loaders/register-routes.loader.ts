import "reflect-metadata";

import { Express, Request, Response } from "express";

import { TExecAppMethods } from "../configs/route-handler-configurator.config";
import {
  CONTROLLER_ROOT_KEY,
  getRouterMapper,
} from "../metadatas/router.metadata";
import { QUERY_PREFIX_KEY } from "@Common/decorators/query.decorator";
import { BODY_PREFIX_KEY } from "@Common/decorators/body.decorator";
import { REQ_PREFIX_KEY } from "@Common/decorators/req.decorator";
import { RES_PREFIX_KEY } from "@Common/decorators/res.decorator";
import {
  generationArgControllerKeyMetadata,
  getArgControllerMetadata,
} from "metadatas/controller-arg.metadata";

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
        const args: any[] = [];
        initArgsCall(req, res, args, target, propertyKey);
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

const initArgsCall = (
  req: Request,
  res: Response,
  args: any[],
  target: any,
  propertyKey: string
) => {
  const reqKeyMetadata = generationArgControllerKeyMetadata(
    REQ_PREFIX_KEY,
    propertyKey,
    target
  );
  const reqIndex = getArgControllerMetadata(reqKeyMetadata, target);

  const resKeyMetadata = generationArgControllerKeyMetadata(
    RES_PREFIX_KEY,
    propertyKey,
    target
  );
  const resIndex = getArgControllerMetadata(resKeyMetadata, target);

  const queryKeyMetadata = generationArgControllerKeyMetadata(
    QUERY_PREFIX_KEY,
    propertyKey,
    target
  );
  const queryIndex = getArgControllerMetadata(queryKeyMetadata, target);

  const bodyKeyMetadata = generationArgControllerKeyMetadata(
    BODY_PREFIX_KEY,
    propertyKey,
    target
  );
  const bodyIndex = getArgControllerMetadata(bodyKeyMetadata, target);

  if (reqIndex !== undefined) args[reqIndex] = req;
  if (resIndex !== undefined) args[resIndex] = res;
  if (queryIndex !== undefined) args[queryIndex] = req.query;
  if (bodyIndex !== undefined) args[bodyIndex] = req.body;
};
