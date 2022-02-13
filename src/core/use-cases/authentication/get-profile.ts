import { ServerError, InvalidParamError } from "../../../utils/errors"

export default function makeGetProfile ({
    userDb
}: any = {}) {
    if (!userDb) throw new ServerError()
    return async function getProfile({
       id
    }: any = {}) {
        if (! id ) throw new InvalidParamError('token')
        const data = await userDb.findFirst({
            where: { id }, 
            select: { 
                firstName: true,
                lastName: true,
                birthDay: true,
                email: true,
                role: true,
                phoneNumber: true,
                profileCompletedAt: true 
            }
            })
        return { data }
    }
}