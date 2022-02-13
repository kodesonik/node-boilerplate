export default function makeGetOtp ({
    findInCache
}: any = {}){
    return async function getOtp({ 
        phoneNumber,
        otp 
    }: any ={}) {
        return await findInCache(phoneNumber, otp)
    }
}