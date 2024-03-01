import fs from 'fs'
import 'dotenv/config'
import mustache from 'mustache'
import nodemailer from 'nodemailer'
import { emailSubjectEnum } from './enums'

const mail = {
  user: process.env.GMAIL_USER,
  pass: process.env.GMAIL_GENERATED_PASS
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  tls: {
    rejectUnauthorized: false
  },
  secure: true, // true for 465, false for other ports
  auth: {
    user: mail.user, // generated ethereal user
    pass: mail.pass // generated ethereal password
  }
})

export const sendEmail = async (email, template, data) => {
  try {
    const buffer = fs.readFileSync(`./src/templates/${template}.mustache`)
    const fileContent = buffer.toString()
    const html = mustache.render(fileContent, data)

    const params = {
      from: `Paradise Citas <${mail.user}>`,
      to: email,
      subject: emailSubjectEnum[template],
      html
    }
    await transporter.sendMail(params)
  } catch (error) {
    console.log(`Failed sending mail: ${error.message}`)
  }
}
