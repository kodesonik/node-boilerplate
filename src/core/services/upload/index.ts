import { FileManager } from "../../../utils/helpers";
import makeDeleteAvatar from "./delete-avatar-file";
import makeUploadAvatar from "./upload-avatar";

const uploadAvatar = makeUploadAvatar({ upload:  FileManager.deleteFile})
const deleteAvatarFile =  makeDeleteAvatar({ deleteFile: FileManager.deleteFile})
export {
    uploadAvatar,
    deleteAvatarFile
}