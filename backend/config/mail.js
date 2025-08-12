import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user:process.env.MAIL_USER,
    pass:process.env.MAIL_PASS,
  },
});

const sendMail=async (to ,otp)=>{
 await transporter.sendMail({
    from:`${process.env.MAIL_USER}`,
    to,
    subject:"Reset your Password",
    html:`<p>Your OTP form password Reset is <b>${otp}</b>.
    It expires is 5 minutes</p>`
  })
}

export default sendMail