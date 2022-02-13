import { AlreadyDoneError, InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeChangeEmail({
    userDb,
    generateToken,
    removeToken,
    saveTmpToken,
    askToConfirmEmail,
    isValidEmail
}: any = {}) {
    if (!userDb || !generateToken || !saveTmpToken || !askToConfirmEmail || ! isValidEmail || !removeToken) throw new ServerError()
    return async function changeEmail({
        id,
        email,
        token,
        lang
    }: any = {}) {
        if (!id) throw new MissingParamError('id')
        if (!email) throw new MissingParamError('email')
        if (!isValidEmail({ email }))  throw new InvalidParamError('email')
        if (!lang) throw new MissingParamError('lang')
        if (!token) throw new MissingParamError('token')

        const user = await userDb.findFirst({ where: { id }, select: { email: true, firstName: true, emailVerifiedAt: true}})
        console.log(user)
        if (!user) throw new InvalidParamError('id')
        // if(!user.emailConfirmedAt) throw new Error('Your first email is not confirmed.')
        if(user.email === email) throw new AlreadyDoneError('before')
        await userDb.updateOne({ where: { id }, data: { email, emailVerifiedAt:  null} })
        const tmpToken = await generateToken({ email })
        await saveTmpToken({ token: tmpToken })
        await askToConfirmEmail({ email, token: tmpToken, firstName: user.firstName, lang })
        await removeToken({ token })
        const message = { text: 'auth.message.changeEmail', params: { email }}
        return { message }
    }
}