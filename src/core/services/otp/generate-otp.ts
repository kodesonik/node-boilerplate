export default function makeGenerateOtp({
    randomNum
}: any = {}) {
    return async function generateOtp() {
        return await randomNum(6)
    }
}
