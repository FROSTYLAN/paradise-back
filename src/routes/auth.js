import passport from '../passport'
import { Router } from 'express'
import { validateResult } from '../middlewares/validator'
import { AuthController } from '../controllers'
import { AuthValidator } from '../validators'

const router = Router()

router.post('/login', AuthValidator.login, validateResult, AuthController.login)

router.post('/login-admin', AuthValidator.loginAdmin, validateResult, AuthController.loginAdmin)

router.post(
  '/login/google',
  AuthValidator.checkGoogleCode,
  validateResult,
  AuthController.loginByGoogle
)
router.post(
  '/login/facebook',
  AuthValidator.checkFacebookAccessToken,
  validateResult,
  passport.authenticate('facebook-token', { session: false }),
  AuthController.loginByFacebook
)

router.post(
  '/refresh-token',
  AuthValidator.refreshToken,
  validateResult,
  AuthController.refreshToken
)

router.post(
  '/refresh-token-admin',
  AuthValidator.refreshToken,
  validateResult,
  AuthController.refreshTokenAdmin
)

router.post(
  '/register',
  AuthValidator.register,
  validateResult,
  AuthController.register
)

router.post(
  '/register-admin',
  AuthValidator.registerAdmin,
  validateResult,
  AuthController.registerAdmin
)

router.post(
  '/register/resend-code',
  AuthValidator.resendCode,
  validateResult,
  AuthController.resendRegistrationCode
)
router.get(
  '/verify/account/:token',
  AuthValidator.verifyByToken,
  validateResult,
  AuthController.verifyAccountByToken
)
router.post(
  '/verify/account',
  AuthValidator.verifyByCode,
  validateResult,
  AuthController.verifyAccountByCode
)

router.post(
  '/forgot-password',
  AuthValidator.forgotPassword,
  validateResult,
  AuthController.forgotPassword
)
router.post(
  '/forgot-password/resend-code',
  AuthValidator.resendCode,
  validateResult,
  AuthController.resendForgotPasswordCode
)
router.get(
  '/verify/reset-password/:token',
  AuthValidator.verifyByToken,
  validateResult,
  AuthController.verifyPasswordResetByToken
)
router.post(
  '/verify/reset-password',
  AuthValidator.verifyByCode,
  validateResult,
  AuthController.verifyPasswordResetByCode
)
router.post(
  '/reset-password',
  AuthValidator.resetPassword,
  validateResult,
  AuthController.resetPassword
)

export { router }
