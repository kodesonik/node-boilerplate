import nodemailer from 'nodemailer'
import { env } from '../../configs/environment'

export default class Mailer {
    static transporter
    constructor() {
    
    }

    static connect() {
        Mailer.transporter = nodemailer.createTransport({
            host: env.mail.host,
            port: env.mail.port,
            secure: true,
            logger: true,
            debug: true,
            secureConnection: false,
            auth: {
                user: env.mail.email,
                pass: env.mail.password
            },
            tls: {
                rejectUnAuthorized: true
            }
        })
    }

    static async send(to, subject, html) {
        const mailOptions = {
            from: env.mail.email,
            to,
            subject,
            // text,
            html
        }
        await Mailer.transporter.sendMail(mailOptions)
    }

}
