import { MissingParamError, ServerError } from '../../../helpers/errors'

describe('Sign in with email and password', () => {

    function  makeSignInWithEmailandPasswordSpy({

    }: any = {}) {
        return async function signInWithEmailandPassword ({

        }: any = {}) {

        }
    }

    function makeSut() {
        // const generateOtp = makeGenerateOtpSpy()
        // const saveOtp = makeSaveOtpSpy()
        // const sendOtp = makeSendOtpSpy()
        const sut = makeSignInWithEmailandPasswordSpy()
        return { sut }
    }

    // function makeGenerateOtpSpy() {
    //     return function generateOtp() {
    //         const otp = 'any otp'
    //         return otp
    //     }
    // }

    // function makeGenerateOtpWithError() {
    //     throw new Error()
    // }

    // function makeSaveOtpSpy() {
    //     return async function saveOtp() {
    //         return true
    //     }
    // }

    // function makeSaveOtpWithError() {
    //     throw new Error()
    // }

    // function makeSendOtpSpy() {
    //     return async function sendOtp() {
    //         return true
    //     }
    // }

    // function makeSendOtpWithError() {
    //     throw new Error()
    // }


    test('Should return a function', () => {
        const { sut } = makeSut()
        expect( typeof(sut)).toBe('function')
    })

    // test('Should throw if dependencies are  not provided', () => {
    //     const generateOtp = () => makeGenerateOtpSpy()
    //     const saveOtp = makeSaveOtpSpy()
    //     const sendOtp = makeSendOtpSpy()
    //     const suts = [
    //         () => makeSignInWithEmailandPasswordSpy(),
    //         () => makeSignInWithEmailandPasswordSpy({}),
    //         () => makeSignInWithEmailandPasswordSpy({ generateOtp }),
    //         () => makeSignInWithEmailandPasswordSpy({ saveOtp }),
    //         () => makeSignInWithEmailandPasswordSpy({ sendOtp }),
    //         () => makeSignInWithEmailandPasswordSpy({ generateOtp, saveOtp }),
    //         () => makeSignInWithEmailandPasswordSpy({ generateOtp, sendOtp }),
    //         () => makeSignInWithEmailandPasswordSpy({ saveOtp, sendOtp })
    //     ]
    //     suts.forEach( sut => expect(sut).toThrow(new ServerError()))
        
    // })

    // test('Should throw if dependencies throws', () => {
    //     const generateOtp = () => makeGenerateOtpSpy()
    //     const saveOtp = () =>  makeSaveOtpSpy()
    //     const sendOtp = () => makeSendOtpSpy()
    //     const generateOtpWithError = () => makeGenerateOtpWithError()
    //     const saveOtpWithError = () =>  makeSaveOtpWithError()
    //     const sendOtpWithError = () => makeSendOtpWithError()
    //     const suts = [
    //         makeSignInWithEmailandPasswordSpy({ 
    //             generateOtp: generateOtpWithError, 
    //             saveOtp,
    //             sendOtp 
    //         }),
    //         makeSignInWithEmailandPasswordSpy({
    //             generateOtp, 
    //             saveOtp: saveOtpWithError,
    //             sendOtp
    //         }),
    //         makeSignInWithEmailandPasswordSpy({
    //             generateOtp, 
    //             saveOtp,
    //             sendOtp: sendOtpWithError
    //         }),
    //         makeSignInWithEmailandPasswordSpy({ 
    //             generateOtp: generateOtpWithError,
    //             saveOtp: saveOtpWithError,
    //             sendOtp: sendOtpWithError 
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