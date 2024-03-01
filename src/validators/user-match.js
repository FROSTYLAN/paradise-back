import { param, body } from 'express-validator'

export const save = [
  body('user_id', 'User Id es requerido').not().isEmpty(),
  body('user_id', 'User Id no es válido')
    .if(body('user_id').not().isEmpty())
    .isNumeric()
]

export const destroy = [
  param('id', 'Id es requerido').not().isEmpty(),
  param('id', 'Id no es válido').if(param('id').not().isEmpty()).isNumeric()
]