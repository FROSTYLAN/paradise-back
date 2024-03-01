import { UserLocationService, UserPreferenceService } from '../services'
import { getStringFromArray } from '../utils'
import { badRequest, serverError, success } from '../utils/http'

export const getOneByUserId = async ({ params }, res) => {
  try {
    const userPreference = await UserPreferenceService.getOneByUserId(
      params.user_id
    )
    return success(res, userPreference)
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
    }

    const userPreference = {
      user_id: user.sub,
      gender_id: body.gender_id,
      location_id: body.location_id,
      min_age: body.min_age,
      max_age: body.max_age,
      max_distance: body.max_distance,
      language: getStringFromArray(body.language),
      body_build: body.body_build,
      appearance: body.appearance,
      ethnic_origin: body.ethnic_origin,
      smoker: body.smoker,
      looking_for: getStringFromArray(body.looking_for)
    }

    const foundUserPreference = await UserPreferenceService.getOneByUserId(
      user.sub,
      false
    )

    if (!foundUserPreference.user_id) {
      const createdUserPreference = await UserPreferenceService.create(
        userPreference
      )
      return success(res, createdUserPreference)
    }

    const userPreferenceService = await UserPreferenceService.update(
      userPreference
    )
    return success(res, userPreferenceService)
  } catch (e) {
    return serverError(res, e)
  }
}
