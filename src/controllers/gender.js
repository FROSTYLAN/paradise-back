import { GenderService } from '../services'
import { serverError, success } from '../utils/http'

export const getAll = async (req, res) => {
  try {
    const genders = await GenderService.getAll()
    return success(res, genders)
  } catch (e) {
    return serverError(res, e)
  }
}
