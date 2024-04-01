import EmailSender from "#/shared/helpers/emailSender";
import { TokenRequestHandler } from "#/shared/interfaces/tokenRequestHandler";

const sendEmail: TokenRequestHandler<{Body: {to: string, title: string, body: string}}> = async (req, res) => {
    try {
        const {
            to, 
            title,
            body
        } = req.body

        const EmailHandler = EmailSender.getInstance();
        EmailHandler.sendEmail({
            to,
            title,
            body
        });

        return res.res200({
            message: 'EMAIL SUCCESFULLY SENT'
        })
    } catch(error) {
        res.registerError({
            title: "[Error] SEND EMAILS",
            code: 'E-1',
            error: String(error)
        })

        return res.res500({
            error: String(error)
        })
    }
}


export default {
    sendEmail
}
