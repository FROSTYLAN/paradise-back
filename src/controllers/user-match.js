import UserMatch from '../models/user-match';
import { UserMatchService } from '../services'
import { getOneByUserId } from '../services/user-profile';
import { badRequest, serverError, success } from '../utils/http'

export const getAllChats = async ({ query, user }, res) => {
  try {
    const userChats = await UserMatchService.getAllChats(query, user.sub)
    console.log(userChats);
    return success(res, userChats)
  } catch (e) {
    return serverError(res, e)
  }
}

export const getAllRequests = async ({ query, user }, res) => {
  try {
    const userRequests = await UserMatchService.getAllRequests(query, user.sub)
    return success(res, userRequests)
  } catch (e) {
    return serverError(res, e)
  }
}

export const getAllContacts = async ({ query, user }, res) => {
  try {
    const userContacts = await UserMatchService.getAllContacts(query, user.sub)
    return success(res, userContacts)
  } catch (e) {
    return serverError(res, e)
  }
}

export const save = async ({ body, user }, res) => {
  try {
    if (body.user_id === user.sub) {
      return badRequest(res, 'No se pudo realizar el match')
    }

    const userProfile = await getOneByUserId(user.sub)

    if (userProfile.role === 'suscriptor') {
      const foundUserMatch = await UserMatchService.getOne({
        from_user_id: user.sub,
        to_user_id: body.user_id
      })

      if (foundUserMatch.id) {
        return badRequest(res, 'Ya has enviado una solicitud a este creador.')
      }

      const createdUserMatch = await UserMatchService.create({
        from_user_id: user.sub,
        to_user_id: body.user_id,
        state: 1,
        is_new: true,
      })

      return success(res, createdUserMatch)
    }

    if (userProfile.role === 'creator') {
      const foundUserMatch = await UserMatchService.getOne({
        from_user_id: body.user_id,
        to_user_id: user.sub,
        state: 1
      })

      const updatedUserMatch = await UserMatchService.update({
        ...foundUserMatch,
        state: 2
      })

      return success(res, updatedUserMatch)
    }

  } catch (e) {
    return serverError(res, e)
  }
}

export const destroy = async ({ params, user }, res) => {
  try {
    const foundUserMatch = await UserMatchService.getOne({
      from_user_id: params.id,
      to_user_id: user.sub,
      state: 1
    })

    const wasDeleted = await UserMatchService.destroy(foundUserMatch.id)

    return success(res, wasDeleted)

  } catch (e) {
    return serverError(res, e)
  }
}

export const getNumNewRequests = async ({ params, user }, res) => {
  try {
    const exec = await UserMatchService.getNumNewRequests()
    console.log(exec);
    return success(res, exec)
  } catch (e) {
    return serverError(res, e)
  }
}

export const cleanNewRequests = async ({ params, user }, res) => {
  try {
    const exec = await UserMatchService.cleanNewRequests()
    return success(res, exec)
  } catch (e) {
    return serverError(res, e)
  }
}