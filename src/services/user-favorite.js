import { Op } from 'sequelize'
import UserFavorite from '../models/user-favorite'

export const destroyByUserId = async (user_id) => {
  const count = await UserFavorite.destroy({
    where: {
      [Op.or]: [{ user_id }, { user_favorite_id: user_id }]
    }
  })
  return count > 0
}
