import formidable from 'formidable'
import { promisify } from 'util'
import fs from 'fs'
import { env } from '../../configs/environment'

export default class FileManager {

   static async uploadSingleFile(path, file, maxSize) {
        const uploadDir = env.upload.path + path
        const filename = new Date().getTime().toString()
        const upload = formidable({ 
            multiples: false, 
            keepExtensions: true,
            allowEmptyFiles: false,
            maxFileSize: maxSize? maxSize:env.upload.maxSize,
            uploadDir, 
            filename
        })
        const makeAsync = promisify(upload.parse).bind(upload)
        return  makeAsync({ body: file }).then((err, field, file) => {
            return file.filepath + file.newFilename
        })
   }

   static async deleteFile(path) {
    if (fs.existsSync(path)) await fs.unlinkSync(__dirname+'public'+path);
    return
   }
}