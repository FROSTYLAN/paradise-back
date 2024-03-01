import {
  response400,
  response401,
  response403,
  response500
} from '../../utils/swagger'

export const userLocation = {
  '/api/user-location/{user_id}': {
    get: {
      tags: ['UserLocation'],
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [
        {
          in: 'path',
          name: 'user_id',
          required: true,
          schema: {
            type: 'integer'
          }
        }
      ],
      responses: {
        200: {
          description: 'Returns user locations.',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/UserLocation'
                }
              }
            }
          }
        },
        400: response400,
        401: response401,
        403: response403,
        500: response500
      }
    }
  },
  '/api/user-location': {
    get: {
      tags: ['UserLocation'],
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        200: {
          description: 'Returns user location by user_id.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserLocation'
              }
            }
          }
        },
        400: response400,
        401: response401,
        403: response403,
        500: response500
      }
    },
    post: {
      tags: ['UserLocation'],
      security: [
        {
          bearerAuth: []
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreateUserLocation'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns created user location.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserLocation'
              }
            }
          }
        },
        400: response400,
        401: response401,
        403: response403,
        500: response500
      }
    },
    put: {
      tags: ['UserLocation'],
      security: [
        {
          bearerAuth: []
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UpdateUserLocation'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns updated user location.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserLocation'
              }
            }
          }
        },
        400: response400,
        401: response401,
        403: response403,
        500: response500
      }
    }
  },
  '/api/user-location/{id}': {
    delete: {
      tags: ['UserLocation'],
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          }
        }
      ],
      responses: {
        200: {
          description: 'Returns deleted user location.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserLocation'
              }
            }
          }
        },
        400: response400,
        401: response401,
        403: response403,
        500: response500
      }
    }
  }
}
