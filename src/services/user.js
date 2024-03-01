import { QueryTypes } from 'sequelize'
import sequelize from '../database/pg'
import User from '../models/user'
import {
  getAgeFromBirthdate,
  getIntFromString,
  getPagerFromParams
} from '../utils'
import { getUpdatedModel, mapToJson } from '../utils/db'

const customMapToJson = (
  userModel,
  withPassword,
  withCode,
  withRefreshToken
) => {
  const user = mapToJson(userModel)

  if (user.birthdate !== undefined) {
    user.age = getAgeFromBirthdate(user.birthdate)
  }

  if (user.phone_number !== undefined) {
    user.phone_number = getIntFromString(user.phone_number)
  }

  if (user.password !== undefined && !withPassword) {
    Reflect.deleteProperty(user, 'password')
  }

  if (user.code !== undefined && !withCode) {
    Reflect.deleteProperty(user, 'code')
  }

  if (user.refresh_token !== undefined && !withRefreshToken) {
    Reflect.deleteProperty(user, 'refresh_token')
  }

  return user
}

export const getAllReported = async (params, user_id) => {
  const filters = ['u.reported = true']

  if (user_id) {
    filters.push(`u.id <> ${user_id}`)
  } // verificar

  const sortName = params.sort_name?.toLowerCase()
  const sortDirection = params.sort_direction?.toUpperCase()

  const withOrderBy =
    sortName && sortDirection && ['ASC', 'DESC'].includes(sortDirection)
  const orderBy = withOrderBy
    ? `ORDER BY u.${sortName} ${sortDirection}`
    : 'ORDER BY u.email ASC'

  const withLimit = params.page_size && params.page_size > 0
  const withOffset = withLimit && params.page_index && params.page_index > 1
  const limit = withLimit ? `LIMIT ${params.page_size.toString()}` : ''
  const offset = withOffset
    ? `OFFSET ${(params.page_size * (params.page_index - 1)).toString()}`
    : ''

  const conditions = filters.length > 0 ? `WHERE ${filters.join('\nAND ')}` : ''

  const usersCount = await sequelize.query(
    `
      SELECT
          COUNT(u.id)
      FROM users u
      ${conditions}
    `,
    {
      type: QueryTypes.SELECT
    }
  )

  const users = await sequelize.query(
    `
      SELECT
          u.*
      FROM users u
      ${conditions}
      ${orderBy}
      ${limit}
      ${offset}
    `,
    {
      type: QueryTypes.SELECT
    }
  )

  const data = users.map((user) => {
    if (user.birthdate !== undefined) {
      user.age = getAgeFromBirthdate(user.birthdate)
    }

    if (user.phone_number !== undefined) {
      user.phone_number = getIntFromString(user.phone_number)
    }

    Reflect.deleteProperty(user, 'code')
    Reflect.deleteProperty(user, 'password')
    Reflect.deleteProperty(user, 'refresh_token')

    return user
  })

  params.total_records = usersCount[0]?.count ?? 0

  return {
    pager: getPagerFromParams(params),
    data
  }
}

export const getOne = async (
  filters,
  withPassword = false,
  withCode = false,
  withRefreshToken = false
) => {
  if (filters.phone_number) {
    filters.phone_number = filters.phone_number.toString()
  }

  const user = await User.findOne({
    where: {
      ...filters,
      reported: false
    }
  })

  return customMapToJson(user, withPassword, withCode, withRefreshToken)
}

export const getOneById = async (
  id,
  withPassword = false,
  withCode = false,
  withRefreshToken = false
) => {
  const user = await User.findOne({
    where: {
      id,
      reported: false
    }
  })
  return await customMapToJson(user, withPassword, withCode, withRefreshToken)
}

export const create = async (user) => {
  if (user.phone_number) {
    user.phone_number = user.toString()
  }

  const createdUser = await User.create(user)
  return customMapToJson(createdUser)
}

export const update = async (user) => {
  if (user.phone_number) {
    user.phone_number = user.toString()
  }

  const result = await User.update(user, {
    where: { id: user.id },
    returning: true
  })
  const updatedUser = getUpdatedModel(result)
  return customMapToJson(updatedUser, false)
}

export const destroy = async (id) => {
  const count = await User.destroy({ where: { id } })
  return count > 0
}
