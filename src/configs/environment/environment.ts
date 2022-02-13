import dotenv from 'dotenv'
import path from 'path'
dotenv.config()


export default {
    url: 'http://localhost:8080/',
    port: process.env.PORT || 8080,
    lang: {
        default: 'en',
        path: path.join(__dirname, '../languages/')
    },
    logs: {
        file: path.join(__dirname, '../../logs/data.xlsx')
    },
    db: {
        softDelete: true
    },
    upload: {
        maxSize: 50 * 1024 * 1024,
        path: 'public/uploads/'
    },
    sms : {
        url: process.env.SMS_API_URL
    },
    mail: {
        host:  process.env.SENDER_EMAIL_HOST,
        port: process.env.SENDER_EMAIL_PORT,
        email: process.env.SENDER_EMAIL,
        password: process.env.SENDER_EMAIL_PASSWORD
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
    },
    token: {
        expireTime: process.env.TOKEN_EXPIRE_TIME,
        secret: process.env.JWT_SECRET,
    }
}