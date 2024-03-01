import { Router } from 'express'
import { checkJWT } from '../middlewares/jwt'
import { CommonValidator, UserProfileValidator } from '../validators'
import { UserProfileController } from '../controllers'
import { validateResult } from '../middlewares/validator'

const router = Router()

router.get(
  '/',
  checkJWT,
  UserProfileValidator.getAll,
  validateResult,
  UserProfileController.getAll
)
router.get(
  '/:user_id',
  checkJWT,
  CommonValidator.paramUserId,
  validateResult,
  UserProfileController.getOneByUserId
)
router.post(
  '/',
  checkJWT,
  UserProfileValidator.save,
  validateResult,
  UserProfileController.save
)

export { router }
