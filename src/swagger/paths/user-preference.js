import {
  response400,
  response401,
  response403,
  response500
} from '../../utils/swagger'

export const userPreference = {
  '/api/user-preference/{user_id}': {
    get: {
      tags: ['UserPreference'],
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
          description: 'Returns user preference.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserPreference'
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
  '/api/user-preference': {
    post: {
      tags: ['UserPreference'],
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
              $ref: '#/components/schemas/SaveUserPreference'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns saved user preference.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserPreference'
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
