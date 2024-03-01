import { Router } from 'express'
import { checkJWT } from '../middlewares/jwt'
import { PricingController } from '../controllers'
import { validateResult } from '../middlewares/validator'
import { CommonValidator } from '../validators'

const router = Router()

router.get('/', checkJWT, PricingController.getAll)
router.get(
  '/:id',
  checkJWT,
  CommonValidator.paramId,
  validateResult,
  PricingController.getOneById
)

export { router }
