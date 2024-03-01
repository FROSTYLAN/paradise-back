import Gender from '../models/gender'
import { mapArrayToJson } from '../utils/db'

export const getAll = async () => {
  const genders = await Gender.findAll({ where: { active: true } })
  return mapArrayToJson(genders)
}
