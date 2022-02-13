import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions"
import { ServerError } from "../../utils/errors"
import { HttpResponse, LogManager } from "../../utils/helpers"

export default function makeForgotPasswordController({
    recoverPassword
}: any = {}) {
    if (!recoverPassword) throw new ServerError()
    return async function forgotPasswordController(request: IHttpRequest): Promise<IHttpResponse> {
        const { email } = request.body,
            lang = request.lang,
            date = new Date(),
            reqLog: Log = {
                date: date.toDateString(),
                time: date.toTimeString(),
                userId: null,
                email,
                model: 'User',
                path: '/api/auth/forgot-password',
                modelId: null,
                action: Action.REQUEST,
                status: LogStatus.FAILED,
                description: `${email}  forget his password`
            }
        try {
            const data = await recoverPassword({ email, lang })
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