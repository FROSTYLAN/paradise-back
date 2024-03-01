export const UserRating = {
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    },
    from_user_id: {
      type: 'integer'
    },
    to_user_id: {
      type: 'integer'
    },
    rating: {
      type: 'number'
    },
    description: {
      type: 'string'
    }
  }
}

export const SaveUserRating = {
  type: 'object',
  properties: {
    user_id: {
      type: 'integer'
    },
    rating: {
      type: 'number'
    },
    description: {
      type: 'string'
    }
  }
}
