import { CustomError } from "../../core/conventions"

export class ExpiredParamError extends CustomError {
  constructor (parameter: string) {
    super( 'ExpiredParamError', 'error.expired', {  parameter })
  }
}
