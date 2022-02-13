import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeEditUserAvatar ({
    userDb,
    deleteAvatarFile
}: any = {}) {
    if (!userDb || !deleteAvatarFile) throw new ServerError()
    return async function editUserAvatar({
         id,
        file
    }: any = {}) {
        if (!id) throw new MissingParamError('id')
        if (!file || file == {}) throw new MissingParamError('file')
        const user = await userDb.findFirst({ where: { id }, select: { avatar: true}})
        if (user.avatar) deleteAvatarFile(user.avatar)
        const avatar = file.path.substring(file.path .indexOf("/"));
        userDb.updateOne({ where: { id },  data: { avatar }})
        const message = { text: 'response.edit.' }
        return { message, avatar }
    }
}