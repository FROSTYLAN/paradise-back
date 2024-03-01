import User from '../models/user'
import { UserReportService, UserService } from '../services'
import { badRequest, serverError, success } from '../utils/http'

export const save = async ({ body, user }, res) => {
  try {
    const userReport = {
      from_user_id: user.sub,
      to_user_id: body.user_id,
      description: body.description
    }

    const foundUserReport = await UserReportService.getOne({
      from_user_id: userReport.from_user_id,
      to_user_id: userReport.to_user_id
    })

    if (foundUserReport.id) {
      return badRequest(res, 'Este usuario ya ha sido reportado')
    }

    const createdUserReport = await UserReportService.create(userReport)
    return success(res, createdUserReport)
  } catch (e) {
    return serverError(res, e)
  }
}

export const getUsersOverFiveReport = async ({ query, user }, res) => {
  try {
    const userOverFiveReport = await UserReportService.getUsersOverFiveReport()
    return success(res, userOverFiveReport)
  } catch (e) {
    return serverError(res, e)
  }
}

export const getAllByUserId = async ({ params }, res) => {
  try {
    const userReports = await UserReportService.getAllByUserId(params.id)
    return success(res, userReports)
  } catch (e) {
    return serverError(res, e)
  }
}

export const banUser = async ({ params }, res) => {
  try {
    const foundUser = await UserService.getOneById(params.user_id)

    if (!foundUser.id) {
      return badRequest(res, 'Usuario inválido.')
    }

    const bannedUser = await UserReportService.banUser(params.user_id)
    console.log(bannedUser);

    return success(res, 'Baneo completado correctamente.')

  } catch (e) {
    return serverError(res, e)
  }
}