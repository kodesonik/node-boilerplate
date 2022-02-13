import { env } from "../environment"

export default async (req, res, next) => {
    let lang = req.headers['lang']
    if (!lang)   lang = env.lang.default
    req.params.lang = lang
    next()
}
  