import { param, body } from 'express-validator'

export const createOne = [body('photo', 'Foto es requerido').not().isEmpty()]

export const createMultiple = [
  body('photos', 'Fotos es requerido').not().isEmpty(),
  body('photos', 'Fotos no es válido')
    .if(body('photos').not().isEmpty())
    .isArray()
]

export const destroy = [
  param('id', 'Id es requerido').not().isEmpty(),
  param('id', 'Id no es válido').if(param('id').not().isEmpty()).isNumeric()
]
