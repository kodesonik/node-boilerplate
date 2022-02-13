import { PrismaClient } from "@prisma/client"
import { DeviceDb, UserDb } from "../../../db"
import { askToConfirmEmail, askToResetPassword, emailConfirmationView, isValidEmail, resetPasswordView } from "../../services/email"
import { generateOtp, getOtp, removeOtp, saveOtp, sendOtp } from "../../services/otp"
import { comparePasswords, hashPassword } from "../../services/password"
import { generateToken, removeTmpToken, removeToken, saveTmpToken, saveToken, verifyToken } from "../../services/token"
import { deleteAvatarFile } from "../../services/upload"
import makeChangeEmail from "./change-email"

import makeChangePassword from "./change-password"
import makeChangePhoneNumber from "./change-phone-number"
import makeConfirmEmail from "./confirm-email"
import makeConfirmOtp from "./confirm-otp"
import makeGetProfile from "./get-profile"
import makeRecoverPassword from "./recover-password"
import makeRemovePassword from "./remove-password"
import makeSetProfile from "./set-profile"
import makeSignInWithEmailAndPassword from "./sign-in-with-email-and-password"
import makeSignInWithPhoneNumber from "./sign-in-with-phone-number"
import makeSignOut from "./sign-out"
import makeSignUp from "./sign-up"
import makeUpdateAvatar from "./update-avatar"
import makeUpdateProfile from "./update-profile"
import makeRemoveAccount from "./remove-account"

const prisma = new PrismaClient()
const userDb = new UserDb()
const deviceDb = new DeviceDb()

const signInWithEmailAndPassword = makeSignInWithEmailAndPassword({ userDb, comparePasswords, generateToken, saveToken })
const signInWithPhoneNumber = makeSignInWithPhoneNumber({ generateOtp, saveOtp, sendOtp, generateToken, saveTmpToken })
const confirmOtp = makeConfirmOtp({ prisma, getOtp, userDb, deviceDb, generateToken, saveToken, removeOtp, removeTmpToken })
const signUp = makeSignUp({ userDb, askToConfirmEmail, isValidEmail, hashPassword, generateToken})
const confirmEmail = makeConfirmEmail({ removeTmpToken, verifyToken, emailConfirmationView, userDb })
const removePassword = makeRemovePassword({ removeTmpToken, verifyToken, resetPasswordView, userDb })
const changePassword = makeChangePassword({ removeToken, comparePasswords, hashPassword, userDb })
const setProfile = makeSetProfile({ userDb, generateToken, saveTmpToken, askToConfirmEmail, isValidEmail, hashPassword })
const getProfile = makeGetProfile({ userDb })
const updateProfile = makeUpdateProfile({ userDb })
const updateAvatar = makeUpdateAvatar({ userDb, deleteAvatarFile})
const recoverPassword = makeRecoverPassword({ userDb, generateToken, saveTmpToken, askToResetPassword })
const signOut = makeSignOut({ removeToken })
const removeAccount = makeRemoveAccount({ userDb, removeToken})
const changeEmail = makeChangeEmail({ userDb, generateToken, removeToken, saveTmpToken, askToConfirmEmail, isValidEmail })
const changePhoneNumber = makeChangePhoneNumber({ userDb, generateOtp, saveOtp, sendOtp, generateToken, removeToken, saveTmpToken })

export {
    signInWithEmailAndPassword,
    signInWithPhoneNumber,
    confirmOtp,
    signUp,
    confirmEmail,
    removePassword,
    changePassword,
    setProfile,
    getProfile,
    updateProfile,
    updateAvatar,
    recoverPassword,
    signOut,
    removeAccount,
    changeEmail,
    changePhoneNumber
}
