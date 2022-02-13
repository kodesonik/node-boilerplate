import { randomInt , randomBytes} from 'crypto'

export default class RandomChar {

    static randomStr(length: number) {
        return randomBytes(length).toString('hex')
    }

    static randomNum(length: number) {
        let code = ''
        for (let i=0; i<length; i++) {
            code +=  randomInt(9)
        }
       return code
    }
}
