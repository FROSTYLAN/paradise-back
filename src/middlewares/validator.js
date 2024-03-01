import { validationResult } from 'express-validator'
import { badRequest } from '../utils/http'

export const validateResult = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return badRequest(res, errors.array())
  }

  return next()
}
