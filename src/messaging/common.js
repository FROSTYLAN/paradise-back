import moment from 'moment'
import { generateToken } from '../utils/jwt'
import { sendEmail } from '../utils/mail'
import { sendSMS } from '../utils/sms'

export const sendCode = async ({ code, email, phone_number, template }) => {
  if (email) {
    const url = process.env.PARADISE_URL
    const expiryDate = moment().add(1, 'hour').toDate()
    const token = generateToken({ email, code, expiryDate })
    await sendEmail(email, template, { email, code, url, token })
  } else {
    await sendSMS(phone_number, template, { code })
  }
}
