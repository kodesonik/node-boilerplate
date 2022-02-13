import reader from 'xlsx'
import { env } from '../../configs/environment'
import { Log } from '../../core/conventions'

export default class LogManager {
    static async save(data: Log) {
        const file = await LogManager.getDataFile()
        if (!file) return
        const date = new Date()
        const sheetName = date.getFullYear().toString() + "_" + (date.getMonth() + 1).toString()
        let ws = file.Sheets[sheetName]
        if (ws) {
            const result: Log[] = reader.utils.sheet_to_json(ws)
            result.push(data)
            ws = reader.utils.sheet_add_json(ws, result)
            file.Sheets[sheetName] = ws
        } else {
            console.log(' new sheet exist')
            ws = reader.utils.json_to_sheet([data])
            reader.utils.book_append_sheet(file, ws, sheetName)
        }
        // Writing to our file
        reader.writeFile(file, env.logs.file)
    }

    static async getByUser(userId: number) {
        const file = await LogManager.getDataFile()
        if (!file) return []
        const sheets = [...file.SheetNames, 'home']
        const result: Log[] = []
         sheets.forEach(  sheetName => {
           const data: Log[] =  reader.utils.sheet_to_json<Log>(file.Sheets[sheetName])
            data.forEach(item => {
                if(item.userId === userId)  result.push(item)
            })
       })
        return result
    }

    static async read() {
        const file = reader.readFile(env.logs.file)
        if (!file) return []
        let data = []
        const sheets = [...file.SheetNames, 'home']
        for (let i = 0; i < sheets.length; i++) {
            const temp = reader.utils.sheet_to_json(
                file.Sheets[file.SheetNames[i]])
            temp.forEach((res) => {
                data.push(res)
            })
        }
        // Printing data
        console.log(data)
        return data
    }

    // static async download() {
    //     return return  env.logs.file
    // }

    static async getDataFile() {
        try {
            return await reader.readFile(env.logs.file)
        } catch(err) {
          if(err.code === 'ENOENT') {
             await LogManager.createDataFile()
            return LogManager.getDataFile()
          }
          return
        }
    }

    static async  createDataFile() {
        const file = reader.utils.book_new()
        await reader.utils.book_append_sheet(file, null, 'home')
        return await reader.writeFile(file, env.logs.file)
    }
}
