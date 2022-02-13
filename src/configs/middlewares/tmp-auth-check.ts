import { CacheManager, TokenManager } from "../../utils/helpers"

export default async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(403).json({ error: "Token not provided!"})   
    const ref = await TokenManager.verify(token)
    if (!ref) res.status(403).send({ message: 'Access denied' })         
    else {
        const tokenIndex = await CacheManager.findInArray('tmp_tokens', token)
        if (tokenIndex === undefined || tokenIndex === null) res.status(503).json({ error: "Token expired."})
        else {  
            req.params.ref = ref
            req.params.token = token
            next()
        }
      
    }
}
  