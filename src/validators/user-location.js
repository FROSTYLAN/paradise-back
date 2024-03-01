import { param, body } from 'express-validator'

export const create = [
  body('lat', 'Latitud es requerida').not().isEmpty(),
  body('lng', 'Longitud es requerida').not().isEmpty(),
  body('lat', 'Latitud es requerida')
    .if(body('lat').not().isEmpty())
    .isNumeric(),
  body('lng', 'Longitud es requerida')
    .if(body('lng').not().isEmpty())
    .isNumeric(),
  body('city', 'Ciudad es requerida').not().isEmpty()
]

export const update = [
  body('id', 'Id es requerido').not().isEmpty(),
  body('id', 'Id no es válido').if(body('id').not().isEmpty()).isNumeric(),
  body('lat', 'Latitud es requerida').not().isEmpty(),
  body('lng', 'Longitud es requerida').not().isEmpty(),
  body('lat', 'Latitud es requerida')
    .if(body('lat').not().isEmpty())
    .isNumeric(),
  body('lng', 'Longitud es requerida')
    .if(body('lng').not().isEmpty())
    .isNumeric(),
  body('city', 'Ciudad es requerida').not().isEmpty()
]

export const destroy = [
  param('id', 'Id es requerido').not().isEmpty(),
  param('id', 'Id no es válido').if(param('id').not().isEmpty()).isNumeric()
]
