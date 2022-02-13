import { Request, Response} from 'express'
import { IHttpRequest, IHttpResponse } from '../../core/conventions'


export default function makeExpressRouterAdapter() {
  return function  expressRouterAdapter(controller, responseFormat?: string, download?: boolean) {
    return async (req: Request | any, res: Response) => {
      const httpRequest: IHttpRequest = {
        body: req.body,
        params: req.params,
        token: req.params.token,
        ref: req.params.ref,
        lang: req.params.lang,
        file: req.file
      }
      // console.log('adapt lang ', httpRequest.lang)
      const httpResponse: IHttpResponse = await controller(httpRequest)
      if(download) {
        res.type(responseFormat)
        res.status(httpResponse.statusCode).download(httpResponse.body.data)
      } else if (responseFormat === 'html') {
        res.type(responseFormat)
        res.status(httpResponse.statusCode).render(httpResponse.body.view)
      } else if (responseFormat) {
        res.type(responseFormat)
        res.status(httpResponse.statusCode).send(httpResponse.body)
      } else {
        res.status(httpResponse.statusCode).json(httpResponse.body)
      }
    }
  }
}
