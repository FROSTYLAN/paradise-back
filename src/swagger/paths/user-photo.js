import {
  response400,
  response401,
  response403,
  response500
} from '../../utils/swagger'

export const userPhoto = {
  '/api/user-photo/{user_id}': {
    get: {
      tags: ['UserPhoto'],
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
          description: 'Returns user photos by user_id.',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/UserPhoto'
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
  '/api/user-photo': {
    post: {
      tags: ['UserPhoto'],
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
              $ref: '#/components/schemas/CreateUserPhoto'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns created user photo.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserPhoto'
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
  '/api/user-photo/multiple': {
    post: {
      tags: ['UserPhoto'],
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
              $ref: '#/components/schemas/CreateMultipleUserPhoto'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns created user photos.',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/UserPhoto'
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
  '/api/user-photo/{id}': {
    delete: {
      tags: ['UserPhoto'],
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
          description: 'Returns deleted user photo.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserPhoto'
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
