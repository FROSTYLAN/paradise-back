import { sendCode } from './common'

export const sendVerifyAccountCode = async ({ code, email, phone_number }) => {
  sendCode({ code, email, phone_number, template: 'verifyAccount' })
}

export const sendResetPasswordCode = async ({ code, email, phone_number }) => {
  sendCode({ code, email, phone_number, template: 'resetPassword' })
}
