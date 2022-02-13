export default function makeSendOtp({
    sendSms
}: any = {}) {
    return async function sendOtp({ phoneNumber, otp}) {
        const message = `Votre code pour se connecter: ${ otp }`
        return sendSms([ phoneNumber ], message)
    } 
}
