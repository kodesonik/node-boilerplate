import { MissingParamError } from "../errors"
import jwt  from 'jsonwebtoken'
import { env } from "../../configs/environment"

export default class TokenManager {
  private static secret = env.token.secret

  constructor () {}

  static async generate (id) {
    if (!TokenManager.secret) {
      throw new MissingParamError('secret')
    }
    if (!id) {
      throw new MissingParamError('id')
    }
    return jwt.sign(id, TokenManager.secret)
  }

  static async verify(token) {
      return await jwt.verify(token, TokenManager.secret)
  }
}
