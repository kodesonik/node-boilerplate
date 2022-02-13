import { InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeConfirmOtp({
    prisma,
    getOtp,
    userDb,
    deviceDb,
    generateToken,
    saveToken,
    removeOtp,
    removeTmpToken
}: any = {}) {
    if (!prisma || !getOtp || !userDb || !deviceDb || !generateToken || !saveToken || !removeOtp || !removeTmpToken) throw new ServerError()
    return async function confirmOtp({
        token,
        phoneNumber,
        otp,
        lang,
        device
    }: any = {}) {
        if (!phoneNumber) throw new MissingParamError('phoneNumber')
        if (!otp) throw new MissingParamError('otp')
        if (!device) throw new MissingParamError('device')
        if (!token || !lang) throw new ServerError()

        const otpIndex = await getOtp({ phoneNumber, otp })
        if (otpIndex === null || otpIndex === undefined) throw new InvalidParamError('otp')

        let user = await userDb.findFirst({ where: { phoneNumber } })
        const phoneNumberVerifiedAt = new Date()
        let firstAuth = false
        return await prisma.$transaction(async (_) => {
            if (!user) {
                firstAuth = true
                user = await userDb.insertOne({
                    data: {
                        phoneNumber,
                        phoneNumberVerifiedAt,
                        role: 'user',
                        status: 3,
                        firstName: "",
                        lastName: "",
                        language: lang,
                        email: "",
                        password: ""
                    }
                })
            } else await userDb.updateOne({ where: { id: user.id }, data: { phoneNumberVerifiedAt } })
            const savedDevice = await deviceDb.findFirst({ where: { id: device.id, userId: user.id } })
            if (!savedDevice) await deviceDb.insertOne({
                data: {
                    id: device.id,
                    userId: user.id,
                    token: device.token,
                    platform: device.platform
                }
            })
            const authToken = await generateToken({ id: user.id, role: user.role })
            await saveToken({ token: authToken })
            await removeOtp({ phoneNumber })
            await removeTmpToken({ token })
            const message = { text: 'auth.message.otpVerified' }
            return { token: authToken, data: { id: user.id, firstName: user.firstName, lastName: user.lastName, phoneNumber: user.phoneNumber, email: user.email, birthDay: user.birthDay, createdAt: user.createdAt }, firstAuth, message } 
        })
       

    }
}
