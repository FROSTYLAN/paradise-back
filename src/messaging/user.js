import { sendCode } from './common'

export const sendConfirmationCode = async ({ code, email, phone_number }) => {
  sendCode({ code, email, phone_number, template: 'verifyEmail' })
}
