import {
  UserLocationService,
  UserProfileService,
  UserService
} from '../services'
import { getStringFromArray } from '../utils'
import { badRequest, serverError, success } from '../utils/http'
import { userProfileStatusEnum } from '../utils/enums'

export const getAll = async ({ query, user }, res) => {
  try {
    const userProfiles = await UserProfileService.getAll(query, user.sub)
    return success(res, userProfiles)
  } catch (e) {
    return serverError(res, e)
  }
}

export const getOneByUserId = async ({ params }, res) => {
  try {
    const userProfile = await UserProfileService.getOneByUserId(params.user_id)
    return success(res, userProfile)
  } catch (e) {
    return serverError(res, e)
  }
}

export const save = async ({ body, user }, res) => {
  try {
    if (body.location_id) {
      const foundUserLocation = await UserLocationService.getOne({
        user_id: user.sub,
        location_id: body.location_id
      })

      if (!foundUserLocation.id) {
        return badRequest(res, 'Ubicación no encontrada')
      }

      await UserLocationService.updateByUserId({
        user_id: user.sub,
        current: false
      })

      await UserLocationService.updateById({
        id: foundUserLocation.id,
        current: true
      })
    }

    if (body.initial_steps !== undefined && body.initial_steps !== null) {
      const foundUser = await UserService.getOneById(user.sub)

      if (foundUser.initial_steps !== body.initial_steps) {
        foundUser.initial_steps = body.initial_steps
        await UserService.update(foundUser)
      }
    }

    const userProfile = {
      user_id: user.sub
    }

    if (body.gender_id) {
      userProfile.gender_id = body.gender_id
    }

    if (body.location_id) {
      userProfile.location_id = body.location_id
    }

    if (body.nickname?.trim()) {
      userProfile.nickname = body.nickname.trim() ?? ''
    } else if (body.name || body.lastname) {
      userProfile.nickname = `${body.name?.trim() ?? ''} ${
        body.lastname?.trim() ?? ''
      }`.trim()
    }

    if (body.name?.trim()) {
      userProfile.name = body.name.trim()
    }

    if (body.lastname?.trim()) {
      userProfile.lastname = body.lastname.trim()
    }

    if (body.about_me?.trim()) {
      userProfile.about_me = body.about_me.trim()
    }

    if (body.birthdate) {
      userProfile.birthdate = body.birthdate
    }

    if (body.language) {
      userProfile.language = getStringFromArray(body.language)
    }

    if (body.smoker) {
      userProfile.smoker = body.smoker
    }

    if (body.looking_for) {
      userProfile.looking_for = getStringFromArray(body.looking_for)
    }

    if (body.role) {
      userProfile.role = body.role
    }

    const foundUserProfile = await UserProfileService.getOneByUserId(user.sub)

    if (!foundUserProfile.user_id) {
      userProfile.status = userProfileStatusEnum.saved
      const createdUserProfile = await UserProfileService.create(userProfile)
      return success(res, createdUserProfile)
    }

    const updatedUserProfile = await UserProfileService.update(userProfile)
    return success(res, updatedUserProfile)
  } catch (e) {
    return serverError(res, e)
  }
}