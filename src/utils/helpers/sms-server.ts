import axios from 'axios'

export default class SmsServer{
    static apiUrl = process.env.SMS_API_URL
    static apiKey = process.env.SMS_API_KEY

    static async send(phoneNumbers: string[], message) {
        const { data } = await axios.post(this.apiUrl, { key: this.apiKey, phoneNumbers, message })
        return data
    }
}