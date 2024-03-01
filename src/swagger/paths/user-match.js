import {
  response400,
  response401,
  response403,
  response500
} from '../../utils/swagger'
import { pagerParams } from '../common/parameters'
import { pagerResponse } from '../common/responses'

export const userMatch = {
  '/api/user-match': {
    get: {
      tags: ['UserMatch'],
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [...pagerParams],
      responses: {
        200: {
          description: 'Returns matched users.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  pager: {
                    type: 'object',
                    properties: {
                      ...pagerResponse
                    }
                  },
                  data: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/UserMatch'
                    }
                  }
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
    },
    post: {
      tags: ['UserMatch'],
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
              $ref: '#/components/schemas/CreateUserMatch'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns created matched user.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserMatch'
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
