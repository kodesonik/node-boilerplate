import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeListUserInfos({
    userDb
}: any = {}) {
    if (!userDb) throw new ServerError()
    return async function listUserInfos ({
        id,
    }: any ={}) {
        if (!id)  throw new MissingParamError('id')
        const data = await userDb.findFirst({ where: { id }, select:{
            id: true,
            avatar: true,
            lastName: true,
            firstName: true,
            phoneNumber: true,
            email: true,
            birthDay: true,
            createdAt: true,
            blockedAt: true,
            role: true
        }})
        return { data }
    }
}
