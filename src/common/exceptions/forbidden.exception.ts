import { HttpStatus } from "../enums/http-status.enum";
import { HttpException } from "./http.exception";

export class ForbiddenException extends HttpException {
  constructor(
    response: string | Record<string, any>,
    description = "Forbidden"
  ) {
    super(
      HttpStatus.FORBIDDEN,
      HttpException.createBody(HttpStatus.FORBIDDEN, description, response)
    );
  }
}
