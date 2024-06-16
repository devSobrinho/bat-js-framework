interface HttpExceptionOptions {
  cause?: unknown;
  description?: string;
}

type IDescriptionOrOptions = string | HttpExceptionOptions;

export class HttpException extends Error {
  private readonly status: number;
  private readonly response: string | Record<string, any>;
  private readonly options?: HttpExceptionOptions;
  cause?: unknown;

  constructor(
    status: number,
    response: string | Record<string, any>,
    options?: HttpExceptionOptions
  ) {
    super();
    this.status = status;
    this.response = response;
    this.options = options;
    this.initMessage();
    this.initName();
    this.initCause();
  }

  getStatus() {
    return this.status;
  }

  getResponse() {
    return this.response;
  }

  initCause() {
    if (this.options?.cause) {
      this.cause = this.options.cause;
      return;
    }
  }

  initMessage() {
    if (typeof this.response === "string") {
      this.message = this.response;
    } else if (typeof this.response?.message === "string") {
      this.message = this.response.message;
    } else if (this.constructor) {
      this.message =
        this.constructor.name.match(/[A-Z][a-z]+|[0-9]+/g)?.join(" ") ??
        "Error";
    }
  }

  initName() {
    this.name = super.name;
  }

  static createBody(
    statusCode: number,
    message: string,
    error?: string | Record<string, any>
  ) {
    return {
      statusCode,
      message,
      ...(error && { message: error, error: message }),
    };
  }

  static getDescriptionFrom(descriptionOrOptions: IDescriptionOrOptions) {
    return typeof descriptionOrOptions === "string"
      ? descriptionOrOptions
      : descriptionOrOptions?.description || "";
  }
  static getHttpExceptionOptionsFrom(
    descriptionOrOptions: IDescriptionOrOptions
  ) {
    return typeof descriptionOrOptions === "string" ? {} : descriptionOrOptions;
  }
  static extractDescriptionAndOptionsFrom(
    descriptionOrOptions: IDescriptionOrOptions
  ) {
    return {
      description: this.getDescriptionFrom(descriptionOrOptions),
      httpExceptionOptions:
        this.getHttpExceptionOptionsFrom(descriptionOrOptions),
    };
  }
}
