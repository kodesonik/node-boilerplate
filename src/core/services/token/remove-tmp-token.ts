export default function makeRemoveTmpToken({
    removeInCache
}: any = {}) {
    return async function removeTmpToken({
        token,
    }: any = {}) {
        return await removeInCache('tmp_tokens', token)
    }
}
