import { verificationStatus, verificationType } from '../utils/enums'
import { badRequest, serverError, success } from '../utils/http'
import { VerificationService } from '../services'

export const getAll = async (req, res) => {
  try {
    const verifications = await VerificationService.getAll()
    return success(res, verifications)
  } catch (e) {
    return serverError(res, e)
  }
}

export const getAllByUserId = async ({ params }, res) => {
  try {
    const verifications = await VerificationService.getAllByUserId(
      params.user_id
    )
    return success(res, verifications)
  } catch (e) {
    return serverError(res, e)
  }
}

export const createByDNI = async ({ files, user }, res) => {
  try {
    const verification = {
      user_id: user.sub,
      image_01: files.front[0].buffer,
      image_02: files.back[0].buffer,
      type: verificationType.dni,
      status: verificationStatus.created
    }

    const createdVerification = await VerificationService.create(verification)
    return success(res, createdVerification)
  } catch (e) {
    return serverError(res, e)
  }
}

export const createByPose = async ({ files, user }, res) => {
  try {
    const verification = {
      user_id: user.sub,
      image_01: files.image_01[0].buffer,
      image_02: files.image_02[0].buffer,
      type: verificationType.pose,
      status: verificationStatus.created
    }

    const createdVerification = await VerificationService.create(verification)
    return success(res, createdVerification)
  } catch (e) {
    return serverError(res, e)
  }
}

export const approve = async ({ params }, res) => {
  try {
    const foundVerification = await VerificationService.getOneById(params.id)

    if (!foundVerification.id) {
      return badRequest(res, 'Verificación no encontrada')
    }

    const verification = {
      id: params.id,
      status: verificationStatus.approved
    }

    const updatedVerification = await VerificationService.update(verification)
    return success(res, updatedVerification)
  } catch (e) {
    return serverError(res, e)
  }
}

export const reject = async ({ params }, res) => {
  try {
    const foundVerification = await VerificationService.getOneById(params.id)

    if (!foundVerification.id) {
      return badRequest(res, 'Verificación no encontrada')
    }

    const verification = {
      id: params.id,
      status: verificationStatus.rejected
    }

    const updatedVerification = await VerificationService.update(verification)
    return success(res, updatedVerification)
  } catch (e) {
    return serverError(res, e)
  }
}
