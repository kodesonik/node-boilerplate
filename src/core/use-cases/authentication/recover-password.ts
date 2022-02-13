import { ServerError, MissingParamError, InvalidParamError } from "../../../utils/errors"

export default function makeRecoverPassword({
    userDb,
    generateToken,
    saveTmpToken,
    askToResetPassword,
}: any = {}) {
    if (!userDb || !generateToken || !saveTmpToken || !askToResetPassword ) throw new ServerError()
    return async function recoverPassword({
        email,
        lang
    }: any = {}) {
        if (!email) throw new MissingParamError('email')
        if (!lang) throw new MissingParamError('lang')
        const user = await userDb.findFirst({ where: { email }, select: { firstName: true, emailVerifiedAt: true } })
        if (!user) throw new InvalidParamError('email')
        if (!user.emailVerifiedAt) throw new Error('Your email is not confirmed. Check your box')
        const token = await generateToken({ email })
        await saveTmpToken({ token })
        await askToResetPassword({ email, token, firstName: user.firstName, lang })
        const message = { text: 'auth.message.recoverPassword', params: { email } }
        return { message }
    }
}