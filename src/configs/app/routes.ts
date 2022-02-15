import express from 'express'
import apiRoutes from '../../routes/api'
import webRoutes from '../../routes/web'


export default app => {
   const webRouter =  webRoutes(express.Router())
   webRouter.use('/api', apiRoutes(express.Router({mergeParams: true})))
   app.use('/', webRouter)
}
