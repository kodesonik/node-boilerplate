import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makeGetUserLogsController() {
    return async function getUserLogsController(request: IHttpRequest): Promise<IHttpResponse> {
        const lang = request.lang,
        { id } = request.params,
        userId =  request.ref.id,
        { lastName, firstName } =  request.ref,
        reqLog: Log = {
            date: new Date().toDateString(), 
            time: new Date().toTimeString(),
            userId, 
            lastName,
            firstName,
            model: 'Log',
            path: '/api/logs/:id',
            modelId: id,
            action: Action.READ,
            status: LogStatus.FAILED,
            description: `${lastName}  ${firstName}  ${Action.READ} user ${id} logs`
        } 

        try {
            const data = await LogManager.getByUser(Number(id))
                reqLog.status = LogStatus.SUCCEEDED
                reqLog.description += ` (${ data.length }) rows`
                LogManager.save(reqLog)
            return HttpResponse.ok(data, lang)
        } catch (err) {
            const lang = request.lang
            reqLog.status = LogStatus.FAILED
            reqLog.failureReason = err.message
            LogManager.save(reqLog)
            return HttpResponse.error(err, lang)()
        }
    }
}
