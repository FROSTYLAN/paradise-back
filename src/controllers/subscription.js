import moment from 'moment'
import { subscriptionState } from '../utils/enums'
import { badRequest, serverError, success } from '../utils/http'
import { PricingService, SubscriptionService } from '../services'

export const getOneByUserId = async ({ params }, res) => {
  try {
    const subscription = await SubscriptionService.getOneByUserId(
      params.user_id
    )
    return success(res, subscription)
  } catch (e) {
    return serverError(res, e)
  }
}

export const create = async ({ body, user }, res) => {
  try {
    const foundPendingSubscription = await SubscriptionService.getOne({
      user_id: user.sub,
      state: subscriptionState.pending
    })

    if (foundPendingSubscription.id) {
      return badRequest(res, 'Ya existe una subscripción pendiente')
    }

    const foundActiveSubscription = await SubscriptionService.getOne({
      user_id: user.sub,
      state: subscriptionState.active
    })

    const daysDiff = foundActiveSubscription.id
      ? moment().diff(foundActiveSubscription.end_date, 'days', true)
      : 1

    if (foundActiveSubscription.id) {
      foundActiveSubscription.state =
        daysDiff > 0
          ? subscriptionState.inactive
          : foundActiveSubscription.state
      await SubscriptionService.update(foundActiveSubscription)
    }

    const foundPricing = await PricingService.getOneById(body.pricing_id)

    const tempStartDate = !foundActiveSubscription.id
      ? moment().toDate()
      : moment(foundActiveSubscription.endDate).add(1, 'days').toDate()
    const startDate = moment(
      `${moment(tempStartDate).format('YYYY-MM-DD')}T00:00:00`
    ).toDate()
    const endDate = moment(startDate)
      .add(foundPricing.frequency, 'months')
      .toDate()

    const subscription = {
      user_id: user.sub,
      pricing_id: body.pricing_id,
      start_date: startDate,
      end_date: endDate,
      state: daysDiff > 0 ? subscriptionState.active : subscriptionState.pending
    }

    const createdSubscription = await SubscriptionService.create(subscription)
    return success(res, createdSubscription)
  } catch (e) {
    return serverError(res, e)
  }
}
