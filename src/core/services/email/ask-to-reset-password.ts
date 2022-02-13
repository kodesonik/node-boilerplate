import {  ServerError } from "../../../utils/errors"

export default function makeAskToResetPassword({
    sendMail,
    apiUrl,
    ejsToHtml
}: any = {}) {
    if (!sendMail || !apiUrl || !ejsToHtml ) throw new ServerError()
    return async function askToResetPassword({
        email,
        token,
        firstName,
        lang
    }: any = {}) {
        if (!email || !token || !firstName || !lang) throw new ServerError()
        const salutationText = { text: 'auth.resetPassword.salutation', params: { name: firstName }},
            thanks = {text: 'auth.resetPassword.thanks'},
            senderName = {text: 'auth.resetPassword.sender' },
            message =  {text: 'auth.resetPassword.message' },
            confirmButtonText = {text: 'auth.resetPassword.button' },
            responseUrl = apiUrl + 'api/auth/reset-password?token='+token+'&lang='+lang,
            html = await ejsToHtml('mails/password-reset.ejs', { responseUrl, message, confirmButtonText, salutationText, thanks, senderName }, lang)
        const subject = "Reset password"
        return await sendMail(email, subject, html)
    }
}
