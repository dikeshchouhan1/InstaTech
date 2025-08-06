import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "smtp.ethereal.email",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user:process.env.MAIL_USER,
    pass:process.env.MAIL_PASS,
  },
});