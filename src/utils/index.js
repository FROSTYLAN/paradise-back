import moment from 'moment'
import { v4 as uuid } from 'uuid'
import { languageEnum } from './enums'

export const getUid = (withSeparator = true) => {
  return withSeparator ? uuid() : uuid().replace(/-/g, '')
}

export const getRandomNumber = (length = 8) => {
  const numbers = '0123456789'
  return Array.from(
    { length },
    () => numbers[Math.floor(Math.random() * numbers.length)]
  ).join('')
}

export const isExpired = (expiryDate) => {
  return moment().isAfter(expiryDate)
}

export const getEnumValues = (enumObject) => {
  if (!enumObject || !(enumObject instanceof Object)) return []
  return Object.values(enumObject).sort((a, b) => (a > b ? 1 : -1))
}

export const getIntFromString = (phone_number) => {
  if (typeof phone_number === 'string') {
    return phone_number?.trim() ? Number(phone_number.trim()) : null
  }
  return phone_number
}

export const getAgeFromBirthdate = (birthdate) => {
  if (!birthdate) return null
  return moment().diff(birthdate, 'years')
}

export const getArrayFromString = (value) => {
  if (!value?.trim()) return []

  let items = value.split(',')
  if (items.length <= 0) return []

  items = items
    .filter((item) => !isNaN(Number(item.trim())))
    .map((item) => parseInt(item.trim()))
  items = items.filter(
    (item, index) => item > 0 && items.indexOf(item) === index
  )

  return items
}

export const getStringFromArray = (array) => {
  const values = getEnumValues(languageEnum)

  let items = array instanceof Array ? array : []
  items = items.filter((item, index) => items.indexOf(item) === index)
  items = items.filter((item) => values.includes(item))

  return items.length > 0 ? items.join(',') : null
}

export const getPagerFromParams = (params) => {
  return {
    page_count:
      params.page_size && params.page_size > 0
        ? Math.ceil(params.total_records / params.page_size)
        : 1,
    page_size: Number(params.page_size ?? 0),
    page_index: Number(params.page_index ?? 1),
    total_records: Number(params.total_records),
    sort_name: params.sort_name?.toLowerCase(),
    sort_direction: params.sort_direction?.toLowerCase()
  }
}

export const getObjectArrayAverage = (data, field) => {
  try {
    const average = Math.ceil(
      data.reduce(
        (accumulator, current) => accumulator + Number(current[field]),
        0
      ) / data.length
    )
    return !isNaN(average) ? average : 0
  } catch {
    return 0
  }
}

export const capitalize = (word) => {
  if (!word || !word.trim()) return word
  if (word.length === 1) return word.charAt(0).toUpperCase()
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

export const sortByAsc = (field) => (a, b) => {
  try {
    return a[field] > b[field] ? 1 : -1
  } catch {
    return 1
  }
}

export const sortByDesc = (field) => (a, b) => {
  try {
    return a[field] <= b[field] ? 1 : -1
  } catch {
    return 1
  }
}

export const sortByDateAsc = (field) => (a, b) => {
  try {
    return moment(a[field]).diff(moment(b[field]), 'seconds') <= 0 ? 1 : -1
  } catch {
    return 1
  }
}

export const sortByDateDesc = (field) => (a, b) => {
  try {
    return moment(a[field]).diff(moment(b[field]), 'seconds') > 0 ? 1 : -1
  } catch {
    return 1
  }
}
