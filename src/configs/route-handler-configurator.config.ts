import "reflect-metadata";

export type TExecAppMethods = "get" | "post" | "put" | "patch" | "delete";

import { Request, Response } from "express";
import { setDataControllerMapper } from "../metadatas/router.metada";

export class RouteHandlerConfigurator {
  constructor(
    protected target: any,
    protected propertyKey: string,
    protected descriptor: PropertyDescriptor,
    protected path: string,
    protected type: TExecAppMethods = "get"
  ) {}

  exec() {
    this.formatPath();
    setDataControllerMapper(this.target.constructor, {
      path: this.path,
      target: this.target,
      propertyKey: this.propertyKey,
      type: this.type,
    });
    const originalMethod = this.descriptor.value;
    this.descriptor.value = async (req: Request, res: Response) =>
      this.cbResponse(req, res, originalMethod);
  }

  private formatPath() {
    return this.path.startsWith("/") ? this.path.slice(1) : this.path;
  }

  private async cbResponse(req: Request, res: Response, originalMethod: any) {
    // Chama a função original e captura o resultado
    const result = await originalMethod.call(this, req, res);
    if (!result) {
    } else if (typeof result === "string") {
      // Verifica o tipo do resultado e envia a resposta adequada
      res.send(result); // Envia como string
    } else if (typeof result === "object") {
      res.json(result); // Envia como JSON
    } else {
      // Se o tipo não for suportado, envia um erro 500
      res.status(500).send("Internal Server Error");
    }
  }
}
