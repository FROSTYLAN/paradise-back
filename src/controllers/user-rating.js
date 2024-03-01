import { UserRatingService } from '../services'
import { serverError, success } from '../utils/http'

export const save = async ({ body, user }, res) => {
  try {
    const userRating = {
      from_user_id: user.sub,
      to_user_id: body.user_id,
      rating: body.rating,
      description: body.description
    }

    const foundUserRating = await UserRatingService.getOne({
      from_user_id: userRating.from_user_id,
      to_user_id: userRating.to_user_id
    })

    if (!foundUserRating.id) {
      const createdUserRating = await UserRatingService.create(userRating)
      return success(res, createdUserRating)
    }

    userRating.id = foundUserRating.id
    const updatedUserRating = await UserRatingService.update(userRating)
    return success(res, updatedUserRating)
  } catch (e) {
    return serverError(res, e)
  }
}
