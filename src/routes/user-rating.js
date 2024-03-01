import { Router } from 'express'
import { checkJWT } from '../middlewares/jwt'
import { UserRatingValidator } from '../validators'
import { UserRatingController } from '../controllers'
import { validateResult } from '../middlewares/validator'

const router = Router()

router.post(
  '/',
  checkJWT,
  UserRatingValidator.save,
  validateResult,
  UserRatingController.save
)

export { router }
