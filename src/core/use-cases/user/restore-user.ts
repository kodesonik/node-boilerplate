import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeRestoreUser({
    userDb
}: any = {}){
    if (!userDb) throw new ServerError()
    return async function restoreUser({
        id
    }: any = {}){
        if (!id) throw new MissingParamError('id')
        await userDb.updateOne({ where: { id} , data: { deletedAt: null }})
        const message = { text: "response.restore"}
        return { message }
    } 
}