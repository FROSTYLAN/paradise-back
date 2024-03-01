import { query, body } from 'express-validator'
import { languageEnum, lookingForEnum } from '../utils/enums'
import { maxAgeRange, minAgeRange } from './custom/age-range'
import { enumValuesFromArray } from './custom/enum-values'
import { ageBetweenFromDate } from './custom/age-between'
import { distanceRange } from './custom/distance'
import { pager } from './pager'

export const getAll = [
  ...pager,
  query('gender_id', 'Género Id no es válido')
    .if(query('gender_id').not().isEmpty())
    .isNumeric(),
  query('min_age', 'Edad mínima no es válido')
    .if(query('min_age').not().isEmpty())
    .isNumeric(),
  query('max_age', 'Edad mínima no es válido')
    .if(query('max_age').not().isEmpty())
    .isNumeric(),
  query('min_age')
    .if(query('min_age').not().isEmpty().isNumeric())
    .custom(minAgeRange('max_age', 'query')),
  query('max_age')
    .if(query('max_age').not().isEmpty().isNumeric())
    .custom(maxAgeRange('min_age', 'query')),
  query('max_distance', 'Distancia máxima es requerida')
    .if(query('location_id').not().isEmpty())
    .not()
    .isEmpty(),
  query('max_distance', 'Distancia máxima no es válida')
    .if(query('max_distance').not().isEmpty())
    .isNumeric(),
  query('max_distance')
    .if(query('max_distance').not().isEmpty().isNumeric())
    .custom(distanceRange),
  query('location_id', 'Ubicación es requerida')
    .if(query('max_distance').not().isEmpty())
    .not()
    .isEmpty(),
  query('location_id', 'Ubicación es requerida')
    .if(query('location_id').not().isEmpty())
    .isNumeric(),
  query('looking_for', 'En busca de no es válido')
    .if(query('looking_for').not().isEmpty())
    .isNumeric(),
  query('favorite', 'Favorito debe ser verdadero o falso')
    .if(query('favorite').not().isEmpty())
    .isBoolean()
]

export const save = [
  body('gender_id', 'Género Id no es válido')
    .if(body('gender_id').not().isEmpty())
    .isNumeric(),
  body('location_id', 'Ubicación Id no es válido')
    .if(body('location_id').not().isEmpty())
    .isNumeric(),
  body('birthdate', 'Edad no válida')
    .if(body('birthdate').not().isEmpty())
    .custom(ageBetweenFromDate('Fecha de nacimiento')),
  body('language', 'Idioma debe ser un arreglo')
    .if(body('language').not().isEmpty())
    .isArray(),
  body('language')
    .if(body('language').not().isEmpty().isArray())
    .custom(enumValuesFromArray('Idioma', languageEnum)),
  body('smoker', 'Fumador no es válido')
    .if(body('smoker').not().isEmpty())
    .isNumeric(),
  body('status', 'Estado no es válido')
    .if(body('status').not().isEmpty())
    .isNumeric(),
  body('looking_for', 'En busca de debe ser un array')
    .if(body('looking_for').not().isEmpty())
    .isArray(),
  body('looking_for')
    .if(body('looking_for').not().isEmpty().isArray())
    .custom(enumValuesFromArray('En busca de', lookingForEnum)),
  body('initial_steps', 'Initial Steps no es válido')
    .if(body('initial_steps').not().isEmpty())
    .isBoolean()
]
