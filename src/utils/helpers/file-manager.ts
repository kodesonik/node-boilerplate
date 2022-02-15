import fs from 'fs'

export default class FileManager {

   // static async uploadSingleFile(path, file, maxSize) {
   //      return
   // }

   static async deleteFile(path) {
    if (fs.existsSync(path)) await fs.unlinkSync(__dirname+'public'+path);
    return
   }
}