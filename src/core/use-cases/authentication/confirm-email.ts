import { AlreadyDoneError, InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeConfirmEmail({
    removeTmpToken,
    verifyToken,
    emailConfirmationView,
    userDb
}: any = {}) {
    if (!removeTmpToken || !verifyToken || !userDb || !emailConfirmationView) throw new ServerError()
    return async function confirmEmail({
        token,
        lang
    }: any = {}) {
        if (!token) throw new MissingParamError('token')
        const { email } = await verifyToken({ token })
        if (!email) throw new InvalidParamError('token')
        const user = await userDb.findFirst({ where: { email }, select: { firstName: true, emailVerifiedAt: true }})
        if (!user) throw new InvalidParamError('token')

        if (user.emailVerifiedAt) throw new AlreadyDoneError(user.emailVerifiedAt)
        else {
            const emailVerifiedAt = new Date()
            await userDb.updateOne({ where: { email }, data: { emailVerifiedAt } })
            removeTmpToken({ token })
        }
        return emailConfirmationView({ lang, firstName: user.firstName })
    }
}
