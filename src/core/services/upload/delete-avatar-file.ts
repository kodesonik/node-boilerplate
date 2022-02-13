export default function makeDeleteAvatar({
    deleteFile
}: any = {}){
    return async function deleteAvatar({
        file
    }: any = {}) {
        return await deleteFile(file)
    }
}