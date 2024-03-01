import {
  response400,
  response401,
  response403,
  response500
} from '../../utils/swagger'
import { pagerParams } from '../common/parameters'
import { pagerResponse } from '../common/responses'

export const userProfile = {
  '/api/user-profile': {
    get: {
      tags: ['UserProfile'],
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [
        ...pagerParams,
        {
          in: 'query',
          name: 'gender_id',
          required: false,
          schema: {
            type: 'integer'
          }
        },
        {
          in: 'query',
          name: 'min_age',
          required: false,
          schema: {
            type: 'integer'
          }
        },
        {
          in: 'query',
          name: 'max_age',
          required: false,
          schema: {
            type: 'integer'
          }
        },
        {
          in: 'query',
          name: 'max_distance',
          description: 'distance in km',
          required: false,
          schema: {
            type: 'number'
          }
        },
        {
          in: 'query',
          name: 'location_lat',
          required: false,
          schema: {
            type: 'string'
          }
        },
        {
          in: 'query',
          name: 'location_lng',
          required: false,
          schema: {
            type: 'string'
          }
        },
        {
          in: 'query',
          name: 'looking_for',
          required: false,
          schema: {
            type: 'integer'
          }
        },
        {
          in: 'query',
          name: 'favorite',
          required: false,
          schema: {
            type: 'boolean'
          }
        }
      ],
      responses: {
        200: {
          description: 'Returns paginated user profiles.',
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
                      $ref: '#/components/schemas/UserProfile'
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
      tags: ['UserProfile'],
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
              $ref: '#/components/schemas/SaveUserProfile'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns saved user profile.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserProfile'
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
  '/api/user-profile/{user_id}': {
    get: {
      tags: ['UserProfile'],
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
          description: 'Returns user profile.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserProfile'
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
