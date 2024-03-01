import UserReport from '../models/user-report'
import User from '../models/user'
import { mapArrayToJson, mapToJson } from '../utils/db'
import sequelize from '../database/pg'
import { QueryTypes } from 'sequelize'

export const create = async (userReport) => {
  const createdUserReport = await UserReport.create(userReport)
  return mapToJson(createdUserReport)
}

export const getOne = async ({ from_user_id, to_user_id }) => {
  const userReport = await UserReport.findOne({
    where: { from_user_id, to_user_id }
  })
  return mapToJson(userReport)
}

export const getAllByUserId = async (user_id) => {

  const userOverFiveReport = await sequelize.query(
    `
    SELECT
        r.id AS report_id,
        uf.nickname AS from_user_nickname,
        ut.nickname AS to_user_nickname,
        r.image,
        r.description
    FROM
        user_report r
    JOIN
        user_profile uf ON r.from_user_id = uf.user_id
    JOIN
        user_profile ut ON r.to_user_id = ut.user_id
    WHERE
        r.from_user_id = :user_id OR r.to_user_id = :user_id
    `,
    {
      replacements: {
        user_id
      },
      type: QueryTypes.SELECT
    }
  )

  return userOverFiveReport
}

export const getUsersOverFiveReport = async () => {

  const userOverFiveReport = await sequelize.query(
    `
      SELECT
        upro.user_id AS user_id,
        upro.nickname AS user_reported, 
        COUNT(urep.id) AS number_reports
      FROM user_profile upro
      JOIN user_report urep 
        ON upro.user_id = urep.to_user_id
      GROUP BY upro.user_id
      HAVING COUNT(urep.id) >= 5;
    `,
    {
      type: QueryTypes.SELECT
    }
  )

  return userOverFiveReport
}

export const banUser = async (user_id) => {
  const userReported = await User.update({ reported: true }, {
    where: { id: user_id }
  })

  return userReported[0]
}