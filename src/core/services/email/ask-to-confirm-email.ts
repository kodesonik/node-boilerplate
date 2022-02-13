import { ServerError } from "../../../utils/errors"

export default function makeAskToConfirmEmail({
    sendMail,
    apiUrl,
    ejsToHtml
}: any = {}) {
    if (!sendMail || !apiUrl || !ejsToHtml ) throw new ServerError()
    return async function askToConfirmEmail({
        email,
        token,
        firstName,
        lang
    }: any = {}) {
        if (!email || !token || !firstName || !lang) throw new ServerError()
        const salutationText = { text: 'auth.confirmationMail.salutation', params: { name: firstName }},
            thanks = {text: 'auth.confirmationMail.thanks'},
            senderName = {text: 'auth.confirmationMail.sender' },
            message =  {text: 'auth.confirmationMail.message' },
            confirmButtonText = {text: 'auth.confirmationMail.button' },
            responseUrl = apiUrl + 'api/auth/confirm-email?token='+token+'&lang='+lang,
            html = await ejsToHtml('mails/email-confirmation.ejs', { responseUrl, message, confirmButtonText, salutationText, thanks, senderName }, lang)
        const subject = "Confirmation mail"
        return await sendMail(email, subject, html)
    }
}
