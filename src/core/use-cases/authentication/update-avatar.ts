import { InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeUpdateAvatar ({
    userDb,
    deleteAvatarFile
}: any = {}) {
    if (!userDb || !deleteAvatarFile) throw new ServerError()
    return async function updateAvatar({
         id,
        file
    }: any = {}) {
        if (!file || file == {}) throw new MissingParamError('file')
        console.log('file', file)
        // remove public/ in the avatar name
        const user = await userDb.findFirst({ where: { id }, select: { avatar: true}})
        if (!user) throw new InvalidParamError('token')
        if (user.avatar) deleteAvatarFile(user.avatar)
        const avatar = file.path.substring(file.path .indexOf("/"));
        userDb.updateOne({ where: { id },  data: { avatar }})
        const message = { text: 'auth.message.updateAvatar' }
        return { message, data: { avatar }}
    }
}