import { ServerError, InvalidParamError, MissingParamError } from "../../../utils/errors"

export default function makeSetProfile ({
    userDb,
    generateToken,
    saveTmpToken,
    askToConfirmEmail,
    isValidEmail,
    hashPassword
}: any = {}) {
    if (!userDb || !generateToken || !saveTmpToken || !askToConfirmEmail || ! isValidEmail || !hashPassword) throw new ServerError()
    return async function setProfile({
        id ,
        lang,
        firstName,
        lastName,
        birthDay,
        email,
        password
    }: any = {}) {
        if (! id ) throw new InvalidParamError('token')
        if (!firstName) throw new MissingParamError('firstName')
        if (!lastName) throw new MissingParamError('lastName')
        if (!birthDay) throw new MissingParamError('birthDay')
        if (typeof birthDay == 'string') birthDay = new Date(birthDay)
        const user = await userDb.findFirst({ where: { id }, select: { firstName: true, lastName: true, birthDay: true, profileCompletedAt: true }})
        if (user && (user.firstName || user.lastName || user.birthDay)) {
            const message =  { text: 'error.alreadyDone', params: { date: user.profileCompletedAt}}
            return { message }
        }
        const data: any = { firstName, lastName, birthDay, profileCompletedAt: new Date(), language: lang }
        if (email) {
            if (!isValidEmail({ email }))  throw new InvalidParamError('email')
            if (!password) throw new MissingParamError('password')
            data.email = email
            const token = await generateToken({ email })
            await saveTmpToken({ token })
            await askToConfirmEmail({ email, token, firstName, lang })
            data.password = await hashPassword({ password })
        }
        
        await userDb.updateOne({ where: { id }, data })
        const message = { text: 'auth.message.profileUpdated'}
        return { message }
    }
}