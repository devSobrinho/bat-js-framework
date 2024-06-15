import { HttpStatus } from "../enums/http-status.enum";
import { HttpException } from "./http.exception";

export class BadRequestException extends HttpException {
  constructor(
    response: string | Record<string, any>,
    description = "Bad Request"
  ) {
    super(
      HttpStatus.BAD_REQUEST,
      HttpException.createBody(HttpStatus.BAD_REQUEST, description, response)
    );
  }
}
