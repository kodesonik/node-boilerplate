import { MissingParamError, ServerError } from '../../../helpers/errors'
import makeSignInWithPhoneNumber from './sign-in-with-phone-number'

describe('Sign in with phone number', () => {


    function makeSut() {
        const generateOtp = makeGenerateOtpSpy()
        const saveOtp = makeSaveOtpSpy()
        const sendOtp = makeSendOtpSpy()
        const generateToken = makeGenerateTokenSpy()
        const sut = makeSignInWithPhoneNumber({ generateOtp, saveOtp, sendOtp, generateToken })
        return { sut }
    }

    function makeGenerateOtpSpy() {
        return function generateOtp() {
            const otp = 'valid otp'
            return otp
        }
    }

    function makeGenerateOtpWithError() {
        throw new Error()
    }

    function makeSaveOtpSpy() {
        return async function saveOtp() {
            return true
        }
    }

    function makeSaveOtpWithError() {
        throw new Error()
    }

    function makeSendOtpSpy() {
        return async function sendOtp() {
            return true
        }
    }

    function makeSendOtpWithError() {
        throw new Error()
    }

    function makeGenerateTokenSpy() {
        return function generateToken(data: any = {}) {
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
        const generateOtp = () => makeGenerateOtpSpy()
        const saveOtp = makeSaveOtpSpy()
        const sendOtp = makeSendOtpSpy()
        const suts = [
            () => makeSignInWithPhoneNumber(),
            () => makeSignInWithPhoneNumber({}),
            () => makeSignInWithPhoneNumber({ generateOtp }),
            () => makeSignInWithPhoneNumber({ saveOtp }),
            () => makeSignInWithPhoneNumber({ sendOtp }),
            () => makeSignInWithPhoneNumber({ generateOtp, saveOtp }),
            () => makeSignInWithPhoneNumber({ generateOtp, sendOtp }),
            () => makeSignInWithPhoneNumber({ saveOtp, sendOtp })
        ]
        suts.forEach( sut => expect(sut).toThrow(new ServerError()))
        
    })

    test('Should throw if dependencies throws', () => { 
        const generateOtp = () => makeGenerateOtpSpy()
        const saveOtp = () =>  makeSaveOtpSpy()
        const sendOtp = () => makeSendOtpSpy()
        const generateToken = makeGenerateTokenSpy()
        const generateOtpWithError = () => makeGenerateOtpWithError()
        const saveOtpWithError = () =>  makeSaveOtpWithError()
        const sendOtpWithError = () => makeSendOtpWithError()
        const generateTokenWithError = () => makeGenerateTokenWithError()

        const suts = [
            makeSignInWithPhoneNumber({ 
                generateOtp: generateOtpWithError, 
                saveOtp,
                sendOtp,
                generateToken 
            }),
            makeSignInWithPhoneNumber({
                generateOtp, 
                saveOtp: saveOtpWithError,
                sendOtp,
                generateToken
            }),
            makeSignInWithPhoneNumber({
                generateOtp, 
                saveOtp,
                sendOtp: sendOtpWithError,
                generateToken
            }),
            makeSignInWithPhoneNumber({
                generateOtp, 
                saveOtp,
                sendOtp,
                generateToken: generateTokenWithError
            }),
            makeSignInWithPhoneNumber({ 
                generateOtp: generateOtpWithError,
                saveOtp: saveOtpWithError,
                sendOtp: sendOtpWithError,
                generateToken:  generateTokenWithError
            })
        ]
        suts.forEach( sut =>  expect(sut).rejects.toThrow())
    })

    test('Should throw if no phoneNumber is provided ', async () => {
        const { sut } = makeSut()
        expect(() =>  sut()).rejects.toThrow(new MissingParamError('phoneNumber'))
    })

    test('Should return a valid response if all credentials are good', () => {
        const { sut } = makeSut()
        expect( async () => await sut()).toBeTruthy()
    })

    // test('Should return a valid otp if call generateOtp', () => {
    //     const generateOtp = makeGenerateOtpSpy()
    //     expect(generateOtp()).toBe('valid otp')
    // })

    // test('Should throw if call generateToken without params', () => {
    //     const generateToken =  () => makeGenerateTokenSpy()
    //     expect(generateToken()).toThrow(new MissingParamError('data'))
    // })

    // test('Should return a valid token if call generateToken with correct params', () => {
    //     const generateOtp = () => makeGenerateOtpSpy()
    //     expect(generateOtp).toBe('valid otp')
    // })

})