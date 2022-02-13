export default function makeSaveOtp({
    addInCache,
    removeOtp
}: any = {}) {
    return async function saveOtp({
        phoneNumber,
        otp
    }: any = {}) {
        await removeOtp({ phoneNumber })
        return await addInCache(phoneNumber, otp)
    }
}
