import authentication from "./authentication"
import logs from "./logs"
import user from "./user"

export default (router) => {
    router.use(logs())
    router.use('/auth', authentication())
    router.use(user())
    return router
}
