import { UserPhotoService } from '../services'
import { badRequest, serverError, success } from '../utils/http'

export const getAllByUserId = async ({ params }, res) => {
  try {
    const userPhotos = await UserPhotoService.getAllByUserId(params.user_id)
    return success(res, userPhotos)
  } catch (e) {
    return serverError(res, e)
  }
}

export const createOne = async ({ body, user }, res) => {
  try {
    const foundUserPhotos = await UserPhotoService.getAllByUserId(user.sub)
    const hasMain = foundUserPhotos.some((userPhoto) => userPhoto.main)

    const userPhoto = {
      user_id: user.sub,
      path: body.photo,
      main: !hasMain
    }

    const createdUserPhoto = await UserPhotoService.create(userPhoto)
    return success(res, createdUserPhoto)
  } catch (e) {
    return serverError(res, e)
  }
}

export const createMultiple = async ({ body, user }, res) => {
  try {
    const photos = body.photos
      .map((photo) => photo?.toString().trim() ?? '')
      .filter((photo) => photo)

    if (!photos.length) {
      return badRequest(res, 'Ninguna foto encontrada')
    }

    const foundUserPhotos = await UserPhotoService.getAllByUserId(user.sub)
    const hasMain = foundUserPhotos.some((userPhoto) => userPhoto.main)

    const createdUserPhotos = await Promise.all(
      photos.map(async (photo, index) => {
        const userPhoto = {
          user_id: user.sub,
          path: photo,
          main: !hasMain && index === 0
        }

        const createdUserPhoto = await UserPhotoService.create(userPhoto)
        return createdUserPhoto
      })
    )

    return success(res, createdUserPhotos)
  } catch (e) {
    return serverError(res, e)
  }
}

export const destroy = async ({ params, user }, res) => {
  try {
    const foundUserPhoto = await UserPhotoService.getOneById(params.id)

    if (!foundUserPhoto.id || foundUserPhoto.user_id !== user.sub) {
      return success(res, {})
    }

    const wasDeleted = await UserPhotoService.destroy(params.id)

    if (!wasDeleted) {
      return success(res, {})
    }

    const foundUserPhotos = await UserPhotoService.getAllByUserId(user.sub)
    const hasMain = foundUserPhotos.some((userPhoto) => userPhoto.main)

    if (foundUserPhotos.length && !hasMain) {
      await UserPhotoService.update({ id: foundUserPhotos[0].id, main: true })
    }

    return success(res, foundUserPhoto)
  } catch (e) {
    return serverError(res, e)
  }
}
