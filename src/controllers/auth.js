import 'dotenv/config'
import { loginTypeEnum } from '../utils/enums'
import { verifyToken } from '../utils/jwt'
import { generateHash, verifyHash } from '../utils/bcrypt'
import { getRandomNumber, isExpired } from '../utils'
import { serverError, success, badRequest } from '../utils/http'
import { AuthService, UserProfileService, UserService, AdminService } from '../services'
import { sendResetPasswordCode, sendVerifyAccountCode } from '../messaging/auth'

export const loginAdmin = async ({ body }, res) => {
  try {
    const { username } = body
    const foundUser = await AdminService.getOne({ username }, true)

    if (!foundUser.id) {
      return badRequest(res, 'Credenciales incorrectas')
    }

    if (!foundUser.active) {
      return badRequest(res, 'Admin inactivo')
    }

    const passwordHash = foundUser.password
    const isValidPassword = await verifyHash(body.password, passwordHash)

    if (!isValidPassword) {
      return badRequest(res, 'Credenciales incorrectas')
    }

    const loginData = await AuthService.loginAdmin({
      id: foundUser.id,
      username
    })

    return success(res, loginData)
  } catch (e) {
    return serverError(res, e)
  }
}

export const registerAdmin = async ({ body }, res) => {
  try {
    const { username, password } = body
    const foundUser = await AdminService.getOne({ username })

    if (foundUser.id) {
      return badRequest(res, 'El admin ya existe')
    }

    const passwordHash = await generateHash(password)
    const createdAdmin = await AdminService.create({
      username,
      password: passwordHash,
      active: true
    })

    return success(res, createdAdmin, 201)
  } catch (e) {
    return serverError(res, e)
  }
}

export const refreshTokenAdmin = async ({ body }, res) => {
  try {
    const foundUser = await AdminService.getOne({
      refresh_token: body.refresh_token
    })

    if (!foundUser.id) {
      return badRequest(res, 'Admin no encontrado')
    }

    if (!foundUser.active) {
      return badRequest(res, 'Admin inactivo')
    }

    const loginData = await AuthService.loginAdmin({
      id: foundUser.id,
      username: foundUser.username
    })

    return success(res, loginData)
  } catch (e) {
    return serverError(res, e)
  }
}

export const login = async ({ body }, res) => {
  try {
    const { email, phone_number } = body
    const foundUser = await UserService.getOne(
      email ? { email } : { phone_number },
      true
    )

    if (!foundUser.id) {
      return badRequest(res, 'Credenciales incorrectas')
    }

    if (!foundUser.active) {
      return badRequest(res, 'Usuario inactivo')
    }

    const passwordHash = foundUser.password
    const isValidPassword = await verifyHash(body.password, passwordHash)

    if (!isValidPassword) {
      return badRequest(res, 'Credenciales incorrectas')
    }

    const loginData = await AuthService.login({
      id: foundUser.id,
      email,
      phone_number
    })

    return success(res, loginData)
  } catch (e) {
    return serverError(res, e)
  }
}

export const refreshToken = async ({ body }, res) => {
  try {
    const foundUser = await UserService.getOne({
      refresh_token: body.refresh_token
    })

    if (!foundUser.id) {
      return badRequest(res, 'Usuario no encontrado')
    }

    if (!foundUser.active) {
      return badRequest(res, 'Usuario inactivo')
    }

    const loginData = await AuthService.login({
      id: foundUser.id,
      email: foundUser.email,
      phone_number: foundUser.phone_number
    })

    return success(res, loginData)
  } catch (e) {
    return serverError(res, e)
  }
}

export const loginByGoogle = async ({ body }, res) => {
  try {
    const { email } = await AuthService.loginByGoogle(body.code)

    const foundUser = await UserService.getOne({ email })
    
    if (foundUser.id) {
      const loginData = await AuthService.login({
        ...foundUser,
        verified_email: true,
        verified_gm: true,
        initial_steps: false
      })
      return success(res, loginData)
    }

    const loginData = await AuthService.login({
      email,
      login_type: loginTypeEnum.google,
      verified_email: true,
      verified_gm: true,
      initial_steps: true
    })
    return success(res, loginData)
  } catch (e) {
    return serverError(res, e)
  }
}

export const loginByFacebook = async ({ user }, res) => {
  try {
    const { email, first_name, last_name, name } = user

    const foundUser = await UserService.getOne({ email })

    if (foundUser.id) {
      const loginData = await AuthService.login({
        ...foundUser,
        verified_email: true,
        verified_fb: true
      })
      return success(res, loginData)
    }

    const loginData = await AuthService.login({
      email,
      login_type: loginTypeEnum.facebook,
      verified_email: true,
      verified_fb: true
    })

    await UserProfileService.create({
      user_id: loginData.user.id,
      nickname: name,
      name: first_name,
      lastname: last_name
    })

    return success(res, loginData)
  } catch (e) {
    return serverError(res, e)
  }
}

export const register = async ({ body }, res) => {
  try {
    const { email, phone_number, password } = body
    const foundUser = await UserService.getOne(
      email ? { email } : { phone_number }
    )

    if (foundUser.id) {
      return badRequest(res, 'El usuario ya existe')
    }

    const code = getRandomNumber()
    const passwordHash = await generateHash(password)
    const createdUser = await UserService.create({
      email,
      password: passwordHash,
      phone_number,
      login_type: email ? loginTypeEnum.email : loginTypeEnum.mobile,
      code,
      reported: false,
      initial_steps: true
    })

    await sendVerifyAccountCode({ code, email, phone_number })

    return success(res, createdUser, 201)
  } catch (e) {
    return serverError(res, e)
  }
}

export const resendRegistrationCode = async ({ body }, res) => {
  try {
    const { email, phone_number } = body
    const foundUser = await UserService.getOne(
      email ? { email } : { phone_number }
    )

    if (!foundUser.id) {
      return badRequest(res, 'Usuario no encontrado')
    }

    const code = getRandomNumber()
    await UserService.update({ id: foundUser.id, code })
    await sendVerifyAccountCode({ code, email, phone_number })

    return success(res)
  } catch (e) {
    return serverError(res, e)
  }
}

export const verifyAccountByToken = async ({ params }, res) => {
  try {
    const { token } = params
    const data = verifyToken(token)

    if (!data) {
      return badRequest(res, 'Token de verificación no válido')
    }

    const { email, code, expiryDate } = data

    if (isExpired(expiryDate)) {
      return badRequest(res, 'Token de verificación expirado')
    }

    const foundUser = await UserService.getOne({ email }, false, true)

    if (!foundUser.id) {
      return badRequest(res, 'Usuario no encontrado')
    }

    // if (foundUser.active) {
    //   return success(res, {
    //     response: "El usuario ya ha sido verificado",
    //     user: foundUser
    //   })
    // }

    // if (foundUser.code !== code) {
    //   return badRequest(res, 'Código de verificación no válido')
    // }

    const loginData = await AuthService.login({
      id: foundUser.id,
      verified_email: foundUser.login_type === loginTypeEnum.email,
      verified_phone: foundUser.login_type === loginTypeEnum.mobile
    })

    return success(res, loginData)
  } catch (e) {
    return serverError(res, e)
  }
}

export const verifyAccountByCode = async ({ body }, res) => {
  try {
    const { email, phone_number, code } = body
    const foundUser = await UserService.getOne(
      email ? { email } : { phone_number },
      false,
      true
    )

    if (!foundUser.id) {
      return badRequest(res, 'Usuario no encontrado')
    }

    if (foundUser.verified_email) {
      return badRequest(res, 'El usuario ya ha sido verificado')
    }

    if (foundUser.code !== code) {
      return badRequest(res, 'Código de verificación no válido')
    }

    const loginData = await AuthService.login({
      id: foundUser.id,
      verified_email: foundUser.login_type === loginTypeEnum.email,
      verified_phone: foundUser.login_type === loginTypeEnum.mobile
    })

    return success(res, loginData)
  } catch (e) {
    return serverError(res, e)
  }
}

export const forgotPassword = async ({ body }, res) => {
  try {
    const { email, phone_number } = body
    const foundUser = await UserService.getOne(
      email ? { email } : { phone_number }
    )

    if (!foundUser.id) {
      return badRequest(res, 'Usuario no encontrado')
    }

    const code = getRandomNumber()
    await UserService.update({ id: foundUser.id, code })
    await sendResetPasswordCode({ code, email, phone_number })

    return success(res)
  } catch (e) {
    return serverError(res, e)
  }
}

export const resendForgotPasswordCode = async ({ body }, res) => {
  try {
    const { email, phone_number } = body
    const foundUser = await UserService.getOne(
      email ? { email } : { phone_number }
    )

    if (!foundUser.id) {
      return badRequest(res, 'Usuario no encontrado')
    }

    const code = getRandomNumber()
    await UserService.update({ id: foundUser.id, code })
    await sendResetPasswordCode({ code, email, phone_number })

    return success(res)
  } catch (e) {
    return serverError(res, e)
  }
}

export const verifyPasswordResetByToken = async ({ params }, res) => {
  try {
    const data = verifyToken(params.token)

    if (!data) {
      return badRequest(res, 'Token de verificación no válido')
    }

    const { email, code, expiryDate } = data

    if (isExpired(expiryDate)) {
      return badRequest(res, 'Token de verificación expirado')
    }

    const foundUser = await UserService.getOne({ email })

    if (!foundUser.id) {
      return badRequest(res, 'Usuario no encontrado')
    }

    if (foundUser.code !== code) {
      return badRequest(res, 'Código de verificación no válido')
    }

    await UserService.update({ id: foundUser.id, code: null })

    return success(res)
  } catch (e) {
    return serverError(res, e)
  }
}

export const verifyPasswordResetByCode = async ({ body }, res) => {
  try {
    const { email, phone_number, code } = body
    const foundUser = await UserService.getOne(
      email ? { email } : { phone_number },
      false,
      true
    )

    if (!foundUser.id) {
      return badRequest(res, 'Usuario no encontrado')
    }

    if (foundUser.code !== code) {
      return badRequest(res, 'Código de verificación no válido')
    }

    await UserService.update({ id: foundUser.id, code: null })

    return success(res)
  } catch (e) {
    return serverError(res, e)
  }
}

export const resetPassword = async ({ body }, res) => {
  try {
    const { email, phone_number, password } = body

    const foundUser = await UserService.getOne(
      email ? { email } : { phone_number }
    )

    if (!foundUser.id) {
      return badRequest(res, 'Usuario no encontrado')
    }

    const passwordHash = await generateHash(password)

    await UserService.update({
      id: foundUser.id,
      password: passwordHash,
      active: true,
      code: null
    })

    return success(res)
  } catch (e) {
    return serverError(res, e)
  }
}
