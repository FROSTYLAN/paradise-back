import {
  LocationService,
  UserLocationService,
  UserPreferenceService
} from '../services'
import { setLocation } from '../utils/db'
import { badRequest, serverError, success } from '../utils/http'

export const getAllByUserId = async ({ params }, res) => {
  try {
    const userLocations = await UserLocationService.getAllByUserId(
      params.user_id
    )
    return success(res, userLocations)
  } catch (e) {
    return serverError(res, e)
  }
}

export const create = async ({ body, user }, res) => {
  try {
    const location = {
      lat: body.lat,
      lng: body.lng,
      city: body.city
    }

    const foundLocation = await LocationService.getOne({
      lat: location.lat,
      lng: location.lng
    })

    if (!foundLocation.id) {
      const createdLocation = await LocationService.create(location)
      location.id = createdLocation.id
    } else {
      location.id = foundLocation.id
      await LocationService.update(location)
    }

    const allUserLocations = await UserLocationService.getAllByUserId(user.sub)

    if (allUserLocations.length >= 10) {
      return badRequest(res, 'Se superó el limite de ubicaciones por usuario')
    }

    const foundUserLocation = await UserLocationService.getOne({
      user_id: user.sub,
      location_id: location.id
    })

    if (foundUserLocation.id) {
      return badRequest(res, 'Ubicación ya registrada')
    }

    await UserLocationService.updateByUserId({
      user_id: user.sub,
      current: false
    })

    const userLocation = {
      user_id: user.sub,
      location_id: location.id,
      current: true
    }

    const createdUserLocation = await UserLocationService.create(userLocation)
    return success(res, setLocation(createdUserLocation, location))
  } catch (e) {
    return serverError(res, e)
  }
}

export const update = async ({ body, user }, res) => {
  try {
    const location = {
      lat: body.lat,
      lng: body.lng,
      city: body.city
    }

    const foundLocation = await LocationService.getOne({
      lat: location.lat,
      lng: location.lng
    })

    if (!foundLocation.id) {
      const createdLocation = await LocationService.create(location)
      location.id = createdLocation.id
    } else {
      location.id = foundLocation.id
      await LocationService.update(location)
    }

    const userLocation = {
      id: body.id,
      user_id: user.sub,
      location_id: location.id
    }

    const updatedUserLocation = await UserLocationService.updateById(
      userLocation
    )
    return success(res, setLocation(updatedUserLocation, location))
  } catch (e) {
    return serverError(res, e)
  }
}

export const destroy = async ({ params, user }, res) => {
  try {
    const foundUserLocation = await UserLocationService.getOneById(params.id)

    if (!foundUserLocation.id || foundUserLocation.user_id !== user.sub) {
      return success(res, {})
    }

    const wasDeleted = await UserLocationService.destroy(params.id)

    if (!wasDeleted) {
      return success(res, {})
    }

    const foundUserPreference = await UserPreferenceService.getOne({
      user_id: foundUserLocation.user_id,
      location_id: foundUserLocation.location.id
    })

    if (foundUserPreference.user_id) {
      await UserPreferenceService.update({
        user_id: user.sub,
        location_id: null
      })
    }

    return success(res, foundUserLocation)
  } catch (e) {
    return serverError(res, e)
  }
}
