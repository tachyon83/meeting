import { HttpException } from '../http.exception'
import exceptionMessages from './exception.message'

export class LocationFormatInvalidException extends HttpException {
  constructor(message = exceptionMessages.locationFormatInvalid) {
    super(422, message)
  }
}
