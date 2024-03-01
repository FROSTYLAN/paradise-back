import { param } from 'express-validator'

export const getAllByUserId = [
  param('user_id', 'User Id es requerido').not().isEmpty(),
  param('user_id', 'User Id no es válido')
    .if(param('user_id').not().isEmpty())
    .isNumeric()
]

export const approve = [
  param('id', 'Verification Id es requerido').not().isEmpty(),
  param('id', 'Verification Id no es válido')
    .if(param('id').not().isEmpty())
    .isNumeric()
]

export const reject = [
  param('id', 'Verification Id es requerido').not().isEmpty(),
  param('id', 'Verification Id no es válido')
    .if(param('id').not().isEmpty())
    .isNumeric()
]
