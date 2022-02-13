describe('Decrypt token', () => {

    function  makeDecryptTokenSpy({

    }: any = {}) {
        return async function DecryptToken ({

        }: any = {}) {

        }
    }

    function makeSut() {
        // const DecryptToken = makeDecryptTokenSpy()
        // const saveToken = makeSaveTokenSpy()
        // const sendToken = makeSendTokenSpy()
        const sut = makeDecryptTokenSpy()
        return { sut }
    }
    test('Should return a function', () => {
        const { sut } = makeSut()
        expect( typeof(sut)).toBe('function')
    })
})
