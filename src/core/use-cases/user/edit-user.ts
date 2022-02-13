import { InvalidParamError, MissingParamError, ServerError } from "../../../utils/errors"

export default function makeEditUser({
    userDb,
    isValidEmail,
    hashPassword
}: any = {}){
    if (!userDb || !isValidEmail || !hashPassword) throw new ServerError()
    return async function editUser({
        id,
        lastName,
        firstName,
        phoneNumber,
        email,
        birthDay,
        role,
        language,
        password
    }: any = {}){
        if (!id) throw new MissingParamError('id')
        const data: any = {}
        if (lastName) data.lastName = lastName
        if (firstName) data.firstName = firstName
        if (phoneNumber) data.phoneNumber = phoneNumber
        if (email) {
            if (! await isValidEmail({ email })) throw new InvalidParamError('email')
            data.email = email
        }
        if (birthDay) {
            if (typeof birthDay === 'string') birthDay = new Date(birthDay)
            data.birthDay = birthDay
        }
        if (role) data.role = role
        if (language) data.language = language
        if (password) password = await hashPassword({ password }) 

        if( Object.keys(data).length === 0) throw new MissingParamError('all')

        await userDb.updateOne({ where: { id} , data })

        const message = { text: "response.edit"}
        return { message }
    } 
}