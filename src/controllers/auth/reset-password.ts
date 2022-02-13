import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions"
import { HttpResponse, LogManager } from "../../utils/helpers"

export default function makeResetPasswordController({
    removePassword
}: any = {}) {
    return async function resetPasswordController(request: IHttpRequest): Promise<IHttpResponse> {
        const { email } = request.ref,
            lang = request.lang,
            date = new Date(),
            reqLog: Log = {
                date: date.toDateString(),
                time: date.toTimeString(),
                userId: null,
                email,
                model: 'User',
                path: '/api/auth/reset-password',
                modelId: null,
                action: Action.REQUEST,
                status: LogStatus.FAILED,
                description: `${email}  reset his password`
            }
        try {
            const token = request.token,
                lang = request.lang,
                data = await removePassword({ token,lang })
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