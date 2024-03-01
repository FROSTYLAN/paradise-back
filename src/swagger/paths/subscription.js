import {
  response400,
  response401,
  response403,
  response500
} from '../../utils/swagger'

export const subscription = {
  '/api/subscription/{user_id}': {
    get: {
      tags: ['Subscription'],
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
          description: 'Returns active subscription.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Subscription'
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
  '/api/subscription': {
    post: {
      tags: ['Subscription'],
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
              $ref: '#/components/schemas/CreateSubscription'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns created subscription.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Subscription'
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
