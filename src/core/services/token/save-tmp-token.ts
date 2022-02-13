export default function makeSaveTmpToken({
    addInCache
}: any = {}) {
    return async function saveTmpToken({
        token,
    }: any = {}) {
        return await addInCache('tmp_tokens', token)
    }
}
