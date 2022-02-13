export default interface IHttpResponse {
    statusCode: number
    body: {
        error?: string 
        data?,
        view?: string
    }
}
