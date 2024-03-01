import { LocationService } from '.'
import { setLocation, mapArrayToJson, mapToJson } from '../utils/db'

export const mapToJsonWithLocation = async (model) => {
  const mappedData = mapToJson(model)

  if (!mappedData.location_id) {
    return mappedData
  }

  const location = await LocationService.getOneById(mappedData.location_id)

  return setLocation(mappedData, location)
}

export const mapArrayToJsonWithLocation = async (models) => {
  const mappedArray = mapArrayToJson(models)

  let location_ids = mappedArray
    .map((item) => item.location_id)
    .filter((location_id) => location_id && location_id > 0)
  location_ids = location_ids.filter(
    (location_id, index) => location_ids.indexOf(location_id) === index
  )

  if (!location_ids || location_ids.length <= 0) {
    return mappedArray.map((item) => setLocation(item, {}))
  }

  const locations = await Promise.all(
    location_ids.map(
      async (location_id) => await LocationService.getOneById(location_id)
    )
  )

  return mappedArray.map((item) => {
    const location = locations.find(
      (location) => location.id === item.location_id
    )
    return setLocation(item, location)
  })
}
