import { env } from "../../../configs/environment";
import { DataFormatter, Mailer, ParamValidator } from "../../../utils/helpers";
import makeAskToConfirmEmail from "./ask-to-confirm-email";
import makeAskToResetPassword from "./ask-to-reset-password";
import makeEmailConfirmationView from "./email-confirmation-view";
import makeIsValidEmail from "./is-valid-email";
import makeResetPasswordView from "./reset-password-view";

const apiUrl = env.url

const askToConfirmEmail = makeAskToConfirmEmail({ sendMail: Mailer.send, apiUrl, ejsToHtml: DataFormatter.ejsToHtml})
const askToResetPassword = makeAskToResetPassword({ sendMail: Mailer.send, apiUrl, ejsToHtml: DataFormatter.ejsToHtml})
const emailConfirmationView = makeEmailConfirmationView({ ejsToHtml: DataFormatter.ejsToHtml })
const resetPasswordView = makeResetPasswordView({ ejsToHtml: DataFormatter.ejsToHtml })
const isValidEmail = makeIsValidEmail({ emailValidator: ParamValidator.isEmail })

export{
    askToConfirmEmail,
    emailConfirmationView,
    askToResetPassword,
    resetPasswordView,
    isValidEmail
}
