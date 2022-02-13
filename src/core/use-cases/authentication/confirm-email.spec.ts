describe('Confirm email', () => {

    function  makeConfirmEmailSpy({

    }: any = {}) {
        return async function confirmEmail ({

        }: any = {}) {

        }
    }

    function makeSut() {
        // const generateOtp = makeGenerateOtpSpy()
        // const saveOtp = makeSaveOtpSpy()
        // const sendOtp = makeSendOtpSpy()
        const sut = makeConfirmEmailSpy()
        return { sut }
    }
    test('Should return a function', () => {
        const { sut } = makeSut()
        expect( typeof(sut)).toBe('function')
    })
})
