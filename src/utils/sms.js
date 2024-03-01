import 'dotenv/config'
import twilio from 'twilio'
import { smsBodyEnum } from './enums'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const from = process.env.TWILIO_PHONE_NUMBER

const client = twilio(accountSid, authToken)

const getBody = (template, data) => {
  let body = smsBodyEnum[template]
  Object.keys(data).forEach((key) => {
    body = body.replace(`$${key}`, data[key])
  })
  return body
}

export const sendSMS = async (to, template, data) => {
  try {
    to = '51982591679' // TODO: just for testing
    const body = getBody(template, data)
    const params = { body, from, to: `+${to}` }
    await client.messages.create(params)
  } catch (error) {
    console.log(`Failed sending sms: ${error.message}`)
  }
}
