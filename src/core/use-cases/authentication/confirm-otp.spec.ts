import { MissingParamError, ServerError } from '../../../helpers/errors'

describe('Confirm OTP', () => {

    function  makeConfirmOtp({ 
        getOtp,
        decryptToken,
        getOneInDb,
        generateToken 
    }: any = {}) {
        if (! getOtp || !decryptToken || !getOneInDb || !generateToken) throw new ServerError()
        return async function signInWithEmailandPassword ({

        }: any = {}) {

        }
    }

    function makeSut() {
        const getOtp = () => makeGetOtpSpy()
        const decryptToken = () => makeDecryptTokenSpy()
        const getOneInDb = () => makeGetOneInDbSpy()
        const generateToken = ()=> makeGenerateTokenSpy()
        const sut = makeConfirmOtp({ getOtp, decryptToken, getOneInDb, generateToken})
        return { sut }
    }

    function makeGetOtpSpy() {
        return async function getOtp({ token }) {
            const otp = 'any otp'
            return otp
        }
    }

    function makeGetOtpWithError() {
        throw new Error()
    }

    function makeDecryptTokenSpy() {
        return async function decryptToken() {
            return 'valid data'
        }
    }

    function makeDecryptTokenWithError() {
        throw new Error()
    }


    function makeGetOneInDbSpy() {
        return async function getOneInDb() {
            const info = 'user info'
            return info
        }
    }

    function makeGetOneInDbWithError() {
        throw new Error()
    }


    function makeGenerateTokenSpy() {
        return async function generateToken(data: any = {}) {
            if(!data) throw new MissingParamError('data')
            return 'valid token'
        }
    }

    function makeGenerateTokenWithError() {
        throw new Error()
    }



    test('Should return a function', () => {
        const { sut } = makeSut()
        expect( typeof(sut)).toBe('function')
    })

    test('Should throw if dependencies are  not provided', () => {
        const getOtp = () => makeGetOtpSpy()
        const decryptToken = () => makeDecryptTokenSpy()
        const getOneInDb = () => makeGetOneInDbSpy()
        const generateToken = ()=> makeGenerateTokenSpy()
        const suts = [
            () => makeConfirmOtp(),
            () => makeConfirmOtp({}),
            () => makeConfirmOtp({ getOtp }),
            () => makeConfirmOtp({ decryptToken }),
            () => makeConfirmOtp({ getOneInDb }),
            () => makeConfirmOtp({ generateToken })
        ]
        suts.forEach( sut => expect(sut).toThrow(new ServerError()))
        
    })

    // test('Should throw if dependencies throws', () => {
    //     const getOtp = () => makeGetOtpSpy()
    //     const decryptToken = () => makeDecryptTokenSpy()
    //     const getOneInDb = () => makeGetOneInDbSpy()
    //     const generateToken = () => makeGenerateTokenSpy()
    //     const getOtpWithError = () => makeGetOtpWithError()
    //     const decryptTokenwithError = () => makeDecryptTokenWithError()
    //     const getOneInDbwithError = () => makeGetOneInDbWithError()
    //     const generateTokenwithError = ()=> makeGenerateTokenWithError()
    //     const suts = [
    //         makeConfirmOtp({ 
    //             getOtp: getOtpWithError, 
    //             decryptToken, 
    //             getOneInDb,
    //             generateToken
    //         }),
    //         makeConfirmOtp({
    //             getOtp, 
    //             decryptToken: decryptTokenwithError, 
    //             getOneInDb,
    //             generateToken
    //         }),
    //         makeConfirmOtp({
    //             getOtp, 
    //             decryptToken, 
    //             getOneInDb: getOneInDb,
    //             generateToken
    //         }),
    //         makeConfirmOtp({ 
    //             getOtp, 
    //             decryptToken, 
    //             getOneInDb,
    //             generateToken: generateTokenwithError
    //         }),
    //         makeConfirmOtp({ 
    //             getOtp: getOneInDbwithError, 
    //             decryptToken: decryptToken, 
    //             getOneInDb: getOneInDbwithError,
    //             generateToken: generateToken
    //         })
    //     ]
    //     suts.forEach( sut =>  expect(sut).rejects.toThrow())
    // })

    // test('Should throw if no phoneNumber is provided ', async () => {
    //     const { sut } = makeSut()
    //     expect(() =>  sut()).rejects.toThrow(new MissingParamError('phoneNumber'))
    // })

    // test('Should return a valid response if all credentials are good', () => {
    //     const { sut } = makeSut()
    //     expect( async () => await sut()).toBeTruthy()
    // })

})