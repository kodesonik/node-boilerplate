import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makeProfileController({
    getProfile
}) {
    // use translations
    return async function profileController(request: IHttpRequest): Promise<IHttpResponse> {
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
                path: '/api/auth/profile',
                modelId: id.toString(),
                action: Action.READ,
                status: LogStatus.FAILED,
                description: `${lastName}  ${firstName}  ${Action.READ} his infos`
            }
        try {
            const data = await getProfile({ id })
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
