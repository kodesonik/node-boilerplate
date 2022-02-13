const bcrypt = require('bcrypt')
const Encrypter = require('./encrypter')
const { MissingParamError } = require('../errors')

const makeSut = () => {
  const encrypter = new Encrypter()
  return encrypter
}

describe('Encrypter', () => {
  test('Should return true if bcrypt return true', async () => {
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(true)
  })

  test('Should return false if bcrypt return false', async () => {
    bcrypt.isValid = false
    const sut = makeSut()
    const isValid = await sut.compare('any_value', 'any_hash')
    expect(isValid).toBe(false)
  })

  test('Should call bcrypt with correct values', async () => {
    const sut = makeSut()
    await sut.compare('any_value', 'any_hash')
    expect(bcrypt.value).toEqual('any_value')
    expect(bcrypt.hash).toEqual('any_hash')
  })

  test('Should throw if no params are provided', async () => {
    const sut = makeSut()
    const promise = sut.compare()
    expect(promise).rejects.toThrow(new MissingParamError('value'))
  })
})
