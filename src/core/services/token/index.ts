import makeGenerateToken from "./generate-token";
import makeVerifyToken from "./verify-token";
import { CacheManager, TokenManager } from "../../../utils/helpers";
import makeSaveToken from "./save-token";
import makeSaveTmpToken from "./save-tmp-token";
import makeRemoveToken from "./remove-token";
import makeRemoveTmpToken from "./remove-tmp-token";


const saveToken = makeSaveToken({ addInCache: CacheManager.arrayPush })
const saveTmpToken = makeSaveTmpToken({ addInCache: CacheManager.arrayPush })
const generateToken = makeGenerateToken({ generate: TokenManager.generate})
const verifyToken = makeVerifyToken({ verify: TokenManager.verify })
const removeToken = makeRemoveToken({ removeInCache: CacheManager.removetAt })
const removeTmpToken = makeRemoveTmpToken({ removeInCache: CacheManager.removetAt })

export {
    saveToken,
    saveTmpToken,
    generateToken,
    verifyToken,
    removeToken,
    removeTmpToken
}