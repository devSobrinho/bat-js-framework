export class DependencyContainer {
  static dependencies = new Map();
  private static instances: Map<any, any> = new Map();

  register<T = any>(token: T | string, dependency: T) {
    if (DependencyContainer.dependencies.has(token)) {
      // throw new Error(`Dependency already registered for token ${token}`);
      return;
    }
    DependencyContainer.dependencies.set(token, dependency);
  }

  resolve<T = any>(token: T | string): T {
    const dependency = DependencyContainer.dependencies.get(token);
    if (!dependency) {
      const name = typeof token === "string" ? token : (token as any)?.name;
      throw new Error(`No dependency found for token ${name}`);
    }
    return dependency;
  }

  resolveClass(target: any, resolving: Set<any> = new Set()): any {
    if (DependencyContainer.instances.has(target)) {
      return DependencyContainer.instances.get(target);
    }

    if (resolving.has(target)) {
      // TODO: implementar forwardRef

      throw new Error(`Circular dependency detected: ${target.name}`);
    }
    resolving.add(target);

    const paramTypes = Reflect.getMetadata("design:paramtypes", target) || [];
    const dependencies = paramTypes.map((paramType: any) =>
      this.resolveClass(paramType, resolving)
    );

    const instance = new target(...dependencies);
    DependencyContainer.instances.set(target, instance);
    resolving.delete(target);
    return instance;
  }

  resolveClassRecursive(target: any): any {
    return this.resolveClass(target);
  }
}

export const dependencyContainerInstance = new DependencyContainer();
