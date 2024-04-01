import nodemailer from 'nodemailer';
import { config } from '#/config/envConfig';

interface IEmailParams {
    to: string, 
    title: string,
    body: string
}   

interface IEmailSender<T> {
    transporter: nodemailer.Transporter | null,
    createTransporter(): nodemailer.Transporter | null,
    sendEmail({to, title, body}: IEmailParams): any
}

export default class EmailSender implements IEmailSender<EmailSender> {
    private static instance: EmailSender;
    transporter: nodemailer.Transporter | null;

    constructor() {
        this.transporter = this.createTransporter()
    }

    static getInstance(): EmailSender {
        if(!EmailSender.instance) {
            EmailSender.instance = new EmailSender();
        }

        return EmailSender.instance;
    }

    createTransporter() {
        try{
            return nodemailer.createTransport({
                service: config.EMAIL_HOST,
                auth: {
                    user: config.EMAIL, // Replace with your email
                    pass: config.EMAIL_PASSWORD // Replace with your email password
                }
            });
        } catch(error) {
            console.log(error)
            console.log('[ERROR] ERROR CREATING EMAIL TRANSPORTER')
            return null
        }
        
    }

    sendEmail({to, title, body}: IEmailParams) {
        try{
            if(this.transporter) {
                this.transporter.sendMail({
                    from: 'your-email@gmail.com', // Sender address
                    to, // List of recipients
                    subject: title, // Subject line
                    text: body, // Plain text body
                })
                .then(info => {
                    console.log('[SUCCESS] EMAIL SENT')
                    // console.log(info)
                })
                .catch(err => {
                    console.log('[ERROR]')
                    console.log(err)
                })
            }
        } catch(error) {
            console.log('[ERROR] ERROR SENDING EMAIL')
        }   
    }
    
}
