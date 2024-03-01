import { body } from 'express-validator'
import { languageEnum, lookingForEnum } from '../utils/enums'
import { maxAgeRange, minAgeRange } from './custom/age-range'
import { distanceRange } from './custom/distance'
import { enumValuesFromArray } from './custom/enum-values'

export const save = [
  body('gender_id', 'Género Id no es válido')
    .if(body('gender_id').not().isEmpty())
    .isNumeric(),
  body('location_id', 'Location Id no es válido')
    .if(body('location_id').not().isEmpty())
    .isNumeric(),
  body('min_age', 'Edad mínima no es válida')
    .if(body('min_age').not().isEmpty())
    .isNumeric(),
  body('max_age', 'Edad máxima no es válida')
    .if(body('max_age').not().isEmpty())
    .isNumeric(),
  body('min_age')
    .if(body('min_age').not().isEmpty().isNumeric())
    .custom(minAgeRange('max_age', 'body')),
  body('max_age')
    .if(body('max_age').not().isEmpty().isNumeric())
    .custom(maxAgeRange('min_age', 'body')),
  body('max_distance', 'Distancia máxima no es válida')
    .if(body('max_distance').not().isEmpty())
    .isNumeric(),
  body('max_distance')
    .if(body('max_distance').not().isEmpty().isNumeric())
    .custom(distanceRange),
  body('language', 'Idioma debe ser un array')
    .if(body('language').not().isEmpty())
    .isArray(),
  body('language')
    .if(body('language').not().isEmpty().isArray())
    .custom(enumValuesFromArray('Idioma', languageEnum)),
  body('body_build', 'Contextura corportal no es válida')
    .if(body('body_build').not().isEmpty())
    .isNumeric(),
  body('appearance', 'Apariencia no es válida')
    .if(body('appearance').not().isEmpty())
    .isNumeric(),
  body('ethnic_origin', 'Origen étnico no es válido')
    .if(body('ethnic_origin').not().isEmpty())
    .isNumeric(),
  body('smoker', 'Fumador no es válido')
    .if(body('smoker').not().isEmpty())
    .isNumeric(),
  body('looking_for', 'En busca de debe ser un array')
    .if(body('looking_for').not().isEmpty())
    .isArray(),
  body('looking_for')
    .if(body('looking_for').not().isEmpty().isArray())
    .custom(enumValuesFromArray('En busca de', lookingForEnum))
]
