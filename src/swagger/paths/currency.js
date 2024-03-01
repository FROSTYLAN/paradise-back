import {
  response400,
  response401,
  response403,
  response500
} from '../../utils/swagger'

export const currencies = {
  '/api/currency': {
    get: {
      tags: ['Currency'],
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        200: {
          description: 'Returns currency list.',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Currency'
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
  '/api/currency/{code}': {
    get: {
      tags: ['Currency'],
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [
        {
          in: 'path',
          name: 'code',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      responses: {
        200: {
          description: 'Returns currency.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Currency'
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
