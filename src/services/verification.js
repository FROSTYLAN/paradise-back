import Verification from '../models/verification'
import { getUpdatedModel, mapToJson } from '../utils/db'
import { verificationType } from '../utils/enums'

const customMapToJson = (verificationModel) => {
  const verification = mapToJson(verificationModel)

  const image_01 = Buffer.from(verification.image_01).toString('base64')
  const image_02 = Buffer.from(verification.image_02).toString('base64')

  if (verification.type === verificationType.dni) {
    verification.front = image_01
    verification.back = image_02

    Reflect.deleteProperty(verification, 'image_01')
    Reflect.deleteProperty(verification, 'image_02')
  }

  if (verification.type === verificationType.pose) {
    verification.image_01 = image_01
    verification.image_02 = image_02
  }

  return verification
}

export const getAll = async () => {
  const verifications = await Verification.findAll()
  return verifications.map((verification) => customMapToJson(verification))
}

export const getOneById = async (id) => {
  const verification = await Verification.findByPk(id)
  return customMapToJson(verification)
}

export const getAllByUserId = async (user_id) => {
  const verifications = await Verification.findAll({ where: { user_id } })
  return verifications.map((verification) => customMapToJson(verification))
}

export const create = async (verification) => {
  const createdVerification = await Verification.create(verification)
  return customMapToJson(createdVerification)
}

export const update = async (verification) => {
  const result = await Verification.update(verification, {
    where: { id: verification.id },
    returning: true
  })
  const updatedVerification = getUpdatedModel(result)
  return customMapToJson(updatedVerification)
}
