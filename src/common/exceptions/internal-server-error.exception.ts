import { HttpStatus } from "../enums/http-status.enum";
import { HttpException } from "./http.exception";

export class InternalServerErrorException extends HttpException {
  constructor(
    response: string | Record<string, any>,
    description = "Internal Server Error"
  ) {
    super(
      HttpStatus.INTERNAL_SERVER_ERROR,
      HttpException.createBody(
        HttpStatus.INTERNAL_SERVER_ERROR,
        description,
        response
      )
    );
  }
}
