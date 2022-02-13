export default function makeComparePasswords({
    decrypt
}) {
    return async function comparePasswords({
        hash,
        password
    }) {
        return await decrypt(password, hash)
    }
}