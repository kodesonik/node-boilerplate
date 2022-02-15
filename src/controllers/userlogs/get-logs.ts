import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makeGetLogsController() {
    return async function getLogsController(request: IHttpRequest): Promise<IHttpResponse> {
        const { id, lastName, firstName } = request.ref,
            lang = request.lang,
            reqLog: Log = {
                date: new Date().toDateString(),
                time: new Date().toTimeString(),
                userId: id,
                lastName,
                firstName,
                model: 'Log',
                path: '/api/logs',
                modelId: 'all',
                action: Action.READ,
                status: LogStatus.FAILED,
                description: `${lastName}  ${firstName}  ${Action.READ} all logs`
            }
        try {
            const data = await LogManager.read()
            reqLog.status = LogStatus.SUCCEEDED
            reqLog.description += ` (${data.length}) rows`
            LogManager.save(reqLog)
            return HttpResponse.ok(data, lang)
        } catch (err) {
            reqLog.failureReason = err.message
            LogManager.save(reqLog)
            return HttpResponse.error(err, lang)()
        }
    }
}
