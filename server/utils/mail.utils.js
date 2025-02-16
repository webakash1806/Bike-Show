import nodemailer from "nodemailer"


const sendMail = async function (email, subject, message) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD
        }
    });

    await transporter.sendMail({
        from: `Authentication <${process.env.SMTP_FROM_EMAIL}>`,
        to: email,
        subject: subject,
        html: message
    })
}

export default sendMail