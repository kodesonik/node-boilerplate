import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions"
import { HttpResponse, LogManager } from "../../utils/helpers"

export default function makeNewPhoneNumberController({
    changePhoneNumber
}) {
    // use translations
    return async function newPhoneNumberController(request: IHttpRequest): Promise<IHttpResponse> {
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
                path: '/api/auth/new-phone',
                modelId: id.toString(),
                action: Action.EDIT,
                status: LogStatus.FAILED,
                description: `${lastName}  ${firstName}  ${Action.EDIT} his account phone number`
            }
        try {
            const token = request.token,
                { phoneNumber } = request.body,
                data = await changePhoneNumber({ id, phoneNumber, token, lang })
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
