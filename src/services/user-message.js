import { Op } from 'sequelize'
import { sortByDateAsc } from '../utils'
import UserMessage from '../models/user-message'
import { getUpdatedModel, mapArrayToJson, mapToJson } from '../utils/db'

export const getAllByUserId = async (user_id, contact_id) => {
  const userMessages = await UserMessage.findAll({
    where: {
      [Op.or]: [
        {
          [Op.and]: [{ from_user_id: user_id }, { to_user_id: contact_id }]
        },
        {
          [Op.and]: [{ from_user_id: contact_id }, { to_user_id: user_id }]
        }
      ]
    }
  })
  return mapArrayToJson(userMessages).sort(sortByDateAsc('created_at'))
}

export const create = async (userMessage) => {
  const createdUserMessage = await UserMessage.create(userMessage)
  return mapToJson(createdUserMessage)
}

export const seen = async ({ from_user_id, to_user_id }) => {
  const result = await UserMessage.update(
    { seen: true },
    {
      where: {
        [Op.or]: [
          {
            [Op.and]: [{ from_user_id }, { to_user_id }]
          },
          {
            [Op.and]: [
              { from_user_id: to_user_id },
              { to_user_id: from_user_id }
            ]
          }
        ]
      },
      returning: true
    }
  )
  const updatedUserMessage = getUpdatedModel(result)
  return mapToJson(updatedUserMessage)
}
