import { UserMessageService } from '../services'
import { serverError, success } from '../utils/http'

export const getAllByUserId = async ({ params, user }, res) => {
  try {
    const userMessage = await UserMessageService.getAllByUserId(
      user.sub,
      params.user_id
    )
    return success(res, userMessage)
  } catch (e) {
    return serverError(res, e)
  }
}
