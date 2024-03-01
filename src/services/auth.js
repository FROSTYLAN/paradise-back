import 'dotenv/config'
import { OAuth2Client } from 'google-auth-library'
import { getUid } from '../utils'
import { generateToken } from '../utils/jwt'
import { AdminService, UserService } from '.'

export const loginAdmin = async (admin) => {

  const access_token = generateToken({
    sub: admin.id,
    username: admin.username
  })

  const refresh_token = getUid()

  const updatedAdmin = await AdminService.update({
    ...admin,
    active: true,
    refresh_token
  })

  const loginData = {
    tokens: {
      access_token,
      refresh_token
    },
    admin: updatedAdmin
  }

  return loginData
}

export const login = async (user) => {
  if (!user.id) {
    const createdUser = await UserService.create({
      email: user.email,
      phone_number: user.phone_number,
      login_type: user.login_type,
      code: null,
      active: true,
      reported: false,
      report_message: null,
      verified_email: user.verified_email,
      verified_phone: user.verified_phone,
      verified_gm: user.verified_gm,
      verified_fb: user.verified_fb
    })

    user.id = createdUser.id
  }

  const access_token = generateToken({
    sub: user.id,
    email: user.email,
    phone_number: user.phone_number
  })
  const refresh_token = getUid()

  const updatedUser = await UserService.update({
    ...user,
    code: null,
    active: true,
    refresh_token
  })

  const loginData = {
    tokens: {
      access_token,
      refresh_token
    },
    user: updatedUser
  }

  return loginData
}

export const loginByGoogle = async (code) => {
  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage'
  )

  const { tokens } = await oAuth2Client.getToken(code)
  oAuth2Client.setCredentials(tokens)

  const { email } = await oAuth2Client.getTokenInfo(
    oAuth2Client.credentials.access_token
  )

  return { email }
}
