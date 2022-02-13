import ejs from 'ejs'
import path from "path"
import { LanguageManager } from '.'
import { env } from '../../configs/environment'

export default class DataFormatter {
    static viewsFolder = '../../../views/'
    static async ejsToHtml(file, params, lang?) {
        const _this = DataFormatter
         params  =  _this.translateParams(params, lang)
       return await ejs.renderFile(path.join(__dirname, _this.viewsFolder + file), params, { async: true})
    }

    private static translateParams(params, lang?) {
        if(!lang) lang = env.lang.default
          Object.keys(params).map( (key, index) => {
             if (params[key].text) params[key] = LanguageManager.translate(lang, params[key].text, params[key].params)
         })
         return params

    }
}
