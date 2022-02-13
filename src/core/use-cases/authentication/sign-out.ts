export default function makeSignOut({
    removeToken
}: any = {}) {
    return async function signOut({
        token
    }: any = {}) {
       await removeToken({ token })
       const message = { text: 'auth.message.logout'}
       return { message }
    }
}