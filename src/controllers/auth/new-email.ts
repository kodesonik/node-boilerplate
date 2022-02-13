import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions"
import { HttpResponse, LogManager } from "../../utils/helpers"

export default function makeNewEmailController({
    changeEmail
}) {
    // use translations
    return async function newEmailController(request: IHttpRequest): Promise<IHttpResponse> {
        const { id, lastName, firstName } = request.ref,
            { email } = request.body,
            lang = request.lang,
            date = new Date(),
            reqLog: Log = {
                date: date.toDateString(),
                time: date.toTimeString(),
                userId: id,
                lastName,
                firstName,
                model: 'User',
                path: '/api/auth/new-email',
                modelId: id.toString(),
                action: Action.EDIT,
                status: LogStatus.FAILED,
                description: `${lastName}  ${firstName}  ${Action.EDIT} his account email`
            }
        try {
            const token = request.token,
                data = await changeEmail({ id, email, token, lang });
            reqLog.status = LogStatus.SUCCEEDED
            LogManager.save(reqLog)
            return HttpResponse.ok(data, lang)
        } catch (err) {
            reqLog.failureReason = err.message
            LogManager.save(reqLog)
            return HttpResponse.error(err, lang)()
        }
    }
}
