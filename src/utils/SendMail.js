import nodemailer from 'nodemailer'

const sendMail = async (email, link) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"BenhVienThanhPho" <no-reply@benhvienthanhpho.com>', // sender address
        to: email, // list of receivers
        subject: "Reset Password", // Subject line
        text: `Click the link to reset your password: ${link}`
    });

    return info
}

export default sendMail