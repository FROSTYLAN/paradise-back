const properties = {
  gender_id: {
    type: 'integer'
  },
  min_age: {
    type: 'integer'
  },
  max_age: {
    type: 'integer'
  },
  max_distance: {
    type: 'integer'
  },
  language: {
    type: 'array',
    items: {
      type: 'integer'
    }
  },
  body_build: {
    type: 'string'
  },
  appearance: {
    type: 'string'
  },
  ethnic_origin: {
    type: 'string'
  },
  smoker: {
    type: 'integer'
  },
  looking_for: {
    type: 'array',
    items: {
      type: 'integer'
    }
  }
}

export const UserPreference = {
  type: 'object',
  properties: {
    user_id: {
      type: 'integer'
    },
    ...properties,
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

export const SaveUserPreference = {
  type: 'object',
  properties: {
    ...properties,
    location_id: {
      type: 'integer'
    }
  }
}
