import { ServerError, InvalidParamError } from "../../../utils/errors"

export default function makeUpdateProfile ({
    userDb
}: any = {}) {
    if (!userDb) throw new ServerError()
    return async function updateProfile({
        id ,
        firstName,
        lastName,
        birthDay
    }: any = {}) {
        const data: any = {}
        if (! id ) throw new InvalidParamError('token')
        if (firstName) data.firstName = firstName
        if (lastName) data.lastName = lastName
        if (birthDay) data.birthDay =  new Date(birthDay) 
        await userDb.updateOne({ where: { id }, data })
        const message = { text: 'auth.message.updateProfile' }
        return { message }
    }
}