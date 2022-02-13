import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions"
import { HttpResponse, LogManager } from "../../utils/helpers"

export default function makeDeleteAccountController({
    removeAccount
}) {
    // use translations
    return async function deleteAccountController(request: IHttpRequest): Promise<IHttpResponse> {
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
            path: '/api/auth/delete-account',
            modelId: id.toString(),
            action: Action.DELETE,
            status: LogStatus.FAILED,
            description: `${lastName}  ${firstName}  ${Action.DELETE} his account`
        } 
        try {
               const token = request.token,
                data = await removeAccount({ id, token, lang })
                reqLog.status = LogStatus.SUCCEEDED
                LogManager.save(reqLog)
            return HttpResponse.ok(data, lang)
        } catch (err) {
            reqLog.status = LogStatus.SUCCEEDED
            LogManager.save(reqLog)
            return HttpResponse.error(err, lang)()
        }
    }
}
