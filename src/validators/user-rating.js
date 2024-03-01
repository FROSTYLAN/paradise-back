import { body } from 'express-validator'

export const save = [
  body('user_id', 'Usuario Id es requerido').not().isEmpty(),
  body('user_id', 'Usuario Id no es válido')
    .if(body('user_id').not().isEmpty())
    .isNumeric(),
  body('rating', 'Clasificación es requerido').not().isEmpty(),
  body('rating', 'Clasificación no es válido')
    .if(body('rating').not().isEmpty())
    .isNumeric()
]
