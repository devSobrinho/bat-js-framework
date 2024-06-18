export class DependencyContainer {
  static dependency = new Map();

  register<T = any>(token: T | string, dependency: T) {
    DependencyContainer.dependency.set(token, dependency);
  }

  resolve<T = any>(token: T | string): T {
    const dependency = DependencyContainer.dependency.get(token);
    if (!dependency) {
      const name = token?.["name" as never] || token;
      throw new Error(`No dependency found for token ${name}`);
    }
    return dependency;
  }

  resolveClass(target: any) {
    const paramTypes = Reflect.getMetadata("design:paramtypes", target) || [];
    const dependencies = paramTypes.map((paramType: any) =>
      this.resolve(paramType.name)
    );

    return new target(...dependencies);
  }

  resolveClassRecursive(target: any) {
    const paramTypes = Reflect.getMetadata("design:paramtypes", target) || [];
    const dependencies = paramTypes?.map((paramType: any) => {
      const subTarget = this.resolveClassRecursive(paramType);
      console.log(">>>,paramType", paramType, subTarget);
      if (subTarget) {
        const instancy =
          this.resolve(paramType) || this.resolve(paramType.name);
        return new instancy();
      } else {
        console.log("paramType ERROR:", paramType);
        return;
      }
    });

    return new target(...dependencies.filter(Boolean));
  }
}

export const dependencyContainerInstance = new DependencyContainer();
