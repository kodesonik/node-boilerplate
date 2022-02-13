const jwt = require('jsonwebtoken')
const TokenGenerator = require('./token-generator')
const { MissingParamError } = require('../errors')

const makeSut = () => {
  const tokenGenerator = new TokenGenerator('secret')
  return tokenGenerator
}

describe('Token Generator', () => {
  test('Should return null if jwt returns null', async () => {
    const sut = makeSut()
    jwt.token = null
    const token = await sut.generate('any_id')
    expect(token).toBeNull()
  })

  test('Should return token if jwt returns token', async () => {
    const sut = makeSut()
    const token = await sut.generate('any_id')
    expect(token).toEqual(jwt.token)
  })

  test('Should call jwt with corrects values', async () => {
    const sut = makeSut()
    await sut.generate('any_id')
    expect(jwt.secret).toEqual(sut.secret)
    expect(jwt.id).toEqual('any_id')
  })

  test('Should throw if no secret is provided', async () => {
    const sut = new TokenGenerator()
    const promise = sut.generate('any_id')
    expect(promise).rejects.toThrow(new MissingParamError('secret'))
  })

  test('Should throw if no id is provided', async () => {
    const sut = makeSut()
    const promise = sut.generate()
    expect(promise).rejects.toThrow(new MissingParamError('id'))
  })
})
