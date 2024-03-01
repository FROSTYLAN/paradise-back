import UserPreference from '../models/user-preference'
import { getUpdatedModel, mapToJson } from '../utils/db'
import { mapToJsonWithLocation } from './common'

export const getOne = async (filters) => {
  const userPreference = await UserPreference.findOne({ where: filters })
  return mapToJson(userPreference)
}

export const getOneByUserId = async (user_id, withLocation = true) => {
  const userPreference = await UserPreference.findByPk(user_id)
  return withLocation
    ? mapToJsonWithLocation(userPreference)
    : mapToJson(userPreference)
}

export const create = async (userPreference) => {
  const createdUserPreference = await UserPreference.create(userPreference)
  return mapToJsonWithLocation(createdUserPreference)
}

export const update = async (userPreference) => {
  const result = await UserPreference.update(userPreference, {
    where: { user_id: userPreference.user_id },
    returning: true
  })
  const updatedUserPreference = getUpdatedModel(result)
  return mapToJsonWithLocation(updatedUserPreference)
}

export const destroy = async (user_id) => {
  const count = await UserPreference.destroy({ where: { user_id } })
  return count > 0
}
