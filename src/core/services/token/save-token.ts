export default function makeSaveToken({
    addInCache
}: any = {}) {
    return async function saveToken({
        token,
    }: any = {}) {
        return await addInCache('tokens', token)
    }
}
