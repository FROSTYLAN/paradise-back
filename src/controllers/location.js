import { LocationService } from '../services'
import { serverError, success } from '../utils/http'

export const getAll = async (req, res) => {
  try {
    const locations = await LocationService.getAll()
    return success(res, locations)
  } catch (e) {
    return serverError(res, e)
  }
}
