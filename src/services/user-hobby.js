import UserHobby from '../models/user-hobby'

export const destroyByUserId = async (user_id) => {
  const count = await UserHobby.destroy({ where: { user_id } })
  return count > 0
}
