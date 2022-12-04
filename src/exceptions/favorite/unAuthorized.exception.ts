import { HttpException } from '../http.exception'
import exceptionMessages from './exception.message'

export class UnAuthorizedException extends HttpException {
  constructor(message = exceptionMessages.unAuthorized) {
    super(401, message)
  }
}
