import { CacheManager, RandomChar, SmsServer } from "../../../utils/helpers"
import makeGenerateOtp from "./generate-otp"
import makeGetOtp from "./get-otp"
import makeRemoveOtp from "./remove-otp"
import makeSaveOtp from "./save-otp"
import makeSendOtp from "./send-otp"


const generateOtp = makeGenerateOtp({ randomNum: RandomChar.randomNum })
const removeOtp = makeRemoveOtp({ removeInCache: CacheManager.remove  })
const saveOtp = makeSaveOtp({ addInCache: CacheManager.arrayPush, removeOtp })
const sendOtp = makeSendOtp({ sendSms: SmsServer.send })
const getOtp = makeGetOtp({ findInCache: CacheManager.findInArray })

export {
    generateOtp,
    removeOtp,
    saveOtp,
    sendOtp,
    getOtp
}
