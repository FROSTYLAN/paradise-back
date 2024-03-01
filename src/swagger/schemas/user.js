const properties = {
  id: {
    type: 'integer'
  },
  email: {
    type: 'string'
  },
  phone_number: {
    type: 'string'
  },
  login_type: {
    type: 'string'
  },
  active: {
    type: 'boolean'
  },
  reported: {
    type: 'boolean'
  },
  report_message: {
    type: 'string'
  },
  verified_email: {
    type: 'boolean'
  },
  verified_phone: {
    type: 'boolean'
  },
  verified_photo: {
    type: 'boolean'
  },
  verified_gm: {
    type: 'boolean'
  },
  verified_fb: {
    type: 'boolean'
  },
  verified_ig: {
    type: 'boolean'
  },
  initial_steps: {
    type: 'boolean'
  }
}

export const User = {
  type: 'object',
  properties
}

export const UserWithDetails = {
  type: 'object',
  properties: {
    ...properties,
    profile: {
      type: 'object',
      properties: {
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
        age: {
          type: 'integer'
        },
        language: {
          type: 'array',
          items: {
            type: 'integer'
          }
        },
        smoker: {
          type: 'string'
        },
        status: {
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
    },
    preferences: {
      type: 'object',
      properties: {
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
  }
}
