import { getArrayFromString } from '.'

export const mapToJson = (model) => {
  if (!model) return {}

  const mappedData = model.toJSON()

  Reflect.deleteProperty(mappedData, 'created_at')
  Reflect.deleteProperty(mappedData, 'updated_at')

  if (mappedData.looking_for !== undefined) {
    mappedData.looking_for = getArrayFromString(mappedData.looking_for)
  }

  if (mappedData.language !== undefined) {
    mappedData.language = getArrayFromString(mappedData.language)
  }

  return mappedData
}

export const mapArrayToJson = (models) => {
  return models.map((model) => mapToJson(model))
}

export const getUpdatedModel = (result) => {
  if (!result || result.length < 2 || !result[1] || result[1].length <= 0) {
    return null
  }
  return result[1][0]
}

export const setLocation = (data, location) => {
  if (location.id) {
    data.location = {
      id: location.id,
      lat: location.lat,
      lng: location.lng,
      city: location.city
    }
  } else {
    data.location = {}
  }

  Reflect.deleteProperty(data, 'location_id')

  return data
}
