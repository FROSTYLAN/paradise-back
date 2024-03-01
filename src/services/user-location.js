import UserLocation from '../models/user-location'
import { getUpdatedModel, mapToJson } from '../utils/db'
import { mapArrayToJsonWithLocation, mapToJsonWithLocation } from './common'

export const getOne = async (filters) => {
  const userLocation = await UserLocation.findOne({ where: filters })
  return mapToJson(userLocation)
}

export const getOneById = async (id) => {
  const userLocation = await UserLocation.findByPk(id)
  return mapToJsonWithLocation(userLocation)
}

export const getAllByUserId = async (user_id) => {
  const userLocations = await UserLocation.findAll({ where: { user_id } })
  return mapArrayToJsonWithLocation(userLocations)
}

export const create = async (userLocation) => {
  const createdUserLocation = await UserLocation.create(userLocation)
  return mapToJson(createdUserLocation)
}

export const updateById = async (userLocation) => {
  const result = await UserLocation.update(userLocation, {
    where: { id: userLocation.id },
    returning: true
  })
  const updatedUserLocation = getUpdatedModel(result)
  return mapToJson(updatedUserLocation)
}

export const updateByUserId = async (userLocation) => {
  const result = await UserLocation.update(userLocation, {
    where: { user_id: userLocation.user_id },
    returning: true
  })
  const updatedUserLocation = getUpdatedModel(result)
  return mapToJson(updatedUserLocation)
}

export const destroy = async (id) => {
  const count = await UserLocation.destroy({ where: { id } })
  return count > 0
}
