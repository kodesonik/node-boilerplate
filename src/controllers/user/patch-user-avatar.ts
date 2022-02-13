import { Action, IHttpRequest, IHttpResponse, Log, LogStatus } from "../../core/conventions"
import { ServerError } from "../../utils/errors"
import { HttpResponse, LogManager } from "../../utils/helpers"

export default function makePatchUserAvatarController({
    editUserAvatar
}: any = {}) {
    if (!editUserAvatar) throw new ServerError()
    return async function patchUserAvatarController(request: IHttpRequest): Promise<IHttpResponse> {
        const reqLog: Log = {
            date: new Date().toDateString(), 
            time: new Date().toTimeString(),
            userId: request.ref.id, 
            lastName: request.ref.lastName,
            firstName: request.ref.firstName,
            model: 'User',
            path: '/api/user-avatar',
            modelId: request.body.id.toString(),
            action: Action.ULPLOAD,
            status: LogStatus.FAILED,
            description: `${request.ref.lastName}  ${request.ref.firstName}  ${Action.ULPLOAD} user ${request.body.id} avatar`
        }
        try {
            const { id } = request.body,
                lang = request.lang,
                file = request.file,
                data = await editUserAvatar({ id: Number(id), file })
                reqLog.status = LogStatus.SUCCEEDED
                LogManager.save(reqLog)
            return HttpResponse.ok(data, lang)
        } catch (err) {
            reqLog.failureReason = err.message
            LogManager.save(reqLog)
            const lang = request.lang
            return HttpResponse.error(err, lang)();
        }

    }
}