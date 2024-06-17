import "reflect-metadata";

import { setDataControllerMapper } from "../metadatas/router.metada";

export type TExecAppMethods = "get" | "post" | "put" | "patch" | "delete";

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
  }

  private formatPath() {
    return this.path.startsWith("/") ? this.path.slice(1) : this.path;
  }
}
