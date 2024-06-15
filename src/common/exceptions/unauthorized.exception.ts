import { HttpStatus } from "../enums/http-status.enum";
import { HttpException } from "./http.exception";

export class UnauthorizedException extends HttpException {
  constructor(
    response: string | Record<string, any>,
    description = "Unauthorized"
  ) {
    super(
      HttpStatus.UNAUTHORIZED,
      HttpException.createBody(HttpStatus.UNAUTHORIZED, description, response)
    );
  }
}
