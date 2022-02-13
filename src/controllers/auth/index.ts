import { 
    confirmOtp, 
    setProfile,
    signInWithPhoneNumber,
    confirmEmail,
    signInWithEmailAndPassword,
    signUp,
    signOut,
    getProfile,
    changePassword,
    updateProfile,
    recoverPassword,
    removePassword,
    changeEmail,
    changePhoneNumber,
    removeAccount,
    updateAvatar
} from "../../core/use-cases/authentication"
import makeCompleteInfosController from "./complete-infos"
import makeConfirmEmailController from "./confirm-email"
import makeDeleteAccountController from "./delete-account"
import makeEditAvatarController from "./edit-avatar"
import makeEditProfileController from "./edit-profile"
import makeForgotPasswordController from "./forgot-password"
import makeLoginController from "./login"
import makeLogoutController from "./logout"
import makeNewEmailController from "./new-email"
import makeNewPasswordController from "./new-password"
import makeNewPhoneNumberController from "./new-phone"
import makeProfileController from "./profile"
import makeRegisterController from "./register"
import makeResetPasswordController from "./reset-password"
import makeSendOtpController from "./send-otp"
import makeVerifyOtpController from "./verify-otp"

const sendOtpController = makeSendOtpController({ signInWithPhoneNumber })
const verifyOtpController = makeVerifyOtpController({ confirmOtp })
const completeInfosController = makeCompleteInfosController({ setProfile })
const confirmEmailController = makeConfirmEmailController({ confirmEmail })
const loginController = makeLoginController({ signInWithEmailAndPassword })
const registerController = makeRegisterController({ signUp })
const logoutController = makeLogoutController({  signOut })
const profileController = makeProfileController({ getProfile })
const newPasswordController = makeNewPasswordController({ changePassword })
const editProfileController = makeEditProfileController({ updateProfile })
const editAvatarController = makeEditAvatarController({ updateAvatar })
const forgotPasswordController = makeForgotPasswordController({ recoverPassword })
const resetPasswordController = makeResetPasswordController({ removePassword })
const newEmailController = makeNewEmailController({ changeEmail })
const newPhoneNumberController = makeNewPhoneNumberController({ changePhoneNumber })
const deleteAccountController = makeDeleteAccountController({ removeAccount })

export {
    sendOtpController,
    verifyOtpController,
    completeInfosController,
    confirmEmailController,
    loginController,
    registerController,
    logoutController,
    profileController,
    newPasswordController,
    editProfileController,
    editAvatarController,
    forgotPasswordController,
    resetPasswordController,
    newEmailController,
    newPhoneNumberController,
    deleteAccountController
}