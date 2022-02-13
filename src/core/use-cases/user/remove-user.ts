import { MissingParamError, ServerError } from "../../../utils/errors"

export default function makeRemoveUser({
    userDb
}: any = {}){
    if (!userDb) throw new ServerError()
    return async function removeUser({
        id,
    }: any = {}){
        if (!id) throw new MissingParamError('id')
        await userDb.deleteOne({ where: { id }})

        const message = { text: "response.remove"}
        return { message }
    } 
}