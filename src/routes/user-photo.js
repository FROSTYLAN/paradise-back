import { Router } from 'express'
import { checkJWT } from '../middlewares/jwt'
import { CommonValidator, UserPhotoValidator } from '../validators'
import { UserPhotoController } from '../controllers'
import { validateResult } from '../middlewares/validator'

const router = Router()

router.get(
  '/:user_id',
  checkJWT,
  CommonValidator.paramUserId,
  validateResult,
  UserPhotoController.getAllByUserId
)
router.post(
  '/',
  checkJWT,
  UserPhotoValidator.createOne,
  validateResult,
  UserPhotoController.createOne
)
router.post(
  '/multiple',
  checkJWT,
  UserPhotoValidator.createMultiple,
  validateResult,
  UserPhotoController.createMultiple
)
router.delete(
  '/:id',
  checkJWT,
  UserPhotoValidator.destroy,
  validateResult,
  UserPhotoController.destroy
)

export { router }
