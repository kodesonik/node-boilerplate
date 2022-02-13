import { AlreadyDoneError, InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeRemovePassword({
    removeTmpToken,
    verifyToken,
    resetPasswordView,
    userDb
}: any = {}) {
    if (!removeTmpToken || !verifyToken || !userDb || !resetPasswordView) throw new ServerError()
    return async function removePassword({
        token,
        lang
    }: any = {}) {
        if (!token) throw new MissingParamError('token')
        const { email } = await verifyToken({ token })
        if (!email) throw new InvalidParamError('token')
        const user = await userDb.findFirst({ where: { email }, select: { firstName: true, password: true } })
        if (!user) throw new InvalidParamError('link')
         if (!user.password) throw new AlreadyDoneError('before')
        await userDb.updateOne({ where: { email }, data: { password: '' } })
        removeTmpToken({ token })
        return resetPasswordView({ lang, firstName: user.firstName })
    }
}
