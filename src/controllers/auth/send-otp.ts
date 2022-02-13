import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makeSendOtpController({
    signInWithPhoneNumber
}) {
    return async function sendOtpController(request: IHttpRequest): Promise<IHttpResponse> {
        const { phoneNumber } = request.body,
        lang = request.lang,
        date = new Date(),
        reqLog: Log = {
            date: date.toDateString(),
            time: date.toTimeString(),
            userId: null,
            phoneNumber,
            model: 'User',
            path: '/api/auth/send-otp',
            modelId: null,
            action: Action.REQUEST,
            status: LogStatus.FAILED,
            description: `${phoneNumber} ${Action.REQUEST} to receive otp`
        }
        try {
            const data = await signInWithPhoneNumber({ phoneNumber });
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
