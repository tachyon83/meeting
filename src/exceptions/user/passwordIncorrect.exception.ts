import { HttpException } from "../http.exception";
import exceptionMessages from "./exception.messages";

// https://stackoverflow.com/questions/7939137/what-http-status-code-should-be-used-for-wrong-input
export class PasswordIncorrectException extends HttpException {
  constructor(message = exceptionMessages.passwordIncorrect) {
    super(422, message);
  }
}
