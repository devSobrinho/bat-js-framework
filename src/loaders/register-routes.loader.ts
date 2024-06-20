import { BODY_PREFIX_KEY } from "@/common/decorators/body.decorator";
import { PARAM_PREFIX_KEY } from "@/common/decorators/param.decorator";
import { QUERY_PREFIX_KEY } from "@/common/decorators/query.decorator";
import { REQ_PREFIX_KEY } from "@/common/decorators/req.decorator";
import { RES_PREFIX_KEY } from "@/common/decorators/res.decorator";
import { dependencyContainerInstance } from "@/core/dependencies/container.dependency";
import { Express, Request, Response } from "express";
import {
  generationArgControllerKeyMetadata,
  getArgControllerMetadata,
} from "@/metadatas/controller-arg.metadata";

import { TExecAppMethods } from "@/configs/route-handler-configurator.config";
import {
  CONTROLLER_ROOT_KEY,
  getRouterMapper,
} from "@/metadatas/router.metadata";
import { ExampleController } from "@/examples/controllers/example.controller";
import { OtherController } from "@/examples/controllers/other.controller";
import Debug from "debug";
// import "@/examples/controllers/example.controller";
// import "@/examples/controllers/other.controller";
// Array para armazenar informações sobre as rotas
const debug = Debug("app:register-routes");

export const routeMetadata: {
  path: string;
  target: any;
  propertyKey: string;
  type: TExecAppMethods;
}[] = [];

// Função para registrar todas as rotas no app
export function registerRoutes(app: Express) {
  // Initialize all controllers
  [ExampleController, OtherController].map((controller) => {
    `Init [CONTROLLER] FORA: ${controller.name}`;
  });

  const allRoutesMapper = getRouterMapper();

  allRoutesMapper.forEach((controllerData, key) => {
    debug(`Init [CONTROLLER]: ${key.name}`);
    const controllerRoot = controllerData.get(CONTROLLER_ROOT_KEY);

    if (!controllerRoot) return;

    controllerData.forEach((data) => {
      const { path, target, propertyKey, type } = data;
      if (propertyKey === CONTROLLER_ROOT_KEY) return;
      const originalMethod = target[propertyKey];
      const pathRoot = controllerRoot.path;
      const fullPath =
        "/" + (pathRoot + path).split("/").filter(Boolean).join("/");

      // Cria uma instância do controlador e resolve suas dependências
      const instance = dependencyContainerInstance.resolveClassRecursive(
        target.constructor
      );

      app[type](fullPath, (req, res) => {
        const args: any[] = [];
        initializeArguments(req, res, args, target, propertyKey);
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

      debug(
        `Register-Router [CREATE]: ${type.toLocaleUpperCase()} ${fullPath}`
      );
    });
  });
}

const initializeArguments = (
  req: Request,
  res: Response,
  args: any[],
  target: any,
  propertyKey: string
) => {
  const requestContextMappings = [
    { prefixKey: REQ_PREFIX_KEY, callback: req },
    { prefixKey: RES_PREFIX_KEY, callback: res },
    { prefixKey: PARAM_PREFIX_KEY, callback: req.params },
    { prefixKey: QUERY_PREFIX_KEY, callback: req.query },
    { prefixKey: BODY_PREFIX_KEY, callback: req.body },
  ];

  for (let index = 0; index < requestContextMappings.length; index++) {
    const { prefixKey, callback } = requestContextMappings[index];
    const keyMetadata = generationArgControllerKeyMetadata(
      prefixKey,
      propertyKey,
      target
    );
    const argsController = getArgControllerMetadata(keyMetadata, target);
    argsController.forEach((data, indexParam) => {
      if (indexParam !== undefined) {
        if (data?.name) args[indexParam] = callback[data.name as never];
        else {
          args[indexParam] = callback;
        }
      }
    });
  }
};
