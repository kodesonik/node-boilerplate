import express from 'express'
// import { initHello } from '../../docs/hello'
// import { openApiInstance, initOpenApi } from '../../docs/openapi'
import apiRoutes from '../../routes/api'
import webRoutes from '../../routes/web'

export default app => {
 
   // declare our hello world api
  //  initHello(app, openApiInstance)


   // initializes schema endpoint and UI
  //  initOpenApi(app, openApiInstance)
   const webRouter =  webRoutes(express.Router())
   webRouter.use('/api', apiRoutes(express.Router({mergeParams: true})))
   app.use('/', webRouter)
}
