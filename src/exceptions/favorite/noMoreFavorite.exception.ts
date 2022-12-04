import { HttpException } from '../http.exception'
import exceptionMessages from './exception.message'

export class NoMoreFavoriteException extends HttpException {
  constructor(message = exceptionMessages.noMoreFavorite) {
    super(401, message)
  }
}
