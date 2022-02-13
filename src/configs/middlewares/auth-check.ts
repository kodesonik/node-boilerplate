import { UserDb } from "../../db"
import { ExpiredParamError, InvalidParamError, MissingParamError } from "../../utils/errors"
import { CacheManager, HttpResponse, TokenManager } from "../../utils/helpers"

export default async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    let httpResponse 

    if (!token) {
        httpResponse = HttpResponse.badRequest(new MissingParamError('token'), req.params.lang)
         res.status(httpResponse.statusCode).json(httpResponse.body) 
    } else {
        const ref = await TokenManager.verify(token)
        // console.log('ref: ', ref)  
        if (!ref) {
            httpResponse = HttpResponse.badRequest(new InvalidParamError('token'), req.params.lang)
            res.status(httpResponse.statusCode).json(httpResponse.body) 
        } else {
            const tokenExists = await CacheManager.findInArray('tokens', token)
            if (tokenExists === undefined || tokenExists === null) {
                httpResponse = HttpResponse.forbiddenError(new ExpiredParamError('token'), req.params.lang)
                res.status(httpResponse.statusCode).json(httpResponse.body) 
            } else {  
                req.params.ref = ref
                req.params.token = token
                const userDb = new UserDb()
                const { lastName, firstName, role,  blockedAt } = await userDb.findFirst({ where: { id: ref.id }, select: { lastName: true, firstName: true, blockedAt: true }})
                if (role !== ref.role) {
                    httpResponse = HttpResponse.forbiddenError(new ExpiredParamError('token'), req.params.lang)
                    res.status(httpResponse.statusCode).json(httpResponse.body)
                } else {
                    req.params.ref.lastName = lastName
                    req.params.ref.firstName = firstName
                    if (blockedAt) {
                        httpResponse = HttpResponse.unauthorizedError(req.params.lang)
                        res.status(httpResponse.statusCode).json(httpResponse.body) 
                    }  else next()
                }
            }
        }
    }  
   
}
  