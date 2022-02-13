import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { adminCheck, authCheck, langCheck } from "../../configs/middlewares"
import { getLogsController, getUserLogsController } from "../../controllers/userlogs"


export default () => { 
    const router = express.Router()
    router.get('/logs', langCheck, authCheck, adminCheck, expressRouterAdapter(getLogsController))
    router.get('/logs/:id', langCheck, authCheck, adminCheck, expressRouterAdapter(getUserLogsController))
    // router.get('/logs-download', langCheck, authCheck, adminCheck, expressRouterAdapter(LogsDownloadController))

    return router
}