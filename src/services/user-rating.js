import { Op } from 'sequelize'
import UserRating from '../models/user-rating'
import { getUpdatedModel, mapArrayToJson, mapToJson } from '../utils/db'

export const getOne = async ({ from_user_id, to_user_id }) => {
  const userRating = await UserRating.findOne({
    where: { from_user_id, to_user_id }
  })
  return mapToJson(userRating)
}

export const getAllByUserId = async (user_id) => {
  const userRatings = await UserRating.findAll({
    where: { to_user_id: user_id }
  })
  return mapArrayToJson(userRatings)
}

export const create = async (userRating) => {
  const createdUserRating = await UserRating.create(userRating)
  return mapToJson(createdUserRating)
}

export const update = async (userRating) => {
  const result = await UserRating.update(userRating, {
    where: { id: userRating.id },
    returning: true
  })
  const updatedUserRating = getUpdatedModel(result)
  return mapToJson(updatedUserRating)
}

export const destroyByUserId = async (user_id) => {
  const count = await UserRating.destroy({
    where: {
      [Op.or]: [{ from_user_id: user_id }, { to_user_id: user_id }]
    }
  })
  return count > 0
}
