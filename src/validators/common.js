import { body, param } from 'express-validator'

export const paramId = [
  param('id', 'Id es requerido').not().isEmpty(),
  param('id', 'Id no es válido').if(param('id').not().isEmpty()).isNumeric()
]

export const paramUserId = [
  param('user_id', 'Usuario Id es requerido').not().isEmpty(),
  param('user_id', 'Usuario Id no es válido')
    .if(param('user_id').not().isEmpty())
    .isNumeric()
]

export const paramToken = [
  param('token', 'Token de verificación es requerido').not().isEmpty()
]

export const bodyCode = [body('code', 'Código es requerido').not().isEmpty()]

export const bodyPassword = [
  body('password', 'Contraseña es requerida').not().isEmpty()
]
