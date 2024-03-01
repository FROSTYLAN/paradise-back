import {
  response400,
  response401,
  response403,
  response500
} from '../../utils/swagger'

export const pricings = {
  '/api/pricing': {
    get: {
      tags: ['Pricing'],
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        200: {
          description: 'Returns pricing list.',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Pricing'
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
  '/api/pricing/{id}': {
    get: {
      tags: ['Pricing'],
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
          description: 'Returns pricing.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Pricing'
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
