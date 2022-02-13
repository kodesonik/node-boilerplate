export default function makeGenerateToken({
    generate
}: any = {}) {
    return async function generateToken(data: any = {}) {
        return await generate(data)
    }
}
