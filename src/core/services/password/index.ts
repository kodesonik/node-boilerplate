import { Encrypter } from "../../../utils/helpers"
import makeHashPassword from "./encrypt-password"
import makeComparePasswords from "./compare-passwords"

const hashPassword = makeHashPassword({ encrypt: Encrypter.hash })
const comparePasswords = makeComparePasswords({ decrypt:  Encrypter.compare })

export {
    hashPassword,
    comparePasswords
}