import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { HttpResponse } from "../../utils/helpers"

export default () => { 
    const router = express.Router()
    router.get('/docs', expressRouterAdapter((httpRequest) => HttpResponse.ok({ view: 'pages/docs/index'}), 'html'))
    // router.get('docs/logs')
    // router.get('docs/auth')
    // router.get('docs/user')
    return router
}