describe('Reset password', () => {

    function  makeResetPasswordSpy({

    }: any = {}) {
        return async function resetPassword ({

        }: any = {}) {

        }
    }

    function makeSut() {
        // const generateOtp = makeGenerateOtpSpy()
        // const saveOtp = makeSaveOtpSpy()
        // const sendOtp = makeSendOtpSpy()
        const sut = makeResetPasswordSpy()
        return { sut }
    }
    test('Should return a function', () => {
        const { sut } = makeSut()
        expect( typeof(sut)).toBe('function')
    })
})
