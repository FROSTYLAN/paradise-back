import { Router } from 'express'
import { checkJWT } from '../middlewares/jwt'
import { UserReportValidator } from '../validators'
import { UserReportController } from '../controllers'
import { validateResult } from '../middlewares/validator'

const router = Router()

router.patch(
  '/:user_id/ban',
  checkJWT,
  UserReportController.banUser
)

router.get(
  '/',
  checkJWT,
  UserReportController.getUsersOverFiveReport
)

router.get(
  '/:id',
  checkJWT,
  UserReportController.getAllByUserId
)

router.post(
  '/',
  checkJWT,
  UserReportValidator.save,
  validateResult,
  UserReportController.save
)

export { router }
