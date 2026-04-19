import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export const sendEmail = async ({ email, emailType, userId }: any) => {



    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        }
        else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId,
                {$set: {
                forgotPasswordToken: hashedToken,
                forgotPasswordExpiry: Date.now() + 3600000
            }})
        }
        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: Number(process.env.MAILPORT),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        }as SMTPTransport.Options);
        const mailOptions = {
            from: 'hemant@ai.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your Email" : "Reset your Password",
            html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==="VERIFY"? "verify your email":"reset your password"} or copy paste the link below in your browser.<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}<p> `, // HTML body
        }


        
        const MailResponse = await transporter.sendMail(mailOptions)

        
        return MailResponse
    } catch (error: any) {
        throw new Error(error.message)
    }
}