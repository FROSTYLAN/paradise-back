import {
  response400,
  response401,
  response403,
  response500
} from '../../utils/swagger'

export const verification = {
  '/api/verification': {
    get: {
      tags: ['Verification'],
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        200: {
          description: 'Returns verifications.',
          content: {
            'application/json': {
              schema: {
                oneOf: [
                  {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/VerificationByDNI'
                    }
                  },
                  {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/VerificationByPose'
                    }
                  }
                ]
              },
              examples: {
                dni: [
                  {
                    summary: 'Verification by DNI',
                    value: {
                      id: 0,
                      user_id: 0,
                      front: 'string',
                      back: 'string',
                      type: 1,
                      status: 1
                    }
                  }
                ],
                pose: [
                  {
                    summary: 'Verification by Pose',
                    value: {
                      id: 0,
                      user_id: 0,
                      image_01: 'string',
                      image_02: 'string',
                      type: 1,
                      status: 1
                    }
                  }
                ]
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
  '/api/verification/{user_id}': {
    get: {
      tags: ['Verification'],
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
          description: 'Returns verifications by user.',
          content: {
            'application/json': {
              schema: {
                oneOf: [
                  {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/VerificationByDNI'
                    }
                  },
                  {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/VerificationByPose'
                    }
                  }
                ]
              },
              examples: {
                dni: [
                  {
                    summary: 'Verification by DNI',
                    value: {
                      id: 0,
                      user_id: 0,
                      front: 'string',
                      back: 'string',
                      type: 1,
                      status: 1
                    }
                  }
                ],
                pose: [
                  {
                    summary: 'Verification by Pose',
                    value: {
                      id: 0,
                      user_id: 0,
                      image_01: 'string',
                      image_02: 'string',
                      type: 1,
                      status: 1
                    }
                  }
                ]
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
  '/api/verification/dni': {
    post: {
      tags: ['Verification'],
      security: [
        {
          bearerAuth: []
        }
      ],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              $ref: '#/components/schemas/CreateVerificationByDNI'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns created verification.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/VerificationByDNI'
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
  '/api/verification/pose': {
    post: {
      tags: ['Verification'],
      security: [
        {
          bearerAuth: []
        }
      ],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              $ref: '#/components/schemas/CreateVerificationByPose'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns created verification.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/VerificationByPose'
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
  '/api/verification/approve/{id}': {
    put: {
      tags: ['Verification'],
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
          description: 'Returns updated verification.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Verification'
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
  '/api/verification/reject/{id}': {
    put: {
      tags: ['Verification'],
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
          description: 'Returns updated verification.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Verification'
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
