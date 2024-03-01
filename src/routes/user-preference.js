import { Router } from 'express'
import { checkJWT } from '../middlewares/jwt'
import { CommonValidator, UserPreferenceValidator } from '../validators'
import { UserPreferenceController } from '../controllers'
import { validateResult } from '../middlewares/validator'

const router = Router()

router.get(
  '/:user_id',
  checkJWT,
  CommonValidator.paramUserId,
  validateResult,
  UserPreferenceController.getOneByUserId
)
router.post(
  '/',
  checkJWT,
  UserPreferenceValidator.save,
  validateResult,
  UserPreferenceController.save
)

export { router }
