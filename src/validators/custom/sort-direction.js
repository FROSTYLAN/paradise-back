import { getEnumValues } from '../../utils'
import { sortDirectionEnum } from '../../utils/enums'

export const sortDirection = (value) => {
  const enumValues = getEnumValues(sortDirectionEnum)
  return enumValues.length <= 0 || enumValues.includes(value.toLowerCase())
}
