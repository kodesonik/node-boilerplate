import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeUnblockUser({
    userDb
}: any = {}){
    if (!userDb) throw new ServerError()
    return async function unblockUser({
        id
    }: any = {}){
        if (!id) throw new MissingParamError('id')
        await userDb.updateOne({ where: { id} , data: { blockedAt: null }})
        const message = { text: "response.edit"}
        return { message }
    } 
}