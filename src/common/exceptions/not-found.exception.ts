import { HttpStatus } from "../enums/http-status.enum";
import { HttpException } from "./http.exception";

export class NotFoundException extends HttpException {
  constructor(
    objectOrError: string | Record<string, any>,
    descriptionOrOptions = "Not Found"
  ) {
    const { description, httpExceptionOptions } =
      HttpException.extractDescriptionAndOptionsFrom(descriptionOrOptions);
    super(
      HttpStatus.NOT_FOUND,
      HttpException.createBody(
        HttpStatus.NOT_FOUND,
        description,
        objectOrError
      ),
      httpExceptionOptions
    );
  }
}
