import { distanceEnum } from '../../utils/enums'

export const distanceRange = (value) => {
  if (!value || isNaN(Number(value))) {
    return true
  }

  if (value < distanceEnum.min || value > distanceEnum.max) {
    throw new Error(
      `La distancia debe estar entre ${distanceEnum.min} y ${distanceEnum.max} km`
    )
  }

  return true
}
