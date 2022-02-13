export default class CustomError extends Error {
    /**
     * Object to use keys to replace in message transalation parameters
     */
    params
    constructor(name, message, params?) {
        super(message)
        this.name = name,
        this.params = params
    }
}