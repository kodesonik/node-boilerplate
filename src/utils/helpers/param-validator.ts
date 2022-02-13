import validator from 'validator'

export default class ParamValidator {
    static isEmail(email: string): boolean{
        return validator.isEmail(email)
    }

    static isMobilePhone(phoneNumber: string): boolean {
        return validator.isMobilePhone(phoneNumber)
    }
}