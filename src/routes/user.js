import passport from '../passport'
import { Router } from 'express'
import { checkJWT } from '../middlewares/jwt'
import { AuthValidator, CommonValidator, UserValidator } from '../validators'
import { UserController } from '../controllers'
import { validateResult } from '../middlewares/validator'

const router = Router()

router.get('/reported', checkJWT, UserController.getAllReported)
router.get(
  '/:id',
  checkJWT,
  CommonValidator.paramId,
  validateResult,
  UserController.getOneById
)
router.get(
  '/:id/details',
  checkJWT,
  CommonValidator.paramId,
  validateResult,
  UserController.getOneWithDetailsById
)

router.put(
  '/update',
  checkJWT,
  UserValidator.update,
  validateResult,
  UserController.update
)

router.put(
  '/create/password',
  checkJWT,
  UserValidator.createPassword,
  validateResult,
  UserController.createPassword
)
router.put(
  '/update/password',
  checkJWT,
  UserValidator.updatePassword,
  validateResult,
  UserController.updatePassword
)

router.put(
  '/send/email/code',
  checkJWT,
  UserValidator.sendEmailCode,
  validateResult,
  UserController.sendEmailCode
)
router.put(
  '/send/phone-number/code',
  checkJWT,
  UserValidator.sendPhoneNumberCode,
  validateResult,
  UserController.sendPhoneNumberCode
)

router.put(
  '/link/email/code',
  checkJWT,
  UserValidator.linkEmailByCode,
  validateResult,
  UserController.linkEmailByCode
)
router.get(
  '/link/email/:token',
  checkJWT,
  CommonValidator.paramToken,
  validateResult,
  UserController.linkEmailByToken
)
router.put(
  '/link/phone-number',
  checkJWT,
  UserValidator.linkPhoneNumber,
  validateResult,
  UserController.linkPhoneNumber
)
router.put(
  '/link/google',
  checkJWT,
  AuthValidator.checkGoogleCode,
  validateResult,
  UserController.linkGoogle
)
router.put(
  '/link/facebook',
  checkJWT,
  AuthValidator.checkFacebookAccessToken,
  validateResult,
  passport.authenticate('facebook-token', { session: false }),
  UserController.linkFacebook
)

router.put(
  '/unlink/email/code',
  checkJWT,
  CommonValidator.bodyCode,
  validateResult,
  UserController.unlinkEmailByCode
)
router.get(
  '/unlink/email/:token',
  checkJWT,
  CommonValidator.paramToken,
  validateResult,
  UserController.unlinkEmailByToken
)
router.put(
  '/unlink/phone_number',
  checkJWT,
  CommonValidator.bodyCode,
  validateResult,
  UserController.unlinkPhoneNumber
)

router.put(
  '/report',
  checkJWT,
  UserValidator.report,
  validateResult,
  UserController.report
)

router.delete(
  '/',
  checkJWT,
  CommonValidator.bodyPassword,
  validateResult,
  UserController.destroy
)

export { router }
