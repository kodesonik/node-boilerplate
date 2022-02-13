export default function makeRemoveToken({
    removeInCache
}: any = {}) {
    return async function removeToken({
        token,
    }: any = {}) {
        return await removeInCache('tokens', token)
    }
}
