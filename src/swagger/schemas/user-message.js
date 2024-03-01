export const UserMessage = {
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
    message: {
      type: 'string'
    },
    seen: {
      type: 'boolean'
    }
  }
}
