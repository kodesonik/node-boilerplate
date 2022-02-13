import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    adminCheck, 
    authCheck, 
    fileUpload, 
    langCheck 
} from "../../configs/middlewares"
import { 
    blockUserController,
    deletedUserController,
    deletedUsersController,
    deleteUserController,
    getUserController, 
    getUsersController,
    patchUserAvatarController,
    patchUserController,
    postUserController,
    restoreUserController,
    unblockUserController
} from "../../controllers/user"

export default () => {
    const router = express.Router()
    router.get('/user/:id', langCheck, authCheck, expressRouterAdapter(getUserController))
    router.route('/user')
    .get(langCheck, authCheck, expressRouterAdapter(getUsersController))
    .post(langCheck, authCheck, adminCheck, expressRouterAdapter(postUserController))
    .patch(langCheck, authCheck, adminCheck, expressRouterAdapter(patchUserController))
    .delete(langCheck, authCheck, adminCheck, expressRouterAdapter(deleteUserController))
    router.patch('/block-user', langCheck, authCheck, adminCheck, expressRouterAdapter(blockUserController))
    router.patch('/unblock-user', langCheck, authCheck, adminCheck, expressRouterAdapter(unblockUserController))
    router.get('/deleted-user', langCheck, authCheck, adminCheck, expressRouterAdapter(deletedUsersController))
    router.get('/deleted-user/:id', langCheck, authCheck, adminCheck, expressRouterAdapter(deletedUserController))
    router.patch('/restore-user', langCheck, authCheck, adminCheck, expressRouterAdapter(restoreUserController))
    router.patch('/user-avatar', langCheck, authCheck, adminCheck, fileUpload.single('avatar'), expressRouterAdapter(patchUserAvatarController))
    return router
}