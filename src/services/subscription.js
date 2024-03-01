import Subscription from '../models/subscription'
import { getUpdatedModel, mapToJson } from '../utils/db'
import { subscriptionState } from '../utils/enums'

export const getOne = async (filters) => {
  const pricing = await Subscription.findOne({ where: filters })
  return mapToJson(pricing)
}

export const getOneByUserId = async (user_id) => {
  const pricing = await Subscription.findOne({
    where: { user_id, state: subscriptionState.active }
  })
  return mapToJson(pricing)
}

export const create = async (subscription) => {
  const createdSubscription = await Subscription.create(subscription)
  return mapToJson(createdSubscription)
}

export const update = async (subscription) => {
  const result = await Subscription.update(subscription, {
    where: { id: subscription.id },
    returning: true
  })
  const updatedSubscription = getUpdatedModel(result)
  return mapToJson(updatedSubscription)
}

export const destroyByUserId = async (user_id) => {
  const count = await Subscription.destroy({ where: { user_id } })
  return count > 0
}
