import docs from "./docs"
import web from "./web"

export default (router) => {
    router.use(web())
    router.use(docs())
    return router
}