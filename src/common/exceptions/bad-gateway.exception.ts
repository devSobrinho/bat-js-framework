import { HttpStatus } from "../enums/http-status.enum";
import { HttpException } from "./http.exception";

export class BadGatewayException extends HttpException {
  constructor(
    response: string | Record<string, any>,
    description = "Bad Gateway"
  ) {
    super(
      HttpStatus.BAD_GATEWAY,
      HttpException.createBody(HttpStatus.BAD_GATEWAY, description, response)
    );
  }
}
