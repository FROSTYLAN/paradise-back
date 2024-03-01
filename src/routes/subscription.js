import { Router } from 'express'
import { checkJWT } from '../middlewares/jwt'
import { SubscriptionValidator } from '../validators'
import { SubscriptionController } from '../controllers'
import { validateResult } from '../middlewares/validator'

const router = Router()

router.get(
  '/:user_id',
  checkJWT,
  validateResult,
  SubscriptionController.getOneByUserId
)
router.post(
  '/',
  checkJWT,
  SubscriptionValidator.create,
  validateResult,
  SubscriptionController.create
)

export { router }
