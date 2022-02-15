import { ServerError, MissingParamError, InvalidParamError } from "../../../utils/errors"

export default function makeSignInWithEmailAndPassword({
    userDb,
    comparePasswords,
    generateToken,
    saveToken
}: any = {}) {
    if (!userDb || !comparePasswords  || !generateToken || !saveToken) throw new ServerError()
    return async function signInWithEmailAndPassword({
        email,
        password
    }: any = {}) {
        if (!email) throw new MissingParamError('email')
        if (!password) throw new MissingParamError('password')
        const user = await userDb.findFirst({ where: { email }, select: { id: true, role: true, firstName: true, lastName: true, phoneNumber: true, birthDay: true, email: true, emailVerifiedAt: true, password: true, createdAt: true }})
        if (!user) throw new InvalidParamError('email')
        if (!user.emailVerifiedAt) throw new Error('Email not verified!')
        if (! await comparePasswords({ hash: user.password, password })) throw new InvalidParamError('password')
        const token =  await generateToken({ id: user.id, role: user.role })
        await saveToken({ token })
        const message = { text: 'auth.message.login' }
        delete user.password
        return { token, data: user, message }
    }
}
