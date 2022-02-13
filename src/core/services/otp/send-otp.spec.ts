describe('Send Otp', () => {

    function  makeSendOtpSpy({

    }: any = {}) {
        return async function sendOtp ({

        }: any = {}) {
            
        }
    }

    function makeSut() {
        // const SendOtp = makeSendOtpSpy()
        // const sendOtp = makeSendOtpSpy()
        // const sendOtp = makeSendOtpSpy()
        const sut = makeSendOtpSpy()
        return { sut }
    }
    test('Should return a function', () => {
        const { sut } = makeSut()
        expect( typeof(sut)).toBe('function')
    })
})
