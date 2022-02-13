describe('Get Otp', () => {

    function  makeGenerateOtpSpy({

    }: any = {}) {
        return async function GenerateOtp ({

        }: any = {}) {

        }
    }

    function makeSut() {
        // const generateOtp = makeGenerateOtpSpy()
        // const saveOtp = makeSaveOtpSpy()
        // const sendOtp = makeSendOtpSpy()
        const sut = makeGenerateOtpSpy()
        return { sut }
    }
    test('Should return a function', () => {
        const { sut } = makeSut()
        expect( typeof(sut)).toBe('function')
    })
})
