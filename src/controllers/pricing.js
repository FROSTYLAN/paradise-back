import { PricingService } from '../services'
import { serverError, success } from '../utils/http'

export const getAll = async (req, res) => {
  try {
    const pricings = await PricingService.getAll()
    return success(res, pricings)
  } catch (e) {
    return serverError(res, e)
  }
}

export const getOneById = async ({ params }, res) => {
  try {
    const pricing = await PricingService.getOneById(params.id)
    return success(res, pricing)
  } catch (e) {
    return serverError(res, e)
  }
}
