import { env } from "../../configs/environment"
import fs from 'fs'

export default class LanguageManager {

    static translate(lang: string, _str: string, params = {}): string {
        if(!lang) lang = env.lang.default
        const self = LanguageManager
        const str = _str.split('.')
        const jsonFile = env.lang.path + lang + '.json'
        const langData = fs.readFileSync(jsonFile)
        const messages = JSON.parse(langData.toString())
        if (str.length === 2) {
           return self.setAttributes(messages[str[0]][str[1]], params)
        } 
        if (str.length === 3) {
            return self.setAttributes(messages[str[0]][str[1]][str[2]], params)
        } 
        return _str
     
    }

    private static setAttributes(str, params): string {
        const self = LanguageManager
        if (self.size(params) > 0) {
            let i = 1
            for (const key in params) {
                const _key = new RegExp(':' + key, 'g')
                str = str.replace(_key, params[key])
                if (i == self.size(params)) {
                    return str
                }
                i++
            }
        }
        return str
    }


    private static size(obj) {
        let size = 0, key
        for (key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) size++
        }
        return size
    }

}
