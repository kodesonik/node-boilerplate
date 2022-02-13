import { InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeSignUp({
    userDb,
    askToConfirmEmail,
    isValidEmail,
    hashPassword,
    generateToken
}: any = {}) {
    if (!userDb || !askToConfirmEmail || !isValidEmail || !hashPassword || !generateToken) throw new ServerError()
    return async function signUp({
            firstName,
            lastName,
            birthDay,
            phoneNumber,
            email,
            password,
            language
    }: any = {}) {
        if (!firstName) throw new MissingParamError('firstName')
        if (!lastName) throw new MissingParamError('lastName')
        if (!birthDay) throw new MissingParamError('birthDay')
        if (typeof birthDay == 'string') birthDay = new Date(birthDay)
        if (!phoneNumber) throw new MissingParamError('phoneNumber')
        if (!email) throw new MissingParamError('email')
        if (!isValidEmail({ email }))  throw new InvalidParamError('email')
        if (!password) throw new MissingParamError('password')
        password = await hashPassword({ password })
        const { id } = await userDb.insertOne({ data: { firstName, lastName, phoneNumber, email, password, birthDay, role: 'user', language,  profileCompletedAt: new Date()}})
        const token = await generateToken({ email })
        await askToConfirmEmail({ email, token, firstName, lastName, lang: language })
        const message = { text: 'auth.message.register', params: { email }}
        return { message, data: { id } }
    }
}