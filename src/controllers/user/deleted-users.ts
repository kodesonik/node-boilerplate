import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makeDeletedUsersController({
    listRemovedUsers
}) {
    // use translations
    return async function deletedUsersController(request: IHttpRequest): Promise<IHttpResponse> {
        const reqLog: Log = {
            date: new Date().toDateString(), 
            time: new Date().toTimeString(),
            userId: request.ref.id, 
            lastName: request.ref.lastName,
            firstName: request.ref.firstName,
            model: 'User',
            path: '/api/deleted-users',
            modelId: 'all',
            action: Action.READ,
            status: LogStatus.FAILED,
            description: `${request.ref.lastName}  ${request.ref.firstName}  ${Action.READ} all trash users`
        } 

        try {
            const lang = request.lang,
                body = request.body,
                data = await listRemovedUsers({...body})
                reqLog.status = LogStatus.SUCCEEDED
                reqLog.description += ` (${ data.count }) from ${ data.startAt} to ${ data.startAt + data.limit }`
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
