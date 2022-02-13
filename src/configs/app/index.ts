import express from 'express'
import setupApp from './setup'
import setupRoutes from './routes'
// import setUpView from './views'

const app = express()
setupApp(app)
setupRoutes(app)
// setUpView(app)

export default app
