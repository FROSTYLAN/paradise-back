import { body } from 'express-validator'

export const create = [
  body('pricing_id', 'Pricing Id es requerido').not().isEmpty(),
  body('pricing_id', 'Pricing Id no es válido')
    .if(body('pricing_id').not().isEmpty())
    .isNumeric()
]
