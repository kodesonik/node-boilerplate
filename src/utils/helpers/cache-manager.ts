import { promisify } from "util"
import redis from "redis"

export default class CacheManager {
    static client
   constructor() {
    
   }

   static connect() {
    CacheManager.client = redis.createClient()
    CacheManager.client.on("error", function(error) {
        console.error('redis connection failed ', error);
      })    
   }

  static arrayPush (array, value) {
    //   add expire delay
    const makeAsync = promisify(CacheManager.client.lpush).bind(CacheManager.client)
    return  makeAsync (array, value)
  }

  static findInArray (array, value) {
    const getAsync = promisify(CacheManager.client.lpos).bind(CacheManager.client)
    return getAsync(array, value)
  }

  static removetAt (array, value) {
    const makeAsync = promisify( CacheManager.client.lrem).bind(CacheManager.client) 
   return  makeAsync(array, 1, value)
  }

  static remove(array) {
    const makeAsync = promisify( CacheManager.client.del).bind(CacheManager.client) 
   return  makeAsync(array)
  }

   static set (key, value) {
    CacheManager.client.set(key, value)
  }

  static get (key) {
    const getAsync = promisify(CacheManager.client.get).bind(CacheManager.client)
    return getAsync(key)
  }

  static async find(key, val): Promise<boolean> {
    const res = await CacheManager.get(key)
    console.log('result', res)
    return res === val
  }
  
  
}