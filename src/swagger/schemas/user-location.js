export const UserLocation = {
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    },
    user_id: {
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
    },
    current: {
      type: 'boolean'
    }
  }
}

export const CreateUserLocation = {
  type: 'object',
  properties: {
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

export const UpdateUserLocation = {
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
