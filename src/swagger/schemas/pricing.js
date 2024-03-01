export const Pricing = {
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    },
    plan_id: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    frequency: {
      type: 'integer'
    },
    frequency_type: {
      type: 'string'
    },
    free_trial_frequency: {
      type: 'integer'
    },
    free_trial_frequency_type: {
      type: 'string'
    },
    amount: {
      type: 'number'
    },
    discount_percent: {
      type: 'number'
    },
    currency_code: {
      type: 'string'
    },
    state: {
      type: 'integer'
    }
  }
}
