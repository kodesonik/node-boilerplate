import { CustomError } from "../../core/conventions";

export class ServerError extends CustomError {
  constructor () {
    super( 'ServerError', 'error.internal')
  }
}
