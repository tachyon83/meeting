import { HttpException } from '../http.exception'
import exceptionMessages from './exception.messages'

export class JwtNotExistsException extends HttpException {
  constructor(message = exceptionMessages.jwtNotExists) {
    super(401, message)
  }
}
