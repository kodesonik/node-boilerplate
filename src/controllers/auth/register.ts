import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makeRegisterController({
    signUp
}) {
    // use translations
    return async function registerController(request: IHttpRequest): Promise<IHttpResponse> {
        const { lastName, firstName, email, phoneNumber } = request.body,
        lang = request.lang,
        date = new Date(),
        reqLog: Log = {
            date: date.toDateString(),
            time: date.toTimeString(),
            userId: null,
            lastName,
            firstName,
            email,
            phoneNumber,
            model: 'User',
            path: '/api/auth/register',
            modelId: null,
            action: Action.WRITE,
            status: LogStatus.FAILED,
            description: `${lastName}  ${firstName}  ${Action.WRITE} his infos`
        }
        try {
            const body = request.body,
                data = await signUp({
                    firstName,
                    lastName,
                    birthDay: body.birthDay,
                    phoneNumber,
                    email, 
                    password: body.password,
                    language: lang
                })
                reqLog.userId = data.data.id,
                reqLog.modelId = data.data.id.toString()
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
