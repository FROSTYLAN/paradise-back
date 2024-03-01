import UserPhoto from '../models/user-photo'
import { sortByAsc } from '../utils'
import { getUpdatedModel, mapArrayToJson, mapToJson } from '../utils/db'

export const getOneById = async (id) => {
  const userPhoto = await UserPhoto.findByPk(id)
  return mapToJson(userPhoto)
}

export const getAllByUserId = async (user_id) => {
  const userPhotos = await UserPhoto.findAll({ where: { user_id } })
  return mapArrayToJson(userPhotos).sort(sortByAsc('id'))
}

export const create = async (userPhoto) => {
  const createdUserPhoto = await UserPhoto.create(userPhoto)
  return mapToJson(createdUserPhoto)
}

export const update = async (userPhoto) => {
  const result = await UserPhoto.update(userPhoto, {
    where: { id: userPhoto.id },
    returning: true
  })
  const updatedUserPhoto = getUpdatedModel(result)
  return mapToJson(updatedUserPhoto)
}

export const destroy = async (id) => {
  const count = await UserPhoto.destroy({ where: { id } })
  return count > 0
}
