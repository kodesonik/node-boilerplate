import { CustomError } from "../../core/conventions"

export class InvalidParamError extends CustomError {
  constructor (parameter: string) {
    super( 'InvalidParamError', 'error.invalid', {  parameter })
  }
}
