describe('Change password', () => {

    function  makeChangePasswordSpy({

    }: any = {}) {
        return async function changePassword ({

        }: any = {}) {

        }
    }

    function makeSut() {
        // const generateOtp = makeGenerateOtpSpy()
        // const saveOtp = makeSaveOtpSpy()
        // const sendOtp = makeSendOtpSpy()
        const sut = makeChangePasswordSpy()
        return { sut }
    }
    test('Should return a function', () => {
        const { sut } = makeSut()
        expect( typeof(sut)).toBe('function')
    })
})
