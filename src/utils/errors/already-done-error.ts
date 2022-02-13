import { CustomError } from "../../core/conventions";

export class AlreadyDoneError extends CustomError {
  constructor (date: string) {
    super( 'AlreadyDoneError', 'error.alreadyDone', { date: date })
  }
}
