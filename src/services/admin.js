import Admin from '../models/admin'
import { getUpdatedModel, mapToJson } from '../utils/db'

const customMapToJson = (
  adminModel,
  withPassword,
  withRefreshToken
) => {
  const admin = mapToJson(adminModel)

  if (admin.password !== undefined && !withPassword) {
    Reflect.deleteProperty(admin, 'password')
  }

  if (admin.refresh_token !== undefined && !withRefreshToken) {
    Reflect.deleteProperty(admin, 'refresh_token')
  }

  return admin
}

export const getOne = async (
  filters,
  withPassword = false,
  withRefreshToken = false
) => {

  const admin = await Admin.findOne({
    where: {
      ...filters,
      active: true
    }
  })

  return customMapToJson(admin, withPassword, withRefreshToken)
}

export const create = async (admin) => {
  const createdAdmin = await Admin.create(admin)
  return customMapToJson(createdAdmin)
}

export const update = async (admin) => {

  const result = await Admin.update(admin, {
    where: { id: admin.id },
    returning: true
  })
  const updatedAdmin = getUpdatedModel(result)
  return customMapToJson(updatedAdmin, false)
}