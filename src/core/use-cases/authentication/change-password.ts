import { AlreadyDoneError, InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeChangePassword({ 
    removeToken,
    comparePasswords,
    hashPassword,
    userDb
}: any = {}) {
    if ( !removeToken  || !userDb || !comparePasswords || !hashPassword ) throw new ServerError()

    return async function changePassword ({
        id,
        password,
        oldPassword,
        token
    }: any = {}) {
        if (!token) throw new MissingParamError('token')
        if (!id) throw new InvalidParamError('token')
        if (!password) throw new MissingParamError('password')
        // if (!oldPassword) throw new MissingParamError('oldPassword')
        const user = await userDb.findFirst({  where: { id }, select: { password: true }})
        if (!user) throw new InvalidParamError('id')
        if(user.password) {
            if(! await comparePasswords({ hash: user.password, password: oldPassword })) throw new InvalidParamError('oldPassword')
            if(await comparePasswords({ hash: user.password, password })) throw new AlreadyDoneError('before')
        } 
        password = await hashPassword({ password })
        await userDb.updateOne({
             where: { id }, 
             data: { password }
            })
        await removeToken({ token })
        const message = { text: 'auth.message.changePassword'}
        return { message }
    }
}
