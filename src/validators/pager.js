import { query } from 'express-validator'
import { sortDirection } from './custom/sort-direction'

export const pager = [
  query('page_size', 'Tamaño de página no es válido')
    .if(query('page_size').not().isEmpty())
    .isNumeric(),
  query('page_index', 'Número de página no es válido')
    .if(query('page_index').not().isEmpty())
    .isNumeric(),
  query('sort_direction', 'Dirección de ordenamiento no es válido')
    .if(query('sort_direction').not().isEmpty())
    .custom(sortDirection)
]
