import { HttpException } from "../http.exception";
import exceptionMessages from "./exception.messages";

export class JwtExpiredException extends HttpException {
  constructor(message = exceptionMessages.jwtExpired) {
    super(401, message);
  }
}
