import { body } from 'express-validator'
import { matchPassword } from './custom/password'

export const update = [
  body('email', 'Email es requerido').not().isEmpty(),
  body('email', 'Email no es válido')
    .if(body('email').not().isEmpty())
    .isEmail(),
  body('phone_number', 'Número de teléfono es requerido').not().isEmpty()
]

export const createPassword = [
  body('new_password', 'Contraseña nueva es requerida').not().isEmpty(),
  body('confirm_new_password', 'Confirmación de contraseña nueva es requerida')
    .not()
    .isEmpty(),
  body('new_password')
    .if(body('new_password').not().isEmpty())
    .if(body('confirm_new_password').not().isEmpty())
    .custom(matchPassword('new_password', 'confirm_new_password'))
]

export const updatePassword = [
  body('old_password', 'Contraseña anterior es requerida').not().isEmpty(),
  body('new_password', 'Contraseña nueva es requerida').not().isEmpty(),
  body('confirm_new_password', 'Confirmación de contraseña nueva es requerida')
    .not()
    .isEmpty(),
  body('new_password')
    .if(body('new_password').not().isEmpty())
    .if(body('confirm_new_password').not().isEmpty())
    .custom(matchPassword('new_password', 'confirm_new_password'))
]

export const sendEmailCode = [
  body('email', 'Email es requerido').not().isEmpty()
]

export const sendPhoneNumberCode = [
  body('phone_number', 'Número de teléfono es requerido').not().isEmpty()
]

export const linkEmailByCode = [
  body('email', 'Email es requerido').not().isEmpty(),
  body('code', 'Código es requerido').not().isEmpty()
]

export const linkPhoneNumber = [
  body('phone_number', 'Número de teléfono es requerido').not().isEmpty(),
  body('code', 'Código es requerido').not().isEmpty()
]

export const report = [
  body('user_id', 'Usuario Id es requerido').not().isEmpty(),
  body('user_id', 'Usuario Id no es válido')
    .if(body('user_id').not().isEmpty())
    .isNumeric()
]
