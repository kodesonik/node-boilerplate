import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeBlockUser({
    userDb
}: any = {}){
    if (!userDb) throw new ServerError()
    return async function blockUser({
        id
    }: any = {}){
        if (!id) throw new MissingParamError('id')
        await userDb.updateOne({ where: { id} , data: { blockedAt: new Date() }})
        const message = { text: "response.edit"}
        return { message }
    } 
}