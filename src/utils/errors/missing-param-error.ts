import { CustomError } from "../../core/conventions";

export class MissingParamError extends CustomError {
  constructor (parameter: string) {
    super( 'MissingParamError', 'error.missing', {  parameter })
  }
}
