import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makeLogoutController({
    signOut
}) {
    // use translations
    return async function logoutController(request: IHttpRequest): Promise<IHttpResponse> {
        
        const { id, lastName, firstName } = request.ref,
        lang = request.lang,
        date = new Date(),
        reqLog: Log = {
            date: date.toDateString(), 
            time: date.toTimeString(),
            userId: id, 
            lastName: lastName,
            firstName: firstName,
            model: 'User',
            path: '/api/auth/logout',
            modelId: id.toString(),
            action: Action.LOGOUT,
            status: LogStatus.FAILED,
            description: `${lastName}  ${firstName}  ${Action.LOGOUT} `
        } 
        try {
            const token = request.token,
                data = await signOut({ token })
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
