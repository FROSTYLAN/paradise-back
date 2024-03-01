import {
  response400,
  response401,
  response403,
  response500
} from '../../utils/swagger'

export const userMessage = {
  '/api/user-message/{user_id}': {
    get: {
      tags: ['UserMessage'],
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
          description: 'Returns user messages by user_id.',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/UserMessage'
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
