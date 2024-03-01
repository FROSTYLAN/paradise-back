import { CurrencyService } from '../services'
import { serverError, success } from '../utils/http'

export const getAll = async (req, res) => {
  try {
    const currencies = await CurrencyService.getAll()
    return success(res, currencies)
  } catch (e) {
    return serverError(res, e)
  }
}

export const getOneByCode = async ({ params }, res) => {
  try {
    const currency = await CurrencyService.getOneByCode(params.code)
    return success(res, currency)
  } catch (e) {
    return serverError(res, e)
  }
}
