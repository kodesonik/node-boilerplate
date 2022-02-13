import { ServerError } from "../../../utils/errors"

export default function makeListRemovedUsers({
    userDb
}: any = {}) {
    if (!userDb) throw new ServerError()
    return async function listRemovedUsers ({
        startAt,
        limit
    }: any ={}) {
        if (!startAt) startAt = 0
        if (!limit) limit = 100
        const data = await userDb.findManyInTrash({
            startAt, 
            limit, 
            select:{
            id: true,
            avatar: true,
            lastName: true,
            firstName: true,
            phoneNumber: true,
            email: true,
            birthDay: true,
            createdAt: true,
            deletedAt: true,
            role: true
        }})
        return { data, count: data.length, startAt, limit }
    }
}
