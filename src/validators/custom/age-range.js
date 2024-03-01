import { ageEnum } from '../../utils/enums'

export const minAgeRange = (maxField, reqFromField) => {
  return (value, { req }) => {
    if (
      !value ||
      !maxField ||
      !req[reqFromField][maxField] ||
      isNaN(Number(value)) ||
      isNaN(Number(req[reqFromField][maxField]))
    ) {
      return true
    }

    const minAge = Number(value)
    const maxAge = Number(req[reqFromField][maxField])

    if (minAge < ageEnum.min || minAge > ageEnum.max) {
      throw new Error(
        `La edad mínima debe estar entre ${ageEnum.min} y ${ageEnum.max} años`
      )
    }

    if (minAge > maxAge) {
      throw new Error('La edad mínima no debe ser mayor que la edad máxima')
    }

    return true
  }
}

export const maxAgeRange = (minField, reqFromField) => {
  return (value, { req }) => {
    if (
      !value ||
      !minField ||
      !req[reqFromField][minField] ||
      isNaN(Number(value)) ||
      isNaN(Number(req[reqFromField][minField]))
    ) {
      return true
    }

    const minAge = Number(req[reqFromField][minField])
    const maxAge = Number(value)

    if (maxAge < ageEnum.min || maxAge > ageEnum.max) {
      throw new Error(
        `La edad máxima debe estar entre ${ageEnum.min} y ${ageEnum.max} años`
      )
    }

    if (maxAge < minAge) {
      throw new Error('La edad máxima no debe ser menor que la edad mínima')
    }

    return true
  }
}
