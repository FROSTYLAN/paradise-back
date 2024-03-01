import { forbidden, unauthorized } from '../utils/http'
import { verifyToken } from '../utils/jwt'

export const checkJWT = (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      return forbidden(res)
    }

    const [label, access_token] = authorization.split(' ')

    if (label !== 'Bearer' || !access_token) {
      return forbidden(res)
    }

    const payload = verifyToken(access_token)

    if (!payload) {
      return unauthorized(res)
    }

    req.user = payload

    return next()
  } catch (e) {
    return unauthorized(res)
  }
}
