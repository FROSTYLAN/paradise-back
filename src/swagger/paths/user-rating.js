import {
  response400,
  response401,
  response403,
  response500
} from '../../utils/swagger'

export const userRating = {
  '/api/user-rating': {
    post: {
      tags: ['UserRating'],
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
              $ref: '#/components/schemas/SaveUserRating'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns saved user rating.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserRating'
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
