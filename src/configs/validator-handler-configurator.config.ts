import {
  getObjectValidatorRecord,
  setObjectValidatorRecord,
} from "../metadatas/validator.metadata";

export class ValidatorHandlerConfigurator {
  constructor(
    private readonly target: any,
    private readonly propertyKey: string,
    private readonly validationFn: Function,
    private readonly config: Record<string, any> = {}
  ) {}

  exec() {
    const validations = getObjectValidatorRecord(this.target);
    if (!validations) {
      setObjectValidatorRecord(this.target, {
        [this.propertyKey]: {
          validate: this.validationFn,
          config: this.config,
        },
      });
      return;
    }
    setObjectValidatorRecord(this.target, validations);
  }
}
