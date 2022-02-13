export default function makeGenerateOtp({
    randomNum
}: any = {}) {
    return async function generateOtp({ 
    }: any = {}) {
        return await randomNum(6)
    }
}
