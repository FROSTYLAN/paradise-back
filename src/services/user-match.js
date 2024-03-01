import { QueryTypes } from 'sequelize'
import sequelize from '../database/pg'
import UserMatch from '../models/user-match'
import { getUpdatedModel, mapToJson } from '../utils/db'
import { getPagerFromParams } from '../utils'
import { serverError } from '../utils/http'

export const getAllChats = async (params, user_id) => {
  const sortName = params.sort_name?.toLowerCase()
  const sortDirection = params.sort_direction?.toUpperCase()

  const withOrderBy =
    sortName && sortDirection && ['ASC', 'DESC'].includes(sortDirection)
  const orderBy = withOrderBy
    ? `ORDER BY upro.${sortName} ${sortDirection}`
    : 'ORDER BY upro.name ASC'

  const withLimit = params.page_size && params.page_size > 0
  const withOffset = withLimit && params.page_index && params.page_index > 1
  const limit = withLimit ? `LIMIT ${params.page_size.toString()}` : ''
  const offset = withOffset
    ? `OFFSET ${(params.page_size * (params.page_index - 1)).toString()}`
    : ''

  const joins = `
    INNER JOIN user_profile upro ON (
      (
        (umat.from_user_id = :user_id AND umat.to_user_id = upro.user_id) OR
        (umat.from_user_id = upro.user_id AND umat.to_user_id = :user_id)
      ) AND
      umat.state = 2
    )
    LEFT JOIN user_locations uloc ON (upro.user_id = uloc.user_id and uloc.current = true)
    LEFT JOIN locations loc ON uloc.location_id = loc.id
    LEFT JOIN (
      SELECT DISTINCT
        umes2.*
      FROM user_match umat2
      INNER JOIN user_profile upro2 ON (
        (
          (umat2.from_user_id = :user_id AND umat2.to_user_id = upro2.user_id) OR
          (umat2.from_user_id = upro2.user_id AND umat2.to_user_id = :user_id)
        ) AND
        umat2.state = 1
      )
      INNER JOIN user_messages umes2 ON (
        (umes2.from_user_id = :user_id AND umes2.to_user_id = upro2.user_id) OR
        (umes2.from_user_id = upro2.user_id AND umes2.to_user_id = :user_id)
      )
      ORDER BY umes2.created_at DESC
      LIMIT 1
    ) umes ON (
      (umes.from_user_id = :user_id AND umes.to_user_id = upro.user_id) OR
      (umes.from_user_id = upro.user_id AND umes.to_user_id = :user_id)
    )
  `.trim()

  const userMatchesCount = await sequelize.query(
    `
      SELECT
          COUNT(upro.user_id)
      FROM user_match umat
      ${joins}
    `,
    {
      replacements: {
        user_id
      },
      type: QueryTypes.SELECT
    }
  )

  const userMatches = await sequelize.query(
    `
      SELECT DISTINCT
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
        upro.looking_for,
        umes.id as last_message_id,
        umes.from_user_id as last_message_from_user_id,
        umes.to_user_id as last_message_to_user_id,
        umes.created_at as last_message_date,
        umes.message as last_message,
        (
          SELECT COUNT(umes3.id)
          FROM user_messages umes3
          WHERE (
            (umes3.from_user_id = :user_id AND umes3.to_user_id = upro.user_id) OR
            (umes3.from_user_id = upro.user_id AND umes3.to_user_id = :user_id)
          )
          AND umes3.seen = false
        ) as new_messages
      FROM user_match umat
      ${joins}
      ${orderBy}
      ${limit}
      ${offset}
    `,
    {
      replacements: {
        user_id
      },
      type: QueryTypes.SELECT
    }
  )

  const data = userMatches.map((userMatch) => {
    if (userMatch.location_id) {
      userMatch.location = {
        id: userMatch.location_id,
        lat: userMatch.location_lat,
        lng: userMatch.location_lng,
        city: userMatch.location_city
      }
    } else {
      userMatch.location = {}
    }

    if (userMatch.last_message_id) {
      userMatch.last_message = {
        id: userMatch.last_message_id,
        from_user_id: userMatch.last_message_from_user_id,
        to_user_id: userMatch.last_message_to_user_id,
        date: userMatch.last_message_date,
        message: userMatch.last_message
      }
    } else {
      userMatch.last_message = {}
    }

    Reflect.deleteProperty(userMatch, 'location_id')
    Reflect.deleteProperty(userMatch, 'location_lat')
    Reflect.deleteProperty(userMatch, 'location_lng')
    Reflect.deleteProperty(userMatch, 'location_city')
    Reflect.deleteProperty(userMatch, 'last_message_id')
    Reflect.deleteProperty(userMatch, 'last_message_from_user_id')
    Reflect.deleteProperty(userMatch, 'last_message_to_user_id')
    Reflect.deleteProperty(userMatch, 'last_message_date')

    return userMatch
  })

  params.total_records = userMatchesCount[0]?.count ?? 0

  return {
    pager: getPagerFromParams(params),
    data
  }
}

export const getAllRequests = async (params, user_id) => {
  const sortName = params.sort_name?.toLowerCase()
  const sortDirection = params.sort_direction?.toUpperCase()

  const withOrderBy =
    sortName && sortDirection && ['ASC', 'DESC'].includes(sortDirection)
  const orderBy = withOrderBy
    ? `ORDER BY upro.${sortName} ${sortDirection}`
    : 'ORDER BY upro.name ASC'

  const withLimit = params.page_size && params.page_size > 0
  const withOffset = withLimit && params.page_index && params.page_index > 1
  const limit = withLimit ? `LIMIT ${params.page_size.toString()}` : ''
  const offset = withOffset
    ? `OFFSET ${(params.page_size * (params.page_index - 1)).toString()}`
    : ''

  const joins = `
    INNER JOIN user_profile upro ON (
      (
        (umat.from_user_id = upro.user_id AND umat.to_user_id = :user_id)
      ) AND
      umat.state = 1
    )
    LEFT JOIN user_locations uloc ON (upro.user_id = uloc.user_id and uloc.current = true)
    LEFT JOIN locations loc ON uloc.location_id = loc.id
  `.trim()

  const userMatchesCount = await sequelize.query(
    `
      SELECT
          COUNT(upro.user_id)
      FROM user_match umat
      ${joins}
    `,
    {
      replacements: {
        user_id
      },
      type: QueryTypes.SELECT
    }
  )

  
  const userMatches = await sequelize.query(
    `
      SELECT DISTINCT
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
      FROM user_match umat
      ${joins}
      ${orderBy}
      ${limit}
      ${offset}
    `,
    {
      replacements: {
        user_id
      },
      type: QueryTypes.SELECT
    }
  )

  const data = userMatches.map((userMatch) => {
    if (userMatch.location_id) {
      userMatch.location = {
        id: userMatch.location_id,
        lat: userMatch.location_lat,
        lng: userMatch.location_lng,
        city: userMatch.location_city
      }
    } else {
      userMatch.location = {}
    }

    Reflect.deleteProperty(userMatch, 'location_id')
    Reflect.deleteProperty(userMatch, 'location_lat')
    Reflect.deleteProperty(userMatch, 'location_lng')
    Reflect.deleteProperty(userMatch, 'location_city')

    return userMatch
  })

  params.total_records = userMatchesCount[0]?.count ?? 0
  return {
    pager: getPagerFromParams(params),
    data
  }
}

export const getAllContacts = async (params, user_id) => {
  const sortName = params.sort_name?.toLowerCase()
  const sortDirection = params.sort_direction?.toUpperCase()

  const withOrderBy =
    sortName && sortDirection && ['ASC', 'DESC'].includes(sortDirection)
  const orderBy = withOrderBy
    ? `ORDER BY upro.${sortName} ${sortDirection}`
    : 'ORDER BY upro.name ASC'

  const withLimit = params.page_size && params.page_size > 0
  const withOffset = withLimit && params.page_index && params.page_index > 1
  const limit = withLimit ? `LIMIT ${params.page_size.toString()}` : ''
  const offset = withOffset
    ? `OFFSET ${(params.page_size * (params.page_index - 1)).toString()}`
    : ''

  const joins = `
    INNER JOIN user_profile upro ON (
      (
        (umat.from_user_id = upro.user_id AND umat.to_user_id = :user_id)
      ) AND
      umat.state = 2
    )
    LEFT JOIN user_locations uloc ON (upro.user_id = uloc.user_id and uloc.current = true)
    LEFT JOIN locations loc ON uloc.location_id = loc.id
  `.trim()

  const userMatchesCount = await sequelize.query(
    `
      SELECT
          COUNT(upro.user_id)
      FROM user_match umat
      ${joins}
    `,
    {
      replacements: {
        user_id
      },
      type: QueryTypes.SELECT
    }
  )

  const userMatches = await sequelize.query(
    `
      SELECT DISTINCT
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
      FROM user_match umat
      ${joins}
      ${orderBy}
      ${limit}
      ${offset}
    `,
    {
      replacements: {
        user_id
      },
      type: QueryTypes.SELECT
    }
  )

  const data = userMatches.map((userMatch) => {
    if (userMatch.location_id) {
      userMatch.location = {
        id: userMatch.location_id,
        lat: userMatch.location_lat,
        lng: userMatch.location_lng,
        city: userMatch.location_city
      }
    } else {
      userMatch.location = {}
    }

    Reflect.deleteProperty(userMatch, 'location_id')
    Reflect.deleteProperty(userMatch, 'location_lat')
    Reflect.deleteProperty(userMatch, 'location_lng')
    Reflect.deleteProperty(userMatch, 'location_city')

    return userMatch
  })

  params.total_records = userMatchesCount[0]?.count ?? 0

  return {
    pager: getPagerFromParams(params),
    data
  }
}

export const getOne = async (userMatch) => {
  const foundUserMatch = await UserMatch.findOne({ where: userMatch })
  return mapToJson(foundUserMatch)
}

export const create = async (userMessage) => {
  const createdUserMatch = await UserMatch.create(userMessage)
  return mapToJson(createdUserMatch)
}

export const update = async (userMatch) => {
  const result = await UserMatch.update(userMatch, {
    where: { id: userMatch.id },
    returning: true
  })
  const updatedUserMatch = getUpdatedModel(result)
  return mapToJson(updatedUserMatch)
}

export const destroy = async (id) => {
  const deletedUserMatch = await UserMatch.destroy({ where: { id } })
  return !!deletedUserMatch
}

export const getNumNewRequests = async () => {
  const numRequests = await UserMatch.count({ where: { is_new: true } })
  return numRequests
}

export const cleanNewRequests = async () => {
  const updatedRows = await UserMatch.update(
    { is_new: false },
    { where: { is_new: true } }
  );
  return updatedRows
};
