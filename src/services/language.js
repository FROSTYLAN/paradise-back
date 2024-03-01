import Language from '../models/language'
import { mapArrayToJson } from '../utils/db'

export const getAll = async () => {
  const languages = await Language.findAll({ where: { active: true } })
  return mapArrayToJson(languages)
}
