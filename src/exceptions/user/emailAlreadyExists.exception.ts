import { HttpException } from "../http.exception";
import exceptionMessages from "./exception.messages";

export class EmailAlreadyExistsException extends HttpException {
  constructor(message = exceptionMessages.emailAlreadyExists) {
    super(409, message);
  }
}
