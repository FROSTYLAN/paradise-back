import { capitalize } from '../utils'
import { badRequest } from '../utils/http'

const getErrors = (fields) => {
  return fields.map((field) => ({
    msg: `${capitalize(field)} es requerido`,
    param: field,
    location: 'files'
  }))
}

export const checkFiles = (fields) => (req, res, next) => {
  const files = req.files
  const errors = getErrors(fields)

  if (!files) {
    return badRequest(res, errors)
  }

  const keys = Object.keys(files)

  if (!keys?.length) {
    return badRequest(res, errors)
  }

  const filteredErrors = errors.filter((error) => !keys.includes(error.param))

  if (filteredErrors?.length) {
    return badRequest(res, filteredErrors)
  }

  return next()
}
