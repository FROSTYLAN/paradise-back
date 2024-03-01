export const Token = {
  type: 'object',
  properties: {
    access_token: {
      type: 'string'
    },
    refresh_token: {
      type: 'string'
    }
  }
}

export const LoggedIn = {
  type: 'object',
  properties: {
    tokens: {
      $ref: '#/components/schemas/Token'
    },
    user: {
      $ref: '#/components/schemas/User'
    }
  }
}
