import moment from 'moment'
import { ageEnum } from '../../utils/enums'

export const ageBetweenFromDate = (label) => (value) => {
  const birthdate = moment(value).format('YYYY-MM-DD')

  if (birthdate === 'Invalid date') {
    throw new Error(`${label} no es válido`)
  }

  const age = moment().diff(birthdate, 'years')

  if (age < ageEnum.min || age > ageEnum.max) {
    throw new Error(
      `La edad permitida es entre ${ageEnum.min} y ${ageEnum.max} años`
    )
  }

  return true
}
