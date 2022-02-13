import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions";
import { HttpResponse, LogManager } from "../../utils/helpers";

export default function makeVerifyOtpController({
    confirmOtp
}) {
    return async function verifyOtpController(request: IHttpRequest): Promise<IHttpResponse> {
        const { phoneNumber } = request.ref,
            lang = request.lang,
            date = new Date(),
            reqLog: Log = {
                date: date.toDateString(),
                time: date.toTimeString(),
                userId: null,
                phoneNumber,
                model: 'User',
                path: '/api/auth/verify-otp',
                modelId: null,
                action: Action.REQUEST,
                status: LogStatus.FAILED,
                description: `${phoneNumber} ${Action.REQUEST} to receive otp`
            }
        try {
            const token = request.token,
                { otp, device } = request.body,
                data = await confirmOtp({ token, otp, device, lang, phoneNumber })
            reqLog.userId = data.data.id
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
