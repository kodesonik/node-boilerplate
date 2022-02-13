import { AlreadyDoneError, InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeChangePhoneNumber({
    generateOtp,
    saveOtp,
    sendOtp,
    generateToken,
    removeToken,
    saveTmpToken,
    userDb
}: any = {}) {
    if (!generateOtp || !saveOtp || !sendOtp || !generateToken || !saveTmpToken || !removeToken || !userDb) throw new ServerError()
    return async function changePhoneNumber({
        id,
        phoneNumber,
        token
    }: any = {}) {
        if (!id) throw new MissingParamError('id')
        if (!phoneNumber) throw new MissingParamError('phoneNumber')
        if (!token) throw new MissingParamError('token')
        const user = await userDb.findFirst({ where: { id}, select: { phoneNumber: true }})
        if(!user) throw new InvalidParamError('id')
        if(user.phoneNumber === phoneNumber) throw new AlreadyDoneError('before')
        await userDb.updateOne({ where: { id }, data: { phoneNumber }})
        const otp = await generateOtp()
        const tmpToken = await generateToken({ phoneNumber })
        await saveTmpToken({ token: tmpToken })
        await saveOtp({ phoneNumber, otp })
        await removeToken({ token })
        // await sendOtp({ phoneNumber, otp })
        const message = { text: 'auth.message.changePhoneNumber', params: { phoneNumber }}
        return { token: tmpToken, message }

    }
}