const properties = {
  gender_id: {
    type: 'integer'
  },
  nickname: {
    type: 'string'
  },
  name: {
    type: 'string'
  },
  lastname: {
    type: 'string'
  },
  about_me: {
    type: 'string'
  },
  birthdate: {
    type: 'date'
  },
  language: {
    type: 'array',
    items: {
      type: 'integer'
    }
  },
  smoker: {
    type: 'integer'
  },
  status: {
    type: 'integer'
  },
  looking_for: {
    type: 'array',
    items: {
      type: 'integer'
    }
  }
}

export const UserProfile = {
  type: 'object',
  properties: {
    user_id: {
      type: 'integer'
    },
    ...properties,
    age: {
      type: 'integer'
    },
    location: {
      type: 'object',
      properties: {
        id: {
          type: 'integer'
        },
        lat: {
          type: 'string'
        },
        lng: {
          type: 'string'
        },
        city: {
          type: 'string'
        }
      }
    }
  }
}

export const SaveUserProfile = {
  type: 'object',
  properties: {
    ...properties,
    location_id: {
      type: 'integer'
    },
    initial_steps: {
      type: 'boolean'
    }
  }
}
