import { LanguageManager } from '.'
import { env } from '../../configs/environment'
import { IHttpResponse } from '../../core/conventions'
import { ServerError, UnauthorizedError } from '../errors'

export default class HttpResponse {

  static ok(body, lang?): IHttpResponse {
    if (lang && body.message) body.message = LanguageManager.translate(lang, body.message.text, body.message.params)
    return {
      statusCode: 200,
      body
    }
  }

  static error(err, lang?) {
    console.warn(err.message)
    const _this = HttpResponse
    let method
    if (!lang) lang = env.lang.default

    switch (err.name) {
      case 'InvalidParamError':
        method = () => _this.badRequest(err, lang)
        break
      case 'MissingParamError':
        method = () => _this.badRequest(err, lang)
        break
      case 'AlreadyDoneError':
        method = () => _this.badRequest(err, lang)
        break
      case 'ServerError':
        method =() =>  _this.serverError(lang)
        break
      case 'UnauthorizedError':
        method = () => _this.unauthorizedError(lang)
        break
      case 'ExpiredParamError':
        method = () => _this.forbiddenError(err, lang)
        break
      default:
        method = () => _this.serverError(lang)
    }

    return method
  }

  static badRequest(err, lang): IHttpResponse {
    return {
      statusCode: 400,
      body: { error: LanguageManager.translate(lang, err.message, err.params)}
    }
  }

  static unauthorizedError(lang): IHttpResponse {
    return {
      statusCode: 401,
      body: {
        error:  LanguageManager.translate(lang, new UnauthorizedError().message)
      }
    }
  }

  static forbiddenError(err, lang): IHttpResponse {
    return {
      statusCode: 403,
      body: {
        error:  LanguageManager.translate(lang, err.message, err.params)
      }
    }
  }

  static serverError(lang): IHttpResponse {
    return {
      statusCode: 500,
      body: {
        error: LanguageManager.translate(lang, new ServerError().message)
      }
    }
  }
  

}
