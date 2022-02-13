export default function makeHashPassword({
    encrypt
}) {
    return async function hashPassword({
        password
    }) {
        return await encrypt(password)
    }
}