import express from "express"
import { expressRouterAdapter } from "../../configs/adapters"
import { 
    langCheck, 
    tmpAuthCheck, 
    authCheck,
    fileUpload,
    queryParser
} from "../../configs/middlewares"
import { 
    completeInfosController,
    confirmEmailController,
    deleteAccountController,
    editAvatarController,
    editProfileController,
    forgotPasswordController,
    loginController,
    logoutController,
    newEmailController,
    newPasswordController,
    newPhoneNumberController,
    profileController,
    registerController,
    resetPasswordController,
    sendOtpController,
    verifyOtpController 
} from "../../controllers/auth"

export default () => {
    const router = express.Router()
    router.post('/send-otp', langCheck, expressRouterAdapter(sendOtpController))
    router.post('/verify-otp', langCheck, tmpAuthCheck, expressRouterAdapter(verifyOtpController))
    router.post('/complete-profile', langCheck,langCheck, authCheck, expressRouterAdapter(completeInfosController))
    router.get('/confirm-email', langCheck, queryParser, expressRouterAdapter(confirmEmailController, 'html'))
    router.post('/login', langCheck, expressRouterAdapter(loginController))
    router.post('/register', langCheck, expressRouterAdapter(registerController))
    router.post('/logout', langCheck, authCheck, expressRouterAdapter(logoutController))
    router.get('/profile', langCheck, authCheck, expressRouterAdapter(profileController))
    router.post('/new-password', langCheck, authCheck, expressRouterAdapter(newPasswordController))
    router.post('/forgot-password', langCheck, expressRouterAdapter(forgotPasswordController))
    router.post('/edit-profile', langCheck, authCheck, expressRouterAdapter(editProfileController))
    router.post('/edit-avatar', langCheck, authCheck, fileUpload.single('avatar'), expressRouterAdapter(editAvatarController))
    router.get('/reset-password', langCheck, queryParser, expressRouterAdapter(resetPasswordController))
    router.post('/new-email', langCheck, authCheck, expressRouterAdapter(newEmailController))
    router.post('/new-phonenumber', langCheck, authCheck, expressRouterAdapter(newPhoneNumberController))
    router.post('/delete-account', langCheck, authCheck, expressRouterAdapter(deleteAccountController))
    return router
    // complete profil
}

