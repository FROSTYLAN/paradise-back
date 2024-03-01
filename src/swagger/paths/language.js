import {
  response400,
  response401,
  response403,
  response500
} from '../../utils/swagger'

export const languages = {
  '/api/language': {
    get: {
      tags: ['Language'],
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        200: {
          description: 'Returns language list.',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Language'
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
  }
}
