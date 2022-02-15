import makeGetLogsController from "./get-logs"
import makeGetUserLogsController from "./get-user-logs"

const getLogsController = makeGetLogsController()
const getUserLogsController = makeGetUserLogsController()

export {
    getLogsController,
    getUserLogsController
}