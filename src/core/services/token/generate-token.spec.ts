describe('Generate token', () => {

    function  makeGenerateTokenSpy({

    }: any = {}) {
        return async function GenerateToken ({

        }: any = {}) {

        }
    }

    function makeSut() {
        // const generateToken = makeGenerateTokenSpy()
        // const saveToken = makeSaveTokenSpy()
        // const sendToken = makeSendTokenSpy()
        const sut = makeGenerateTokenSpy()
        return { sut }
    }
    test('Should return a function', () => {
        const { sut } = makeSut()
        expect( typeof(sut)).toBe('function')
    })
})
