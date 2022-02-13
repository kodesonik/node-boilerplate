export default function makeRemoveOtp({
    removeInCache
}: any = {}) {
    return async function removeOtp({
        phoneNumber
    }: any = {}) {
       return await removeInCache(phoneNumber)
    }
}
