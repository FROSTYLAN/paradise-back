import {
  AuthService,
  SubscriptionService,
  UserFavoriteService,
  UserHobbyService,
  UserLocationService,
  UserPreferenceService,
  UserProfileService,
  UserRatingService,
  UserService
} from '../services'
import { verifyToken } from '../utils/jwt'
import { loginTypeEnum } from '../utils/enums'
import { getObjectArrayAverage, getRandomNumber, isExpired } from '../utils'
import { sendConfirmationCode } from '../messaging/user'
import { generateHash, verifyHash } from '../utils/bcrypt'
import { badRequest, serverError, success } from '../utils/http'

export const getAllReported = async ({ query, user }, res) => {
  try {
    const users = await UserService.getAllReported(query, user.sub)
    return success(res, users)
  } catch (e) {
    return serverError(res, e)
  }
}

export const getOneById = async ({ params }, res) => {
  try {
    const user = await UserService.getOneById(params.id)
    return success(res, user)
  } catch (e) {
    return serverError(res, e)
  }
}

export const getOneWithDetailsById = async ({ params }, res) => {
  try {
    const user = await UserService.getOneById(params.id)
    const ratings = await UserRatingService.getAllByUserId(params.id)
    const profile = await UserProfileService.getOneByUserId(params.id)
    const preferences = await UserPreferenceService.getOneByUserId(params.id)

    const rating = getObjectArrayAverage(ratings, 'rating')

    const userWithDetails = {
      ...user,
      rating,
      profile,
      preferences
    }
    return success(res, userWithDetails)
  } catch (e) {
    return serverError(res, e)
  }
}

export const update = async ({ body, user }, res) => {
  try {
    const userAccount = {
      id: user.sub,
      email: body.email ?? null,
      phone_number: body.phone_number ?? null
    }

    const updatedUser = await UserService.update(userAccount)
    return success(res, updatedUser)
  } catch (e) {
    return serverError(res, e)
  }
}

export const createPassword = async ({ body, user }, res) => {
  try {
    const { new_password } = body

    const foundUser = await UserService.getOneById(user.sub, true)

    if (!foundUser.id) {
      return success(res, {})
    }

    const newPasswordHash = await generateHash(new_password)
    const userPassword = {
      id: foundUser.id,
      password: newPasswordHash
    }

    const updatedUser = await UserService.update(userPassword)
    return success(res, updatedUser)
  } catch (e) {
    return serverError(res, e)
  }
}

export const updatePassword = async ({ body, user }, res) => {
  try {
    const { old_password, new_password } = body

    const foundUser = await UserService.getOneById(user.sub, true)

    if (!foundUser.id || !foundUser.password) {
      return success(res, {})
    }

    const oldPasswordHash = foundUser.password
    const isValidPassword = await verifyHash(old_password, oldPasswordHash)

    if (!isValidPassword) {
      return badRequest(res, 'Contraseña anterior incorrecta')
    }

    const newPasswordHash = await generateHash(new_password)
    const userPassword = {
      id: foundUser.id,
      password: newPasswordHash
    }

    const updatedUser = await UserService.update(userPassword)
    return success(res, updatedUser)
  } catch (e) {
    return serverError(res, e)
  }
}

export const sendEmailCode = async ({ body, user }, res) => {
  try {
    const { email } = body
    const foundUser = await UserService.getOneById(user.sub)

    if (!foundUser.id) {
      return badRequest(res, 'Usuario no encontrado')
    }

    const code = getRandomNumber()
    await UserService.update({ id: foundUser.id, code })
    await sendConfirmationCode({ code, email })

    return success(res, 'Código enviado')
  } catch (e) {
    return serverError(res, e)
  }
}

export const sendPhoneNumberCode = async ({ body, user }, res) => {
  try {
    const { phone_number } = body
    const foundUser = await UserService.getOneById(user.sub)

    if (!foundUser.id) {
      return badRequest(res, 'Usuario no encontrado')
    }

    const code = getRandomNumber()
    await UserService.update({ id: foundUser.id, code })
    await sendConfirmationCode({ code, phone_number })

    return success(res, 'Código enviado')
  } catch (e) {
    return serverError(res, e)
  }
}

export const linkEmailByCode = async ({ body, user }, res) => {
  try {
    const foundUser = await UserService.getOneById(user.sub, false, true)

    if (!foundUser.id) {
      return badRequest(res, 'Usuario no encontrado')
    }

    if (foundUser.code !== body.code) {
      return badRequest(res, 'Código de verificación no válido')
    }

    const foundUserByEmail = await UserService.getOne({ email: body.email })

    if (foundUserByEmail.id && foundUserByEmail.id !== foundUser.id) {
      return badRequest(
        res,
        'El correo ya se encuentra vinculado a otro usuario'
      )
    }

    if (foundUserByEmail.id && foundUserByEmail.id === foundUser.id) {
      return badRequest(
        res,
        'El correo ya se encuentra vinculado a este usuario'
      )
    }

    const updatedUser = await UserService.update({
      id: foundUser.id,
      email: body.email,
      verified_email: true,
      code: null
    })
    return success(res, updatedUser)
  } catch (e) {
    return serverError(res, e)
  }
}

export const linkEmailByToken = async ({ params, user }, res) => {
  try {
    const foundUser = await UserService.getOneById(user.sub, false, true)

    if (!foundUser.id) {
      return badRequest(res, 'Usuario no encontrado')
    }

    const { token } = params
    const data = verifyToken(token)

    if (!data) {
      return badRequest(res, 'Token de verificación no válido')
    }

    const { email, code, expiryDate } = data

    if (isExpired(expiryDate)) {
      return badRequest(res, 'Token de verificación expirado')
    }

    if (foundUser.code !== code) {
      return badRequest(res, 'Código de verificación no válido')
    }

    const foundUserByEmail = await UserService.getOne({ email })

    if (foundUserByEmail.id && foundUserByEmail.id !== foundUser.id) {
      return badRequest(
        res,
        'El correo ya se encuentra vinculado a otro usuario'
      )
    }

    if (foundUserByEmail.id && foundUserByEmail.id === foundUser.id) {
      return badRequest(
        res,
        'El correo ya se encuentra vinculado a este usuario'
      )
    }

    const updatedUser = await UserService.update({
      id: foundUser.id,
      email,
      verified_email: true,
      code: null
    })
    return success(res, updatedUser)
  } catch (e) {
    return serverError(res, e)
  }
}

export const linkPhoneNumber = async ({ body, user }, res) => {
  try {
    const foundUser = await UserService.getOneById(user.sub, false, true)

    if (!foundUser.id) {
      return badRequest(res, 'Usuario no encontrado')
    }

    if (foundUser.code !== body.code) {
      return badRequest(res, 'Código de verificación no válido')
    }

    const foundUserByPhoneNumber = await UserService.getOne({
      phone_number: body.phone_number
    })

    if (
      foundUserByPhoneNumber.id &&
      foundUserByPhoneNumber.id !== foundUser.id
    ) {
      return badRequest(
        res,
        'El número de teléfono ya se encuentra vinculado a otro usuario'
      )
    }

    if (
      foundUserByPhoneNumber.id &&
      foundUserByPhoneNumber.id === foundUser.id
    ) {
      return badRequest(
        res,
        'El número de teléfono ya se encuentra vinculado a este usuario'
      )
    }

    const updatedUser = await UserService.update({
      id: foundUser.id,
      phone_number: body.phone_number,
      verified_phone: true,
      code: null
    })
    return success(res, updatedUser)
  } catch (e) {
    return serverError(res, e)
  }
}

export const linkGoogle = async ({ body, user }, res) => {
  try {
    const foundUser = await UserService.getOneById(user.sub)

    if (!foundUser.id) {
      return badRequest(res, 'Usuario no encontrado')
    }

    const { email } = await AuthService.loginByGoogle(body.code)

    const foundUserByEmail = await UserService.getOne({ email })

    if (foundUserByEmail.id && foundUserByEmail.id !== foundUser.id) {
      return badRequest(
        res,
        'El correo ya se encuentra vinculado a otro usuario'
      )
    }

    if (foundUserByEmail.id && foundUserByEmail.id === foundUser.id) {
      return badRequest(
        res,
        'El correo ya se encuentra vinculado a este usuario'
      )
    }

    const updatedUser = await UserService.update({
      id: foundUser.id,
      verified_email: true,
      verified_gm: true
    })
    return success(res, updatedUser)
  } catch (e) {
    return serverError(res, e)
  }
}

export const linkFacebook = async ({ user }, res) => {
  try {
    const foundUser = await UserService.getOneById(user.sub)

    if (!foundUser.id) {
      return badRequest(res, 'Usuario no encontrado')
    }

    const foundUserByEmail = await UserService.getOne({ email: user.email })

    if (foundUserByEmail.id && foundUserByEmail.id !== foundUser.id) {
      return badRequest(
        res,
        'El correo ya se encuentra vinculado a otro usuario'
      )
    }

    if (foundUserByEmail.id && foundUserByEmail.id === foundUser.id) {
      return badRequest(
        res,
        'El correo ya se encuentra vinculado a este usuario'
      )
    }

    const updatedUser = await UserService.update({
      id: foundUser.id,
      verified_email: true,
      verified_fb: true
    })
    return success(res, updatedUser)
  } catch (e) {
    return serverError(res, e)
  }
}

export const unlinkEmailByCode = async ({ body, user }, res) => {
  try {
    const foundUser = await UserService.getOneById(user.sub, false, true)

    if (!foundUser.id) {
      return badRequest(res, 'Usuario no encontrado')
    }

    if (foundUser.code !== body.code) {
      return badRequest(res, 'Código de verificación no válido')
    }

    if (!foundUser?.phone_number) {
      return badRequest(
        res,
        'El usuario no tiene vinculado un número de teléfono'
      )
    }

    const updatedUser = await UserService.update({
      id: foundUser.id,
      email: null,
      verified_email: false,
      verified_gm:
        foundUser.login_type === loginTypeEnum.google
          ? false
          : foundUser.verified_gm
    })
    return success(res, updatedUser)
  } catch (e) {
    return serverError(res, e)
  }
}

export const unlinkEmailByToken = async ({ params, user }, res) => {
  try {
    const foundUser = await UserService.getOneById(user.sub, false, true)

    if (!foundUser.id) {
      return badRequest(res, 'Usuario no encontrado')
    }

    const { token } = params
    const data = verifyToken(token)

    if (!data) {
      return badRequest(res, 'Token de verificación no válido')
    }

    const { code, expiryDate } = data

    if (isExpired(expiryDate)) {
      return badRequest(res, 'Token de verificación expirado')
    }

    if (foundUser.code !== code) {
      return badRequest(res, 'Código de verificación no válido')
    }

    if (!foundUser?.phone_number) {
      return badRequest(
        res,
        'El usuario no tiene vinculado un número de teléfono'
      )
    }

    const updatedUser = await UserService.update({
      id: foundUser.id,
      email: null,
      verified_email: false,
      verified_gm:
        foundUser.login_type === loginTypeEnum.google
          ? false
          : foundUser.verified_gm
    })
    return success(res, updatedUser)
  } catch (e) {
    return serverError(res, e)
  }
}

export const unlinkPhoneNumber = async ({ body, user }, res) => {
  try {
    const foundUser = await UserService.getOneById(user.sub, false, true)

    if (!foundUser.id) {
      return badRequest(res, 'Usuario no encontrado')
    }

    if (foundUser.code !== body.code) {
      return badRequest(res, 'Código de verificación no válido')
    }

    if (!foundUser?.email) {
      return badRequest(res, 'El usuario no tiene vinculado un correo')
    }

    const updatedUser = await UserService.update({
      id: foundUser.id,
      phone_number: null,
      verified_phone: false
    })
    return success(res, updatedUser)
  } catch (e) {
    return serverError(res, e)
  }
}

export const report = async ({ body }, res) => {
  try {
    const foundUser = await UserService.getOneById(body.user_id)

    if (!foundUser.id) {
      return badRequest(res, 'Usuario no encontrado')
    }

    const updatedUser = await UserService.update({
      ...foundUser,
      reported: true,
      report_message: body.report_message
    })
    return success(res, updatedUser)
  } catch (e) {
    return serverError(res, e)
  }
}

export const destroy = async ({ body, user }, res) => {
  try {
    const foundUser = await UserService.getOneById(user.sub, true)

    if (!foundUser.id || !foundUser.password) {
      return badRequest(res, 'Usuario no encontrado')
    }

    const oldPasswordHash = foundUser.password
    const isValidPassword = await verifyHash(body.password, oldPasswordHash)

    if (!isValidPassword) {
      return badRequest(res, 'Contraseña incorrecta')
    }

    Reflect.deleteProperty(foundUser, 'password')

    await SubscriptionService.destroyByUserId(foundUser.id)
    await UserFavoriteService.destroyByUserId(foundUser.id)
    await UserHobbyService.destroyByUserId(foundUser.id)
    await UserLocationService.destroy(foundUser.id)
    await UserPreferenceService.destroy(foundUser.id)
    await UserProfileService.destroy(foundUser.id)
    await UserRatingService.destroyByUserId(foundUser.id)

    const wasDeleted = await UserService.destroy(foundUser.id)
    const deletedUser = wasDeleted ? foundUser : {}
    return success(res, deletedUser)
  } catch (e) {
    return serverError(res, e)
  }
}
