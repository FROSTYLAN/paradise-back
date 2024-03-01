import Currency from '../models/currency'
import Pricing from '../models/pricing'
import { mapToJson } from '../utils/db'

const customMapToJson = (model) => {
  const pricing = mapToJson(model)

  if (!pricing.id) {
    return {}
  }

  Reflect.deleteProperty(pricing, 'currency_code')
  Reflect.deleteProperty(pricing.currency, 'created_at')
  Reflect.deleteProperty(pricing.currency, 'updated_at')

  return pricing
}

export const getAll = async () => {
  const pricings = await Pricing.findAll({ include: Currency })
  return pricings.map((pricing) => customMapToJson(pricing))
}

export const getOneById = async (id) => {
  const pricing = await Pricing.findByPk(id, { include: Currency })
  return customMapToJson(pricing)
}
