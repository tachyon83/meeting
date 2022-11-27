import exceptionMessages from "./exception.messages";
import { HttpException } from "./http.exception";

export class UnauthorizedException extends HttpException {
  constructor(message = exceptionMessages.unAuthorized) {
    super(401, message);
  }
}
