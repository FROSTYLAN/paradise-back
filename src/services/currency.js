import Currency from '../models/currency'
import { mapArrayToJson, mapToJson } from '../utils/db'

export const getAll = async () => {
  const currencies = await Currency.findAll()
  return mapArrayToJson(currencies)
}

export const getOneByCode = async (code) => {
  const currency = await Currency.findByPk(code)
  return mapToJson(currency)
}
