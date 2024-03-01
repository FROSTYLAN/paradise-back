export const Subscription = {
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    },
    user_id: {
      type: 'integer'
    },
    pricing_id: {
      type: 'integer'
    },
    start_date: {
      type: 'date'
    },
    end_date: {
      type: 'date'
    },
    state: {
      type: 'integer'
    }
  }
}

export const CreateSubscription = {
  type: 'object',
  properties: {
    pricing_id: {
      type: 'integer'
    }
  }
}
