import { HttpException } from '../http.exception'
import exceptionMessages from './exception.message'

export class FavoriteDoesNotExistException extends HttpException {
  constructor(message = exceptionMessages.favoriteDoesNotExist) {
    super(404, message)
  }
}
