import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions"
import { ServerError } from "../../utils/errors"
import { HttpResponse, LogManager } from "../../utils/helpers"

export default function makeConfirmEmailController({
    confirmEmail
}: any = {}) {
    if (!confirmEmail) throw new ServerError()
    return async function confirmEmailController(request: IHttpRequest): Promise<IHttpResponse> {
        const { id, lastName, firstName } = request.ref,
        lang = request.lang,
        date = new Date(),
        reqLog: Log = {
            date: date.toDateString(), 
            time: date.toTimeString(),
            userId: id, 
            lastName,
            firstName,
            model: 'User',
            path: '/api/auth/confirm-email',
            modelId: id.toString(),
            action: Action.ACTIVATE,
            status: LogStatus.FAILED,
            description: `${lastName}  ${firstName}  ${Action.ACTIVATE} his account email`
        } 
        try {
            const token = request.token,
                data = await confirmEmail({ token,lang })
                reqLog.status = LogStatus.SUCCEEDED
                LogManager.save(reqLog)
            return HttpResponse.ok(data)          
        } catch (err) {
            reqLog.failureReason = err.message
            LogManager.save(reqLog)
            return HttpResponse.error(err, lang)()
        }

    }
}