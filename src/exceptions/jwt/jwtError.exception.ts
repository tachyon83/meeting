import { HttpException } from "../http.exception";
import exceptionMessages from "./exception.messages";

export class JwtErrorException extends HttpException {
  constructor(message = exceptionMessages.jwtError) {
    super(400, message);
  }
}
