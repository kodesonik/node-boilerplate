export default function makeEmailConfirmationView({
    ejsToHtml
}: any = {}) {
    return async function emailConfirmationView({
        firstName,
        lang
    }) {
        const salutationText = { text: 'auth.confirmationPage.salutation', params: { name: firstName }},
        thanks = {text: 'auth.confirmationPage.thanks'},
        senderName = {text: 'auth.confirmationPage.sender' },
        message = {text: 'auth.confirmationPage.message' }
        return await ejsToHtml('pages/auth/email-confirmation.ejs', { salutationText, thanks, message, senderName }, lang)
    }
}
