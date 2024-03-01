import { body } from 'express-validator'

export const save = [
  body('user_id', 'Usuario Id es requerido').not().isEmpty(),
  body('user_id', 'Usuario Id no es válido')
    .if(body('user_id').not().isEmpty())
    .isNumeric(),
  body('description', 'Descripción es requerido').not().isEmpty(),
  body('description', 'Descripción no es válido')
    .if(body('description').not().isEmpty())
]
