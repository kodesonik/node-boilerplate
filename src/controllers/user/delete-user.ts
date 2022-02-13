import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makeDeleteUserController({
    removeUser
}) {
    // use translations
    return async function deleteUserController(request: IHttpRequest): Promise<IHttpResponse> {
        const reqLog: Log = {
            date: new Date().toDateString(), 
            time: new Date().toTimeString(),
            userId: request.ref.id, 
            lastName: request.ref.lastName,
            firstName: request.ref.firstName,
            model: 'User',
            path: '/api/user',
            modelId: request.ref.id.toString(),
            action: Action.DELETE,
            status: LogStatus.FAILED,
            description: `${request.ref.lastName}  ${request.ref.firstName}  ${Action.DELETE} user ${request.body.id}`
        } 
        try {
            const lang = request.lang,
                { id } = request.body,
                data = await removeUser({ id })
                reqLog.status = LogStatus.SUCCEEDED
                LogManager.save(reqLog)
                return HttpResponse.ok(data, lang)
        } catch (err) {
            const lang = request.lang
            reqLog.failureReason = err.message
            LogManager.save(reqLog)
            return HttpResponse.error(err, lang)()
        }
    }
}
