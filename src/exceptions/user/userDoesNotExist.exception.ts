import { HttpException } from "../http.exception";
import exceptionMessages from "./exception.messages";

export class UserDoesNotExistException extends HttpException {
  constructor(message = exceptionMessages.userDoesNotExist) {
    super(404, message);
  }
}
