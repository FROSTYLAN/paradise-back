export const UserPhoto = {
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    },
    user_id: {
      type: 'integer'
    },
    path: {
      type: 'string'
    },
    main: {
      type: 'boolean'
    }
  }
}

export const CreateUserPhoto = {
  type: 'object',
  properties: {
    photo: {
      type: 'string'
    }
  }
}

export const CreateMultipleUserPhoto = {
  type: 'object',
  properties: {
    photos: {
      type: 'array',
      items: {
        type: 'string'
      }
    }
  }
}
