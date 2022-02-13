export default function makeVerifyToken({
    verify
}:any = {}) {
    return async function verifyToken({
        token
    }: any = {}) {
        return await verify(token)
    }
}