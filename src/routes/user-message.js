import { Router } from 'express'
import { checkJWT } from '../middlewares/jwt'
import { CommonValidator } from '../validators'
import { UserMessageController } from '../controllers'
import { validateResult } from '../middlewares/validator'

const router = Router()

router.get(
  '/:user_id',
  checkJWT,
  CommonValidator.paramUserId,
  validateResult,
  UserMessageController.getAllByUserId
)

export { router }
