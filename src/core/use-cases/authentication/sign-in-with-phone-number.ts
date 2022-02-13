import { ServerError, MissingParamError } from "../../../utils/errors"

export default function makeSignInWithPhoneNumber({
    generateOtp,
    saveOtp,
    sendOtp,
    generateToken,
    saveTmpToken
}: any = {}) {
    if (!generateOtp || !saveOtp || !sendOtp || !generateToken || !saveTmpToken) throw new ServerError()
    return async function signInWithPhoneNumber({
        phoneNumber
    }: any = {}) {
        if (!phoneNumber) throw new MissingParamError('phoneNumber')
        const otp = await generateOtp()
        const token = await generateToken({ phoneNumber })
        await saveTmpToken({ token })
        await saveOtp({ phoneNumber, otp })
        // await sendOtp({ phoneNumber, otp })
        const message = { text: 'auth.message.signinWithPhone', params: { phoneNumber }}
        return { token, message }
    }
}
