import { QueryTypes } from 'sequelize'
import sequelize from '../database/pg'
import UserProfile from '../models/user-profile'
import { getArrayFromString, getPagerFromParams } from '../utils'
import { getUpdatedModel, mapToJson } from '../utils/db'
import { mapToJsonWithLocation } from './common'

export const getAll = async (params, user_id) => {
  const filters = []
  const replacements = {user_id}

  filters.push('u.active = true')
  filters.push('u.reported = false')
  filters.push('sub.id IS NULL')
  filters.push('umat.id IS NULL')

  if (user_id) {
    filters.push(`upro.user_id <> ${user_id}`)
  }

  if (params.gender_id) {
    filters.push('upro.gender_id = :gender_id')
    replacements.gender_id = params.gender_id
  }

  if (params.min_age && params.max_age) {
    filters.push(
      '(EXTRACT(year FROM age(current_date, upro.birthdate)) :: int) >= :min_age'
    )
    filters.push(
      '(EXTRACT(year FROM age(current_date, upro.birthdate)) :: int) <= :max_age'
    )
    replacements.min_age = params.min_age
    replacements.max_age = params.max_age
  }

  if (
    params.max_distance &&
    params.max_distance > 0 &&
    params.location_lat &&
    params.location_lng
  ) {
    filters.push(
      'public."distanceBetween"((loc.lat || \',\' || loc.lng), :location) <= :max_distance'
    )
    replacements.location = `${params.location_lat},${params.location_lng}`
    replacements.max_distance = params.max_distance
  }

  if (params.looking_for) {
    filters.push('upro.looking_for LIKE :looking_for')
    replacements.looking_for = `%${params.looking_for}%`
  }

  const sortName = params.sort_name?.toLowerCase()
  const sortDirection = params.sort_direction?.toUpperCase()
  const sortByFavoriteDate = params.favorite && sortName && sortName === 'created_at'
  const sortPrefix = sortByFavoriteDate ? 'urat' : 'upro'

  const withOrderBy =
    sortName && sortDirection && ['ASC', 'DESC'].includes(sortDirection)
  const orderBy = withOrderBy
    ? `ORDER BY ${sortPrefix}.${sortName} ${sortDirection}`
    : 'ORDER BY upro.name ASC, upro.lastname ASC'

  const withLimit = params.page_size && params.page_size > 0
  const withOffset = withLimit && params.page_index && params.page_index > 1
  const limit = withLimit ? `LIMIT ${params.page_size.toString()}` : ''
  const offset = withOffset
    ? `OFFSET ${(params.page_size * (params.page_index - 1)).toString()}`
    : ''

  const joins = `
      ${
        params.favorite
          ? 'INNER JOIN user_rating urat ON upro.user_id = urat.to_user_id'
          : ''
      }
      INNER JOIN users u ON u.id = upro.user_id AND upro.role = 'creator'
      LEFT JOIN subscriptions sub ON (upro.user_id = sub.user_id and sub.state = 1)
      LEFT JOIN user_match umat ON (:user_id = umat.from_user_id and upro.user_id = umat.to_user_id)
      LEFT JOIN user_locations uloc ON (upro.user_id = uloc.user_id and uloc.current = true)
      LEFT JOIN locations loc ON uloc.location_id = loc.id
  `.trim()

  const conditions = filters.length > 0 ? `WHERE ${filters.join('\nAND ')}` : ''

  const userProfileCount = await sequelize.query(
    `
      SELECT
          COUNT(upro.user_id)
      FROM user_profile upro
      ${joins}
      ${conditions}
    `,
    {
      replacements,
      type: QueryTypes.SELECT
    }
  )

  const userProfiles = await sequelize.query(
    `
      SELECT
          upro.user_id,
          upro.gender_id,
          upro.nickname,
          upro.name,
          upro.lastname,
          upro.about_me,
          upro.birthdate,
          loc.id as location_id,
          loc.lat as location_lat,
          loc.lng as location_lng,
          loc.city as location_city,
          upro.language,
          upro.smoker,
          upro.status,
          upro.looking_for
      FROM user_profile upro
      ${joins}
      ${conditions}
      ${orderBy}
      ${limit}
      ${offset}
    `,
    {
      replacements,
      type: QueryTypes.SELECT
    }
  )

  const data = userProfiles.map((userProfile) => {
    if (!userProfile?.user_id) return userProfile

    if (userProfile.language) {
      userProfile.language = getArrayFromString(userProfile.language)
    }

    if (userProfile.looking_for) {
      userProfile.looking_for = getArrayFromString(userProfile.looking_for)
    }

    if (userProfile.location_id) {
      userProfile.location = {
        id: userProfile.location_id,
        lat: userProfile.location_lat,
        lng: userProfile.location_lng,
        city: userProfile.location_city
      }
    } else {
      userProfile.location = {}
    }

    Reflect.deleteProperty(userProfile, 'location_id')
    Reflect.deleteProperty(userProfile, 'location_lat')
    Reflect.deleteProperty(userProfile, 'location_lng')
    Reflect.deleteProperty(userProfile, 'location_city')

    return userProfile
  })

  params.total_records = userProfileCount[0]?.count ?? 0

  // console.log(params);
  // if (params.favorite === 'true') {
  //   console.log(data);
  // }
  
  return {
    pager: getPagerFromParams(params),
    data
  }
}

export const getOneByUserId = async (user_id, withLocation = true) => {
  const userProfile = await UserProfile.findByPk(user_id)
  return withLocation
    ? mapToJsonWithLocation(userProfile)
    : mapToJson(userProfile)
}

export const create = async (userProfile) => {
  const createdUserProfile = await UserProfile.create(userProfile)
  return mapToJsonWithLocation(createdUserProfile)
}

export const update = async (userProfile) => {
  const result = await UserProfile.update(userProfile, {
    where: { user_id: userProfile.user_id },
    returning: true
  })
  const updatedUserProfile = getUpdatedModel(result)
  return mapToJsonWithLocation(updatedUserProfile)
}

export const destroy = async (user_id) => {
  const count = await UserProfile.destroy({ where: { user_id } })
  return count > 0
}
