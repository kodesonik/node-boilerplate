export default function makeResetPasswordView({
    ejsToHtml
}: any = {}) {
    return async function resetPasswordView({
        firstName,
        lang
    }) {
        const salutationText = { text: 'auth.resetPasswordPage.salutation', params: { name: firstName }},
        thanks = {text: 'auth.resetPasswordPage.thanks'},
        senderName = {text: 'auth.resetPasswordPage.sender' },
        message = {text: 'auth.resetPasswordPage.message' }
        return await ejsToHtml('pages/auth/password-reset.ejs', { salutationText, thanks, message, senderName }, lang)
    }
}
