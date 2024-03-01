import { body, param } from 'express-validator'
import { matchPassword } from './custom/password'

export const loginAdmin = [
  body('username', 'Username es requerido')
    .not()
    .isEmpty(),
  body('password', 'Contraseña es requerida').not().isEmpty()
]

export const login = [
  body('email', 'Email es requerido')
    .if(body('phone_number').isEmpty())
    .not()
    .isEmpty(),
  body('email', 'Email no es válido')
    .if(body('email').not().isEmpty())
    .isEmail(),
  body('phone_number', 'Número de teléfono es requerido')
    .if(body('email').isEmpty())
    .not()
    .isEmpty(),
  body('password', 'Contraseña es requerida').not().isEmpty()
]

export const refreshToken = [
  body('refresh_token', 'Refresh token es requerido').not().isEmpty()
]

export const checkGoogleCode = [
  body('code', 'Código es requerido').not().isEmpty()
]

export const checkFacebookAccessToken = [
  body('access_token', 'Access token es requerido').not().isEmpty()
]

export const register = [
  body('email', 'Email es requerido')
    .if(body('phone_number').isEmpty())
    .not()
    .isEmpty(),
  body('email', 'Email no es válido')
    .if(body('email').not().isEmpty())
    .isEmail(),
  body('phone_number', 'Número de teléfono es requerido')
    .if(body('email').isEmpty())
    .not()
    .isEmpty(),
  body('password', 'Contraseña es requerida').not().isEmpty()
]

export const registerAdmin = [
  body('username', 'Username es requerido')
    .not()
    .isEmpty(),
  body('password', 'Contraseña es requerida').not().isEmpty()
]

export const resendCode = [
  body('email', 'Email es requerido')
    .if(body('phone_number').isEmpty())
    .not()
    .isEmpty(),
  body('email', 'Email no es válido')
    .if(body('email').not().isEmpty())
    .isEmail(),
  body('phone_number', 'Número de teléfono es requerido')
    .if(body('email').isEmpty())
    .not()
    .isEmpty()
]

export const verifyByToken = [
  param('token', 'Token de verificación es requerido').not().isEmpty()
]

export const verifyByCode = [
  body('email', 'Email es requerido')
    .if(body('phone_number').isEmpty())
    .not()
    .isEmpty(),
  body('email', 'Email no es válido')
    .if(body('email').not().isEmpty())
    .isEmail(),
  body('phone_number', 'Número de teléfono es requerido')
    .if(body('email').isEmpty())
    .not()
    .isEmpty(),
  body('code', 'Código es requerido').not().isEmpty()
]

export const forgotPassword = [
  body('email', 'Email es requerido')
    .if(body('phone_number').isEmpty())
    .not()
    .isEmpty(),
  body('email', 'Email no es válido')
    .if(body('email').not().isEmpty())
    .isEmail(),
  body('phone_number', 'Número de teléfono es requerido')
    .if(body('email').isEmpty())
    .not()
    .isEmpty()
]

export const resetPassword = [
  body('email', 'Email es requerido')
    .if(body('phone_number').isEmpty())
    .not()
    .isEmpty(),
  body('email', 'Email no es válido')
    .if(body('email').not().isEmpty())
    .isEmail(),
  body('phone_number', 'Número de teléfono es requerido')
    .if(body('email').isEmpty())
    .not()
    .isEmpty(),
  body('password', 'Contraseña es requerido').not().isEmpty(),
  body('confirm_password', 'Confirmación de contraseña es requerido')
    .not()
    .isEmpty(),
  body('password').custom(matchPassword('password', 'confirm_password'))
]
