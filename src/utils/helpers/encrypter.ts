import { MissingParamError } from "../errors"
import bcrypt from 'bcrypt'

export default class Encrypter {
  static async compare (value, hash) {
    if (!value) {
      throw new MissingParamError('value')
    }
    if (!hash) {
      throw new MissingParamError('hash')
    }
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }

  static async hash(value) {
    return await bcrypt.hash(value, 2)
  }
}
