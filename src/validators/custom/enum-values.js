import { getEnumValues } from '../../utils'

export const enumValues = (field, enumObject) => (value) => {
  const languageValues = getEnumValues(enumObject)

  if (languageValues.length <= 0) {
    return true
  }

  if (
    !value ||
    isNaN(Number(value)) ||
    !languageValues.includes(Number(value))
  ) {
    const min = languageValues[0]
    const max = languageValues[languageValues.length - 1]
    throw new Error(`${field} debe ser un entero entre ${min} y ${max}`)
  }

  return true
}

export const enumValuesFromArray = (field, enumObject) => (value) => {
  const languageValues = getEnumValues(enumObject)

  if (languageValues.length <= 0) {
    return true
  }

  if (
    !value ||
    !(value instanceof Array) ||
    !value.every((item) => languageValues.includes(item))
  ) {
    const min = languageValues[0]
    const max = languageValues[languageValues.length - 1]
    throw new Error(`${field} debe contener enteros entre ${min} y ${max}`)
  }

  return true
}
