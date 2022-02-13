export default function makeIsValidEmail({
    emailValidator
}: any = {}) {
    return async function isValidEmail({
        email
    }: any = {}) {
        return await emailValidator(email)
    }
}