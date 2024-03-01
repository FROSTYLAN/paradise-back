import { LanguageService } from '../services'
import { serverError, success } from '../utils/http'

export const getAll = async (req, res) => {
  try {
    const languages = await LanguageService.getAll()
    return success(res, languages)
  } catch (e) {
    return serverError(res, e)
  }
}
