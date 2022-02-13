import { CustomError } from "../../core/conventions"

export class UnauthorizedError extends CustomError {
  constructor () {
    super( 'UnauthorizedError', 'error.unauthorized')
  }
}
