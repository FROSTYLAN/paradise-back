export const UserMatch = {
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
    state: {
      type: 'integer'
    }
  }
}

export const CreateUserMatch = {
  type: 'object',
  properties: {
    user_id: {
      type: 'integer'
    }
  }
}
