describe('Save Otp', () => {

    function  makeSaveOtpSpy({

    }: any = {}) {
        return async function saveOtp ({

        }: any = {}) {
            
        }
    }

    function makeSut() {
        // const SaveOtp = makeSaveOtpSpy()
        // const saveOtp = makeSaveOtpSpy()
        // const sendOtp = makeSendOtpSpy()
        const sut = makeSaveOtpSpy()
        return { sut }
    }
    test('Should return a function', () => {
        const { sut } = makeSut()
        expect( typeof(sut)).toBe('function')
    })
})
