import Location from '../models/location'
import { getUpdatedModel, mapArrayToJson, mapToJson } from '../utils/db'

export const getAll = async () => {
  const locations = await Location.findAll({ where: { active: true } })
  return mapArrayToJson(locations)
}

export const getOne = async (filters) => {
  const location = await Location.findOne({ where: filters })
  return mapToJson(location)
}

export const getOneById = async (id) => {
  const location = await Location.findByPk(id)
  return mapToJson(location)
}

export const create = async (location) => {
  const createdLocation = await Location.create(location)
  return mapToJson(createdLocation)
}

export const update = async (location) => {
  const result = await Location.update(location, {
    where: { id: location.id },
    returning: true
  })
  const updatedLocation = getUpdatedModel(result)
  return mapToJson(updatedLocation)
}
