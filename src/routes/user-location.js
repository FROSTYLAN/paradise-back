import { Router } from 'express'
import { checkJWT } from '../middlewares/jwt'
import { CommonValidator, UserLocationValidator } from '../validators'
import { UserLocationController } from '../controllers'
import { validateResult } from '../middlewares/validator'

const router = Router()

router.get(
  '/:user_id',
  checkJWT,
  CommonValidator.paramUserId,
  validateResult,
  UserLocationController.getAllByUserId
)
router.post(
  '/',
  checkJWT,
  UserLocationValidator.create,
  validateResult,
  UserLocationController.create
)
router.put(
  '/',
  checkJWT,
  UserLocationValidator.update,
  validateResult,
  UserLocationController.update
)
router.delete(
  '/:id',
  checkJWT,
  UserLocationValidator.destroy,
  validateResult,
  UserLocationController.destroy
)

export { router }
