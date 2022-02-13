import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeListRemovedUserInfos({
    userDb
}: any = {}) {
    if (!userDb) throw new ServerError()
    return async function listRemovedUserInfos ({
        id,
    }: any ={}) {
        if (!id)  throw new MissingParamError('id')
        const data = await userDb.findFirstInTrash({ where: { id }, select:{
            id: true,
            avatar: true,
            lastName: true,
            firstName: true,
            phoneNumber: true,
            email: true,
            birthDay: true,
            createdAt: true,
            blockedAt: true,
            deletedAt: true,
            role: true
        }})
        return { data }
    }
}
