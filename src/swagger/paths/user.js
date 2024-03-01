import {
  response400,
  response401,
  response403,
  response500
} from '../../utils/swagger'
import { pagerParams } from '../common/parameters'
import { pagerResponse } from '../common/responses'

export const user = {
  '/api/user/{id}': {
    get: {
      tags: ['User'],
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
          description: 'Returns user.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
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
  '/api/user/{id}/details': {
    get: {
      tags: ['User'],
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
          description: 'Returns user with profile and preferences.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserWithDetails'
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
  '/api/user/reported': {
    get: {
      tags: ['User'],
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [...pagerParams],
      responses: {
        200: {
          description: 'Returns paginated reported users.',
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
                      $ref: '#/components/schemas/User'
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
    }
  },
  '/api/user/update': {
    put: {
      tags: ['User'],
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
              type: 'object',
              properties: {
                email: {
                  type: 'string'
                },
                phone_number: {
                  type: 'string'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns updated user.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
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
  '/api/user/create/password': {
    put: {
      tags: ['User'],
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
              type: 'object',
              properties: {
                new_password: {
                  type: 'string'
                },
                confirm_new_password: {
                  type: 'string'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns updated user.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
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
  '/api/user/update/password': {
    put: {
      tags: ['User'],
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
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                old_password: {
                  type: 'string'
                },
                new_password: {
                  type: 'string'
                },
                confirm_new_password: {
                  type: 'string'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns updated user.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
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
  '/api/user/send/email/code': {
    put: {
      tags: ['User'],
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
              type: 'object',
              properties: {
                email: {
                  type: 'string'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Sends email code.'
        },
        400: response400,
        401: response401,
        403: response403,
        500: response500
      }
    }
  },
  '/api/user/send/phone-number/code': {
    put: {
      tags: ['User'],
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
              type: 'object',
              properties: {
                phone_number: {
                  type: 'string'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Sends phone number code.'
        },
        400: response400,
        401: response401,
        403: response403,
        500: response500
      }
    }
  },
  '/api/user/link/email/code': {
    put: {
      tags: ['User'],
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
              type: 'object',
              properties: {
                email: {
                  type: 'string'
                },
                code: {
                  type: 'string'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns updated user.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
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
  '/api/user/link/email/{token}': {
    get: {
      tags: ['User'],
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [
        {
          in: 'path',
          name: 'token',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      responses: {
        200: {
          description: 'Returns updated user.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
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
  '/api/user/link/phone-number': {
    put: {
      tags: ['User'],
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
              type: 'object',
              properties: {
                phone_number: {
                  type: 'string'
                },
                code: {
                  type: 'string'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns updated user.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
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
  '/api/user/link/google': {
    put: {
      tags: ['User'],
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
              type: 'object',
              properties: {
                code: {
                  type: 'string'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns updated user.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
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
  '/api/user/link/facebook': {
    put: {
      tags: ['User'],
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
              type: 'object',
              properties: {
                access_token: {
                  type: 'string'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns updated user.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
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
  '/api/user/unlink/email/code': {
    put: {
      tags: ['User'],
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
              type: 'object',
              properties: {
                code: {
                  type: 'string'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns user without email.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
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
  '/api/user/unlink/email/{token}': {
    get: {
      tags: ['User'],
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [
        {
          in: 'path',
          name: 'token',
          required: true,
          schema: {
            type: 'string'
          }
        }
      ],
      responses: {
        200: {
          description: 'Returns user without email.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
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
  '/api/user/unlink/phone_number': {
    put: {
      tags: ['User'],
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
              type: 'object',
              properties: {
                code: {
                  type: 'string'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns user without phone_number.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
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
  '/api/user/report': {
    put: {
      tags: ['User'],
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
              type: 'object',
              properties: {
                user_id: {
                  type: 'integer'
                },
                report_message: {
                  type: 'string'
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Returns reported user.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
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
  '/api/user': {
    delete: {
      tags: ['User'],
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        200: {
          description: 'Returns deleted user.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
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
