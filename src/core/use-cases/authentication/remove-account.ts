import { ServerError } from "../../../utils/errors"

export default function makeRemoveAccount({
    removeToken,
    userDb
}: any = {}) {
    if (!removeToken || !userDb) throw new ServerError()
    return async function removeAccount({
        token,
        id
    }: any = {}) {
        await removeToken({ token }),
        await userDb.deleteOne({ where : { id }})
        const message = { text: 'auth.message.removeAccount'}
        return { message }
    }
}
