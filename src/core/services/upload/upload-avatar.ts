export default function makeUploadAvatar({
    upload
}: any = {}){
    return async function uploadAvatar({
        file
    }: any = {}) {
        const data = await upload(file)
        console.log(data)
        return data
    }
}